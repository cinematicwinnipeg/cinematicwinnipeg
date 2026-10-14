import type { ImageMetadata } from 'astro';
import charityGalaDinner from '../assets/photos/charity-gala-dinner.jpg';
import carnivalMascotPhoto from '../assets/photos/carnival-mascot-photo.jpg';
import carnivalAerialCrowd from '../assets/photos/carnival-aerial-crowd.jpg';
import fundraisingGalaSpeaker from '../assets/photos/fundraising-gala-speaker.jpg';
import carnivalInflatableSlide from '../assets/photos/carnival-inflatable-slide.jpg';
import carnivalAerialNeighbourhood from '../assets/photos/carnival-aerial-neighbourhood.jpg';

interface Photo {
  src: ImageMetadata;
  alt: string;
}

/** The three cards in "What we cover" on the home page. */
export const serviceCards: { num: string; title: string; blurb: string; photo: Photo }[] = [
  {
    num: '01',
    title: 'Galas & Corporate',
    blurb:
      'Galas, fundraisers, golf tournaments, grand openings and company events — candid, stage and sponsor coverage.',
    photo: { src: charityGalaDinner, alt: 'Guests seated at round tables in a decorated gala dinner hall' },
  },
  {
    num: '02',
    title: 'Festivals & Carnivals',
    blurb: 'Multi-day, high-energy events covered end to end, with fast turnaround for social and sponsors.',
    photo: { src: carnivalMascotPhoto, alt: 'A boy posing with a costumed mascot at a community carnival' },
  },
  {
    num: '03',
    title: 'Aerial / Drone',
    blurb: 'Licensed drone photo and video that shows the full scale of your venue and crowd.',
    photo: { src: carnivalAerialCrowd, alt: 'Aerial drone view of a carnival crowd on a sports field' },
  },
];

/** The alternating sections on /services. */
export const serviceDetails: {
  id: string;
  num: string;
  short: string;
  title: string;
  body: string;
  items: string[];
  theme: 'light' | 'dark';
  photo: Photo;
}[] = [
  {
    id: 'galas-corporate',
    num: '01',
    short: 'galas',
    title: 'Galas & Corporate Events',
    body: 'Discreet, polished coverage for galas, fundraisers, golf tournaments, grand openings and corporate functions. We work around your run-of-show so speeches, presentations and guest moments are all captured.',
    items: [
      'Event photography — candids, stage, portraits',
      'Highlight film and full-length recordings',
      'Golf tournaments — teams, holes and sponsors',
      'Step-and-repeat / sponsor wall photos',
      'Next-day social preview selects',
    ],
    theme: 'light',
    photo: { src: fundraisingGalaSpeaker, alt: 'A speaker at the podium during a fundraising gala' },
  },
  {
    id: 'festivals-carnivals',
    num: '02',
    short: 'festivals',
    title: 'Festivals & Carnivals',
    body: 'Large crowds, multiple stages, long days. We plan coverage across the whole site so organisers, sponsors and vendors all get the content they need.',
    items: [
      'Multi-day photo and video coverage',
      'Recap reels for social and next-year promo',
      'Sponsor and vendor content packs',
      'Aerial crowd and site footage',
    ],
    theme: 'dark',
    photo: { src: carnivalInflatableSlide, alt: 'Kids sliding down a giant inflatable slide at a carnival' },
  },
  {
    id: 'aerial-drone',
    num: '03',
    short: 'drone',
    title: 'Aerial / Drone',
    body: 'Drone photo and video that shows the scale of your event, venue or property — on its own or added to any event package.',
    items: [
      'Aerial photography and 4K video',
      'Venue and site overviews',
      'Crowd and establishing shots',
      'Add-on to any event package',
    ],
    theme: 'light',
    photo: {
      src: carnivalAerialNeighbourhood,
      alt: 'Wide aerial view of a carnival site and the surrounding Winnipeg neighbourhood',
    },
  },
];
