# ATRIUM Construct — website de prezentare

Site de prezentare pentru o firmă de renovări și construcții din Cluj-Napoca. Firma este
fictivă; proiectul este o piesă de portofoliu, gândită ca livrabil pentru un client care
cere „un site de firmă".

## Ce conține

| Pagină | Rută | Conținut |
| --- | --- | --- |
| Acasă | `/` | Placa de mostre din hero, secțiunea de perete (straturile de sub finisaj), clauzele din contract, lista de prețuri, lucrări recente, graficul de execuție, testimoniale, întrebări frecvente |
| Servicii | `/servicii` | Șase categorii de lucrări, fiecare cu ce include, preț de pornire și durată |
| Proiecte | `/proiecte` | Portofoliu filtrabil pe categorii |
| Detaliu proiect | `/proiecte/:slug` | Fișa lucrării (valoare, suprafață, durată), ce s-a găsit pe șantier, ce s-a executat, testimonialul aferent |
| Despre noi | `/despre` | Poziționare, reguli de lucru, echipa de coordonare, istoric |
| Testimoniale | `/testimoniale` | Toate recenziile, cu legătură către lucrarea din portofoliu |
| Contact | `/contact` | Date de contact, program, link spre hartă, formular de mesaj, întrebări frecvente |
| Cere ofertă | `/oferta` | Formular de solicitare ofertă în trei pași |

Funcționalități transversale: bară de contact rapid pe mobil (Sună, WhatsApp, Cere ofertă), buton de WhatsApp pe desktop, meniu de tip drawer pe mobil,
validare de formular în limba română, link-uri WhatsApp precompletate cu datele din
formular, layout responsive de la 360 px în sus.

## Stack

- React 18 + TypeScript, rutare cu `react-router-dom` (HashRouter, pentru hosting static)
- Vite 8 pentru build
- CSS simplu, cu tokeni de design în `src/styles/global.css`, fără framework de UI
- Fonturi Sofia Sans (normal, Condensed, Extra Condensed), găzduite local prin `@fontsource-variable`
- Fotografii Unsplash, redimensionate în WebP în `src/assets/photos/` și descrise în
  `src/data/media.ts`. Sunt ilustrative: niciuna nu arată o lucrare ATRIUM, iar paginile o spun

## Comenzi

```bash
npm install
npm run dev        # server de dezvoltare
npm run build      # verificare de tipuri + build de producție în dist/
npm run preview    # servește build-ul de producție
npm run typecheck  # doar verificarea de tipuri
```

## Structura proiectului

```
src/
  App.tsx              rutele
  data/site.ts         tot conținutul editabil (firmă, servicii, proiecte, testimoniale, FAQ)
  data/media.ts        fotografiile, mostrele de material (cod, nume, specificație) și sursele lor
  components/          Header, Footer, Layout, WallSection, PriceList, ProjectSheet, Schedule,
                       QuoteForm, ContactForm, Faq, WhatsFab, ui
  pages/               câte un fișier pentru fiecare rută
  styles/global.css    tokeni de design și straturile de bază
```

Textele, prețurile și lucrările se editează dintr-un singur loc: `src/data/site.ts`.

## Note de implementare

- Formularele nu trimit date către un server: cererea se salvează în `localStorage` și se
  poate transmite mai departe pe WhatsApp, cu mesaj precompletat. Pentru producție,
  înlocuiește `submit` din `QuoteForm.tsx` și `ContactForm.tsx` cu un apel către backend.
- Secțiunea de perete (`WallSection.tsx`) se desface prin tragere, cu atingere, din lista de
  straturi sau de la tastatură (input de tip range, cu etichetă și `aria-valuetext`).
- `prefers-reduced-motion` oprește așezarea mostrelor din hero și desfacerea automată a
  peretelui, care apare direct cu toate straturile vizibile.
- Pentru poze reale de șantier, înlocuiește fișierele din `src/assets/photos/` și sursele din
  `src/data/media.ts`; eticheta „foto ilustrativă” se scoate din `ProjectSheet.tsx`.
