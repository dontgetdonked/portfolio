# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences read the same site:

- **Homeowners in Cluj-Napoca and within 60 km** (Florești, Baciu, Apahida, Turda, Dej, Gherla) who plan a renovation, a new house, a bathroom or kitchen, a facade, or a commercial fit-out. They fear the Romanian renovation classic: a vague estimate, day labourers who vanish, a job left at 90%, and a bill that grows. They compare two or three contractors, usually on a phone, and want to know price range, duration, and who is responsible before they call.
- **Prospective web-design clients of the site's author.** ATRIUM Construct is a fictional company; the site is a portfolio piece shown as the deliverable for a client who asks for "a company website". They judge craft, identity, and whether it would convert real visitors.

The site must work as a real contractor site first; the craft is what impresses the second audience.

## Product Purpose

Presentation and lead-generation site for ATRIUM Construct, a renovation and civil-construction contractor in Cluj-Napoca. Success: a homeowner understands what the firm does, what it roughly costs, how the work runs, and requests a quote (three-step form), calls, or writes on WhatsApp.

## Positioning

The firm's mechanism is contractual accountability, stated in numbers: an itemised estimate (deviz pe poziții) in 3 working days, a fixed price written into the contract, delay penalties valid in both directions, 26 employed tradespeople instead of day labourers, the same crew from demolition to hand-over, a Friday photo report, and a written 5-year labour warranty. Every project is shown with its real surface, duration, and contract value.

## Operating Context

Visitors arrive from search or a recommendation, mostly on mobile, often while standing in the space they want renovated. The artefacts of the trade are the site survey (releveu), the itemised estimate, the contract with its schedule and payment stages, the weekly site report, the reception checklist, and the installation schemes handed over at the end.

## Capabilities and Constraints

- React 18 + TypeScript + Vite, `react-router-dom` with HashRouter for static hosting (`base: './'`).
- Routes: `/`, `/servicii`, `/proiecte`, `/proiecte/:slug`, `/despre`, `/testimoniale`, `/contact`, `/oferta`.
- All copy, prices, projects, testimonials, FAQ, and form options live in `src/data/site.ts`; pages render from it.
- Quote form: three steps (work type and surface, budget and timeframe, contact), Romanian validation, saved to `localStorage`, forwardable to WhatsApp with a prefilled message. Contact form: same pattern. No backend.
- Floating WhatsApp action, mobile drawer navigation, before/after comparison usable by pointer, touch, and keyboard.
- Must be responsive from 360 px and respect `prefers-reduced-motion`.
- Language: Romanian only, with correct diacritics (ă â î ș ț).

## Brand Commitments

- Name: ATRIUM Construct (ATRIUM Construct SRL). The footer states the company is fictional and built as a portfolio project; keep that line.
- Voice: plain, concrete, first-person plural, no marketing superlatives. Sentences carry numbers, materials, and procedures ("am înlocuit coloana de fontă", "gletuire de nivel Q3"). Four-star reviews are published with their reason.
- No existing logo or palette is binding; the previous visual system is being replaced.

## Evidence on Hand

- Six projects with place, year, surface, duration, budget, what was found on site, and what was executed (`src/data/site.ts`). All fictional, as is the company.
- Six testimonials, process steps, contract clauses, team of four, company history 2011–2026, stats (14 years, 318 projects, 26 employees, 5-year warranty), FAQ.
- No real photography exists. Imagery is licensed stock (Unsplash) used illustratively; it must not be presented as photos of the listed projects without a visible note that images are illustrative.
- Do not invent new clients, certifications, awards, prices, or figures beyond what `site.ts` already states.

## Product Principles

1. Numbers before adjectives: every claim the site makes is backed by a figure, a document, or a named procedure.
2. One contract, one crew, one responsible person: the structure of the site should make accountability visible.
3. The phone visitor is the primary visitor: calling, WhatsApp, and the quote form are always within reach.
4. Honest about the hard parts: hidden problems, delays, and extra costs are explained, not hidden.

## Accessibility & Inclusion

WCAG 2.2 AA. Keyboard-operable before/after comparison, drawer with focus management, visible focus, form errors announced in Romanian, reduced-motion support.
