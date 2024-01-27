import { Muted } from "@/components/Typography";
import MediaDetails from "@/components/media/MediaDetails";
import MediaLoadingError from "@/components/media/MediaLoadingError";
import MediaNotFound from "@/components/media/MediaNotFound";
import MediaPlayer from "@/components/media/MediaPlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import RecentMedia from "@/entities/Media";
import { Stream, StreamType } from "@/entities/Stream";
import { TMDbSeason } from "@/entities/TMDB";
import useTMDbDetails from "@/hooks/tmdb/useDetails";
import useTMDbSeason from "@/hooks/tmdb/useTMDbSeason";
import { TMDbTypes } from "@/stores";
import { getRecents } from "@/utils/utils";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

const Show = () => {
  const { tmdbId, seasonParam, episodeParam } = useParams<{
    tmdbId: string;
    seasonParam?: string;
    episodeParam?: string;
  }>();
  const [season, setSeason] = useState(parseInt(seasonParam ?? "1"));
  const [episode, setEpisode] = useState(parseInt(episodeParam ?? "1"));

  window.history.replaceState("", "", `/show/${tmdbId}/${season}/${episode}`);

  const { data, isLoading, error } = useTMDbDetails(TMDbTypes.TV, tmdbId!);
  const {
    data: seasonsData,
    isLoading: seasonsIsLoading,
    error: seasonsError,
  } = useTMDbSeason(TMDbTypes.TV, tmdbId!, season);

  if (isLoading || seasonsIsLoading) return <Loading />;
  if (error || seasonsError) return <MediaLoadingError />;
  if (!data || !seasonsData) return <MediaNotFound />;

  const stream: Stream = {
    type: StreamType.Show,
    title: data.name || data.original_title,
    releaseYear:
      parseInt(data.release_date?.substring(0, 4)) ||
      parseInt(data.first_air_date?.substring(0, 4)),
    tmdbId: tmdbId!,
    season: {
      number: season,
      tmdbId: seasonsData.id.toString(),
    },
    episode: {
      number: episode,
      tmdbId: seasonsData.episodes[0]?.id.toString(),
    },
  };

  const progress = (getRecents(tmdbId) as RecentMedia)?.progress;

  return (
    <div className="flex flex-col space-y-2">
      <Card className="flex flex-col md:flex-row overflow-hidden shadow-none">
        <MediaPlayer
          stream={stream}
          type={TMDbTypes.TV}
          recentProgress={progress}
        />
        <div className="md:w-[20%] md:max-w-[20%]">
          <CardHeader className="pb-4">
            <Select
              onValueChange={(value) => {
                setSeason(parseInt(value));
                setEpisode(1);
              }}
              defaultValue={season.toString()}
            >
              <SelectTrigger className="mb-2 border-none px-0 font-bold text-md focus:ring-0 shadow-none">
                <SelectValue
                  placeholder={
                    data.seasons.find((s) => s.season_number === season)
                      ?.name || "Season"
                  }
                />
              </SelectTrigger>
              <SelectContent defaultValue={season.toString()}>
                {data.seasons.map((seasonItem: TMDbSeason) => (
                  <SelectItem
                    key={seasonItem.season_number}
                    value={seasonItem.season_number.toString()}
                  >
                    {seasonItem.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Separator />
          </CardHeader>
          <CardContent className="px-4">
            <p className="px-2 pb-2 text-sm text-muted-foreground">
              Select an episode to watch.
            </p>
            <ScrollArea className="h-[20rem] md:h-[40rem]">
              {seasonsData.episodes.map((episodeData) => (
                <Button
                  size="lg"
                  variant="ghost"
                  className="flex flex-row items-center w-full text-left justify-start px-2 mt-2"
                  key={episodeData.episode_number}
                  onClick={() => setEpisode(episodeData.episode_number)}
                >
                  <span className="bg-gray-200 dark:bg-zinc-900 px-2 py-1.5 font-bold text-md rounded">
                    E{episodeData.episode_number}
                  </span>
                  <div className="flex flex-row ml-2 items-center justify-between w-full">
                    <div className="flex flex-col overflow-hidden truncate text-wrap">
                      <span
                        className={`text-md font-bold text-ellipsis overflow-hidden ${
                          episodeData.episode_number === episode &&
                          "text-green-700 dark:text-green-600"
                        }`}
                      >
                        {episodeData.name}
                      </span>
                      {episodeData.episode_number === episode && (
                        <Muted>Now playing...</Muted>
                      )}
                    </div>
                  </div>
                </Button>
              ))}
            </ScrollArea>
          </CardContent>
        </div>
      </Card>
      <MediaDetails
        type={StreamType.Show}
        title={data.name || data.original_title}
        overview={data.overview}
        episode={episode}
        season={season}
      />
    </div>
  );
};

export default Show;
