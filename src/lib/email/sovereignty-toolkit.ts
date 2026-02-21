export const SOVEREIGNTY_TOOLKIT_SUBJECT = 'Your Sovereignty Assessment Toolkit';

export function sovereigntyToolkitEmail(downloadUrl: string, customerName?: string): string {
  const greeting = customerName ? `Thank you, ${customerName}.` : 'Thank you for your purchase.';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${SOVEREIGNTY_TOOLKIT_SUBJECT}</title>
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
                Evoke Passion
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #1a1a2e; margin: 0 0 20px; font-size: 22px; font-weight: normal;">
                ${greeting}
              </h2>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
                Your Sovereignty Assessment Toolkit is ready. This guide will walk you through evaluating how your digital products honor - or undermine - user autonomy.
              </p>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                Click below to access your download page. You can return to this link anytime.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto 32px;">
                <tr>
                  <td style="background-color: #1a1a2e; border-radius: 6px;">
                    <a href="${downloadUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-size: 16px; font-family: Georgia, 'Times New Roman', serif;">
                      Download Your Toolkit
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Getting Started -->
              <h3 style="color: #1a1a2e; margin: 0 0 12px; font-size: 18px; font-weight: normal;">
                Getting started
              </h3>

              <ol style="color: #333333; font-size: 15px; line-height: 1.8; margin: 0 0 24px; padding-left: 20px;">
                <li>Read the framework introduction (pages 1-5)</li>
                <li>Run the sovereignty audit on one of your existing products</li>
                <li>Use the scoring rubric to identify your strongest and weakest areas</li>
                <li>Pick the top three findings and build them into your next sprint</li>
              </ol>

              <hr style="border: none; border-top: 1px solid #e0dcd6; margin: 24px 0;">

              <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0;">
                Questions or feedback? Reply to this email or reach out at
                <a href="mailto:erin@evoked.dev" style="color: #1a1a2e;">erin@evoked.dev</a>.
                I read every message.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f7f5f2; padding: 24px 40px; text-align: center;">
              <p style="color: #999999; font-size: 13px; line-height: 1.5; margin: 0;">
                Evoke Passion &middot; We evoke - we never extract.
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
