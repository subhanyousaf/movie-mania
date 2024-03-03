import { H2, Muted } from "@/components/Typography";
import MediaCarouselItem from "@/components/media/MediaCarouselItem";
import MediaGrid from "@/components/media/MediaGrid";
import MediaTypeTabs from "@/components/media/MediaTypeTabs";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import RecentMedia from "@/entities/Media";
import useTrendingTMDb from "@/hooks/tmdb/useTrendingTMDb";
import { useRecentEditingStore } from "@/stores";
import { getRecents } from "@/utils/utils";
import { Pencil } from "lucide-react";

const Home = () => {
  const { data, error, isLoading } = useTrendingTMDb();
  const setEditing = useRecentEditingStore((state) => state.setEditing);
  const inEditingMode = useRecentEditingStore((state) => state.editing);

  const recents = getRecents() as RecentMedia[];

  return (
    <div className="flex flex-col space-y-4">
      {recents.length > 0 && (
        <div>
          <div className="flex flex-row justify-between items-center">
            <div>
              <H2>Recents</H2>
              <Muted>Movies & TV Shows that you watched recently</Muted>
            </div>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="outline"
                      className={`overflow-hidden rounded-lg transition-all duration-200 ${
                        inEditingMode ? "w-28" : "w-12"
                      }`}
                      onClick={() => setEditing(!inEditingMode)}
                    >
                      {inEditingMode ? "Cancel Editing" : <Pencil size={20} />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit Recents</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
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
