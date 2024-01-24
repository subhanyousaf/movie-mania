import { TMDbResponse } from "@/entities/TMDB";
import APIClientTMDB from "@/services/apiClientTmdb";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const apiClient = new APIClientTMDB<TMDbResponse>(`/search/multi`);

const TMDB_API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDNiNzcxZTNmYjgxZjM1MWI1YWVjYmZjNmM0ZTY5MSIsInN1YiI6IjY1YWFjODNjNmFmOGY4MDEzMmJlODQxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A1XjEyLfAWrMEe8gnHaUPxjHkmg0h9JZhPznNbHgFqM";

const useSearchTMDb = (query: string) => {
  return useQuery<TMDbResponse, AxiosError>({
    queryKey: ["movieQuery", query],
    queryFn: () => {
      return apiClient.get({
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_API_KEY}`,
        },
        params: {
          query: query,
          include_adult: true,
        },
      });
    },
    staleTime: 0,
  });
};

export default useSearchTMDb;
