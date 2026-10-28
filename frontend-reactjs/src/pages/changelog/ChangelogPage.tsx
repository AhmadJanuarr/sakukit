import { APP_RELEASES, UpdateStatus } from "@/constants/updates";

const getStatusTextColor = (status: UpdateStatus) => {
  switch (status) {
    case "NEW":
      return "text-green-600 dark:text-green-400";
    case "UPDATE":
      return "text-blue-600 dark:text-blue-400";
    case "REFACTOR":
      return "text-orange-600 dark:text-orange-400";
    case "FIX":
      return "text-red-600 dark:text-red-400";
    default:
      return "text-stone-600 dark:text-stone-400";
  }
};

export default function ChangelogPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl pt-10 pb-20">
      <div className="xl:mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900 capitalize xl:text-[82px] xl:leading-[1.1] dark:text-white">
          What's New
        </h1>
      </div>

      <div className="flex flex-col">
        {APP_RELEASES.map((release) => {
          const groupedUpdatesByStatus = release.updates.reduce(
            (acc, update) => {
              if (!acc[update.status]) acc[update.status] = [];
              acc[update.status].push(update.message);
              return acc;
            },
            {} as Record<string, string[]>,
          );

          return (
            <div
              key={release.version}
              className="group border-b border-stone-200 py-12 last:border-0 dark:border-stone-800"
            >
              <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
                <h2 className="text-2xl font-semibold tracking-wider">{release.version}</h2>
                <span>Dirilis pada {release.date}</span>
              </div>
              <div className="space-y-8">
                {Object.entries(groupedUpdatesByStatus).map(([status, messages]) => (
                  <div key={status} className="flex flex-col gap-2 sm:flex-row sm:gap-8">
                    <div className="w-24 shrink-0 sm:pt-1">
                      <span
                        className={`text-xs font-semibold tracking-widest uppercase ${getStatusTextColor(status as UpdateStatus)}`}
                      >
                        {status}
                      </span>
                    </div>
                    <ul className="flex-1 space-y-3">
                      {messages.map((msg, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-stone-700 sm:text-base dark:text-stone-300"
                        >
                          <span>{msg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
