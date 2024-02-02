import { create } from "zustand";
import { StreamResponse } from "./entities/Stream";

export enum TMDbTypes {
  ALL = "all",
  MOVIE = "movie",
  TV = "tv",
}

interface TMDbStore {
  sortBy: TMDbTypes;
  search: string;
  setSortBy: (sortBy: TMDbTypes) => void;
  setSearch: (search: string) => void;
}

export const useTMDbStore = create<TMDbStore>((set) => ({
  sortBy: TMDbTypes.ALL,
  search: "",
  setSortBy: (sortBy: TMDbTypes) => {
    set({ sortBy });
  },
  setSearch: (search: string) => {
    set({ search });
  },
}));

interface StreamStore {
  source: string;
  streamResponse: StreamResponse | null;
  streamIndex: number;
  setSource: (source: string) => void;
  setStreamResponse: (streamResponse: StreamResponse) => void;
  setStreamIndex: (streamIndex: string) => void;
  reset: () => void;
}

export const useStreamStore = create<StreamStore>((set) => ({
  source: "",
  streamResponse: null,
  streamIndex: 0,
  setSource: (source: string) => {
    set({ source });
  },
  setStreamResponse: (streamResponse: StreamResponse) => {
    set({ streamResponse });
  },
  setStreamIndex: (index: string) => {
    const streamIndex = parseInt(index) || 0;
    set({ streamIndex });
  },
  reset: () => {
    set({ source: "", streamResponse: null, streamIndex: 0 });
  },
}));

interface RecentEditingStore {
  editing: boolean;
  setEditing: (editing: boolean) => void;
}

export const useRecentEditingStore = create<RecentEditingStore>((set) => ({
  editing: false,
  setEditing: (editing: boolean) => {
    set({ editing });
  },
}));

interface RecentsStore {
  recentsUpdated: boolean;
  setRecentsUpdated: (recentsUpdated: boolean) => void;
}

export const useRecentsStore = create<RecentsStore>((set) => ({
  recentsUpdated: false,
  setRecentsUpdated: (recentsUpdated: boolean) => {
    set({ recentsUpdated });
  },
}));
