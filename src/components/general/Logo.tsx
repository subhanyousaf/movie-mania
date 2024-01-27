import { FilmIcon } from "lucide-react";

const Logo = () => {
  return (
    <a className="flex flex-row items-center" href="/">
      <FilmIcon className="h-8 w-8 md:h-6 md:w-6" />
      <span className="ml-2 text-lg font-semibold">
        MovieMania
      </span>
    </a>
  );
};

export default Logo;
