import { useRecentEditingStore } from "@/stores";
import { motion } from "framer-motion";
import { DotIcon, Star, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { H4, Muted } from "../Typography";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardHeader, CardImage } from "../ui/card";
import { Progress } from "../ui/progress";
import { Skeleton } from "../ui/skeleton";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";

interface Props {
  id: string;
  thumbnail: string;
  title: string;
  type: string;
  year: string;
  rating: string;
  season?: number;
  episode?: number;
  progress?: number;
  isRecentCard?: boolean;
}

const MediaCard = ({
  id,
  thumbnail,
  title,
  type,
  year,
  rating,
  season,
  episode,
  progress,
  isRecentCard,
}: Props) => {
  const [imageLoaded, setImageLoaded] = useState(true);
  const { toast } = useToast();
  const inEditingMode = useRecentEditingStore((state) => state.editing);

  const newType = type === "Movie" ? "movie" : "show";

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-col justify-between h-[100%]"
    >
      <Card className="group border-none bg-transparent shadow-none hover:bg-secondary transition duration-300 ease-in-out">
        <NavLink
          to={
            "/" +
            newType +
            "/" +
            id +
            (season && episode && newType === "show"
              ? "/" + season + "/" + episode
              : "")
          }
        >
          <div className="transition-all duration-200 ease-in-out transform group-hover:scale-x-[85%] group-hover:scale-y-[89%]">
            {imageLoaded === false ? (
              <Skeleton className="rounded-xl h-72" />
            ) : (
              <div>
                <CardImage
                  className="rounded-xl object-contain"
                  src={thumbnail}
                  alt="move thumbnail"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageLoaded(false)}
                />

                {season && episode && (
                  <Badge
                    variant="default"
                    className="absolute top-2 right-2 font-bold"
                  >
                    S{season} E{episode}
                  </Badge>
                )}
                {progress && <Progress value={progress} className="mt-3 h-1" />}
              </div>
            )}
            <CardHeader className="py-2 px-0">
              <H4>{title}</H4>
              <div className="flex flex-row items-center p-0 m-0 flex-wrap">
                <Muted>{type}</Muted>
                <Muted>
                  <DotIcon />
                </Muted>
                <Muted>{year}</Muted>
                <Muted>
                  <DotIcon />
                </Muted>
                <Star className="w-4 fill-yellow-500 stroke-yellow-500 pr-1" />
                <Muted>{rating}</Muted>
              </div>
            </CardHeader>
          </div>
        </NavLink>
      </Card>

      {inEditingMode && isRecentCard && (
        <Button
          variant="outline"
          className="my-2"
          onClick={() =>
            toast({
              variant: "destructive",
              title: "Experimental",
              description: "Recents deletion coming soon!",
              action: <ToastAction altText="Dismiss">Try again</ToastAction>,
            })
          }
        >
          <Trash2Icon />
        </Button>
      )}
    </motion.div>
  );
};

export default MediaCard;
