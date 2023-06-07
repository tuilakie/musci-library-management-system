export interface HttpResponse<T> {
  success: boolean;
  data: T;
  message: string;
  meta?: Meta;
}

export interface Meta {
  total: number;
  pages: number;
  current: number;
  size: number;
}

export interface Playlist {
  id: number;
  name: string;
  description: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: number;
  releaseYear: number;
}
