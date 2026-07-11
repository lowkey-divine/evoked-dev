// markdown-email.mjs
//
// Renders a src/content/writing/*.md article into a newsletter email:
//   parseArticle()          - split frontmatter / body (gray-matter)
//   markdownToEmailHtml()    - markdown -> HTML, root-relative links absolutized
//   renderArticleEmail()     - wrap body HTML in the branded email shell + footer
//   auditNoTracking()        - throw if the HTML contains a tracking artifact
//
// Sovereignty wall (Polaris + Tutela), enforced here in code:
//   - links are ABSOLUTIZED to https://evoked.dev (turning "/x" into a real
//     destination). This is href-fixing, NOT click tracking: no redirect host,
//     no per-recipient parameters, no rewriting for analytics.
//   - no tracking pixel and no remote images are ever added; auditNoTracking()
//     refuses to render anything that looks like an open beacon.
//   - the only per-recipient unique element is the unsubscribe link.
//
// Pure module, no side effects. Imported by scripts/newsletter-send.mjs.

import matter from 'gray-matter';
import { marked } from 'marked';

export const SITE_URL = 'https://evoked.dev';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Split an article's frontmatter from its markdown body. */
export function parseArticle(raw) {
  const { data, content } = matter(raw);
  return { data, content };
}

// Inject an inline style onto every opening <tag> (with or without attributes).
// Inline styles are the only reliable styling across email clients.
function styleTag(html, tag, style) {
  return html
    .replace(new RegExp(`<${tag}>`, 'g'), `<${tag} style="${style}">`)
    .replace(new RegExp(`<${tag} `, 'g'), `<${tag} style="${style}" `);
}

/**
 * Convert an article's markdown body to email-ready HTML.
 * Absolutizes root-relative links and inlines readable typography.
 */
export function markdownToEmailHtml(markdown) {
  let html = marked.parse(markdown, { gfm: true });

  // Absolutize root-relative links: href="/x" -> href="https://evoked.dev/x".
  // The negative lookahead avoids touching protocol-relative "//host" URLs.
  html = html.replace(/href="\/(?!\/)/g, `href="${SITE_URL}/`);

  // Inline typography (Georgia serif shell, matching lib/email/score-followup.ts).
  html = styleTag(html, 'p', 'color:#333333;font-size:16px;line-height:1.7;margin:0 0 18px;');
  html = styleTag(html, 'h2', 'color:#1a1a2e;font-size:22px;line-height:1.3;margin:32px 0 14px;font-weight:bold;');
  html = styleTag(html, 'h3', 'color:#1a1a2e;font-size:18px;line-height:1.35;margin:28px 0 12px;font-weight:bold;');
  html = styleTag(html, 'a', 'color:#1a1a2e;font-weight:bold;');
  html = styleTag(html, 'ul', 'color:#333333;font-size:16px;line-height:1.7;margin:0 0 18px;padding-left:22px;');
  html = styleTag(html, 'ol', 'color:#333333;font-size:16px;line-height:1.7;margin:0 0 18px;padding-left:22px;');
  html = styleTag(html, 'li', 'margin:0 0 8px;');
  html = styleTag(html, 'blockquote', 'color:#5b5b6b;border-left:3px solid #e0dcd6;margin:0 0 18px;padding:4px 0 4px 16px;font-style:italic;');
  html = styleTag(html, 'hr', 'border:none;border-top:1px solid #e0dcd6;margin:28px 0;');
  html = styleTag(html, 'em', 'font-style:italic;');
  html = styleTag(html, 'strong', 'font-weight:bold;');

  return html;
}

/**
 * Convert an article's markdown body to clean plain text for the text/plain
 * alternative part. Links are shown as "text (absolute-url)" so text-only
 * readers can follow them; emphasis and heading markers are stripped.
 */
export function markdownToPlainText(markdown) {
  let t = markdown;
  // Links [text](url) -> text (absolute url). Absolutize root-relative paths.
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, url) => {
    const abs = url.startsWith('/') && !url.startsWith('//') ? SITE_URL + url : url;
    return `${text} (${abs})`;
  });
  t = t.replace(/^#{1,6}\s+/gm, '');        // strip heading markers
  t = t.replace(/\*\*([^*]+)\*\*/g, '$1');  // bold
  t = t.replace(/\*([^*]+)\*/g, '$1');      // italic
  t = t.replace(/\n{3,}/g, '\n\n');         // collapse extra blank lines
  return t.trim();
}

/**
 * Refuse to render anything that would let us (or anyone) learn that a specific
 * recipient opened the email. Throws on a tracking artifact. Called by the CLI
 * before every send - the wall in the code, not just in the footer copy.
 */
export function auditNoTracking(html) {
  // Remote images are open beacons (the client fetches them on render).
  if (/<img[^>]+src=["']https?:/i.test(html)) {
    throw new Error('auditNoTracking: remote <img> found - would act as an open beacon. Refusing to send.');
  }
  // 1x1 pixel patterns.
  if (/width=["']?1["']?[^>]*height=["']?1["']?/i.test(html)) {
    throw new Error('auditNoTracking: 1x1 pixel found. Refusing to send.');
  }
  // Known click-tracking / redirect hosts appearing in links.
  const trackingHosts = /(click|track|links?|email|open|mailstat)\.[a-z0-9.-]*(resend|sendgrid|mailgun|mailchimp|list-manage|beehiiv)/i;
  if (trackingHosts.test(html)) {
    throw new Error('auditNoTracking: a link points at a tracking/redirect host. Refusing to send.');
  }
}

// First-send-only disclosure banner (copy by Codex). Shown once, at the top of
// the first direct email, to honor consent specificity (Polaris): people opted
// in via a third-party platform; we now email them directly from evoked.dev.
function disclosureBanner(unsubscribeUrl) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
      <tr>
        <td style="background-color:#f7f5f2;border:1px solid #e0dcd6;border-radius:6px;padding:16px 18px;">
          <p style="color:#5b5b6b;font-size:14px;line-height:1.6;margin:0;">
            A quick note: we now send this newsletter ourselves, straight from evoked.dev,
            instead of through the third-party platform you first signed up on. Nothing
            about the writing changes - we made this move so we hold our own list and do
            not depend on someone else's platform to reach you. If this is not what you
            signed up for, <a href="${unsubscribeUrl}" style="color:#1a1a2e;font-weight:bold;">one click unsubscribes you</a>,
            and it is honored right away.
          </p>
        </td>
      </tr>
    </table>`;
}

// Legal + no-tracking footer (copy by Codex). CAN-SPAM floor: sender identified,
// physical address present, working one-click unsubscribe.
function footer(unsubscribeUrl, postalAddress) {
  const address = postalAddress && postalAddress.trim() ? escapeHtml(postalAddress.trim()) : '[[POSTAL_ADDRESS]]';
  return `
              <hr style="border:none;border-top:1px solid #e0dcd6;margin:36px 0 20px;">
              <p style="color:#999999;font-size:13px;line-height:1.6;margin:0 0 12px;">
                This email does not track opens or clicks. We do not know if you read it,
                and that is on purpose - we back this in code, not just in words.
              </p>
              <p style="color:#999999;font-size:13px;line-height:1.6;margin:0 0 12px;">
                You can <a href="${unsubscribeUrl}" style="color:#666666;">unsubscribe</a> at any time, in one click.
              </p>
              <p style="color:#999999;font-size:13px;line-height:1.6;margin:0 0 4px;">Evoked - ${address}</p>
              <p style="color:#999999;font-size:13px;line-height:1.6;margin:0 0 12px;">Sent by Erin Stanley - erin@evoked.dev</p>
              <p style="color:#999999;font-size:13px;line-height:1.6;margin:0;">We evoke - we never extract.</p>`;
}

/**
 * Build the plain-text alternative for the newsletter email. Mirrors the HTML
 * footer copy (Codex) so both parts say the same thing.
 *
 * @param {object} opts
 * @param {string} opts.title
 * @param {string} [opts.subtitle]
 * @param {string} opts.bodyText        output of markdownToPlainText()
 * @param {string} opts.unsubscribeUrl
 * @param {string} [opts.postalAddress]
 * @param {boolean} [opts.includeDisclosure]
 */
export function renderArticleText(opts) {
  const { title, subtitle, bodyText, unsubscribeUrl, postalAddress, includeDisclosure } = opts;
  const address = postalAddress && postalAddress.trim() ? postalAddress.trim() : '[[POSTAL_ADDRESS]]';
  const lines = [];
  if (includeDisclosure) {
    lines.push(
      'A quick note: we now send this newsletter ourselves, straight from evoked.dev, ' +
        'instead of through the third-party platform you first signed up on. Nothing about ' +
        'the writing changes - we made this move so we hold our own list and do not depend ' +
        "on someone else's platform to reach you. If this is not what you signed up for, one " +
        'click unsubscribes you, and it is honored right away:',
    );
    lines.push(unsubscribeUrl, '', '---', '');
  }
  lines.push(title);
  if (subtitle) lines.push('', subtitle);
  lines.push('', bodyText, '', '---', '');
  lines.push(
    'This email does not track opens or clicks. We do not know if you read it, and that is on purpose - we back this in code, not just in words.',
  );
  lines.push('', 'Unsubscribe (one click): ' + unsubscribeUrl);
  lines.push('', 'Evoked - ' + address);
  lines.push('Sent by Erin Stanley - erin@evoked.dev');
  lines.push('', 'We evoke - we never extract.');
  return lines.join('\n');
}

/**
 * Wrap article HTML in the branded email shell.
 *
 * @param {object} opts
 * @param {string} opts.title            article title (frontmatter)
 * @param {string} [opts.subtitle]       article description (frontmatter)
 * @param {string} opts.contentHtml      output of markdownToEmailHtml()
 * @param {string} opts.unsubscribeUrl   this recipient's unsubscribe link
 * @param {string} [opts.postalAddress]  CAN-SPAM mailing address
 * @param {boolean} [opts.includeDisclosure] show the first-send banner
 */
export function renderArticleEmail(opts) {
  const { title, subtitle, contentHtml, unsubscribeUrl, postalAddress, includeDisclosure } = opts;

  const lead = subtitle
    ? `<p style="color:#5b5b6b;font-size:17px;line-height:1.6;margin:0 0 28px;font-style:italic;">${escapeHtml(subtitle)}</p>`
    : '';

  const body = `
              ${includeDisclosure ? disclosureBanner(unsubscribeUrl) : ''}
              <h1 style="color:#1a1a2e;font-size:26px;line-height:1.25;margin:0 0 16px;font-weight:bold;">${escapeHtml(title)}</h1>
              ${lead}
              ${contentHtml}
              ${footer(unsubscribeUrl, postalAddress)}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f7f5f2;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f5f2;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background-color:#1a1a2e;padding:28px 40px;text-align:center;">
              <span style="color:#ffffff;font-size:22px;font-weight:normal;letter-spacing:0.5px;">Evoked</span>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              ${body}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
