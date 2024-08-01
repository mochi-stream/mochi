export interface AnimeTitle {
  userPreferred: string;
}

export interface Anime {
  id: number;
  idMal: number;
  title: AnimeTitle;
  coverImage: {
    extraLarge: string;
    large: string;
    color: string;
  };
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  bannerImage: string;
  season: string;
  seasonYear: number;
  description: string;
  type: string;
  format: string;
  status: string;
  episodes: number;
  duration: number;
  chapters: number;
  volumes: number;
  genres: string[];
  isAdult: boolean;
  averageScore: number;
  popularity: number;
  mediaListEntry: {
    id: number;
    status: string;
  };
  nextAiringEpisode: {
    airingAt: string;
    timeUntilAiring: number;
    episode: number;
  };
  studios: {
    edges: {
      isMain: boolean;
      node: Studio;
    }[];
  };
}

