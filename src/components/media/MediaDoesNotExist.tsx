import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FilmIcon } from "../Icons";
import { Button } from "../ui/button";

const MediaDoesNotExist = () => {
  return (
    <div className="flex flex-col items-center">
      <Alert className="w-full max-w-md p-6 rounded-lg border-none">
        <div className="flex items-center justify-center">
          <FilmIcon className="h-8 w-8 md:h-16 md:w-16 text-red-500" />
        </div>
        <AlertTitle className="mt-4 text-lg md:text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          Movie/Show Not Found
        </AlertTitle>
        <AlertDescription className="mt-2 text-xs md:text-sm text-center text-gray-700 dark:text-gray-300">
          We couldn't find the movie or show you were looking for. This could be
          because our proxy failed to find the requested media.
        </AlertDescription>
      </Alert>
      <div className="flex items-center justify-center">
        <Button variant="destructive" onClick={() => window.location.reload()}>
          Reload
        </Button>
      </div>
    </div>
  );
};

export default MediaDoesNotExist;
