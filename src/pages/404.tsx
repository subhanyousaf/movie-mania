import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FourOFour = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen top-0 bottom-0 left-0 right-0 absolute">
      <div className="text-6xl md:text-9xl font-bold text-gray-900 dark:text-gray-100">
        404
      </div>
      <h1 className="text-2xl md:text-4xl font-bold mt-8 text-center">Oops!</h1>
      <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400 mt-2 text-center mx-4">
        Looks like you are lost in the streaming universe. Let's get you back.
      </p>
      <Link to="/">
        <Button className="mt-8">Take me back</Button>
      </Link>
    </main>
  );
};

export default FourOFour;
