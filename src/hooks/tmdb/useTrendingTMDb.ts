import { TMDbResponse } from "@/entities/TMDB";
import APIClientTMDB from "@/services/apiClientTmdb";
import { useTMDbStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const TMDB_API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDNiNzcxZTNmYjgxZjM1MWI1YWVjYmZjNmM0ZTY5MSIsInN1YiI6IjY1YWFjODNjNmFmOGY4MDEzMmJlODQxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A1XjEyLfAWrMEe8gnHaUPxjHkmg0h9JZhPznNbHgFqM";

const useTrendingTMDb = () => {
  const { sortBy } = useTMDbStore();
  return useQuery<TMDbResponse, AxiosError>({
    queryKey: ["movieQuery", sortBy],
    queryFn: () => {
      const apiClient = new APIClientTMDB<TMDbResponse>(
        `/trending/${sortBy}/week`
      );
      return apiClient.get({
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_API_KEY}`,
        },
      });
    },
    staleTime: 0,
  });
};

export default useTrendingTMDb;
