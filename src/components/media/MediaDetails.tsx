import { StreamType } from "@/entities/Stream";
import useStreamSources from "@/hooks/stream/useStreamSources";
import { useStreamStore } from "@/stores";
import { Star } from "lucide-react";
import { H4, Muted } from "../Typography";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  type: StreamType;
  title: string;
  overview: string;
  episode?: number;
  season?: number;
}

const recommended = ["goojara", "showbox", "vidsrc"];

const MediaDetails = ({ type, title, overview, episode, season }: Props) => {
  const { data: sources, isLoading: sourcesAreLoading } = useStreamSources();

  const setSource = useStreamStore((state) => state.setSource);
  const setStreamIndex = useStreamStore((state) => state.setStreamIndex);
  const resetStreamStore = useStreamStore((state) => state.reset);
  const streamResponse = useStreamStore((state) => state.streamResponse);
  const streamIndex = useStreamStore((state) => state.streamIndex);

  return (
    <div>
      <div className="flex flex-row justify-between item flex-wrap">
        <div className="flex flex-row items-center space-x-2">
          <H4>{title}</H4>
          {type === StreamType.Show && (
            <Badge className="p-1 my-1" variant="secondary">
              S{season} E{episode}
            </Badge>
          )}
        </div>
        <div className="flex flex-row space-x-2 mb-1">
          <Select
            onValueChange={(value) => {
              resetStreamStore();
              setSource(value);
            }}
            disabled={streamResponse === null || sourcesAreLoading}
            value={streamResponse?.sourceId}
          >
            <SelectTrigger className=" md:w-[180px]">
              <SelectValue
                placeholder={
                  sourcesAreLoading ? "Loading..." : "Select a source"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sources</SelectLabel>
                {sources?.map((source) => (
                  <SelectItem key={source.id} value={source.id}>
                    <div className="flex flex-row">
                      {source.name.ucwords()}
                      {recommended.includes(source.name.toLowerCase()) && (<Star className="w-4 fill-yellow-500 stroke-yellow-500 pl-1" />)}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            disabled={
              streamResponse === null || streamResponse?.streams.length === 0
            }
            value={
              (streamResponse?.streams.length || -1) > 0
                ? streamIndex.toString()
                : undefined
            } // -1 to disable the select
            onValueChange={setStreamIndex}
          >
            <SelectTrigger className="md:w-[150px]">
              <SelectValue
                placeholder={
                  sourcesAreLoading ? "Loading..." : "Select a screen"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Screens</SelectLabel>
                {streamResponse?.streams.map((_stream, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    Screen #{index + 1}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Muted>{overview}</Muted>
    </div>
  );
};

export default MediaDetails;
