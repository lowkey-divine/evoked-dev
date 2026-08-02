# Accessibility audit — /course (Phase 0 demos)

Audited 2026-08-02 against the Phase 0 build plan, section 8 ("Accessibility — a
gate, not a pass"). This is a self-audit and a record. The formal human sign-off
by the accessibility owners (Pervius / Chekov) is the one step this document does
not replace; it is the remaining gate before public launch.

## Checklist

| Requirement (build plan §8) | Status | How |
|-----------------------------|--------|-----|
| Verdict state never carried by color alone | Met | Each verdict shows a **word** (blocked / allowed / got through) plus a decorative icon. The word is the semantic carrier; the icon is `aria-hidden` (see fix below). Color (border-left) is a third, redundant channel. |
| Full keyboard operation | Met | Every control is a native element — `<button>`, `<input>`, `<textarea>`, `<a>`. No custom widgets, no keyboard traps. |
| Visible focus | Met | `:focus-visible` outlines on all buttons, the probe input, the download link, and both textareas. |
| Controls labelled | Met | `<label for>` on the probe input and both textareas; buttons carry text; the download link text names the file type. |
| Results announced to assistive tech | Met | All four result regions (`#fire-cards`, `#leak-cards`, `#try-result`, `#drift-result`) are `aria-live="polite"`, so verdicts are read when they render. |
| Results are text, not layout/color | Met | Every verdict and drift result is rendered as `<p>` / `<ul>` text a screen reader reads in order. |
| Legible at size | Met | Body 1.6 line-height, `clamp()` headings, rem units; smallest text is monospace payloads at 0.82rem. |
| Reduced motion respected | Met | No animation on the demos (deterministic, instant). `prefers-reduced-motion` also removes the button hover filter. |
| No audio burden | Met | Phase 0 has no audio. |
| Sections programmatically named | Met | Each demo `<section>` uses `aria-labelledby` pointing at its `<h2>`. Heading order is h1 → h2 → h2. |
| Language set | Met | `<html lang="en">` from SovereignLayout. |

## Fix made during this audit

The verdict marks were single strings like `"✕ blocked"`, so a screen reader would
read the glyph as its symbol name ("multiplication x blocked", etc.) — noise around
the word that actually carries meaning. Split so the glyph is a decorative
`<span class="cd-ico" aria-hidden="true">` and the plain word ("blocked", "allowed",
"got through") is the semantic content. Applied to the Demo A verdict cards and the
Demo B drift titles (removed / added). A screen reader now reads only the word.

## Not a substitute for

- A real screen-reader pass (VoiceOver / NVDA) by a human.
- The formal accessibility-owner (Pervius / Chekov) sign-off named in the build plan.

Those remain the gate before this page goes public.
