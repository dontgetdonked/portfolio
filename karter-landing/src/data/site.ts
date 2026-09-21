/* Content for ATRIUM Construct — a fictional renovation contractor in Cluj-Napoca.
   Everything the pages render lives here, so copy can be edited in one place. */

export const company = {
  name: 'ATRIUM Construct',
  tagline: 'Renovări la cheie și construcții civile',
  city: 'Cluj-Napoca',
  county: 'Cluj',
  address: 'Str. Bobâlnei 42, Cluj-Napoca',
  phone: '+40 721 448 209',
  phoneHref: 'tel:+40721448209',
  whatsapp: '40721448209',
  email: 'oferte@atriumconstruct.ro',
  cui: 'RO 38 114 620',
  reg: 'J12/1184/2011',
  hours: [
    { day: 'Luni – Vineri', time: '08:00 – 18:00' },
    { day: 'Sâmbătă', time: '09:00 – 14:00' },
    { day: 'Duminică', time: 'Închis' },
  ],
  coverage: ['Cluj-Napoca', 'Florești', 'Baciu', 'Apahida', 'Turda', 'Dej'],
} as const

export function whatsappLink(message: string) {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`
}

export type SceneVariant = 'living' | 'bath' | 'kitchen' | 'villa' | 'facade' | 'office'

export type Service = {
  slug: string
  title: string
  summary: string
  price: string
  duration: string
  includes: string[]
  scene: SceneVariant
}

export const services: Service[] = [
  {
    slug: 'renovare-apartament',
    title: 'Renovare completă de apartament',
    summary:
      'Desfacem tot ce nu mai ține, refacem instalațiile și predăm locuința gata de mutat, cu mobilierul montat și curățenia făcută.',
    price: 'de la 420 €/mp',
    duration: '7 – 12 săptămâni',
    includes: [
      'Demolări, evacuare moloz și protejarea căilor de acces',
      'Instalații electrice și sanitare refăcute integral, cu schemă la predare',
      'Gletuire, zugrăvire, parchet, uși interioare, plinte',
      'Montaj mobilier, corpuri de iluminat și obiecte sanitare',
    ],
    scene: 'living',
  },
  {
    slug: 'case-vile',
    title: 'Case și vile, de la structură la finisaje',
    summary:
      'Preluăm proiectul de la fundație sau de la casa la roșu și îl ducem până la recepția finală, cu un singur contract și un singur responsabil.',
    price: 'de la 680 €/mp',
    duration: '8 – 14 luni',
    includes: [
      'Structură de beton armat sau zidărie portantă',
      'Șarpantă, învelitoare, tinichigerie',
      'Termosistem, tencuieli decorative, tâmplărie',
      'Finisaje interioare și racorduri la utilități',
    ],
    scene: 'villa',
  },
  {
    slug: 'bai-bucatarii',
    title: 'Băi și bucătării',
    summary:
      'Camerele cu cele mai multe straturi ascunse. Refacem hidroizolația, trasăm instalațiile după mobilier și tăiem faianța pe rost continuu.',
    price: 'de la 3.400 € / baie',
    duration: '3 – 5 săptămâni',
    includes: [
      'Hidroizolație pe cadă de duș și pe pereți umezi',
      'Trasaj instalații pornind de la planul de mobilier',
      'Gresie și faianță rectificată, rost continuu, profile de colț',
      'Ventilație mecanică și corpuri de iluminat IP44',
    ],
    scene: 'bath',
  },
  {
    slug: 'amenajari-interioare',
    title: 'Amenajări interioare cu proiect',
    summary:
      'Lucrăm cu arhitect de interior din prima zi. Primești planuri, randări și un deviz pe materiale alese, nu pe estimări generale.',
    price: 'de la 18 €/mp proiectul',
    duration: '4 – 6 săptămâni proiectul',
    includes: [
      'Releveu, plan de mobilare și plan de instalații',
      'Randări foto-realiste pentru fiecare încăpere',
      'Listă de materiale cu furnizori și prețuri reale',
      'Asistență pe șantier pe toată durata execuției',
    ],
    scene: 'office',
  },
  {
    slug: 'fatade-termosistem',
    title: 'Fațade, termosistem și exterior',
    summary:
      'Scădem factura la încălzire și oprim infiltrațiile. Montăm pe schelă proprie, cu dibluire verificată și rețea de armare dublată la colțuri.',
    price: 'de la 38 €/mp',
    duration: '3 – 7 săptămâni',
    includes: [
      'Polistiren EPS sau vată bazaltică, 10 – 20 cm',
      'Armare dublă la colțuri și în jurul golurilor',
      'Tencuială decorativă cu granulație la alegere',
      'Glafuri, burlane, trotuar perimetral',
    ],
    scene: 'facade',
  },
  {
    slug: 'instalatii',
    title: 'Instalații electrice și termice',
    summary:
      'Tablouri noi, circuite separate pe consumatori și încălzire în pardoseală. Fiecare lucrare pleacă de acasă cu schema și buletinul de verificare.',
    price: 'de la 1.900 € / apartament',
    duration: '2 – 4 săptămâni',
    includes: [
      'Tablou electric nou, cu siguranțe diferențiale',
      'Circuite dedicate pentru bucătărie, baie și climatizare',
      'Încălzire în pardoseală cu distribuitor și termostate',
      'Probe de presiune și buletin PRAM la predare',
    ],
    scene: 'kitchen',
  },
]

export type Project = {
  slug: string
  title: string
  category: 'Apartamente' | 'Case' | 'Băi & bucătării' | 'Exterior' | 'Spații comerciale'
  place: string
  year: number
  surface: string
  duration: string
  budget: string
  intro: string
  brief: string
  work: string[]
  scene: SceneVariant
  beforeNote: string
  afterNote: string
  featured: boolean
}

export const projects: Project[] = [
  {
    slug: 'apartament-eroilor',
    title: 'Apartament de 3 camere pe Eroilor',
    category: 'Apartamente',
    place: 'Cluj-Napoca, Centru',
    year: 2025,
    surface: '74 mp',
    duration: '9 săptămâni',
    budget: '31.400 €',
    intro:
      'Un apartament din 1974, nerenovat niciodată, cumpărat de o familie care se muta din chirie și avea termen fix de predare.',
    brief:
      'Pereții despărțitori erau din fâșii de BCA, instalația electrică pe aluminiu, iar baia pierdea apă în apartamentul de dedesubt. Clientul a cerut o singură firmă pentru tot, ca să nu coordoneze el șase echipe.',
    work: [
      'Demolat peretele dintre bucătărie și living, montat grindă metalică',
      'Instalație electrică nouă, 26 de circuite, tablou cu diferențiale',
      'Hidroizolație și recompartimentare baie',
      'Parchet stratificat stejar, uși furniruite, gletuire de nivel Q3',
      'Montaj mobilier de bucătărie și dressing pe comandă',
    ],
    scene: 'living',
    beforeNote: 'Bucătărie închisă, mochetă, tâmplărie de lemn din 1974',
    afterNote: 'Living deschis, parchet stejar, iluminat pe trei circuite',
    featured: true,
  },
  {
    slug: 'vila-faget',
    title: 'Vilă de familie în Făget',
    category: 'Case',
    place: 'Făget, Cluj',
    year: 2024,
    surface: '212 mp',
    duration: '11 luni',
    budget: '184.000 €',
    intro:
      'Casă pe două niveluri, construită de la fundație pe un teren în pantă, cu vedere spre pădure.',
    brief:
      'Terenul avea o diferență de nivel de 2,8 m, deci am pornit cu un zid de sprijin și o platformă de beton. Beneficiarii lucrau în străinătate, așa că am transmis raport foto săptămânal.',
    work: [
      'Zid de sprijin, fundații izolate și placă pe sol',
      'Structură de beton armat, planșee monolite',
      'Șarpantă din lemn stratificat, învelitoare din tablă fălțuită',
      'Termosistem de 20 cm vată bazaltică, tencuială siliconică',
      'Finisaje interioare complete și încălzire în pardoseală',
    ],
    scene: 'villa',
    beforeNote: 'Teren în pantă, fără platformă și fără racorduri',
    afterNote: 'Casă finalizată, curte amenajată, racorduri funcționale',
    featured: true,
  },
  {
    slug: 'baie-gheorgheni',
    title: 'Baie de 6 mp în Gheorgheni',
    category: 'Băi & bucătării',
    place: 'Cluj-Napoca, Gheorgheni',
    year: 2025,
    surface: '6,2 mp',
    duration: '4 săptămâni',
    budget: '7.800 €',
    intro:
      'O baie de bloc refăcută complet, cu cabină de duș fără prag și nișă pe toată lățimea peretelui.',
    brief:
      'Coloana comună era de fontă și pierdea pe îmbinări. Am înlocuit-o pe toată înălțimea apartamentului, cu acordul asociației, înainte de a începe finisajele.',
    work: [
      'Înlocuit coloana de scurgere și racordurile',
      'Hidroizolație pe toată suprafața cabinei și 1,8 m pe pereți',
      'Gresie rectificată 60×120, rost de 2 mm',
      'Nișă iluminată, ventilație cu senzor de umiditate',
    ],
    scene: 'bath',
    beforeNote: 'Faianță din 1982, coloană de fontă, cadă fisurată',
    afterNote: 'Duș fără prag, nișă iluminată, ventilație automată',
    featured: true,
  },
  {
    slug: 'bucatarie-buna-ziua',
    title: 'Bucătărie deschisă, Bună Ziua',
    category: 'Băi & bucătării',
    place: 'Cluj-Napoca, Bună Ziua',
    year: 2024,
    surface: '23 mp',
    duration: '5 săptămâni',
    budget: '14.200 €',
    intro: 'Bucătărie unită cu livingul, cu insulă de gătit și hotă pe tavan.',
    brief:
      'Blocul avea ventilație comună, deci hota cu recirculare a fost singura variantă legală. Am compensat cu o fereastră basculantă și aer proaspăt pe un recuperator de perete.',
    work: [
      'Desfăcut peretele neportant, montat profile metalice',
      'Circuit dedicat pentru plită, cuptor și insulă',
      'Blat de piatră compozită, taiat pe șantier',
      'Recuperator de căldură de perete, montat pe fațadă',
    ],
    scene: 'kitchen',
    beforeNote: 'Bucătărie de 7 mp, separată de living',
    afterNote: 'Spațiu unit de 23 mp, insulă cu plită',
    featured: false,
  },
  {
    slug: 'fatada-manastur',
    title: 'Fațadă și termosistem, Mănăștur',
    category: 'Exterior',
    place: 'Cluj-Napoca, Mănăștur',
    year: 2025,
    surface: '340 mp fațadă',
    duration: '6 săptămâni',
    budget: '21.600 €',
    intro:
      'Casă din 1998, cu pereți de BCA netencuiți corect și infiltrații pe latura de nord.',
    brief:
      'Am desfăcut tencuiala veche până la zidărie pe zonele desprinse, apoi am montat 15 cm de polistiren grafitat și am refăcut toate glafurile.',
    work: [
      'Desfăcut tencuiala desprinsă, reparat zidăria',
      'Polistiren grafitat 15 cm, dibluri verificate la smulgere',
      'Rețea de armare dublată la soclu și la goluri',
      'Tencuială siliconică, glafuri de aluminiu, burlane noi',
    ],
    scene: 'facade',
    beforeNote: 'Tencuială desprinsă, pete de igrasie pe nord',
    afterNote: 'Termosistem de 15 cm, fațadă uniformă',
    featured: false,
  },
  {
    slug: 'birou-avocatura',
    title: 'Cabinet de avocatură, 95 mp',
    category: 'Spații comerciale',
    place: 'Cluj-Napoca, Zorilor',
    year: 2024,
    surface: '95 mp',
    duration: '7 săptămâni',
    budget: '38.500 €',
    intro:
      'Amenajarea unui spațiu la parterul unui bloc nou, pentru un cabinet cu cinci birouri și o sală de consultații.',
    brief:
      'Cerința principală a fost izolarea fonică între camere. Am folosit pereți dubli de gips-carton cu vată de 10 cm și uși cu garnitură pe tot conturul.',
    work: [
      'Compartimentări cu izolare fonică de 48 dB',
      'Tavan casetat cu corpuri liniare încastrate',
      'Rețea de date pe fiecare post de lucru',
      'Mochetă în dale și tâmplărie interioară pe comandă',
    ],
    scene: 'office',
    beforeNote: 'Spațiu la gri, fără compartimentări',
    afterNote: 'Cinci birouri izolate fonic, sală de consultații',
    featured: false,
  },
]

export const projectCategories = [
  'Toate',
  'Apartamente',
  'Case',
  'Băi & bucătării',
  'Exterior',
  'Spații comerciale',
] as const

export type Testimonial = {
  name: string
  role: string
  project: string
  rating: number
  text: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Andreea Pop',
    role: 'Apartament 3 camere, Centru',
    project: 'apartament-eroilor',
    rating: 5,
    text: 'Am primit devizul în două zile, cu prețuri pe fiecare poziție. La final am plătit cu 600 de lei peste deviz, pentru o modificare cerută de noi. Termenul a fost respectat la zi.',
  },
  {
    name: 'Radu Mureșan',
    role: 'Casă nouă, Făget',
    project: 'vila-faget',
    rating: 5,
    text: 'Am fost plecat din țară aproape tot timpul lucrării. Primeam vineri seara un raport cu poze și stadiul plăților. Nu am avut nicio surpriză la recepție.',
  },
  {
    name: 'Ioana Barbu',
    role: 'Renovare baie, Gheorgheni',
    project: 'baie-gheorgheni',
    rating: 5,
    text: 'Au descoperit că pierdea coloana comună și au oprit lucrarea până am rezolvat cu asociația. Altă firmă ar fi turnat peste și m-aș fi trezit cu problema peste un an.',
  },
  {
    name: 'Cristian Sabău',
    role: 'Bucătărie deschisă, Bună Ziua',
    project: 'bucatarie-buna-ziua',
    rating: 5,
    text: 'Echipa a lucrat cu apartamentul locuit. Praful a fost ținut sub control cu folie și aspirator industrial, iar seara puteam folosi bucătăria provizorie.',
  },
  {
    name: 'Dana Lazăr',
    role: 'Cabinet de avocatură, Zorilor',
    project: 'birou-avocatura',
    rating: 5,
    text: 'Izolarea fonică a fost cerința noastră grea și au măsurat-o la final cu aparat, în prezența mea. Nu am mai lucrat cu o firmă care verifică ce promite.',
  },
  {
    name: 'Mihai Oltean',
    role: 'Fațadă și termosistem, Mănăștur',
    project: 'fatada-manastur',
    rating: 4,
    text: 'Lucrarea a durat cu o săptămână mai mult din cauza ploilor. Au explicat de ce nu se poate tencui pe umed și au revenit imediat ce s-a uscat. Factura la gaz a scăzut cu o treime.',
  },
]

export const processSteps = [
  {
    title: 'Vizită la fața locului și măsurători',
    when: 'În 48 de ore de la cerere',
    text: 'Venim cu telemetrul și facem releveul. Verificăm instalațiile, umezeala și ce se poate demola. Vizita este gratuită în Cluj și în comunele limitrofe.',
  },
  {
    title: 'Deviz pe poziții, nu pe estimări',
    when: 'În 3 zile lucrătoare',
    text: 'Primești un deviz cu manoperă și materiale separate, pe fiecare cameră. Prețurile din deviz sunt cele din contract și nu se schimbă decât dacă ceri tu o modificare.',
  },
  {
    title: 'Contract cu termene și penalități',
    when: 'Înainte de prima zi de șantier',
    text: 'Stabilim graficul de execuție, etapele de plată și penalitățile de întârziere, valabile în ambele sensuri. Primești numele șefului de șantier și numărul lui direct.',
  },
  {
    title: 'Execuție cu echipă dedicată',
    when: 'Zilnic, 08:00 – 17:00',
    text: 'O singură echipă duce lucrarea de la început până la sfârșit. Vineri primești raport foto cu ce s-a făcut și ce urmează săptămâna următoare.',
  },
  {
    title: 'Recepție, curățenie și garanție',
    when: 'Ultima zi de lucrare',
    text: 'Parcurgem împreună lista de observații și remediem tot înainte de plata finală. Predăm schemele de instalații, certificatele materialelor și garanția de 5 ani la manoperă.',
  },
]

/* Read as the clauses they are: each one is written into every contract. */
export const promises = [
  {
    title: 'Deviz în 3 zile lucrătoare',
    text: 'Cu manoperă și materiale defalcate pe cameră, ca să știi unde se duce fiecare sumă.',
  },
  {
    title: 'Preț fix prin contract',
    text: 'Devizul semnat este prețul final. Modificările se fac doar în scris, cu acordul tău.',
  },
  {
    title: 'Echipe proprii, nu zilieri',
    text: '26 de oameni angajați cu contract. Aceiași meseriași de la demolare până la recepție.',
  },
  {
    title: 'Garanție 5 ani la manoperă',
    text: 'Plus garanția producătorului pentru fiecare material pus în operă, cu certificate la predare.',
  },
]

export const stats = [
  { label: 'Ani de când lucrăm în Cluj', value: '14' },
  { label: 'Lucrări predate la cheie', value: '318' },
  { label: 'Meseriași angajați cu contract', value: '26' },
  { label: 'Garanție scrisă la manoperă', value: '5 ani' },
]

export const team = [
  { name: 'Vlad Cristea', role: 'Fondator, inginer construcții civile', since: 'din 2011' },
  { name: 'Alina Tarța', role: 'Arhitect de interior', since: 'din 2016' },
  { name: 'Sorin Bălan', role: 'Șef de șantier, zona rezidențial', since: 'din 2013' },
  { name: 'Paul Dumitrescu', role: 'Devize și achiziții', since: 'din 2018' },
]

export const history = [
  { year: '2011', text: 'Vlad Cristea înființează firma cu două echipe de finisaje și o dubă.' },
  { year: '2015', text: 'Prima casă construită de la fundație, în Chinteni. Apare departamentul de devize.' },
  { year: '2018', text: 'Intră în echipă un arhitect de interior, iar proiectarea devine parte din ofertă.' },
  { year: '2021', text: 'Deschidem depozitul propriu din Bobâlnei și renunțăm la subcontractarea finisajelor.' },
  { year: '2024', text: 'Certificare ISO 9001 și garanție extinsă la 5 ani pentru manoperă.' },
  { year: '2026', text: '318 lucrări predate. Echipe pentru instalații, finisaje, fațade și structuri.' },
]

export const faq = [
  {
    q: 'Cât costă o renovare completă de apartament?',
    a: 'Între 420 și 700 €/mp, în funcție de nivelul finisajelor și de cât din instalații trebuie refăcut. Un apartament de 60 mp se încadrează de obicei între 26.000 și 38.000 €, cu materiale incluse. Devizul detaliat îl primești după măsurători.',
  },
  {
    q: 'Prețul din deviz se poate modifica pe parcurs?',
    a: 'Doar dacă schimbi tu ceva sau dacă apare o problemă ascunsă în structură, pe care nu aveam cum să o vedem fără demolare. În ambele cazuri primești un act adițional cu prețul nou înainte să executăm, nu după.',
  },
  {
    q: 'Pot locui în casă în timpul lucrărilor?',
    a: 'La lucrări pe camere, da. Izolăm zona cu folie și aspirator industrial cu filtru, iar la finalul zilei curățăm căile de acces. La renovări complete recomandăm să eliberezi locuința, pentru că praful de la gletuire ajunge peste tot.',
  },
  {
    q: 'Lucrați și în afara Clujului?',
    a: 'Da, în raza de 60 km: Florești, Baciu, Apahida, Turda, Dej, Gherla. Pentru distanțe mai mari includem în deviz costul transportului și al cazării echipei.',
  },
  {
    q: 'Ce cuprinde garanția de 5 ani?',
    a: 'Manopera executată de noi: instalații, hidroizolații, finisaje, montaje. Materialele au garanția producătorului, iar certificatele ți le predăm la recepție. Intervenim în maximum 5 zile lucrătoare de la sesizare.',
  },
  {
    q: 'Cum se plătește lucrarea?',
    a: 'Un avans de 20% la semnarea contractului, apoi tranșe la finalizarea etapelor din grafic: demolări, instalații, finisaje brute, finisaje finale. Ultimii 10% se plătesc după recepție și remedierea observațiilor.',
  },
]

export const projectTypes = [
  { value: 'apartament', label: 'Renovare apartament', hint: 'Parțială sau completă' },
  { value: 'casa', label: 'Casă sau vilă', hint: 'Construcție nouă sau renovare' },
  { value: 'baie-bucatarie', label: 'Baie sau bucătărie', hint: 'O singură încăpere' },
  { value: 'fatada', label: 'Fațadă și exterior', hint: 'Termosistem, tencuieli' },
  { value: 'comercial', label: 'Spațiu comercial', hint: 'Birou, cabinet, magazin' },
  { value: 'altceva', label: 'Altceva', hint: 'Descrie tu în ultimul pas' },
]

export const budgetRanges = [
  'Sub 10.000 €',
  '10.000 – 25.000 €',
  '25.000 – 50.000 €',
  '50.000 – 100.000 €',
  'Peste 100.000 €',
  'Nu știu încă, am nevoie de estimare',
]

export const timeframes = [
  'Cât de repede se poate',
  'În 1 – 3 luni',
  'În 3 – 6 luni',
  'Peste 6 luni',
  'Doar mă informez',
]

export const extraWork = [
  'Proiect de arhitectură de interior',
  'Instalații electrice refăcute',
  'Instalații sanitare și termice',
  'Mobilier pe comandă',
  'Tâmplărie termopan',
  'Demolări și evacuare moloz',
]
