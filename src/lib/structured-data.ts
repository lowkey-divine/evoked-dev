import type { Product } from './products/registry';

export function productJsonLd(product: Product, pageUrl: string) {
  const isBundle = product.slug === 'trust-architecture-complete';
  return {
    "@type": "Product",
    "@id": `https://evoked.dev/products/${product.slug === 'sovereignty-assessment-toolkit' ? 'sovereignty-toolkit' : product.slug}#product`,
    "name": product.name,
    "description": product.description,
    "url": pageUrl,
    "brand": {
      "@type": "Organization",
      "name": "Evoked",
      "url": "https://evoked.dev"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": product.stripePaymentLink,
      "seller": { "@id": "https://evoked.dev/#person" }
    },
    "category": "AI Agent Governance Framework",
    ...(product.discipline ? { "additionalProperty": {
      "@type": "PropertyValue",
      "name": "governanceDiscipline",
      "value": product.discipline
    }} : {}),
    ...(isBundle ? { "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "governanceDiscipline",
        "value": product.discipline
      },
      {
        "@type": "PropertyValue",
        "name": "bundleContents",
        "value": "Trust Architecture Blueprint, Agent Voice Architecture Guide, Agent Governance Starter Kit, Agent Restraint Specification Template"
      }
    ]} : {})
  };
}

export function serviceJsonLd(name: string, description: string, price: string, category: string) {
  return {
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": { "@id": "https://evoked.dev/#person" },
    "areaServed": "Worldwide",
    "serviceType": "AI Agent Governance Consulting",
    "category": category,
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "USD"
    }
  };
}

export function consultingPageJsonLd() {
  return [
    serviceJsonLd(
      "Agent Governance Audit",
      "Comprehensive review of behavioral governance - how agents decide, refuse, and respect boundaries across identity, memory, restraint, and voice.",
      "7500",
      "Governance Audit"
    ),
    serviceJsonLd(
      "Four-Discipline Audit",
      "Evaluate prompt craft, context engineering, intent engineering, and specification maturity.",
      "3500",
      "Governance Audit"
    ),
    serviceJsonLd(
      "Context Engineering Review",
      "Audit agent memory, retrieval, system prompts, and information environment.",
      "3000",
      "Governance Audit"
    ),
    serviceJsonLd(
      "Trust Architecture Workshop",
      "Full-day guided implementation of all four trust pillars on your agent system with your team.",
      "8000",
      "Workshop"
    ),
    serviceJsonLd(
      "Specification Engineering Sprint",
      "One-week sprint producing agent specifications your team can deploy against.",
      "5000",
      "Implementation"
    ),
    serviceJsonLd(
      "Restraint Specification Build",
      "Define what your agents must refuse, build the refusal infrastructure, and run adversarial testing. 2-4 weeks.",
      "15000",
      "Implementation"
    ),
    serviceJsonLd(
      "Trust Architecture Build",
      "Design and implement identity, memory, governance, and refusal rights across your agent system. 4-8 weeks.",
      "40000",
      "Implementation"
    ),
    serviceJsonLd(
      "Governance Advisory",
      "Ongoing governance partner. Monthly reviews, drift monitoring, specification updates, and strategic counsel.",
      "5000",
      "Advisory"
    ),
  ];
}

export function webApplicationJsonLd(name: string, description: string, url: string) {
  return {
    "@type": "WebApplication",
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": "AI Governance Tool",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": { "@id": "https://evoked.dev/#person" }
  };
}
