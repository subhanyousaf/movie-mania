import { H2, Muted } from "@/components/Typography";
import MediaCarouselItem from "@/components/media/MediaCarouselItem";
import MediaGrid from "@/components/media/MediaGrid";
import MediaTypeTabs from "@/components/media/MediaTypeTabs";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import RecentMedia from "@/entities/Media";
import useTrendingTMDb from "@/hooks/tmdb/useTrendingTMDb";
import { getRecents } from "@/utils/utils";

const Home = () => {
  const { data, error, isLoading } = useTrendingTMDb();

  const recents = getRecents() as RecentMedia[];

  return (
    <div className="flex flex-col space-y-4">
      {recents.length > 0 && (
        <div>
          <H2>Recents</H2>
          <Muted>Movies & TV Shows that you watched recently</Muted>
          <Separator className="my-3" />
          <Carousel
            opts={{
              align: "start",
            }}
          >
            <CarouselContent>
              {recents.map((recent) => (
                <MediaCarouselItem
                  key={recent.tmdbId}
                  type={recent.type}
                  tmdbId={recent.tmdbId}
                  season={recent.season || undefined}
                  episode={recent.episode || undefined}
                  progress={recent.progress || undefined}
                />
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      )}
      <div>
        <H2>Trending</H2>
        <Muted>Movies & TV Shows that are trending this week.</Muted>
        <Separator className="my-3" />
        <MediaTypeTabs />
        <MediaGrid data={data} error={error} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Home;
