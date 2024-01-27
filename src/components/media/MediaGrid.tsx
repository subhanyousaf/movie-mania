import { TMDbResponse } from "@/entities/TMDB";
import { getTmdbImageURL } from "@/utils/utils";
import { AxiosError } from "axios";
import MediaCard from "./MediaCard";
import MediaCardSkeleton from "./MediaCardSkeleton";
import MediaLoadingError from "./MediaLoadingError";
import MediaNotFound from "./MediaNotFound";

interface Props {
  data: TMDbResponse | undefined;
  error: AxiosError | null;
  isLoading: boolean;
}

const MediaGrid = ({ data, error, isLoading }: Props) => {
  const skeletons = Array.from({ length: 20 }, (_, i) => i);

  if (error) return <MediaLoadingError />;

  if (data && data.results.length === 0) {
    return <MediaNotFound />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 py-4 md:py-6">
      {isLoading && skeletons.map((_, i) => <MediaCardSkeleton key={i} />)}
      {data?.results.map((media) => (
        <MediaCard
          key={media.id}
          id={media.id.toString()}
          thumbnail={getTmdbImageURL(media.poster_path || media.backdrop_path)}
          title={media.title || media.name}
          type={media.media_type.ucwords()}
          rating={(media.vote_average || 0).toFixed(1).toString()}
          year={
            media.release_date?.substring(0, 4) ||
            media.first_air_date?.substring(0, 4)
          }
        />
      ))}
    </div>
  );
};

export default MediaGrid;
