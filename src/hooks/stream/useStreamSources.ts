import { StreamSource } from "@/entities/Stream";
import APIClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const apiClient = new APIClient<StreamSource[]>("/streams/sources");

const useStreamSources = () => {
  return useQuery<StreamSource[], AxiosError>({
    queryKey: ["streamSources"],
    queryFn: () => apiClient.get({}),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export default useStreamSources;
