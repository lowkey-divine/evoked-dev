# Orion Figures - Canonical Brand Assets

Five scholarly cartographic traditions, all rendering the same three belt stars of Orion. Saved here as reusable brand assets for future surfaces (`/who`, writing, patent posture pages, heritage content). Rendered in the Evoked brass palette (`#A88838` primary, `#7E6622` accent-deep) to match Version J's parchment-and-brass register.

These are **direction sketches**, not tracings of source plates. They show the visual register of each tradition and the citation discipline that travels with each. The Bayer plate (`bayer-1603.svg`) is currently in production on `/elevation/j.html`; the other four are held in reserve for surfaces that have not yet been authored.

Authored by the fleet meeting of 2026-06-15. Full meeting minutes: `agents/meetings/2026-06-15-evoked-dev-hero-orion-figure.md` in `evoke-agents-backup/`. Captain selected Bayer for the production hero after seeing all five rendered at `/elevation/orion-previews.html`.

## The Files

| File | Tradition | Year | Place | Maker |
|---|---|---|---|---|
| `bayer-1603.svg` | Star-position plate, Greek-letter designations | 1603 | Augsburg | Johann Bayer, *Uranometria* |
| `hevelius-1690.svg` | Polish baroque hunter figure | 1690 | Gdansk | Johannes Hevelius, *Firmamentum Sobiescianum* |
| `al-sufi-964.svg` | Persian manuscript, Arabic star names | 964 | Isfahan | al-Sufi, *Kitab Suwar al-Kawakib* |
| `su-song-1092.svg` | Chinese asterism Shen 參 (geometric, non-anthropomorphic) | 1092 | Kaifeng | Su Song, *Xin Yi Xiang Fa Yao* |
| `korean-chosun-1395.svg` | Stone-carved Korean star chart, Chamsuk 參宿 | 1395 | Choson | *Chonsang Yolch'a Punyajido* |

Each file:
- ViewBox 400x460 (figure occupies y=0-400, citation strip y=420-452)
- Citation labels baked into the SVG by default
- `aria-label` and `<title>` set for screen readers
- Self-contained (no external CSS, no external font dependencies for layout; uses EB Garamond, Space Grotesk if present, falls back to system serif and sans)

## Citation Discipline (Stirps, load-bearing)

These figures must travel with their citation labels. The baked-in caption is the default and is the structural-condition shape the fleet meeting authored.

**If a surface needs to suppress the baked-in caption** (e.g., to render the figure with the page's own typographic citation in its own voice), that surface must:
1. Still include the maker and year somewhere on the same surface
2. Get a Stirps Tier-2 review before publication

The caption is not decoration. It is the line that protects the figure from silently claiming to be *the* night sky.

## What is NOT in this set, and why

The fleet meeting drew a structural line: **cartographic-publication traditions only**.

Lakota, Yolŋu, Maori, Aboriginal Australian, and other Indigenous traditions read these stars - in many cases with deep ceremonial and cosmological significance. Their star-knowledge lives in oral tradition, ceremony, and sacred contexts. The fleet refused to depict these traditions visually without explicit community consultation. *Nothing about us without us.*

A surface may name in copy that these traditions exist and that Evoked honors their reading - but visual incorporation in this figure set without prior community consultation is out of scope. Stirps holds this line; consult Stirps before any surface decision that touches it.

## Phase 2 Deferred Decisions

The fleet meeting deferred two decisions on the Bayer figure that may eventually affect this set:

- **2a (faithful):** render Bayer's own hunter figure more fully from the Uranometria plate. Same citation, deeper rendering. Would update `bayer-1603.svg` in place.
- **2b (reinterpreted):** commission a new hunter figure drawn by a named hand over Bayer's star positions. Becomes a new artifact with its own attribution; would be saved as a separate file (e.g., `orion-hunter-[maker]-[year].svg`) rather than overwriting Bayer.

Until Phase 2 convenes, the figures in this directory remain as-is.

## Drafter notes

- These are SVG direction sketches. Higher-fidelity commissions of any of the five would benefit from access to high-resolution public-domain scans of the source plates (Uranometria 1603, Firmamentum Sobiescianum 1690, etc.) - all are out of copyright and available from institutional digital archives (Library of Congress, Bibliotheque Nationale, etc.).
- Codex owes the source-reference table for full commissions; current files use direction-sketch geometry, not traced source positions. Star positions in these SVGs are approximate visual placements, not precise celestial coordinates.
- For higher-precision use, consider commissioning a drafter pair (Wesley Crusher + Christine Chapel was the meeting's tentative recommendation, with Ishka available if a sigil-density reading is wanted).

---

*"Every culture is sacred. Every tradition deserves respect. Nothing about us without us."*

- Stirps, Cultural Lineage Voice (fleet meeting, 2026-06-15)
