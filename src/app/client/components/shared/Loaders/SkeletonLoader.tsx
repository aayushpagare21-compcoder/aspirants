// Skeleton loader component
export const SkeletonLoader = () => (
  <div className="w-full animate-pulse space-y-4 rounded-md border bg-gray-50 p-4">
    <div className="h-6 w-3/4 rounded bg-gray-200"></div>
    <div className="h-6 w-1/2 rounded bg-gray-200"></div>
    <div className="h-5 w-full rounded bg-gray-200"></div>
  </div>
);
