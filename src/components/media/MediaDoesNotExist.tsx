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
        <AlertTitle className="mt-4 text-lg md:text-2xl font-bold text-center text-foreground">
          Movie/Show Not Found
        </AlertTitle>
        <AlertDescription className="mt-2 text-xs md:text-sm text-center text-muted-foreground">
          We couldn't find the movie or show you were looking for. Try changing the source or screen.
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
