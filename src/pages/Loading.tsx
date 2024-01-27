import { FilmIcon } from "@/components/Icons";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen animate-bounce">
      <FilmIcon className="h-8 w-8 md:h-10 md:w-10 animate-spin" />
    </div>
  );
};

export default Loading;
