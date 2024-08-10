export interface Episode {
  id: string;
  title: string;
  number: number;
};

export interface PlayerSubtitle {
  src: string;
  label: string;
  language: string;
  kind: TextTrackKind;
  default?: boolean;
}
interface Source {
  url: string;
  type: string;
  isM3U8?: boolean;
};

interface Subtitle {
  url: string;
  lang: string;
};

export interface TimeRange {
  start: number;
  end: number;
};

export interface VideoDetails {
  sources: Source[];
  subtitles: Subtitle[];
  intro: TimeRange;
  outro: TimeRange;
};
