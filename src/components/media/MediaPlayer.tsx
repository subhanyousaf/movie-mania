import RecentMedia from "@/entities/Media";
import { Stream } from "@/entities/Stream";
import useGetStream from "@/hooks/stream/useGetStream";
import { TMDbTypes } from "@/stores";
import { getRecents } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Skeleton } from "../ui/skeleton";
import MediaDoesNotExist from "./MediaDoesNotExist";

interface Props {
  stream: Stream;
  type: TMDbTypes;
  recentProgress?: number;
}

const MediaPlayer = ({ stream, type, recentProgress }: Props) => {
  const { data, error, isLoading } = useGetStream(stream);
  const [progress, setProgress] = useState(recentProgress || 0);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    if (recentProgress && playerReady) {
      playerRef.current?.seekTo(recentProgress / 100, "fraction");
    }
  }, [playerReady, recentProgress]);

  if (isLoading)
    return (
      <Skeleton className="h-52 w-auto md:h-auto md:w-full rounded-none" />
    );
  if (error)
    return (
      <div className="flex justify-center items-center w-full md:border-r-2">
        <MediaDoesNotExist />
      </div>
    );
  if (!data)
    return (
      <div className="flex justify-center items-center w-full md:border-r-2">
        <MediaDoesNotExist />
      </div>
    );

  let url;
  if (data?.stream.type === "file") {
    url =
      data.stream.qualities["1080"]?.url ||
      data.stream.qualities["720"]?.url ||
      data.stream.qualities["480"]?.url ||
      data.stream.qualities["360"]?.url;
  }

  if (data?.stream.type === "hls") {
    url = data.stream.playlist;
  }

  if (data && stream.tmdbId) {
    const recentMedia = getRecents() as RecentMedia[];

    const existingIndex = recentMedia.findIndex(
      (item) => item.tmdbId === stream.tmdbId && item.type === type
    );

    if (existingIndex !== -1) {
      recentMedia.splice(existingIndex, 1);
    }

    const mediaData: RecentMedia = {
      tmdbId: stream.tmdbId,
      type: type,
      progress: progress,
    };

    if (type === TMDbTypes.TV) {
      mediaData.season = stream.season?.number;
      mediaData.episode = stream.episode?.number;
    }

    recentMedia.unshift(mediaData);

    const truncatedRecentMedia = recentMedia.slice(0, 10);
    localStorage.setItem("recentMedia", JSON.stringify(truncatedRecentMedia));
  }

  return (
    <div className="w-full h-auto bg-black">
      <ReactPlayer
        ref={playerRef}
        url={url}
        playsinline={true}
        playing={true}
        controls={true}
        width="100%"
        height="100%"
        onProgress={(state) => setProgress(state.played * 100)}
        onReady={() => setPlayerReady(true)}
      />
    </div>
  );
};

export default MediaPlayer;
