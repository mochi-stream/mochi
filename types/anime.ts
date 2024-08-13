export interface Episode {
  id: string;
  title: string;
  number: number;
}

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
}

interface Subtitle {
  url: string;
  lang: string;
}

export interface TimeRange {
  start: number;
  end: number;
}

export interface VideoDetails {
  sources: Source[];
  subtitles: Subtitle[];
  intro: TimeRange;
  outro: TimeRange;
}

interface User {
  imageUrl: string;
  username: string;
}

interface LikeDislike {
  id: string;
}

interface Reply {
  likesCount: number;
  dislikesCount: number;
  user: User;
  likes: LikeDislike[];
  dislikes: LikeDislike[];
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  commentId: string;
}

export interface Comment {
  likesCount: number;
  dislikesCount: number;
  replies: Reply[];
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
}
