import { Stream, StreamResponse } from "@/entities/Stream";
import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const apiClient = new APIClient<Stream, StreamResponse>("/streams");

const useGetStream = (payload: Stream) => {
  return useQuery<StreamResponse, AxiosError>({
    queryKey: ["stream", payload],
    queryFn: () => {
      return apiClient.post(payload);
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export default useGetStream;
