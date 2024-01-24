import { motion } from "framer-motion";
import { DotIcon, Star } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { H4, Muted } from "../Typography";
import { Card, CardHeader, CardImage } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface Props {
  id: string;
  thumbnail: string;
  title: string;
  type: string;
  year: string;
  rating: string;
}

const MediaCard = ({ id, thumbnail, title, type, year, rating }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(true);
  const newType = type === "Movie" ? "movie" : "show";

  return (
    <motion.div
      key={Math.random()} // This is a hack to force the component to re-render when the route changes
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Card className="border-none shadow-none px-3 py-1 hover:bg-zinc-200 dark:hover:bg-zinc-900 transition duration-300 ease-in-out">
        <NavLink to={"/" + newType + "/" + id}>
          <div
            className="transition-all duration-200 ease-in-out transform hover:scale-90"
            onClick={() => console.log(3)}
          >
            {imageLoaded === false ? (
              <Skeleton className="rounded-xl h-72" />
            ) : (
              <CardImage
                className="rounded-xl object-contain"
                src={thumbnail}
                alt="move thumbnail"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(false)}
              />
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
    </motion.div>
  );
};

export default MediaCard;
