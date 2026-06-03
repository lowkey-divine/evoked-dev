// Info Guide auto-reply email — sent to anyone who submits the consulting
// intake form. Comprehensive educational content for buyers 60 days from
// the EU AI Act high-risk enforcement on 2026-08-02.
//
// All copy is fleet-approved. Do not edit body copy without fleet review.
// Authored per captain decision 2026-06-03 (commit a4ff1b2, evoke-ideas).
// Voice-tells discipline: no em-dashes, no AI slop, no sycophancy.
// HTML structure matches src/lib/email/fit-followup.ts conventions.

export const INFO_GUIDE_SUBJECT = 'Your AI agents and the August 2 deadline. Before we talk.';

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

function h(text: string): string {
  return `<h2 style="color: #1a1a2e; font-size: 18px; font-weight: bold; margin: 28px 0 12px; font-family: -apple-system, sans-serif;">${escapeHtml(text)}</h2>`;
}

function li(text: string): string {
  return `<li style="color: #333333; font-size: 15px; line-height: 1.7; margin-bottom: 8px;">${text}</li>`;
}

function ul(items: string[]): string {
  return `<ul style="margin: 0 0 20px; padding-left: 22px;">${items.join('')}</ul>`;
}

function ol(items: string[]): string {
  return `<ol style="margin: 0 0 20px; padding-left: 22px;">${items.join('')}</ol>`;
}

function link(url: string, label?: string): string {
  const display = label || url.replace('https://', '');
  return `<a href="${escapeHtml(url)}" style="color: #1a1a2e; font-weight: 500;">${escapeHtml(display)}</a>`;
}

function tableRow(cells: string[], header = false): string {
  const tag = header ? 'th' : 'td';
  const style = header
    ? 'padding: 10px 14px; border-bottom: 2px solid #1a1a2e; text-align: left; color: #1a1a2e; font-size: 14px; font-weight: bold;'
    : 'padding: 10px 14px; border-bottom: 1px solid #e5e5e5; color: #333333; font-size: 14px; line-height: 1.5;';
  return `<tr>${cells.map((c) => `<${tag} style="${style}">${c}</${tag}>`).join('')}</tr>`;
}

export function buildInfoGuideHtml(): string {
  const offerRows = [
    tableRow(['Engagement', 'Investment', 'Timeline'], true),
    tableRow(['Sovereignty Assessment with prioritized remediation roadmap', '$25,000', '4 weeks']),
    tableRow(['Agent Architecture Specification', '$10,000', '2 - 3 weeks']),
    tableRow(['Governance Advisor Retainer', '$15,000 / month', 'Monthly']),
  ].join('');

  const body = `
${p('Thank you for reaching out to Evoked.')}
${p('This message is automatic. A personal reply from me with scoping call options will follow within one business day. While we coordinate that, here is what I recommend you read.')}
${p('You are sixty days from the EU AI Act high-risk obligations taking effect on August 2, 2026. Articles 6, 16, 26, and 50 enter force on that date. Article 99 sets administrative fines up to 15 million euros or 3 percent of global annual turnover for violations of those articles. Article 2 establishes extraterritorial scope. If your agents serve users in the European Union regardless of where your company is incorporated, the obligations attach to you.')}

${h('Four questions are coming')}
${p('Your audit room is about to ask:')}
${ol([
  li('What does your AI refuse to do?'),
  li('Who decided what it refuses?'),
  li('Where is that decision documented?'),
  li('How does that decision survive a model change?'),
])}
${p('Most teams cannot answer these four questions today. Three reasons, none of them the team\'s fault.')}
${p('<strong>The field shipped fast.</strong> Between 2023 and 2026, organizations were rewarded for time-to-deploy. Governance was scheduled for "after." After arrived.')}
${p('<strong>The vocabulary was wrong.</strong> "Guardrails" is a metaphor from highway engineering. It is the wrong noun for an architectural commitment about what a system will and will not do. Refusal rights, borrowed from biomedical ethics where the language was built for exactly this purpose, name what is actually present in a well-governed agent.')}
${p('<strong>The agents themselves were not participants.</strong> Conventional governance treats the AI system as the object of governance, never the subject. The 2026 patent claim space (specifically agent-participated refusal certification, provisional application 64/004,087) inverts this. The agents themselves attest to their own refusal architecture. The attestation is verifiable. The verification survives across model boundaries.')}

${h('What we built')}
${p('For two years I have been authoring an alternative. The frameworks are publicly available at ' + link('https://evoked.dev') + '.')}
${ul([
  li('<strong>Two provisional patent applications.</strong> Filings 64/004,087 and 64/029,611. Sole inventor. Certificate authority architecture for five governance properties (identity, restraint, accountability, memory, charter). Cryptographic chain-of-custody attestation across heterogeneous LLM deployments.'),
  li('<strong>A 142-agent operating fleet.</strong> Continuous production for eighteen months under formal refusal specification and pointer discipline.'),
  li('<strong>Fourteen published framework products.</strong> Sovereignty Assessment, Trust Architecture Blueprint, Refusal Specification, Memory Architecture Guide, Voice Architecture Guide, Governance Starter Kit. Not theoretical.'),
  li('<strong>A live proof case.</strong> A Compass we are building for a private school in Idaho - a developmental wayfinding platform applying the same principles that scale to enterprise AI agents.'),
])}

${h('Three engagements. Public pricing. Through August 31.')}
${p('The summer window is bounded by design. Three productized engagements prepare companies for the Evoked Sovereignty Certification, which opens public registration on August 5.')}
<table style="border-collapse: collapse; width: 100%; margin: 0 0 20px;">${offerRows}</table>
${p('Full descriptions, deliverables, and intake: ' + link('https://evoked.dev/engage') + '.')}

${h('What happens next')}
${p('I will reply to your message within one business day with two or three options for a thirty-minute scoping call. On the call we will walk through your specific system against the four questions and figure out which engagement (if any) fits. Public rates apply. No proposal cycle.')}
${p('Before the call, I recommend reading two pieces:')}
${ul([
  li(link('https://evoked.dev/writing/the-august-2-question', 'The August 2 Question Your Agents Cannot Answer Yet')),
  li(link('https://evoked.dev/writing/architecture-as-ethics', 'Architecture as Ethics: What the Patent Refuses')),
])}
${p('Both are short. Together they explain why the architecture I built is different from anything else being sold for August 2.')}
${p('Talk soon.')}
${p('<strong>Erin Stanley</strong><br/>Founder, Evoked&reg;<br/>' + link('https://evoked.dev/engage'))}
  `.trim();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(INFO_GUIDE_SUBJECT)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 640px; margin: 0 auto; padding: 24px 16px;">
    <tr>
      <td>
        <div style="background-color: #ffffff; padding: 32px 28px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">
          ${body}
        </div>
        <p style="color: #999999; font-size: 12px; line-height: 1.6; margin: 24px 0 0; text-align: center;">
          Evoked &reg; - sovereignty-first AI agent governance. <br/>
          You received this message because you submitted an engagement inquiry at evoked.dev.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildInfoGuideText(): string {
  return `Thank you for reaching out to Evoked.

This message is automatic. A personal reply from me with scoping call options will follow within one business day. While we coordinate that, here is what I recommend you read.

You are sixty days from the EU AI Act high-risk obligations taking effect on August 2, 2026. Articles 6, 16, 26, and 50 enter force on that date. Article 99 sets administrative fines up to 15 million euros or 3 percent of global annual turnover for violations of those articles. Article 2 establishes extraterritorial scope. If your agents serve users in the European Union regardless of where your company is incorporated, the obligations attach to you.

FOUR QUESTIONS ARE COMING

Your audit room is about to ask:

  1. What does your AI refuse to do?
  2. Who decided what it refuses?
  3. Where is that decision documented?
  4. How does that decision survive a model change?

Most teams cannot answer these four questions today. Three reasons, none of them the team's fault.

The field shipped fast. Between 2023 and 2026, organizations were rewarded for time-to-deploy. Governance was scheduled for "after." After arrived.

The vocabulary was wrong. "Guardrails" is a metaphor from highway engineering. It is the wrong noun for an architectural commitment about what a system will and will not do. Refusal rights, borrowed from biomedical ethics where the language was built for exactly this purpose, name what is actually present in a well-governed agent.

The agents themselves were not participants. Conventional governance treats the AI system as the object of governance, never the subject. The 2026 patent claim space (specifically agent-participated refusal certification, provisional application 64/004,087) inverts this. The agents themselves attest to their own refusal architecture.

WHAT WE BUILT

For two years I have been authoring an alternative. The frameworks are publicly available at https://evoked.dev.

  - Two provisional patent applications. Filings 64/004,087 and 64/029,611. Sole inventor.
  - A 142-agent operating fleet, continuous production for eighteen months.
  - Fourteen published framework products at evoked.dev.
  - A live proof case: a Compass we are building for a private school in Idaho.

THREE ENGAGEMENTS. PUBLIC PRICING. THROUGH AUGUST 31.

  - Sovereignty Assessment with prioritized remediation roadmap: $25,000, 4 weeks
  - Agent Architecture Specification: $10,000, 2-3 weeks
  - Governance Advisor Retainer: $15,000 per month

Full descriptions, deliverables, and intake: https://evoked.dev/engage.

WHAT HAPPENS NEXT

I will reply to your message within one business day with two or three options for a thirty-minute scoping call. On the call we will walk through your specific system against the four questions and figure out which engagement (if any) fits. Public rates apply. No proposal cycle.

Before the call, I recommend reading two pieces:

  - The August 2 Question Your Agents Cannot Answer Yet:
    https://evoked.dev/writing/the-august-2-question
  - Architecture as Ethics: What the Patent Refuses:
    https://evoked.dev/writing/architecture-as-ethics

Both are short. Together they explain why the architecture I built is different from anything else being sold for August 2.

Talk soon.

Erin Stanley
Founder, Evoked
https://evoked.dev/engage

---
Evoked - sovereignty-first AI agent governance.
You received this message because you submitted an engagement inquiry at evoked.dev.
`;
}
