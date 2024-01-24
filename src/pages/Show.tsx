import MediaPlayer from "@/components/media/MediaPlayer";
import { Stream, StreamType } from "@/entities/Stream";
import useTMDbDetails from "@/hooks/tmdb/useDetails";
import useTMDbSeason from "@/hooks/tmdb/useTMDbSeason";
import { TMDbTypes } from "@/stores";
import { useParams } from "react-router-dom";

const Show = () => {
  const { tmdbId } = useParams<{ tmdbId: string }>();
  const { data, isLoading, error } = useTMDbDetails(TMDbTypes.TV, tmdbId!);
  const {
    data: seasonsData,
    isLoading: seasonsIsLoading,
    error: seasonsError,
  } = useTMDbSeason(TMDbTypes.TV, tmdbId!, 1);

  if (isLoading || seasonsIsLoading) return <div>Loading...</div>;
  if (error || seasonsError)
    return <div>Error: {error?.message || seasonsError?.message}</div>;
  if (!data || !seasonsData) return <div>Something went wrong...</div>;

  const stream: Stream = {
    type: StreamType.Show,
    title: data.name || data.original_title,
    releaseYear:
      parseInt(data.release_date?.substring(0, 4)) ||
      parseInt(data.first_air_date?.substring(0, 4)),
    tmdbId: tmdbId!,
    season: {
      number: 1,
      tmdbId: seasonsData.id.toString(),
    },
    episode: {
      number: 1,
      tmdbId: seasonsData.episodes[0].id.toString(),
    },
  };

  return <MediaPlayer stream={stream} />;
};

export default Show;
