import { StreamType } from "@/entities/Stream";
import { H4, Muted } from "../Typography";
import { Badge } from "../ui/badge";

interface Props {
  type: StreamType;
  title: string;
  overview: string;
  episode?: number;
  season?: number;
}

const MediaDetails = ({ type, title, overview, episode, season }: Props) => {
  return (
    <div>
      <div className="flex flex-row items-center space-x-2">
        <H4>{title}</H4>
        {type === StreamType.Show && (
          <Badge className="p-1 mt-1" variant="secondary">
            S{season} E{episode}
          </Badge>
        )}
      </div>
      <Muted>{overview}</Muted>
    </div>
  );
};

export default MediaDetails;
