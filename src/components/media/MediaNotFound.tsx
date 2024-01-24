import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MicroscopeIcon } from "../Icons";

const MediaNotFound = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Alert className="w-full max-w-md p-6 rounded-lg border-none">
        <div className="flex items-center justify-center">
          <MicroscopeIcon className="h-16 w-16 text-zinc-500" />
        </div>
        <AlertTitle className="mt-4 text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          Nothing to see here.
        </AlertTitle>
        <AlertDescription className="mt-2 text-center text-gray-700 dark:text-gray-300">
          Your search did not return any results. Please try again with
          different keywords.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default MediaNotFound;
