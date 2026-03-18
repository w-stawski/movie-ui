import Image from "next/image";
import { ProcessedMovie } from "@/types/movie";

interface MovieCardProps {
  movie: ProcessedMovie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative aspect-2/3 w-full">
        {movie.image ? (
          <Image
            src={movie.image}
            alt={movie.imageAlt || movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
            <span className="text-zinc-400">No image available</span>
          </div>
        )}
        {movie.isYorckPick && (
          <div className="absolute top-2 right-2 rounded-full bg-yellow-400 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-black shadow-sm">
            Yorck Pick
          </div>
        )}
        {movie.fsk && (
          <div className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            FSK {movie.fsk}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-semibold text-zinc-900 dark:text-zinc-50" title={movie.title}>
            {movie.title}
          </h3>
        </div>

        {movie.tagline && (
          <p className="mb-3 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
            {movie.tagline}
          </p>
        )}

        <div className="mb-4 flex flex-wrap gap-1">
          {movie.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Upcoming Sessions</p>
          <div className="max-h-32 overflow-y-auto space-y-2 pr-1">
            {movie.sessions.length > 0 ? (
              movie.sessions.slice(0, 3).map((session) => (
                <div key={session.id} className="flex flex-col rounded bg-zinc-50 p-2 dark:bg-zinc-800/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      {new Date(session.startTime).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' })}
                    </span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-500 truncate max-w-[120px]">
                      {session.cinema.name}
                    </span>
                    <div className="flex gap-1">
                      {session.formats.map(f => (
                        <span key={f} className="text-[8px] border border-zinc-300 dark:border-zinc-700 rounded px-1 text-zinc-400 uppercase">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-zinc-400 italic">No upcoming sessions</p>
            )}
            {movie.sessions.length > 3 && (
              <p className="text-[10px] text-center text-zinc-400 pt-1">
                + {movie.sessions.length - 3} more sessions
              </p>
            )}
          </div>
        </div>

        {movie.link && (
          <a
            href={movie.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block w-full rounded-lg bg-zinc-900 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Book Tickets
          </a>
        )}
      </div>
    </div>
  );
}
