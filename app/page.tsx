import { ProcessedMovie } from "@/types/movie";
import Image from "next/image";

async function getMovies(): Promise<ProcessedMovie[]> {
  const res = await fetch(
    "https://fic7x30v7swdye53.public.blob.vercel-storage.com/berlin-movies.json",
    {
      next: { revalidate: 3600 }, // Revalidate every hour
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return res.json();
}

export default async function Home() {
  const movies = await getMovies();

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Berlin Cinema
          </h1>
          <p className="text-gray-400 text-lg">
            Discover the latest movies playing at Yorck Cinemas
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.02] border border-gray-700 flex flex-col"
            >
              <div className="relative aspect-[2/3]">
                {movie.image ? (
                  <Image
                    src={movie.image}
                    alt={movie.imageAlt || movie.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-500 italic">
                    No image available
                  </div>
                )}
                {movie.isYorckPick && (
                  <span className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    YORCK PICK
                  </span>
                )}
                {movie.fsk !== null && (
                  <span className="absolute top-4 right-4 bg-gray-900/80 text-white text-xs font-bold px-2 py-1 rounded border border-gray-600">
                    FSK {movie.fsk}
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-3">
                  <h2 className="text-xl font-bold line-clamp-2 leading-tight mb-1">
                    {movie.title}
                  </h2>
                  <p className="text-blue-400 text-sm italic line-clamp-1">
                    {movie.tagline}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-gray-700 text-gray-300 px-2 py-0.5 rounded-md uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                  {movie.runtime && (
                    <span className="text-[10px] bg-blue-900/30 text-blue-300 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {movie.runtime} min
                    </span>
                  )}
                </div>

                <div className="mt-auto">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                    Upcoming Sessions
                  </h3>
                  <div className="space-y-2">
                    {movie.sessions.slice(0, 2).map((session) => (
                      <div
                        key={session.id}
                        className="flex flex-col bg-gray-900/50 p-2 rounded-lg border border-gray-700/50"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-200">
                            {new Date(session.startTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          <span className="text-[10px] text-gray-500">
                            {new Date(session.startTime).toLocaleDateString([], {
                              day: "2-digit",
                              month: "short",
                            })}
                          </span>
                        </div>
                        <div className="text-[11px] text-gray-400 flex justify-between items-center">
                          <span className="truncate max-w-[120px]">
                            {session.cinema.name}
                          </span>
                          <span className="text-gray-600">
                            {session.formats.join(", ")}
                          </span>
                        </div>
                      </div>
                    ))}
                    {movie.sessions.length > 2 && (
                      <p className="text-center text-[10px] text-gray-500 mt-2">
                        + {movie.sessions.length - 2} more sessions
                      </p>
                    )}
                  </div>
                </div>

                <a
                  href={movie.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors duration-200 shadow-lg shadow-blue-900/20"
                >
                  Book Tickets
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
