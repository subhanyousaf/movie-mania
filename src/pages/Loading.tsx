const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin h-12 w-12 rounded-full border-t-2 border-gray-900 dark:border-gray-50" />
      <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-gray-50">
        Loading...
      </h1>
    </div>
  );
};

export default Loading;
