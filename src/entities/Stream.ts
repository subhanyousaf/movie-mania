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

export declare type StreamFile = {
  type: "mp4";
  url: string;
};

export declare type Qualities = "unknown" | "360" | "480" | "720" | "1080" | "4k";

export declare type Captions = {
  id: string;
  language: string;
  hasCorsRestrictions: boolean;
  type: "vtt" | "srt";
  url: string;
}

export declare type StreamCommon = {
  id: string;
  flags: string[];
  stream: Stream;
  captions: Captions[];
};

export declare type FileBasedStream = StreamCommon & {
  type: "file";
  qualities: Partial<Record<Qualities, StreamFile>>;
};

export declare type HlsBasedStream = StreamCommon & {
  type: "hls";
  playlist: string;
};

export declare type StreamResponse = {
  sourceId: string;
  streams: FileBasedStream[] | HlsBasedStream[];
};

export declare type StreamSource = {
  id: string;
  rank: number;
  name: string;
}
