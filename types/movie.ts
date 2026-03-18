export interface ProcessedMovie {
  id: string;
  title: string;
  slug: string;
  link: string | null;
  image: string | null;
  imageAlt: string;
  tagline: string;
  runtime: number | null;
  fsk: number | null;
  releaseDate: string | null;
  isYorckPick: boolean;
  distributor: string | null;
  tags: string[];
  sessions: {
    id: string;
    startTime: string;
    formats: string[];
    cinema: {
      name: string;
      accessibility: string;
    };
  }[];
}
