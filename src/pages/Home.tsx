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

const Home = () => {
  const { data, error, isLoading } = useTrendingTMDb();

  const recents: RecentMedia[] = JSON.parse(
    localStorage.getItem("recentMedia") || "[]"
  );

  return (
    <div className="flex flex-col">
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
                />
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
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
