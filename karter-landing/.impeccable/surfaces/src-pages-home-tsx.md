---
version: 1
slug: "src-pages-home-tsx"
primary_target: "src/pages/Home.tsx"
related_targets: ["src"]
---

# ATRIUM Construct site (all routes)

Scope: the whole presentation site, home first (`src/pages/Home.tsx`), then services, projects, project detail, about, testimonials, contact, quote. Visitor mode: Persuade for home, services, projects; Operate for the quote and contact forms.

Audience and job: Cluj homeowners comparing contractors on a phone, plus the author's web clients judging craft. The action is "Cere ofertă" (three-step form), a call, or WhatsApp. Proof is the numbers already in `site.ts`: prices from, durations, contract values, clauses, 318 projects, 26 employees, 5-year warranty.

Constraints: imagery is Unsplash stock, self-hosted, labelled illustrative. No invented figures. Romanian with comma-below diacritics. From 360 px up.

Memorable moment: the wall-section sample that peels from finished surface down to what the crew finds underneath.

Open decisions: none.

## Direction contract

THESIS: The site is the finish sample board a client signs before work starts. Every material is pinned with its code, format, and where it sits in the estimate. It refuses the category default of a full-bleed living-room photo, white headline, stat row, and service cards.

OWN-WORLD: The board is lime plaster (#e6e3dc) with anthracite porcelain (#2a2c2e) type and fields. Oak (#b5834a) and concrete grey (#9a9c98) come from the material photos. Printed paper tags carry a code (M-01), the name, and the spec on one line. Tall condensed type is set like the print on adhesive sacks. Ballpoint blue (#2433b8) appears only where the visitor enters or signs: CTAs, the active step, and check marks. There are no rounded cards; chips are cut with square edges and sit on a tight gutter.

STORY: The visitor sees the materials first and the price second. They understand that every layer is written down, from the substrate the crew finds to the finish they hand over. They believe the price won't move, then sign: they request the estimate.

FIRST VIEWPORT: A full-bleed grid of photo chips. The largest chip, left half and about 70% of the height, is plaster. The H1 sits on it at display scale with the lede, the blue "Cere ofertă" tag, and a WhatsApp tag. At right is a mosaic of oak, 60×120 tile, stone, and the wall-section chip, each with a paper tag. At the bottom, one price tag reads: from 420 €/mp · estimate in 3 days · 5-year warranty. The header is a thin label strip.

FORM: Material finish sample board, position 7 on the ordered list, seed key 7c3e0ceb. Signature interaction: the wall-section chip. Drag or keyboard peels its layers, and each layer names what is checked there. Motion grammar: chips settle into the board once on load, and layers slide on a single axis.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
