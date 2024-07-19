interface Title {
  romaji: string;
  english: string;
  native: string;
  userPreferred: string;
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