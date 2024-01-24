import { Stream } from "@/entities/Stream";
import useGetStream from "@/hooks/stream/useGetStream";
import { formatTime, getEnCaptionUrl } from "@/utils/utils";
import { PopoverTrigger } from "@radix-ui/react-popover";
import {
  ArrowLeft,
  CheckIcon,
  Disc3,
  FullscreenIcon,
  KeyboardIcon,
  Loader2,
  PauseIcon,
  PlayIcon,
  RotateCcwIcon,
  RotateCwIcon,
  Settings,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import { TrackProps } from "react-player/file";
import Keyboard from "../nav/Keyboard";
import Logo from "../nav/Logo";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { Popover, PopoverContent } from "../ui/popover";
import { Slider } from "../ui/slider";
import Loading from "@/pages/Loading";

interface Props {
  stream: Stream;
}

const MediaPlayer = ({ stream }: Props) => {
  const { data, error, isLoading } = useGetStream(stream);
  const [playerConfig, setPlayerConfig] = useState({
    playing: true,
    played: 0,
    seeking: false,
    buffering: true,
    muted: false,
    captionsEnabled: false,
  });
  const playerRef = useRef<ReactPlayer>(null);
  const handle = useFullScreenHandle();

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Something went wrong...</div>;

  let url;
  if (data?.stream.type === "file") {
    url = data.stream.qualities["1080"]?.url;
  }

  if (data?.stream.type === "hls") {
    url = data.stream.playlist;
  }

  const playPauseHandler = () => {
    setPlayerConfig({
      ...playerConfig,
      playing: !playerConfig.playing,
    });
  };

  const forwardHandler = (action: "forward" | "backward") => {
    playerRef?.current?.seekTo(
      playerRef.current.getCurrentTime() + (action === "forward" ? 10 : -5)
    );
  };

  const progressHandler = (state: OnProgressProps) => {
    if (!playerConfig.seeking) {
      setPlayerConfig({
        ...playerConfig,
        ...state,
      });
    }
  };

  const seekHandler = (value: number) => {
    setPlayerConfig({ ...playerConfig, played: value / 100 });
  };

  const seekMouseUpHandler = (value: number) => {
    setPlayerConfig({ ...playerConfig, seeking: false });
    playerRef?.current?.seekTo(value / 100);
  };

  const bufferingHandler = (state: boolean) => {
    setPlayerConfig({ ...playerConfig, buffering: state });
  };

  const muteHandler = () => {
    setPlayerConfig({ ...playerConfig, muted: !playerConfig.muted });
  };

  const keyDownHandler = (keyCode: string) => {
    if (keyCode === "Space") {
      playPauseHandler();
    }
    if (keyCode === "ArrowRight") {
      forwardHandler("forward");
    }
    if (keyCode === "ArrowLeft") {
      forwardHandler("backward");
    }
    if (keyCode === "KeyM") {
      muteHandler();
    }
    if (keyCode === "KeyF") {
      handle.active ? handle.exit() : handle.enter();
    }
  };

  const hlsQualityHandler = (quality: string) => {
    const qualityIndex = playerRef.current
      ?.getInternalPlayer("hls")
      .levels.findIndex(
        (level: { height: string }) => level.height === quality
      );
    playerRef.current!.getInternalPlayer("hls").currentLevel = qualityIndex;
  };

  const captions: TrackProps[] = [];
  if (data?.stream.captions.length > 0 && playerConfig.captionsEnabled) {
    console.log("cappptuions");
    const enCaption = getEnCaptionUrl(data?.stream.captions);
    if (enCaption) {
      console.log("founddd");
      captions.push({
        kind: "subtitles",
        src: enCaption.url,
        srcLang: "en",
        default: true,
        label: "English",
      });
    }
  }

  const currentTime = playerRef?.current
    ? playerRef.current.getCurrentTime()
    : "00:00";
  const duration = playerRef?.current
    ? playerRef.current.getDuration()
    : "00:00";

  const shortcuts = [
    {
      key: "Space",
      action: "Pause & Play",
      separator: true,
    },
    {
      key: "Arrow Right",
      action: "Forward",
      separator: true,
    },
    {
      key: "Arrow Left",
      action: "Rewind",
      separator: true,
    },
    {
      key: "M",
      action: "Mute",
      separator: true,
    },
    {
      key: "F",
      action: "Fullscreen",
      separator: false,
    },
  ];

  const hlsQualities = playerRef.current
    ?.getInternalPlayer("hls")
    ?.levels?.map((level: { height: string }) => level.height);

  return (
    <FullScreen handle={handle}>
      <div
        className="relative bg-black"
        tabIndex={0}
        onKeyDown={(event) => keyDownHandler(event.code)}
      >
        <ReactPlayer
          ref={playerRef}
          url={url}
          width={"100vw"}
          height={"100vh"}
          playing={playerConfig.playing}
          onProgress={progressHandler}
          onBuffer={() => bufferingHandler(true)}
          onBufferEnd={() => {
            bufferingHandler(false);
          }}
          muted={playerConfig.muted}
          volume={1}
        />

        <div
          className={`opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out absolute top-0 bottom-0 right-0 left-0 flex flex-col z-10 justify-between mx-5`}
          onClick={(event) => {
            playPauseHandler();
            event.stopPropagation();
          }}
        >
          <div className="flex items-center justify-between mt-3">
            <Breadcrumb className="text-xl" separator={"/"}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-md flex flex-row items-center"
                >
                  <ArrowLeft className="mt-1 mr-1" />
                  Back to home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink
                  href={`/movie/${stream.tmdbId}`}
                  className="text-md"
                >
                  {stream.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <div className="bg-zinc-500 bg-opacity-20 px-2 py-2 rounded-xl">
              <Logo />
            </div>
          </div>
          {playerConfig.buffering && (
            <div className="flex items-center justify-center">
              <Disc3 className="animate-spin h-12 w-12 opacity-100" />
            </div>
          )}
          <div className="space-y-2 mb-2">
            <Slider
              defaultValue={[0]}
              value={[playerConfig.played * 100]}
              max={100}
              step={0.1}
              onValueChange={(value) => seekHandler(value[0])}
              onValueCommit={(value) => seekMouseUpHandler(value[0])}
              onClick={(event) => event.stopPropagation()}
            />
            <div className="flex flex-row justify-between">
              <div className="flex flex-row space-x-6 items-center">
                <Button
                  variant="ghost"
                  className="px-1"
                  onClick={() => playPauseHandler()}
                >
                  {playerConfig.playing ? (
                    <PauseIcon className="fill-white" />
                  ) : (
                    <PlayIcon className="fill-white" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  className="px-1"
                  onClick={(event) => {
                    forwardHandler("backward");
                    event.stopPropagation();
                  }}
                >
                  <RotateCcwIcon />
                </Button>
                <Button
                  variant="ghost"
                  className="px-1"
                  onClick={(event) => {
                    forwardHandler("forward");
                    event.stopPropagation();
                  }}
                >
                  <RotateCwIcon />
                </Button>
                <Button
                  variant="ghost"
                  className="px-1"
                  onClick={(event) => {
                    muteHandler();
                    event.stopPropagation();
                  }}
                >
                  {playerConfig.muted ? (
                    <VolumeXIcon className="text-red" />
                  ) : (
                    <Volume2Icon />
                  )}
                </Button>
                <div className="flex flex-row">
                  {formatTime(currentTime as number)} /{" "}
                  {formatTime(duration as number)}
                  {playerConfig.buffering && (
                    <Loader2 className="ml-3 animate-spin" />
                  )}
                </div>
              </div>
              <div className="flex flex-row space-x-6">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="px-1">
                      <KeyboardIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-2 pb-2">
                      <h4 className="font-bold leading-none">Shortcuts</h4>
                      <p className="text-sm text-muted-foreground">
                        Use the following shortcuts to control the player.
                      </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {shortcuts.map((shortcut) => (
                        <div key={shortcut.action}>
                          <Keyboard>{shortcut.key}</Keyboard>
                          <span className="pl-1">{shortcut.action}</span>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="px-1">
                      <Settings />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-2 pb-2">
                      <h4 className="font-bold leading-none">Qualities</h4>
                      <p className="text-sm text-muted-foreground">
                        Select a video quality that matches your needs!
                      </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {data?.stream.type === "hls" ? (
                        hlsQualities?.reverse()?.map((quality: string) => (
                          <Button
                            key={quality}
                            onClick={() => hlsQualityHandler(quality)}
                          >
                            {quality}p{" "}
                            {playerRef?.current?.getInternalPlayer("hls")
                              .currentLevel ===
                              playerRef?.current
                                ?.getInternalPlayer("hls")
                                .levels.findIndex(
                                  (level: { height: string }) =>
                                    level.height === quality
                                ) && <CheckIcon className="h-5 w-5 pt-1" />}
                          </Button>
                        ))
                      ) : (
                        <span>No qualities available for this.</span>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
                <Button
                  variant="ghost"
                  className="px-1"
                  onClick={(event) => {
                    handle.active ? handle.exit() : handle.enter();
                    event.stopPropagation();
                  }}
                >
                  <FullscreenIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FullScreen>
  );
};

export default MediaPlayer;
