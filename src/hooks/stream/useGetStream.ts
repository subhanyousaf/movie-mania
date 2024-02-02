import { Stream, StreamResponse } from "@/entities/Stream";
import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useGetStream = (payload: Stream, source: string = "") => {
  const apiClient = new APIClient<Stream, StreamResponse>(
    "/streams" + (source ? `/${source}` : "")
  );
  return useQuery<StreamResponse, AxiosError>({
    queryKey: ["stream", payload, source],
    queryFn: async () => {
      const data = await apiClient.post(payload);
      return data;
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export default useGetStream;
