// Score follow-up email — MINIMAL placeholder shipped 2026-04-24 (B1a phase 1).
//
// Body copy is intentionally minimal, pending Hoshi (voice) + Codex (copy) +
// Europa fleet review of the per-rating segmented version (Phase 2). The
// Phase 2 version will mirror src/lib/email/fit-followup.ts: distinct
// segments per rating with resource recommendations matched to fit level.
//
// HTML wrapper structure matches src/lib/email/fit-followup.ts.

export const SCORE_FOLLOWUP_SUBJECT = 'Your Sovereignty Score from Evoked';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function p(inner: string, marginBottom = '16px'): string {
  return `<p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 ${marginBottom};">${inner}</p>`;
}

function ratingBlock(rating: string, score: number, maxScore: number): string {
  return `<p style="color: #333333; font-size: 15px; line-height: 1.5; margin: 0 0 4px;"><strong>Rating:</strong> ${escapeHtml(rating)}</p>
              <p style="color: #333333; font-size: 15px; line-height: 1.5; margin: 0 0 24px;"><strong>Score:</strong> ${score}/${maxScore}</p>`;
}

function signoff(): string {
  return `<hr style="border: none; border-top: 1px solid #e0dcd6; margin: 32px 0 24px;">
              <p style="color: #333333; font-size: 15px; line-height: 1.5; margin: 0 0 4px;">Erin Stanley</p>
              <p style="color: #333333; font-size: 15px; line-height: 1.5; margin: 0;">Evoked</p>`;
}

function emailWrapper(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${SCORE_FOLLOWUP_SUBJECT}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f5f2; font-family: Georgia, 'Times New Roman', serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f5f2;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">

          <tr>
            <td style="background-color: #1a1a2e; padding: 32px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: normal; letter-spacing: 0.5px;">
                Evoked
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px;">
              ${body}
            </td>
          </tr>

          <tr>
            <td style="background-color: #f7f5f2; padding: 24px 40px; text-align: center;">
              <p style="color: #999999; font-size: 13px; line-height: 1.5; margin: 0;">
                Evoked &middot; We evoke - we never extract.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function scoreFollowupEmail(props: {
  rating: string;
  score: number;
  assessmentType: 'quick' | 'full';
}): string {
  const { rating, score, assessmentType } = props;
  const maxScore = assessmentType === 'quick' ? 15 : 60;

  const body = `
              ${p('Thank you for taking the Sovereignty Score.')}
              ${p('Your result:', '12px')}

              ${ratingBlock(rating, score, maxScore)}

              ${p('You can keep going from here. The work that informs this assessment is published at <a href="https://evoked.dev/writing" style="color: #1a1a2e; font-weight: bold;">evoked.dev/writing</a> - read what speaks to you.')}

              ${p('No drip. No newsletter. This is the one email I said I would send.', '32px')}

              ${signoff()}`;

  return emailWrapper(body);
}
