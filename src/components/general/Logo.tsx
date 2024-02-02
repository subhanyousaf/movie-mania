import { FilmIcon } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex flex-row items-center">
      <FilmIcon className="h-8 w-8 md:h-6 md:w-6" />
      <span className="ml-2 text-lg font-semibold">MovieMania</span>
    </div>
  );
};

export default Logo;
