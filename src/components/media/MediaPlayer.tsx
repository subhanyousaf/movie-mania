import { Stream } from "@/entities/Stream";
import useGetStream from "@/hooks/stream/useGetStream";
import { TMDbTypes } from "@/stores";
import ReactPlayer from "react-player";
import { Skeleton } from "../ui/skeleton";
import MediaDoesNotExist from "./MediaDoesNotExist";
import RecentMedia from "@/entities/Media";

interface Props {
  stream: Stream;
  type: TMDbTypes;
}

const MediaPlayer = ({ stream, type }: Props) => {
  const { data, error, isLoading } = useGetStream(stream);

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
  if (!data) return <div>Something went wrong...</div>;

  let url;
  if (data?.stream.type === "file") {
    url = data.stream.qualities["1080"]?.url;
  }

  if (data?.stream.type === "hls") {
    url = data.stream.playlist;
  }

  if (data && stream.tmdbId) {
    const recentMedia: RecentMedia[] = JSON.parse(
      localStorage.getItem("recentMedia") || "[]"
    );
    const existingIndex = recentMedia.findIndex(
      (item) => item.tmdbId === stream.tmdbId && item.type === type
    );
    if (existingIndex !== -1) {
      recentMedia.splice(existingIndex, 1);
    }
    recentMedia.unshift({
      tmdbId: stream.tmdbId,
      type: type,
    });
    const truncatedRecentMedia = recentMedia.slice(0, 10);
    localStorage.setItem("recentMedia", JSON.stringify(truncatedRecentMedia));
  }

  return (
    <div className="w-full h-auto bg-black">
      <ReactPlayer
        url={url}
        playsinline={true}
        playing={true}
        controls={true}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default MediaPlayer;
