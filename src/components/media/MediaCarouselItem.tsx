import useTMDbDetails from "@/hooks/tmdb/useDetails";
import { TMDbTypes } from "@/stores";
import { getTmdbImageURL } from "@/utils/utils";
import { CarouselItem } from "../ui/carousel";
import MediaCard from "./MediaCard";

interface Props {
  tmdbId: string;
  type: string;
}

const MediaCarouselItem = ({ tmdbId, type }: Props) => {
  const { data } = useTMDbDetails(type as TMDbTypes, tmdbId!);

  if (data === undefined) return null;

  return (
    <CarouselItem className="basis-[50%] sm:basis-[33.4%] md:basis-[25%] lg:basis-[20%] xl:basis-[14.5%]">
      <MediaCard
        key={data.id}
        id={data.id.toString()}
        thumbnail={getTmdbImageURL(data.poster_path || data.backdrop_path)}
        title={data.title || data.name}
        type={type.ucwords() as TMDbTypes}
        rating={(data.vote_average || 0).toFixed(1).toString()}
        year={
          data.release_date?.substring(0, 4) ||
          data.first_air_date?.substring(0, 4)
        }
      />
    </CarouselItem>
  );
};

export default MediaCarouselItem;
