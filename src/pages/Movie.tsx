import MediaDetails from "@/components/media/MediaDetails";
import MediaPlayer from "@/components/media/MediaPlayer";
import { Stream, StreamType } from "@/entities/Stream";
import useTMDbDetails from "@/hooks/tmdb/useDetails";
import { TMDbTypes } from "@/stores";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import MediaLoadingError from "@/components/media/MediaLoadingError";

const Movie = () => {
  const { tmdbId } = useParams<{ tmdbId: string }>();
  const { data, isLoading, error } = useTMDbDetails(TMDbTypes.MOVIE, tmdbId!);

  if (isLoading) return <Loading />;
  if (error) return <MediaLoadingError />;
  if (!data) return <div>Something went wrong...</div>;

  const stream: Stream = {
    type: StreamType.Movie,
    title: data.title || data.original_title,
    releaseYear:
      parseInt(data.release_date?.substring(0, 4)) ||
      parseInt(data.first_air_date?.substring(0, 4)),
    tmdbId: tmdbId!,
  };

  return (
    <div className="flex flex-col space-y-2">
      <MediaPlayer stream={stream} type={TMDbTypes.MOVIE} />
      <MediaDetails
        type={StreamType.Movie}
        title={stream.title}
        overview={data.overview}
      />
    </div>
  );
};

export default Movie;
