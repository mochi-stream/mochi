/**
 * Activity component that displays the latest activity of a user.
 *
 * @returns The Activity component.
 */
export default function Activity() {
  return (
    <div className="py-6 flex flex-col space-y-2">
      <div>
        <h1 className="text-2xl font-medium">Latest Activity</h1>
      </div>
    </div>
  );
}

/**
 * Skeleton component for the Activity component.
 *
 * @returns The ActivitySkeleton component.
 */
export function ActivitySkeleton() {
  return <></>;
}
