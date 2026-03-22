// Fit follow-up email — three segments (strong, moderate, limited).
// not-recommended: no email sent — guard lives in the API.
//
// All copy is fleet-approved. Do not edit body copy without fleet review.
// HTML structure matches src/lib/email/product-delivery.ts.

export type FitLevel = 'strong' | 'moderate' | 'limited' | 'not-recommended';

export const FIT_FOLLOWUP_SUBJECT = 'Your governance assessment from Evoked';

export function fitFollowupSubject(_fitLevel: FitLevel): string {
  return FIT_FOLLOWUP_SUBJECT;
}

// --- HTML helpers ---

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

function label(text: string, marginBottom = '8px'): string {
  return `<p style="color: #1a1a2e; font-size: 15px; font-weight: bold; margin: 0 0 ${marginBottom}; font-family: -apple-system, sans-serif;">${escapeHtml(text)}</p>`;
}

function listItems(items: string[]): string {
  return items
    .map(
      (item) =>
        `<li style="color: #333333; font-size: 15px; line-height: 1.7; margin-bottom: 6px;">${escapeHtml(item)}</li>`,
    )
    .join('\n                ');
}

function ul(items: string[]): string {
  if (!items.length) return '';
  return `<ul style="margin: 0 0 20px; padding-left: 20px;">
                ${listItems(items)}
              </ul>`;
}

function fitScoreBlock(fitLabel: string, score: number): string {
  return `<p style="color: #333333; font-size: 15px; line-height: 1.5; margin: 0 0 4px;"><strong>Fit level:</strong> ${escapeHtml(fitLabel)}</p>
              <p style="color: #333333; font-size: 15px; line-height: 1.5; margin: 0 0 24px;"><strong>Score:</strong> ${score}/10</p>`;
}

function productLine(product: { name: string; tagline: string; url: string }, marginBottom = '8px'): string {
  return `<p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 ${marginBottom};"><a href="${escapeHtml(product.url)}" style="color: #1a1a2e; font-weight: bold;">${escapeHtml(product.name)}</a> — ${escapeHtml(product.tagline)}.</p>`;
}

function intakeLine(url: string, marginBottom = '24px'): string {
  const display = url.replace('https://', '');
  return `<p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 ${marginBottom};"><a href="${escapeHtml(url)}" style="color: #1a1a2e;">${escapeHtml(display)}</a></p>`;
}

function articleLine(article: { title: string; url: string }): string {
  return `<p style="color: #333333; font-size: 15px; line-height: 1.6; margin: 0 0 24px;"><a href="${escapeHtml(article.url)}" style="color: #1a1a2e;">${escapeHtml(article.title)}</a></p>`;
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
  <title>${FIT_FOLLOWUP_SUBJECT}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f5f2; font-family: Georgia, 'Times New Roman', serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f5f2;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color: #1a1a2e; padding: 32px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: normal; letter-spacing: 0.5px;">
                Evoked
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f7f5f2; padding: 24px 40px; text-align: center;">
              <p style="color: #999999; font-size: 13px; line-height: 1.5; margin: 0;">
                Evoked &middot; We evoke — we never extract.
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

// --- Segment A: Strong fit ---

function strongEmail(props: {
  score: number;
  strengths: string[];
  considerations: string[];
  intakeUrl: string;
  products: { name: string; tagline: string; url: string }[];
}): string {
  const { score, strengths, considerations, intakeUrl, products } = props;

  const secondProduct = products[1] ? productLine(products[1], '20px') : '';

  const body = `
              ${p('Thank you for describing your project.')}
              ${p("Based on what you shared, there's strong alignment between your work and what we do. Here's your assessment:", '24px')}

              ${fitScoreBlock('Strong', score)}

              ${label('Where the alignment is:')}
              ${ul(strengths)}

              ${label('Questions worth considering:')}
              ${ul(considerations)}

              ${p('If any of this resonated, here are two paths — take either, both, or neither.', '20px')}

              ${label('Start with a framework:')}
              ${productLine(products[0], secondProduct ? '8px' : '20px')}
              ${secondProduct}

              ${label('Start a conversation:')}
              ${p('Our consulting intake takes about five minutes and helps us understand your specific situation.', '4px')}
              ${intakeLine(intakeUrl)}

              ${p('No timeline. No pressure. These are here when you\'re ready.', '32px')}

              ${signoff()}`;

  return emailWrapper(body);
}

// --- Segment B: Moderate fit ---

function moderateEmail(props: {
  score: number;
  strengths: string[];
  considerations: string[];
  intakeUrl: string;
  products: { name: string; tagline: string; url: string }[];
}): string {
  const { score, strengths, considerations, intakeUrl, products } = props;

  const body = `
              ${p('Thank you for describing your project.')}
              ${p("Based on what you shared, there's partial alignment with what we do — some clear connection points, and some areas where the fit would need to sharpen.", '24px')}

              ${fitScoreBlock('Moderate', score)}

              ${label('Where the connection is:')}
              ${ul(strengths)}

              ${label('Where it gets less clear:')}
              ${ul(considerations)}

              ${p('Two things that might be useful from here:', '20px')}

              ${label('A framework to explore on your own:')}
              ${productLine(products[0], '20px')}

              ${label('A conversation to see if there\'s more here:')}
              ${p('Our consulting intake helps us both figure out whether deeper work makes sense. Five minutes, no commitment.', '4px')}
              ${intakeLine(intakeUrl)}

              ${signoff()}`;

  return emailWrapper(body);
}

// --- Segment C: Limited fit ---

function limitedEmail(props: {
  score: number;
  considerations: string[];
  article: { title: string; url: string };
}): string {
  const { score, considerations, article } = props;

  const body = `
              ${p('Thank you for describing your project.')}
              ${p("Based on what you shared, there's limited alignment between your project and the kind of work we do. That's not a judgment — it's an honest read, and you deserve that.", '24px')}

              ${fitScoreBlock('Limited', score)}

              ${label('What we noticed:')}
              ${ul(considerations)}

              ${p('This may not be the right match, but the questions your project raises are still worth exploring. If you\'re interested, this piece covers some of the territory:', '8px')}
              ${articleLine(article)}

              ${p('We wish you well with the work.', '32px')}

              ${signoff()}`;

  return emailWrapper(body);
}

// --- Public export ---

export function fitFollowupEmail(props: {
  fitLevel: FitLevel;
  score: number;
  strengths: string[];
  considerations: string[];
  suggestedServices: string[];
  intakeUrl?: string;
  productLinks?: { name: string; tagline: string; url: string }[];
  articleLinks?: { title: string; url: string }[];
}): string {
  const { fitLevel, score, strengths, considerations, intakeUrl, productLinks, articleLinks } = props;

  switch (fitLevel) {
    case 'strong':
      return strongEmail({
        score,
        strengths,
        considerations,
        intakeUrl: intakeUrl ?? 'https://evoked.dev/consulting-intake',
        products: productLinks ?? [],
      });

    case 'moderate':
      return moderateEmail({
        score,
        strengths,
        considerations,
        intakeUrl: intakeUrl ?? 'https://evoked.dev/consulting-intake',
        products: productLinks ?? [],
      });

    case 'limited':
      // Segment C renders the first article only ("this piece").
      return limitedEmail({
        score,
        considerations,
        article: articleLinks?.[0] ?? { title: 'Sovereignty-Honoring Design', url: 'https://evoked.dev/writing/sovereignty-honoring-design' },
      });

    case 'not-recommended':
      // Should not be reached — API guards this before calling fitFollowupEmail.
      throw new Error('fitFollowupEmail called with not-recommended fitLevel');
  }
}
