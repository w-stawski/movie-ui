export interface MovieRating {
  Source: string;
  Value: string;
}

export interface MovieSession {
  id: string;
  startTime: string;
  formats: string[];
  cinema: {
    name: string;
    accessibility: string;
  };
}

export interface ProcessedMovie {
  id: string;
  title: string;
  link: string;
  sessions: MovieSession[];
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: MovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}
