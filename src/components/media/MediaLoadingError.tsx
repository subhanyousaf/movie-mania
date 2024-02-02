import { AlertTriangleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

const MediaLoadingError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Alert className="w-full max-w-md p-6 rounded-lg shadow-none border-none">
        <div className="flex items-center justify-center">
          <AlertTriangleIcon className="h-16 w-16 text-red-500" />
        </div>
        <AlertTitle className="mt-4 text-2xl font-bold text-center text-foreground">
          Oops! Something went wrong.
        </AlertTitle>
        <AlertDescription className="mt-2 text-center text-muted-foreground">
          We're sorry for the inconvenience. Our team has been notified and will
          fix the issue as soon as possible.
        </AlertDescription>
        <div className="flex items-center justify-center mt-6">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.reload()}
          >
            Reload
          </Button>
        </div>
      </Alert>
    </div>
  );
};

export default MediaLoadingError;
