---
name: ATRIUM Construct
description: The finish sample board a client signs before work starts. Lime plaster ground, anthracite porcelain type, paper tags on square-cut photo chips, and ballpoint blue only where the visitor signs.
colors:
  plaster: "#e4e2dc"
  plaster-2: "#d9d6ce"
  paper: "#f4f3ef"
  white: "#ffffff"
  anthracite: "#222426"
  anthracite-2: "#2d3032"
  anthracite-3: "#3a3d40"
  graphite: "#505356"
  graphite-deep: "#45484b"
  placeholder: "#74777a"
  concrete: "#8f918d"
  rule: "#c4c1b9"
  rule-strong: "#a3a098"
  edge: "#7d7a73"
  rule-dark: "rgba(244, 243, 239, 0.16)"
  on-dark: "#f4f3ef"
  on-dark-2: "#b9bab6"
  oak: "#b5834a"
  oak-deep: "#74491d"
  ink: "#2433b8"
  ink-deep: "#1a258c"
  ink-wash: "#e3e5f6"
  ink-light: "#9aa6ff"
  alert: "#a8261c"
  whatsapp: "#1c8f4d"
  whatsapp-light: "#5fd08d"
typography:
  display:
    fontFamily: "'Sofia Sans Extra Condensed Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(3rem, 6.2vw, 5.6rem)"
    fontWeight: 820
    lineHeight: 0.96
    letterSpacing: "-0.012em"
  headline-page:
    fontFamily: "'Sofia Sans Extra Condensed Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.7rem, 6vw, 5rem)"
    fontWeight: 820
    lineHeight: 0.96
    letterSpacing: "-0.012em"
  headline:
    fontFamily: "'Sofia Sans Extra Condensed Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.3rem, 4.8vw, 3.9rem)"
    fontWeight: 820
    lineHeight: 0.96
    letterSpacing: "-0.012em"
  figure:
    fontFamily: "'Sofia Sans Extra Condensed Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.2rem, 3.6vw, 3.1rem)"
    fontWeight: 850
    lineHeight: 0.9
    fontFeature: "'tnum', 'lnum'"
  figure-sm:
    fontFamily: "'Sofia Sans Extra Condensed Variable', 'Arial Narrow', sans-serif"
    fontSize: "1.7rem"
    fontWeight: 850
    lineHeight: 1
    fontFeature: "'tnum', 'lnum'"
  title:
    fontFamily: "'Sofia Sans Condensed Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.3rem, 1.9vw, 1.55rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  data:
    fontFamily: "'Sofia Sans Condensed Variable', 'Arial Narrow', sans-serif"
    fontSize: "1.15rem"
    fontWeight: 750
    lineHeight: 1.2
    fontFeature: "'tnum', 'lnum'"
  lede:
    fontFamily: "'Sofia Sans Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.08rem, 1.35vw, 1.24rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "'Sofia Sans Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.58
    fontFeature: "'kern', 'liga'"
  body-sm:
    fontFamily: "'Sofia Sans Variable', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Sofia Sans Condensed Variable', 'Arial Narrow', sans-serif"
    fontSize: "1rem"
    fontWeight: 750
    lineHeight: 1
    letterSpacing: "0.035em"
  meta:
    fontFamily: "'Sofia Sans Condensed Variable', 'Arial Narrow', sans-serif"
    fontSize: "0.9rem"
    fontWeight: 650
    lineHeight: 1.3
  tag:
    fontFamily: "'Sofia Sans Condensed Variable', 'Arial Narrow', sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 560
    lineHeight: 1.25
rounded:
  none: "0px"
  control: "2px"
  eyelet: "50%"
spacing:
  seam: "6px"
  tag-inset: "10px"
  stack-sm: "10px"
  stack: "20px"
  gutter: "clamp(16px, 4vw, 48px)"
  section-tight: "clamp(56px, 6vw, 88px)"
  section: "clamp(72px, 9vw, 136px)"
  wrap: "1320px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.ink-deep}"
    textColor: "{colors.white}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.anthracite}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "50px"
  button-line-hover:
    backgroundColor: "{colors.anthracite}"
    textColor: "{colors.on-dark}"
  button-line-on-dark:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
  button-line-on-dark-hover:
    backgroundColor: "{colors.on-dark}"
    textColor: "{colors.anthracite}"
  button-sm:
    padding: "0 16px"
    height: "42px"
  chip:
    backgroundColor: "{colors.plaster-2}"
    rounded: "{rounded.none}"
  tag:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.anthracite}"
    typography: "{typography.tag}"
    rounded: "{rounded.none}"
    padding: "6px 11px 6px 24px"
  price-tag:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
  sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.anthracite}"
    rounded: "{rounded.none}"
    padding: "clamp(18px, 2.4vw, 30px)"
  voice:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.anthracite}"
    rounded: "{rounded.none}"
    padding: "clamp(22px, 3vw, 40px)"
  field-dark:
    backgroundColor: "{colors.anthracite}"
    textColor: "{colors.on-dark}"
  field-sunk:
    backgroundColor: "{colors.plaster-2}"
    textColor: "{colors.anthracite}"
  closing-card:
    backgroundColor: "{colors.anthracite-2}"
    textColor: "{colors.on-dark}"
    padding: "clamp(22px, 3vw, 36px)"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.anthracite}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
    height: "50px"
  pick:
    backgroundColor: "transparent"
    textColor: "{colors.anthracite}"
    rounded: "{rounded.control}"
    padding: "13px 14px"
  pick-selected:
    backgroundColor: "{colors.white}"
    textColor: "{colors.anthracite}"
  pick-box-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    size: "22px"
  steps-bar-todo:
    backgroundColor: "{colors.rule}"
    width: "38px"
    height: "8px"
  steps-bar-done:
    backgroundColor: "{colors.anthracite}"
    width: "38px"
    height: "8px"
  steps-bar-now:
    backgroundColor: "{colors.ink}"
    width: "38px"
    height: "8px"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.anthracite}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "42px"
  filter-chip-selected:
    backgroundColor: "{colors.white}"
    textColor: "{colors.anthracite}"
  nav-link:
    textColor: "{colors.graphite}"
    padding: "8px 11px"
  nav-link-active:
    textColor: "{colors.anthracite}"
  header:
    backgroundColor: "{colors.plaster}"
    height: "64px"
  header-stuck:
    backgroundColor: "{colors.paper}"
  action-bar:
    backgroundColor: "{colors.anthracite}"
    textColor: "{colors.on-dark}"
    typography: "{typography.label}"
    height: "60px"
  action-bar-main:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  wa-float:
    backgroundColor: "{colors.anthracite}"
    textColor: "{colors.on-dark}"
    typography: "{typography.label}"
    padding: "0 18px 0 14px"
    height: "50px"
  wall-handle:
    backgroundColor: "{colors.white}"
    textColor: "{colors.anthracite}"
    size: "44px"
  depth-thumb:
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.none}"
    size: "22px"
---

# Design System: ATRIUM Construct

## Overview

**Creative North Star: "The Signed Sample Board"**

The site is laid out like the finish sample board an interior architect puts in front of a client before work starts. The ground is lime plaster. Anthracite porcelain carries the type and the dark fields. Every photograph is a sample cut with square edges and set on the board with a narrow seam, and a printed paper tag hangs from its lower corner, code first (M-01 to M-07), then the name, then the spec. The materials bring their own colour: oak, stone, tile, brick, concrete. The interface adds almost none. Ballpoint blue is the one colour of the visitor's own hand. It marks the call to request an estimate, the step they are on, the boxes they tick, and the field they are writing in.

Type works like the print on an adhesive sack. One family, Sofia Sans, comes in three widths. Extra Condensed, heavy and in capitals, sets headings and every figure the firm stands behind: prices, durations, contract values, clause numbers. Condensed sets tags, labels, controls and data values. The regular width sets reading text only. Numbers come before adjectives on the page too: in every spec group the figure is the largest thing, with its label small beside or under it.

Density is medium to high and editorial rather than app-like. Asymmetric splits (7/5, 5/7, 4/8) hold a heading on one side and a ledger, board or form on the other. Lists of records (price list, schedule, FAQ, roster, timeline, contact lines) are ledgers ruled in anthracite, not stacks of cards. Motion is mechanical and single-axis: chips are placed onto the board once on load, the wall section's layers slide along one axis, and schedule bars draw in as they scroll into view.

**Key Characteristics:**
- Lime plaster ground (#e4e2dc) with anthracite (#222426) type and dark fields; paper (#f4f3ef) for everything pinned to the board.
- Square-cut photo chips on a 6px seam; every chip carries a paper tag with a concentric eyelet.
- Sofia Sans in three widths: Extra Condensed for display and figures, Condensed for tags and controls, regular for reading.
- Ballpoint blue (#2433b8) only where the visitor acts, chooses or signs.
- Ledgers opened by a 2px anthracite rule and divided by 1px rules.
- Flat surfaces. Depth comes from the seam and from field tone, never from card shadows.
- One signature interaction: the wall section, which peels from finish to the masonry the crew finds underneath.

**As built vs. the direction contract.** The build's values win. Plaster landed at #e4e2dc (contract #e6e3dc), anthracite at #222426 (contract #2a2c2e), and concrete at #8f918d (contract #9a9c98). The hero board sits inside the 1320px wrap with the page gutter, not full-bleed. The plaster chip spans 7 of 12 columns and the full four-row board height, not "left half, 70% of height". The header is a 64px bar with nav, phone and CTA, not a thin label strip. Ballpoint blue reaches further than the contract's three uses (CTAs, active step, check marks). It also marks form focus, the caret, text selection, selected choice tiles, the consent checkbox, the "sent" mark, the depth-slider thumb, the active wall-layer number and the action bar's main cell. All of these are places where the visitor's hand is, so the rule below records the principle rather than the list. The wall section also auto-peels once on first view, which the contract did not specify.

## Colors

A near-neutral mineral palette (warm plaster greys against a cool anthracite) that lets the material photographs supply the colour, with one saturated ink reserved for the visitor.

### Primary
- **Ballpoint Blue** (#2433b8): the ink of the visitor's pen. It fills primary buttons ("Cere ofertă", "Cere deviz", "Trimite cererea"), the action bar's main cell, the current step in the form's step bar, selected choice-tile boxes and the "sent" mark. It colours check marks in `Checks`, the caret, the text selection and the active wall-layer number, and it is the depth-slider thumb and the consent checkbox accent. White on it is 9.4:1.
- **Deep Ballpoint** (#1a258c): hover state of the blue button only.
- **Ink Wash** (#e3e5f6): the 3px ring around a focused text field. Never a fill.
- **Ink Light** (#9aa6ff): check marks inside the anthracite field, where full ink would disappear (6.9:1 on anthracite).

### Secondary
- **Oak** (#b5834a): taken from the M-01 parquet sample. The UI draws it only in the logo mark's top-right chip, the final (hand-over) bar of the schedule, and the water route in the wall section's installation scheme. It never carries text on plaster (2.6:1).
- **Oak Deep** (#74491d): the schedule's "when" line (for example "În 3 zile lucrătoare"). 6.0:1 on plaster, 5.3:1 on sunk plaster.

### Neutral
- **Lime Plaster** (#e4e2dc): the board and the default page ground; also `theme-color` and the favicon ground. The hero and page-head plaster chips are this colour, with the plaster photo multiplied over it at 45% opacity.
- **Sunk Plaster** (#d9d6ce): alternating section fields (`field-sunk`) and the placeholder fill of an unloaded chip.
- **Paper** (#f4f3ef): the stock of everything pinned to the board: tags, price tag, project sheets, testimonial cards, service bodies, forms, the project ledger, the stuck header. Also the text colour on dark fields (as **On Dark**).
- **White** (#ffffff): input fills, pressed choice tiles and filter chips, the wall-section cut line and handle, the chip-link arrow square, the outer part of the focus ring.
- **Anthracite** (#222426): all primary text (12:1 on plaster), dark section fields, the footer, the drawer, the action bar, 2px ledger rules, filled rating squares, line-button borders.
- **Anthracite 2** (#2d3032): the closing card raised on the dark field.
- **Anthracite 3** (#3a3d40): hairline seams inside the action bar, WhatsApp-tag hover, the tone-on-tone footer wordmark.
- **Graphite** (#505356): secondary text, ledes, labels, meta (6.0:1 on plaster, 7.0:1 on paper).
- **Graphite Deep** (#45484b): lede, note and breadcrumb text sitting on the photo-multiplied plaster chips, where plain graphite loses contrast.
- **Placeholder** (#74777a): input placeholder text (4.5:1 on white).
- **Concrete** (#8f918d): the tag eyelet ring and the scrollbar thumb. Decorative only.
- **Rule** (#c4c1b9): 1px dividers on light grounds, paper-panel borders, schedule ticks, empty step bars.
- **Rule Strong** (#a3a098): link underlines at rest, price-tag dividers, empty rating squares. Decorative only; it never outlines a control.
- **Edge** (#7d7a73): the resting border of every control you type into or pick (inputs, selects, textareas, filter buttons, choice tiles) and the unfilled part of the depth-slider track. It clears the 3:1 non-text minimum on each ground it sits on: 3.3:1 on plaster, 3.9:1 on paper, 4.3:1 on white.
- **Rule Dark** (rgba(244, 243, 239, 0.16)): 1px dividers on anthracite.
- **On Dark 2** (#b9bab6): secondary text on anthracite (8.0:1).

### Functional
- **Alert** (#a8261c): field error borders and error messages (7.1:1 on white).
- **WhatsApp** (#1c8f4d) / **WhatsApp Light** (#5fd08d, on dark fields): the WhatsApp glyph only, never a button fill. The glyph is green inside anthracite line buttons at rest and takes the button's text colour on hover.

### Named Rules
**The Ballpoint Rule.** Blue is the visitor's pen. It appears where the visitor acts, chooses or signs: primary calls to act, the current step, ticked boxes and check marks, the field being written in, and the handle of the wall section. Browsing never turns blue. Nav links, text links, the project filter, FAQ toggles, line buttons and headings stay anthracite, and no section, card or panel is ever filled with it.

**The Samples Bring the Colour Rule.** The interface is plaster, paper and anthracite. Warm and mineral colour comes from the photographs. Oak is drawn by the UI only in the mark, the schedule's hand-over bar and dates, and the installation scheme.

**The Paper Is Pinned Rule.** Paper is never a section ground. It is the stock of things pinned on the board, and it sits on plaster, sunk plaster or a photo with a seam or a 1px rule around it.

## Typography

**Display Font:** Sofia Sans Extra Condensed Variable (fallback Arial Narrow, sans-serif)
**Label/Control Font:** Sofia Sans Condensed Variable (fallback Arial Narrow, sans-serif)
**Body Font:** Sofia Sans Variable (fallback system-ui, -apple-system, Segoe UI, sans-serif)

All three are self-hosted through `@fontsource-variable` and imported in `src/main.tsx`. Body text sets `kern` and `liga`. Every figure uses `font-variant-numeric: tabular-nums` (with `lining-nums` via `.num`).

**Character:** One family in three widths, so the page reads as one voice at three pressures. Tall, tight capitals do the shouting the way print does on a sack of adhesive. The condensed width is a spec sheet's small print. The regular width is a person explaining.

### Hierarchy
- **Display** (Extra Condensed 820, `clamp(3rem, 6.2vw, 5.6rem)`, line-height 0.96, uppercase, max 14ch): the home hero H1 only.
- **Headline Page** (Extra Condensed 820, `clamp(2.7rem, 6vw, 5rem)`, 0.96, uppercase, max 16ch): H1 on inner page heads.
- **Headline** (Extra Condensed 820, `clamp(2.3rem, 4.8vw, 3.9rem)`, 0.96, uppercase): section H2s. Local reductions appear in service bodies (`clamp(2rem, 3.6vw, 3rem)`), found cards and the sent state.
- **Figure** (Extra Condensed 850, `clamp(2.2rem, 3.6vw, 3.1rem)`, 0.9, uppercase, tabular): the figure each contract clause is remembered by ("3 zile", "Fix", "26", "5 ani"). The same face at 850 sets schedule numbers (2rem, 2.6rem from 900px), timeline years (2.1rem, 2.8rem from 760px), the closing phone number (`clamp(2.2rem, 4vw, 3rem)`) and the review score (`clamp(4rem, 9vw, 6rem)`).
- **Figure Small** (Extra Condensed 850, 1.7rem, 1): the lead value in a spec group, such as a sheet's contract value or a service's starting price. Price-list prices run `clamp(1.6rem, 2.2vw, 2rem)`, the hero price tag 1.55rem, the project ledger 1.9rem.
- **Title** (Condensed 700, `clamp(1.3rem, 1.9vw, 1.55rem)`, 1.12, -0.01em): H3 and H4 (H4 at 1.2rem), price-list service names, schedule stage names, FAQ questions (1.18rem).
- **Data** (Condensed 750, 1.15rem, 1.2, tabular): values in ledgers and spec lists (surface, duration, year, hours), from 1.1rem to 1.25rem by context.
- **Lede** (Sofia Sans 400, `clamp(1.08rem, 1.35vw, 1.24rem)`, 1.5, graphite): the paragraph under a section heading.
- **Body** (Sofia Sans 400, 1.0625rem, 1.58, max 68ch, `text-wrap: pretty`): reading text.
- **Body Small** (Sofia Sans 400, 0.9375rem, 1.5): notes, service summaries, schedule text, captions.
- **Label** (Condensed 750, 1rem, 1, +0.035em, uppercase): buttons, the burger and close controls (0.9375rem, +0.04em), the action bar and WhatsApp tag (0.95rem, +0.03em).
- **Meta** (Condensed 650, 0.9rem, graphite): place and year on sheets, breadcrumbs, contact-line labels, the depth label. Spec labels (`dt`) use Condensed 600 at 0.8 to 0.85rem.
- **Tag** (Condensed 560, 0.8125rem, 1.25): tag text. The material code inside it is 800 with +0.04em tracking; the spec is graphite.

Column heads appear once, on the price list: Condensed 750, 0.8rem, +0.08em, uppercase, graphite. Testimonial quotes lead in Condensed 560 (`clamp(1.35rem, 2.3vw, 1.85rem)` for the lead voice, `clamp(1.25rem, 2vw, 1.6rem)` for the pinned one). The footer wordmark "ATRIUM" is Extra Condensed 880 at `clamp(4rem, 17vw, 15.5rem)`, line-height 0.78, in anthracite 3 on anthracite, cropped by overflow. It is a one-off, not a scale step.

Heading leading is 0.96, not tighter, so the comma under Ș and Ț clears the capital on the next line in two-line headings (for example "SERVICII ȘI PREȚURI / DE PORNIRE"). Figures are single-line and hold 0.9.

### Named Rules
**The Sack Print Rule.** Headings and figures are Extra Condensed, uppercase, weight 820 to 880, set tight: 0.96 leading for headings, so Romanian diacritics clear the line below, and 0.9 for single-line figures. That face never sets a sentence longer than a heading, and reading text never uses a condensed width.

**The Figure First Rule.** In every spec group, whether a sheet, a ledger, a service's facts, a clause or a price, the number is set in Extra Condensed 850 with tabular lining numerals and is the largest element. Its label sits under or before it in small Condensed graphite.

## Layout

The page is a centred 1320px wrap with a fluid gutter (`clamp(16px, 4vw, 48px)`). Sections breathe at `clamp(72px, 9vw, 136px)` (tight sections `clamp(56px, 6vw, 88px)`) and alternate grounds: plaster, sunk plaster, and the anthracite field for contract clauses, the closing call and the footer. Boards (the hero, page heads, project sheets, testimonials, service rows, found cards) are CSS grids whose gap is the 6px seam, so the ground shows between samples. Hero and page-head boards start one seam below the header.

Recurring splits: 7/5 (section head rows at 900px and up, the featured sheets board, home testimonials, closing), 5/7 (clauses, FAQ split, contact two-column, service photo and body), 4/8 (wall section, schedule) and 8/4 (page-head board). Reading measure is capped at 68ch, ledes at about 50ch.

**Hero board.** At 1024px and up: 12 columns by four rows (each at least 130px) plus an auto row for the price tag, height `max(640px, min(860px, 100svh − header − 12px))`. The plaster chip takes columns 1 to 7 and rows 1 to 4. Oak takes 8 to 10 and rows 1 to 2, stone 11 to 12 and rows 1 to 3, tile 8 to 10 and rows 3 to 4, and brick (the link to the wall section) 11 to 12 and row 4. The price tag spans the bottom. Below 1024px: four columns, the four material chips form a row of squares above the plaster chip (`order: -1`), and the plaster chip and price tag go full width. Between 640 and 1023px the plaster chip holds at least `min(620px, 100svh − header − bar − 24px)`.

**Breakpoints as built:**
- **480px:** "Scrie pe" returns in front of "WhatsApp" in the hero button.
- **520px and below:** service facts stack to one column.
- **560px:** form choice tiles go to two columns.
- **640px:** the hero note appears, hero buttons stop stretching, the price tag goes to one line with vertical dividers, and form fields go to two columns.
- **760px:** the roster and timeline go to columns, and the footer goes to two columns.
- **768px:** the mobile action bar is replaced by the floating WhatsApp tag, and the header CTA appears.
- **900px:** section head rows split 7/5, the price list becomes a four-column table with column heads, sheets and page heads split, the service row goes 5/7, found cards pair up, and the ledger goes to five columns.
- **1024px:** the hero becomes the 12-column board, and the wall section, clauses, schedule (with a sticky copy column), FAQ split, closing and contact go two-column.
- **1100px:** the footer goes to four columns.
- **1180px:** the full nav and phone number replace the "Meniu" burger.

**Container queries on chips:** at 340px of chip width or less, the tag drops to 0.76rem and moves its spec to a second line. At 150px or less, it shrinks to the code alone with a smaller eyelet. The plaster chips keep their spec inline.

**Phone floor.** The layout holds from 360px. Under 768px the body reserves the action bar's 60px plus the safe-area inset at the bottom, and `scroll-padding-top` clears the sticky header (64px, 58px on phones) plus 16px.

### Named Rules
**The Seam Rule.** Samples on a board are separated only by the 6px seam of the ground beneath them. There is no gutter, border or shadow between chips.

**The Ledger Rule.** A list of records opens on a 2px anthracite rule and divides rows with 1px rule lines. There are no boxes and no zebra striping. This covers the price list, schedule, FAQ, company card, roster, timeline and contact lines. On dark fields the rules become Rule Dark.

## Elevation & Depth

The system is flat. Depth comes from three things: the seam, which lets the ground read as the board behind the samples; tone, which steps from anthracite to sunk plaster, plaster and paper, with the anthracite-2 card raised on the dark field; and the plaster photo multiplied into the plaster chips. Chips, sheets, cards, forms and ledgers carry no shadow. The few shadows that exist belong to objects that physically sit on top of something.

### Shadow Vocabulary
- **Tag lift** (`box-shadow: 0 1px 2px rgba(34, 36, 38, 0.18)`): the paper tag hanging on a photo. Inline tags inside a ledger drop it for a 1px rule border.
- **Handle** (`box-shadow: 0 6px 18px -6px rgba(0, 0, 0, 0.45)`): the white 44px handle on the wall section's cut line.
- **Floating tag** (`box-shadow: 0 10px 28px -12px rgba(0, 0, 0, 0.55)`): the desktop "Scrie pe WhatsApp" tag fixed to the lower right corner.
- **Cut edge** (`linear-gradient(90deg, rgba(0,0,0,0.32), transparent)`, 10px wide): the shadow each peeled wall layer throws on the one beneath, drawn at its cut.

### Named Rules
**The Pinned, Not Floating Rule.** Nothing lifts on hover. Hover changes colour, fills a line button, or zooms the photo inside its fixed chip (scale 1.035 to 1.05 over 0.9s). A shadow means an object is physically on top of something: a tag, a handle, or the floating WhatsApp tag.

## Shapes

The board is cut square. Photos, chips, tags, sheets, cards, the price tag, forms, ledgers, step bars, rating squares, the wall handle, the slider thumb, the chip-link arrow square and the drawer's active marker all have 0 radius. Interactive controls (buttons, the burger and close controls, inputs, selects, textareas, choice tiles, filter chips) take a barely softened 2px. The only circle in the system is the tag's eyelet: a 7px ring with a 1.5px concrete border (6px on the smallest chips).

Line icons are drawn on a 24px grid with a 1.8 stroke, square caps and mitred joins, to match the cut edges. The WhatsApp glyph is the one filled icon. The logo mark repeats the board in miniature: a tall anthracite chip, an oak square and an outlined square on a 2-unit seam.

### Named Rules
**The Cut Edge Rule.** Surfaces are square. The 2px radius belongs only to things you press or type into, and the eyelet is the only circle.

## Components

### Buttons
Heavy condensed capitals on a hard rectangle, like a stamped label.
- **Shape:** near-square (2px radius), 1.5px border, minimum height 50px, 0 22px padding, 10px gap to an icon.
- **Primary (ballpoint):** ink fill, white Label type, trailing arrow icon. Used for every "request" action: "Cere ofertă", "Cere deviz", the form's "Continuă" and "Trimite cererea".
- **Line:** transparent with an anthracite border and text. Used for WhatsApp (green glyph), phone, and the form's "Înapoi". Hover fills anthracite with On Dark text, and the WhatsApp glyph takes the text colour. On dark fields the border and text are On Dark and hover fills On Dark.
- **States:** hover changes colour over 0.2s; active nudges down 1px; disabled is 50% opacity with no pointer events.
- **Sizes:** small is 42px with 0 16px padding at 0.9375rem (header CTA). Block goes full width (drawer foot). In the hero on phones, both buttons stretch to share the row.
- **Text links:** Condensed 700, anthracite, underlined in Rule Strong at a 0.22em offset and 1.5px thick; the underline turns to currentColor on hover and a trailing arrow slides 3px. Links are never blue.

### Chips (photo samples)
- **Style:** a square-cut cell in a board grid, sunk plaster while loading, with the photo `object-fit: cover` behind a paper tag. Chips always stretch to fill their grid cell.
- **Link chips:** the brick chip in the hero is a whole-chip link to the wall section, marked by a 30px white square with an arrow rotated to point down in the top right corner. On hover the photo zooms to 1.05 and the arrow nudges 3px. Focus is an inset double ring.
- **Load:** hero chips are placed with a top-down clip reveal (0.9s) while their photo settles from scale 1.08 (1.4s), staggered 90ms apart after a 120ms delay.

### Paper Tags (with eyelet)
The label pinned to every sample.
- **Style:** paper, anthracite Tag type, 10px from the chip's lower left corner (optionally top or right), padding 6px 11px 6px 24px so the text clears the eyelet ring at left. Order is code first (800, +0.04em), then name, then spec in graphite, all on one line where the chip allows.
- **Variants:** code only (price-list thumbnails); name plus "foto ilustrativă" (every photo that is not a material sample); inline (static, 1px rule border, no lift).
- **Materials:** M-01 oak parquet, M-02 rectified tile, M-03 composite stone, M-04 skim and paint (the plaster chip), M-05 silicone render, M-06 reinforced concrete, M-07 the masonry found (brick). They live in `src/data/media.ts` with photo provenance.

**The Pinned Tag Rule.** No photograph appears on the board without its paper tag. A photo that is not a material sample carries "foto ilustrativă" as its spec, which keeps the stock imagery honest.

### Price Tag
The one-line estimate slip under the hero board.
- **Style:** full-width paper strip, 1px rule border, 12px 18px padding, Condensed 600 at 0.98rem in graphite. It holds three facts ("Renovare completă de apartament: de la 420 €/mp", "deviz pe poziții în 3 zile lucrătoare", "garanție 5 ani la manoperă") separated by 1px Rule Strong verticals. The figure is Extra Condensed 850 at 1.55rem in anthracite.
- **Phones (below 640px):** the facts stack as lines without dividers, at 10px 14px padding and 0.9rem.

### Price List
Services read as a supplier's price list.
- **Structure:** an ordered ledger (2px anthracite top rule, 1px rule rows). Each row has a square thumbnail chip with a code-only tag (88px, 132px from 900px), the service name as a Title link, a Body Small summary, and a right-aligned price block: "de la" in Meta, the figure in Extra Condensed 850, then unit and duration in Condensed 600 graphite.
- **At 900px and up:** four columns (132px, name, summary, price), with the column heads "Mostră / Lucrare / Preț de pornire, 2026" above the rule.

### Project Sheets
A project as a site sheet.
- **Style:** a paper panel of photo chip plus body (`clamp(18px, 2.4vw, 30px)` padding, 12px gap). It holds the title, place and year in Meta, the intro, then a spec row under a 1px rule: contract value (Figure Small), surface and duration (Data), each with its label beneath. It ends with a "Vezi lucrarea în detaliu" link.
- **Featured board (900px and up):** 7/5. The lead sheet spans two rows with a 16:11 photo; the others sit photo beside body, with the intro and surface hidden. A pinned four-star testimonial spans the bottom row.
- **Grid:** two columns at 900px. Hover zooms the photo to 1.035.

### Schedule
The process as the execution schedule attached to the contract.
- **Structure:** a ledger. Each row has the stage number (Extra Condensed 850), the stage title, the "when" line in oak deep, the text in Body Small, and a 14px track with hairline ticks every 20%. On the track an anthracite bar marks where the stage falls in the order of work (sequence, not calendar length). The last bar (hand-over) is oak.
- **At 900px:** four columns (number, head, text, track). Inside the home process split (1024px and up), the track runs under the head and text.
- **Motion:** bars scale in from the left on a scroll-driven `view()` timeline (entry 10% to cover 35%), disabled under reduced motion.

### Wall Section (signature)
A wall sample cut in steps, the way a section drawing shows it: finish on the right, the masonry the crew finds on the left.
- **Stage:** an anthracite box `clamp(360px, 52vw, 600px)` high with an ew-resize cursor and `touch-action: pan-y`. Four photo layers are stacked and each is clipped from the left at its own edge. One depth value from 0 to 3 drives every edge in 25% steps: finish (M-04 plaster), render (concrete), services (a drawn installation scheme in paper and oak lines with Condensed labels, over a concrete photo), and masonry (brick). Each cut throws the 10px cut-edge shadow. A 2px white cut line carries a 44px white square handle with double chevrons.
- **Controls:** dragging the wall, the "Adâncimea desfacerii" range slider (0 to 300, a 4px track filled anthracite over Edge, a 22px square ink thumb with a 3px plaster halo), and a ruled list of layer buttons (`aria-pressed`). The active layer's number turns ink and its note opens. All three move the same cut. The wall itself is `aria-hidden`; the keyboard uses the slider and the buttons.
- **Motion:** the first time the wall is 45% in view it peels itself from 0 to 3 over 2200ms (ease-in-out cubic), and any input takes over. Layer clicks animate 0.7s on the peel easing. Under reduced motion the wall starts fully peeled and never auto-runs.
- **Layer labels:** each layer carries a paper label ("4 · Zidărie", Condensed 750 at 0.78rem), pinned 10px inside that layer's cut edge (`left: calc(var(--x) + 10px)`), so each label travels with its cut. A label hides when its layer shows less than 13% of the wall; at full peel all four show.
- **Caption:** "Mostră în secțiune, cu fotografii ilustrative de materiale."

### Inputs / Fields
- **Style:** white fill, 1.5px Edge border, 2px radius, minimum height 50px, 12px 14px padding, body type at 1rem. Labels are Condensed 700 at 0.98rem above the field with a 7px gap. Selects use a drawn anthracite chevron; textareas start at 120px and resize vertically.
- **Hover:** border to anthracite.
- **Focus:** no outline. The border turns ink and a 3px Ink Wash ring surrounds the field.
- **Error:** border in alert, with a message below in alert at 0.9rem, weight 600 (Romanian copy, `aria-invalid`). Hints are graphite at 0.9rem.
- **Choice tiles:** a 22px square box plus a Condensed 750 label and a graphite sub-line, 1.5px Edge border, 2px radius. When pressed, the border turns anthracite, the fill white, and the box ink with a white check.
- **Consent:** a native 22px checkbox with `accent-color` ink.
- **Form shell:** a paper panel with a 1px rule border, and a head row showing "Pasul n din 3" beside the step bar: three 38 × 8px segments, rule when to do, anthracite when done, ink for the current step. Body and foot are separated by rules, with Back as a line button and Continue as primary. The sent state shows a 52px ink square with a white check over a summary ledger.

### Checks and Rating
- **Checks:** a 20px square box with a 1.5px anthracite border and a check mark in ink (Ink Light and an On Dark 2 border inside the dark field). This is the firm's sign-off mark on what is included.
- **Rating:** five 10px squares with 3px gaps. Filled squares are anthracite (On Dark on dark fields); empty ones are a 1.5px Rule Strong inset ring. Next to them, "4 din 5" in Condensed 700. No star glyphs.

### Navigation
- **Header:** sticky, 64px (58px on phones), plaster at rest. After 8px of scroll it becomes paper with a 1px rule bottom border. Brand on the left: the 30px three-chip mark plus the wordmark "ATRIUM" (Extra Condensed 860, 1.62rem) over "CONSTRUCT" (Condensed 650, 0.69rem, +0.3em, uppercase, graphite).
- **Links (1180px and up):** Condensed 650 at 0.97rem in graphite. Hover and active turn anthracite, and a 2px anthracite underline scales in from the left over 0.35s. The phone number (Condensed 750, tabular) and a small primary CTA sit at the right.
- **Below 1180px:** a "Meniu" line control opens a full-screen anthracite drawer that clips in from the top over 0.35s. Its rows are Extra Condensed 800 at 2.2rem, uppercase, divided by Rule Dark, each with a Condensed note at the right. The active row gets a 10px white square. The foot holds block buttons for the primary CTA and the phone. Focus moves into the drawer and returns to the burger; Escape closes it.
- **Mobile action bar (below 768px):** fixed to the bottom, 60px, with three cells in a 1fr 1fr 1.3fr split on 1px anthracite-3 seams: "Sună", "WhatsApp" (green glyph), and "Cere ofertă" in ink. Label type is uppercase.
- **Desktop WhatsApp tag (768px and up):** a fixed 50px anthracite tag 20px from the bottom right corner, "Scrie pe WhatsApp" with a green glyph and the Floating tag shadow. On hover it turns anthracite-3.
- **Footer:** an anthracite field with four columns (two from 760px, four from 1100px). Column heads are Condensed 700 at 0.85rem, +0.08em, in On Dark 2. Links go white and underline on hover. The cropped tone-on-tone "ATRIUM" wordmark sits above a bottom rule, followed by the legal line and the required note that the firm is fictional and the photos are illustrative.

### Contract Clauses, Ledgers, FAQ
- **Clauses (dark field):** a spec list on Rule Dark lines. Each term is a Figure ("3 zile", "Fix", "26", "5 ani") beside a Condensed 750 title and On Dark 2 text.
- **Project ledger:** a paper panel with a 1px rule border, two columns (five from 900px), cells divided by rules. Each label sits above its value, and the contract value is Extra Condensed 850 at 1.9rem.
- **FAQ:** a ledger of question buttons, each with a 28px square mark bordered in anthracite. When open, the mark fills anthracite and the plus rotates 45°. The answer opens by animating `grid-template-rows` from 0fr to 1fr over 0.4s.

### Focus
Everything focusable except text fields gets a double ring: a 3px white outline at a 2px offset plus a 5px anthracite box-shadow halo. It reads on plaster, on photos and on the anthracite field. Whole-chip links use the inset version (3px white inside 5px anthracite). The range thumb carries the ring on the thumb itself. Text fields use the ink border and Ink Wash ring instead. A skip link slides in from the top on focus.

### Motion
Two easings: **ease-out** (`cubic-bezier(0.16, 1, 0.3, 1)`) for everything that arrives or responds, and **ease-peel** (`cubic-bezier(0.65, 0, 0.35, 1)`) for wall layers moving between set depths. Colour changes run 0.2s and UI transforms 0.3 to 0.4s. The peel jump takes 0.7s, chip placement and photo hover zoom 0.9s, the photo settle 1.4s, and the wall's one authored auto-peel 2.2s. Under `prefers-reduced-motion: reduce`, every animation and transition collapses to 0.01ms and smooth scrolling is off.

## Do's and Don'ts

### Do:
- **Do** set every call to act ("Cere ofertă", "Cere deviz", "Trimite cererea", the action bar's main cell) as a ballpoint-blue button (#2433b8, #1a258c on hover), and keep WhatsApp and phone as anthracite line buttons with the green glyph.
- **Do** separate samples on a board with the 6px seam and let the ground show through.
- **Do** pin a paper tag to every photo chip: code first (M-01 to M-07) for material samples, "foto ilustrativă" as the spec for every other photo.
- **Do** set every figure in Extra Condensed 850 with tabular lining numerals as the largest element of its group, with the label in small Condensed graphite.
- **Do** open every list of records on a 2px anthracite rule and divide rows with 1px rule lines.
- **Do** alternate plaster, sunk plaster and anthracite fields between sections, and keep paper for things pinned to the board and for the stuck header.
- **Do** give every focusable element the double ring (3px white outline, 5px anthracite halo), and give text fields the ink border with the Ink Wash ring.
- **Do** keep motion on one axis and once only: chips placed on load, layers peeled sideways, schedule bars drawn left to right. Collapse it all under reduced motion, where the wall starts fully peeled.

### Don't:
- **Don't** use ballpoint blue for text links, headings, section or card fills, decorative icons, or browsing controls (nav, project filter, FAQ toggles, line buttons).
- **Don't** round chips, tags, sheets, cards, forms or ledgers. The 2px radius belongs only to buttons, inputs, choice tiles and filter chips, and the eyelet is the only circle.
- **Don't** lift chips, sheets or cards with shadows or hover elevation. Depth comes from the seam and from field tone.
- **Don't** set reading text in a condensed width, or headings and figures in the regular width.
- **Don't** add interface colours outside the palette. Oak and concrete come from the photographs, and the UI draws oak only in the mark, the schedule's hand-over bar and dates, and the installation scheme.
- **Don't** use star glyphs for ratings. A rating is five 10px squares.
- **Don't** drop the footer line that says the firm is fictional and the photographs are illustrative.
