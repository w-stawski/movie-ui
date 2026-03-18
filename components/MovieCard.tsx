import Image from "next/image";
import { ProcessedMovie } from "@/types/movie";

interface MovieCardProps {
  movie: ProcessedMovie;
}

export function MovieCard({ movie }: MovieCardProps) {
console.log(movie);

  // Clean up potential backticks in URLs from API data
  const cleanLink = movie.link?.replace(/[`\s]/g, "");
  const cleanPoster = movie.Poster?.replace(/[`\s]/g, "");

  const getRating = (source: string) => {
    return movie.Ratings?.find((r) => r.Source === source)?.Value;
  };

  const imdbRating = getRating("Internet Movie Database");
  const rtRating = getRating("Rotten Tomatoes");
  const metacriticRating = getRating("Metacritic");

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      {/* Poster Image */}
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        {cleanPoster && cleanPoster !== "N/A" ? (
          <Image
            src={cleanPoster}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
            <span className="text-zinc-400">No image available</span>
          </div>
        )}

        {/* Rating Badges Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {movie.Rated && movie.Rated !== "N/A" && (
            <span className="rounded bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md">
              {movie.Rated}
            </span>
          )}
        </div>

        {/* Scores Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-4 pt-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex justify-around gap-2 text-white">
            {imdbRating && (
              <div className="flex flex-col items-center" aria-label={`IMDb rating: ${imdbRating}`}>
                <span className="text-[10px] font-bold text-yellow-400">IMDb</span>
                <span className="text-xs font-semibold">{imdbRating}</span>
              </div>
            )}
            {rtRating && (
              <div className="flex flex-col items-center" aria-label={`Rotten Tomatoes rating: ${rtRating}`}>
                <span className="text-[10px] font-bold text-red-500">RT</span>
                <span className="text-xs font-semibold">{rtRating}</span>
              </div>
            )}
            {metacriticRating && (
              <div className="flex flex-col items-center" aria-label={`Metacritic rating: ${metacriticRating}`}>
                <span className="text-[10px] font-bold text-green-500">MC</span>
                <span className="text-xs font-semibold">{metacriticRating}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="line-clamp-1 text-lg font-bold text-zinc-900 dark:text-zinc-50" title={movie.title}>
              {movie.title}
            </h3>
            <span className="text-sm font-medium text-zinc-400">{movie.Year}</span>
          </div>
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {movie.Genre} • {movie.Runtime}
          </p>
        </div>

        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {movie.Plot}
        </p>

        {/* Upcoming Sessions Section */}
        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Upcoming Sessions
            </h4>
          </div>

          <div className="space-y-2">
            {movie.sessions.length > 0 ? (
              movie.sessions.slice(0, 2).map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between rounded-lg bg-zinc-50 p-2.5 transition-colors hover:bg-zinc-100 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/60"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {new Date(session.startTime).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="max-w-[100px] truncate text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
                      {session.cinema.name}
                    </span>
                    <div className="mt-0.5 flex gap-1">
                      {session.formats.map(f => (
                        <span key={f} className="rounded border border-zinc-200 px-1 text-[8px] font-bold uppercase text-zinc-400 dark:border-zinc-700">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-xs italic text-zinc-400">No sessions scheduled</p>
            )}

            {movie.sessions.length > 2 && (
              <p className="text-center text-[10px] font-medium text-zinc-400">
                + {movie.sessions.length - 2} more showtimes
              </p>
            )}
          </div>
        </div>

        {cleanLink && cleanLink !== "N/A" && (
          <a
            href={cleanLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex w-full items-center justify-center rounded-xl bg-zinc-900 py-3 text-sm font-bold text-white transition-all hover:bg-zinc-800 hover:shadow-lg active:scale-95 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Book Tickets
          </a>
        )}
      </div>
    </div>
  );
}
