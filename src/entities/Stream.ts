export enum StreamType {
  Show = "show",
  Movie = "movie",
}

export interface Stream {
  type: StreamType;
  title: string;
  releaseYear: number;
  tmdbId: string;
  season?: {
    number: number;
    tmdbId: string;
  };
  episode?: {
    number: number;
    tmdbId: string;
  };
}

export type StreamFile = {
  type: "mp4";
  url: string;
};

export type Qualities = "unknown" | "360" | "480" | "720" | "1080" | "4k";

export type Captions = {
  id: string;
  language: string;
  hasCorsRestrictions: boolean;
  type: "vtt" | "srt";
  url: string;
}

export type StreamCommon = {
  id: string;
  flags: string[];
  stream: Stream;
  captions: Captions[];
};

export type FileBasedStream = StreamCommon & {
  type: "file";
  qualities: Partial<Record<Qualities, StreamFile>>;
};

export type HlsBasedStream = StreamCommon & {
  type: "hls";
  playlist: string;
};

export type StreamResponse = {
  sourceId: string;
  embedId?: string;
  stream: FileBasedStream | HlsBasedStream;
};
