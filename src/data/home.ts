import type { ImageMetadata } from 'astro';
import galaStagePerformance from '../assets/photos/gala-stage-performance.jpg';
import corporateReceptionAtrium from '../assets/photos/corporate-reception-atrium.jpg';
import anniversary150 from '../assets/photos/anniversary-150-celebration.jpg';
import culturalGalaDancers from '../assets/photos/cultural-gala-dancers.jpg';
import carnivalAerialNeighbourhood from '../assets/photos/carnival-aerial-neighbourhood.jpg';
import carnivalInflatableSlide from '../assets/photos/carnival-inflatable-slide.jpg';
import golfTournamentTeam from '../assets/photos/golf-tournament-team.jpg';
import fundraiserGuests from '../assets/photos/fundraiser-guests.jpg';
import carnivalKidsTreats from '../assets/photos/carnival-kids-treats.jpg';
import grandOpeningSpeech from '../assets/photos/grand-opening-speech.jpg';

interface Photo {
  src: ImageMetadata;
  alt: string;
}

export const hero: Photo = {
  src: galaStagePerformance,
  alt: 'A singer performing on stage at a gala, seen past the audience',
};

/** "Recent events" tiles, in grid order (spans 7 / 5 / 4 / 8). */
export const recentWork: Photo[] = [
  { src: corporateReceptionAtrium, alt: 'A crowded corporate reception in a wood-panelled atrium, seen from above' },
  { src: anniversary150, alt: 'Guests mingling beside an illuminated 150th anniversary sign' },
  { src: culturalGalaDancers, alt: 'Dancers in colourful traditional dress performing at a cultural gala' },
  { src: carnivalAerialNeighbourhood, alt: 'Aerial view of a carnival on a sports field in a Winnipeg neighbourhood' },
];

/** Curated Instagram grid (static — swap these to refresh it). */
export const instagram: Photo[] = [
  { src: culturalGalaDancers, alt: 'Dancers in traditional dress at a cultural gala' },
  { src: carnivalInflatableSlide, alt: 'A child on an inflatable slide at a carnival' },
  { src: golfTournamentTeam, alt: 'A golf tournament team posing on the course' },
  { src: fundraiserGuests, alt: 'Two guests posing together at a fundraiser' },
  { src: carnivalKidsTreats, alt: 'Kids with treats at a carnival' },
  { src: grandOpeningSpeech, alt: 'A speaker addressing guests at a grand opening' },
];
