import MediaPlayer from "@/components/media/MediaPlayer";
import { Stream, StreamType } from "@/entities/Stream";
import useTMDbDetails from "@/hooks/tmdb/useDetails";
import { TMDbTypes } from "@/stores";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

const Movie = () => {
  const { tmdbId } = useParams<{ tmdbId: string }>();
  const { data, isLoading, error } = useTMDbDetails(TMDbTypes.MOVIE, tmdbId!);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Something went wrong...</div>;

  const stream: Stream = {
    type: StreamType.Movie,
    title: data.title || data.original_title,
    releaseYear:
      parseInt(data.release_date?.substring(0, 4)) ||
      parseInt(data.first_air_date?.substring(0, 4)),
    tmdbId: tmdbId!,
  };

  return <MediaPlayer stream={stream} />;
};

export default Movie;
