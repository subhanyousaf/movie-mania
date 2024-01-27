import { create } from "zustand";

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
