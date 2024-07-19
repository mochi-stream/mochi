interface Title {
  romaji: string;
  english: string;
  native: string;
  userPreferred: string;
}

interface Trailer {
  id: string;
  site: string;
  thumbnail: string;
  thumbnailHash: string;
}

interface Recommendation {
  id: number;
  malId: number;
  title: Title;
  status: string;
  episodes: number | null;
  image: string;
  imageHash: string;
  cover: string | null;
  coverHash: string;
  rating: number;
  type: string;
}

interface Character {
  id: number;
  role: string;
  name: {
    first: string;
    last: string;
    full: string;
    native: string;
    userPreferred: string;
  };
  image: string;
  imageHash: string;
  voiceActors: {
    id: number;
    language: string;
    name: {
      first: string;
      last: string;
      full: string;
      native: string;
      userPreferred: string;
    };
    image: string;
    imageHash: string;
  }[];
}

interface Relation {
  id: number;
  relationType: string;
  malId: number;
  title: Title;
  status: string;
  episodes: number | null;
  image: string;
  imageHash: string;
  color: string | null;
  type: string;
  cover: string | null;
  coverHash: string;
  rating: number;
}

interface Mapping {
  id: string;
  providerId: string;
  similarity: number;
  providerType: string;
}

interface Date {
  year: number;
  month: number;
  day: number;
}

interface NextAiringEpisode {
  airingTime: number;
  timeUntilAiring: number;
  episode: number;
}

export interface AnilistResult {
  id: string;
  malId: number;
  title: Title;
  status: string;
  image: string;
  imageHash: string;
  cover: string | null;
  coverHash: string;
  popularity: number;
  description: string;
  rating: number | null;
  genres: string[];
  color: string;
  totalEpisodes: number;
  currentEpisodeCount: number;
  type: string;
  releaseDate: string | null;
}

export interface AnilistSearchResult {
  currentPage: number;
  hasNextPage: boolean;
  results: AnilistResult[];
}

export interface AnimeInfo {
  id: string;
  title: Title;
  malId: number;
  synonyms: string[];
  isLicensed: boolean;
  isAdult: boolean;
  countryOfOrigin: string;
  trailer: Trailer;
  image: string;
  imageHash: string;
  popularity: number;
  color: string;
  cover: string;
  coverHash: string;
  description: string;
  status: string;
  releaseDate: number;
  startDate: Date;
  endDate: Date;
  nextAiringEpisode: NextAiringEpisode;
  totalEpisodes: number;
  currentEpisode: number;
  rating: number;
  duration: number;
  genres: string[];
  season: string;
  studios: string[];
  subOrDub: string;
  type: string;
  recommendations: Recommendation[];
  characters: Character[];
  relations: Relation[];
  mappings: Mapping[];
  artwork: string[];
  episodes: string[];
}