import type { Product } from '../products/registry';

export function productDeliveryEmail(product: Product, customerName?: string): string {
  const greeting = customerName ? `Thank you, ${customerName}.` : 'Thank you for your purchase.';
  const downloadUrl = `https://evoked.dev${product.thankYouPath}`;

  const stepsHtml = product.gettingStartedSteps
    .map((step) => `<li>${step}</li>`)
    .join('\n                ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${product.emailSubject}</title>
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
                Your ${product.name} is ready. ${product.description}
              </p>

              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                Click below to access your download page. You can return to this link anytime.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto 32px;">
                <tr>
                  <td style="background-color: #1a1a2e; border-radius: 6px;">
                    <a href="${downloadUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-size: 16px; font-family: Georgia, 'Times New Roman', serif;">
                      Download Your ${product.name.includes('Kit') ? 'Kit' : product.name.includes('Template') ? 'Template' : product.name.includes('Blueprint') ? 'Blueprint' : product.name.includes('Guide') ? 'Guide' : 'Toolkit'}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Getting Started -->
              <h3 style="color: #1a1a2e; margin: 0 0 12px; font-size: 18px; font-weight: normal;">
                Getting started
              </h3>

              <ol style="color: #333333; font-size: 15px; line-height: 1.8; margin: 0 0 24px; padding-left: 20px;">
                ${stepsHtml}
              </ol>

              <hr style="border: none; border-top: 1px solid #e0dcd6; margin: 24px 0;">

              <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0 0 16px;">
                This is an automated message - please do not reply to this email.
                Questions or feedback? Reach out at
                <a href="mailto:evokesupports@icloud.com" style="color: #1a1a2e;">evokesupports@icloud.com</a>.
              </p>

              <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0;">
                Want to hear from us about sovereignty-honoring AI design?
                <a href="https://evoked.dev/newsletter" style="color: #1a1a2e;">Subscribe to our newsletter</a> - no auto-enrollment, your choice.
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
