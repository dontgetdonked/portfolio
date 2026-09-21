/* Photography for the sample board. Every file is an Unsplash photo used as
   illustration: none of them shows an ATRIUM job, and the pages say so where a
   visitor could read a photo as a project record. Sources are listed at the
   bottom so the images can be swapped for real site photos one by one. */

import plaster800 from '@/assets/photos/plaster-800.webp'
import plaster1600 from '@/assets/photos/plaster-1600.webp'
import oak640 from '@/assets/photos/oak-640.webp'
import oak1200 from '@/assets/photos/oak-1200.webp'
import tile480 from '@/assets/photos/tile-480.webp'
import tile900 from '@/assets/photos/tile-900.webp'
import marble440 from '@/assets/photos/marble-440.webp'
import marble800 from '@/assets/photos/marble-800.webp'
import concrete440 from '@/assets/photos/concrete-440.webp'
import concrete800 from '@/assets/photos/concrete-800.webp'
import brick560 from '@/assets/photos/brick-560.webp'
import brick900 from '@/assets/photos/brick-900.webp'
import stucco560 from '@/assets/photos/stucco-560.webp'
import stucco1000 from '@/assets/photos/stucco-1000.webp'
import grunge440 from '@/assets/photos/grunge-440.webp'
import grunge800 from '@/assets/photos/grunge-800.webp'
import roomEroilor800 from '@/assets/photos/room-eroilor-800.webp'
import roomEroilor1600 from '@/assets/photos/room-eroilor-1600.webp'
import roomHall800 from '@/assets/photos/room-hall-800.webp'
import roomHall1600 from '@/assets/photos/room-hall-1600.webp'
import house800 from '@/assets/photos/house-800.webp'
import house1600 from '@/assets/photos/house-1600.webp'
import bath800 from '@/assets/photos/bath-800.webp'
import bath1600 from '@/assets/photos/bath-1600.webp'
import kitchen800 from '@/assets/photos/kitchen-800.webp'
import kitchen1600 from '@/assets/photos/kitchen-1600.webp'
import office800 from '@/assets/photos/office-800.webp'
import office1600 from '@/assets/photos/office-1600.webp'
import studio800 from '@/assets/photos/studio-800.webp'
import studio1600 from '@/assets/photos/studio-1600.webp'
import facade800 from '@/assets/photos/facade-800.webp'
import facade1600 from '@/assets/photos/facade-1600.webp'
import plasterer640 from '@/assets/photos/plasterer-640.webp'
import plasterer1200 from '@/assets/photos/plasterer-1200.webp'

export type Photo = {
  src: string
  srcSet: string
  alt: string
}

function photo(small: string, smallW: number, large: string, largeW: number, alt: string): Photo {
  return { src: large, srcSet: `${small} ${smallW}w, ${large} ${largeW}w`, alt }
}

export const photos = {
  plaster: photo(plaster800, 800, plaster1600, 1600, 'Perete tencuit și gletuit, în lumină laterală'),
  oak: photo(oak640, 640, oak1200, 1200, 'Parchet de stejar din trei lamele, lăcuit'),
  tile: photo(tile480, 480, tile900, 900, 'Plăci albe dreptunghiulare pe peretele unui duș, cu rost subțire și continuu'),
  marble: photo(marble440, 440, marble800, 800, 'Suprafață de piatră deschisă la culoare, cu vinișoare'),
  concrete: photo(concrete440, 440, concrete800, 800, 'Suprafață de beton gri, netencuită'),
  brick: photo(brick560, 560, brick900, 900, 'Zidărie de cărămidă sub o tencuială desfăcută parțial'),
  stucco: photo(stucco560, 560, stucco1000, 1000, 'Tencuială decorativă cu granulație, pe fațadă'),
  grunge: photo(grunge440, 440, grunge800, 800, 'Perete vechi de beton, pătat și fisurat'),
  roomEroilor: photo(roomEroilor800, 800, roomEroilor1600, 1600, 'Cameră goală, cu parchet de stejar și pereți albi, gata de mutat'),
  roomHall: photo(roomHall800, 800, roomHall1600, 1600, 'Hol luminos cu parchet de stejar și dulapuri încastrate'),
  house: photo(house800, 800, house1600, 1600, 'Casă modernă pe două niveluri, cu ferestre mari, seara'),
  bath: photo(bath800, 800, bath1600, 1600, 'Baie cu duș fără prag, perete de sticlă și nișă pe toată lățimea'),
  kitchen: photo(kitchen800, 800, kitchen1600, 1600, 'Bucătărie deschisă cu insulă de lemn și scaune înalte'),
  office: photo(office800, 800, office1600, 1600, 'Birou cu pereți de sticlă în rame de lemn'),
  studio: photo(studio800, 800, studio1600, 1600, 'Birou de proiectare cu perete de sticlă și planșe pe pereți'),
  facade: photo(facade800, 800, facade1600, 1600, 'Fațadă albă tencuită a unei case, cu ferestre și burlan'),
  plasterer: photo(plasterer640, 640, plasterer1200, 1200, 'Meseriaș care tencuiește un perete cu mistria'),
} as const

export type PhotoKey = keyof typeof photos

/* The chips on the board. Each code is printed on its tag; the spec line
   quotes what the projects and services in site.ts actually use. */
export type Material = {
  code: string
  name: string
  spec: string
  photo: PhotoKey
}

export const materials = {
  oak: { code: 'M-01', name: 'Parchet stratificat stejar', spec: 'lăcuit, montat pe folie', photo: 'oak' },
  tile: { code: 'M-02', name: 'Faianță rectificată', spec: 'rost continuu', photo: 'tile' },
  stone: { code: 'M-03', name: 'Piatră compozită', spec: 'blat tăiat pe șantier', photo: 'marble' },
  plaster: { code: 'M-04', name: 'Glet și vopsea', spec: 'gletuire nivel Q3', photo: 'plaster' },
  stucco: { code: 'M-05', name: 'Tencuială siliconică', spec: 'granulație la alegere', photo: 'stucco' },
  concrete: { code: 'M-06', name: 'Beton armat', spec: 'planșee monolite', photo: 'concrete' },
  brick: { code: 'M-07', name: 'Zidăria găsită', spec: 'ce iese la desfacere', photo: 'brick' },
} satisfies Record<string, Material>

export const projectPhoto: Record<string, PhotoKey> = {
  'apartament-eroilor': 'roomEroilor',
  'vila-faget': 'house',
  'baie-gheorgheni': 'bath',
  'bucatarie-buna-ziua': 'kitchen',
  'fatada-manastur': 'facade',
  'birou-avocatura': 'office',
}

/* The finish each project was handed over with, shown as a material chip
   next to what was done. */
export const projectFinish: Record<string, keyof typeof materials> = {
  'apartament-eroilor': 'oak',
  'vila-faget': 'stucco',
  'baie-gheorgheni': 'tile',
  'bucatarie-buna-ziua': 'stone',
  'fatada-manastur': 'stucco',
  'birou-avocatura': 'plaster',
}

export const serviceMaterial: Record<string, keyof typeof materials> = {
  'renovare-apartament': 'oak',
  'case-vile': 'concrete',
  'bai-bucatarii': 'tile',
  'amenajari-interioare': 'stone',
  'fatade-termosistem': 'stucco',
  instalatii: 'brick',
}

/* Sources (Unsplash License), in the order above:
   plaster 0tgMnMIYQ9Y · oak crop of uN6nxTYqMCg · tile crop of UpJr4WwpIs4 · marble tRTpDj_8i-A
   concrete UuBR5kbvt4Y · brick hibY1sqqAz0 · stucco -w0bqO-Elz8 · grunge F5ouB49ntZI
   roomEroilor uN6nxTYqMCg · roomHall e1KAWHk5msE · house yFV39g6AZ5o · bath Ies-rhvusTs
   kitchen rRH2iVYtEjo · office fllxjm9v_eE · studio om5oj_TP3xg · facade vlyUqTdZyBY
   plasterer -WK5bA14jt0
   Each id resolves at https://unsplash.com/photos/<id>. */
