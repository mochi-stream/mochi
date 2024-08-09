export interface PlayerSubtitle {
  src: string;
  label: string;
  language: string;
  kind: TextTrackKind;
  default?: boolean;
}

export interface Intro {
  start: number;
  end: number;
}

export interface Outro {
  start: number;
  end: number;
}