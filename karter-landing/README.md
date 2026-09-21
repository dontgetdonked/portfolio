# ATRIUM Construct — website de prezentare

Site de prezentare pentru o firmă de renovări și construcții din Cluj-Napoca. Firma este
fictivă; proiectul este o piesă de portofoliu, gândită ca livrabil pentru un client care
cere „un site de firmă".

## Ce conține

| Pagină | Rută | Conținut |
| --- | --- | --- |
| Acasă | `/` | Hero cu slider înainte/după, clauzele din contract, servicii, lucrări recente, proces, testimoniale, întrebări frecvente |
| Servicii | `/servicii` | Șase categorii de lucrări, fiecare cu ce include, preț de pornire și durată |
| Proiecte | `/proiecte` | Portofoliu filtrabil pe categorii |
| Detaliu proiect | `/proiecte/:slug` | Slider înainte/după, ce s-a găsit pe șantier, ce s-a executat, testimonialul aferent |
| Despre noi | `/despre` | Poziționare, reguli de lucru, echipa de coordonare, istoric |
| Testimoniale | `/testimoniale` | Toate recenziile, cu legătură către lucrarea din portofoliu |
| Contact | `/contact` | Date de contact, program, plan schematic, formular de mesaj, întrebări frecvente |
| Cere ofertă | `/oferta` | Formular de solicitare ofertă în trei pași |

Funcționalități transversale: buton flotant de WhatsApp, meniu de tip drawer pe mobil,
validare de formular în limba română, link-uri WhatsApp precompletate cu datele din
formular, layout responsive de la 360 px în sus.

## Stack

- React 18 + TypeScript, rutare cu `react-router-dom` (HashRouter, pentru hosting static)
- Vite 8 pentru build
- CSS simplu, cu tokeni de design în `src/styles/global.css`, fără framework de UI
- Ilustrațiile sunt SVG desenate în cod (`src/components/Scene.tsx`), deci nu există
  dependențe de imagini externe

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
  components/          Header, Footer, Layout, BeforeAfter, QuoteForm, ContactForm, Faq, Scene, ui
  pages/               câte un fișier pentru fiecare rută
  styles/global.css    tokeni de design și straturile de bază
```

Textele, prețurile și lucrările se editează dintr-un singur loc: `src/data/site.ts`.

## Note de implementare

- Formularele nu trimit date către un server: cererea se salvează în `localStorage` și se
  poate transmite mai departe pe WhatsApp, cu mesaj precompletat. Pentru producție,
  înlocuiește `submit` din `QuoteForm.tsx` și `ContactForm.tsx` cu un apel către backend.
- Sliderul înainte/după funcționează cu mouse, cu atingere și de la tastatură (input de tip
  range suprapus, cu etichetă).
- `prefers-reduced-motion` oprește secvența de încărcare din hero.
