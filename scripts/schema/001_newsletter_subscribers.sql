-- 001_newsletter_subscribers.sql
-- Evoked custom newsletter - subscriber list (Resend + Neon, Phase 1).
--
-- Idempotent. Safe to re-run. Applied via: npm run migrate:newsletter
-- This repo has no migration framework; the .sql files under scripts/schema/
-- ARE the schema of record, and the IF NOT EXISTS guards do the idempotency.
--
-- Ownership:
--   schema shape .............. Lux (infrastructure)
--   unsubscribe_token security  Tutela (privacy guardian) - see unsubscribe-token.ts
--   no reader-tracking columns  Polaris (Prime Directive) - the wall is held here
--                               by simply having nowhere to put open/click data.

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id                 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email              TEXT        NOT NULL,
  status             TEXT        NOT NULL DEFAULT 'active',
  source             TEXT        NOT NULL,
  unsubscribe_token  TEXT,
  subscribed_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  unsubscribed_at    TIMESTAMPTZ,
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT newsletter_subscribers_status_check
    CHECK (status IN ('active', 'unsubscribed')),
  CONSTRAINT newsletter_subscribers_email_lower_check
    CHECK (email = lower(email))
);

-- id ................ surrogate key; nothing joins on email (PII is never a FK).
-- email ............. subscriber address; lowercased on write, enforced lower here.
-- status ............ active | unsubscribed; CHECK refuses any third state.
-- source ............ coarse consent-provenance label, set server-side only
--                     (website-footer, writing, kitchen-table, who/*). NOT tracking.
-- unsubscribe_token . single-purpose capability; NULLABLE because it is SPENT
--                     (set NULL) on unsubscribe and re-minted on resubscribe.
-- subscribed_at ..... the consent timestamp (load-bearing for any audit).
-- unsubscribed_at ... set when status flips to unsubscribed; proof we honored it.
-- updated_at ........ last mutation; bumped by the app on write.
--
-- Deliberately absent (data minimization, Tutela + Polaris): no ip_address,
-- no user_agent, no open/click/read counters, no engagement score, no name.
-- A field we will not use is a liability the moment someone asks what we keep.

-- Dedupe on write + operator lookup. Case is normalized so Erin@x and erin@x
-- cannot both exist.
CREATE UNIQUE INDEX IF NOT EXISTS newsletter_subscribers_email_key
  ON newsletter_subscribers (email);

-- Unsubscribe hot path: token resolves to exactly one row in one index hit.
-- Multiple SPENT (NULL) tokens are allowed - Postgres treats NULLs as distinct
-- in a unique index, so retired capabilities never collide.
CREATE UNIQUE INDEX IF NOT EXISTS newsletter_subscribers_token_key
  ON newsletter_subscribers (unsubscribe_token);

-- The send query: "all active subscribers." Partial index stays small as the
-- unsubscribed set grows, and gives ordered iteration for batching.
CREATE INDEX IF NOT EXISTS newsletter_subscribers_active_idx
  ON newsletter_subscribers (subscribed_at)
  WHERE status = 'active';
