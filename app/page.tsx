import { ProcessedMovie } from "@/types/movie";
import { MovieCard } from "@/components/MovieCard";

async function getMovies(): Promise<ProcessedMovie[]> {
  const res = await fetch(
    "https://movie-check-api.vercel.app/movies"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return res.json();
}

export default async function Home() {
  const movies = await getMovies();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-zinc-100 selection:text-zinc-900">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <header className="relative mb-20 flex flex-col items-center text-center">
          <div className="absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-zinc-500/10 blur-[100px]" />

          <h1 className="mb-6 text-6xl font-black tracking-tight sm:text-7xl">
            <span className="block text-zinc-400">Yorck</span>
            <span className="bg-linear-to-b from-white to-zinc-500 bg-clip-text text-transparent">
              Cinema Guide
            </span>
          </h1>

          <p className="max-w-xl text-lg font-medium text-zinc-400">
            Your daily companion for Berlin&apos;s finest independent cinema showtimes and ratings.
          </p>

          <div className="mt-8 flex gap-4">
            <div className="flex flex-col items-center gap-1 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-6 py-3 backdrop-blur-sm">
              <span className="text-2xl font-bold">{movies.length}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Movies Now Playing</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-2xl border border-zinc-800 bg-zinc-900/50 px-6 py-3 backdrop-blur-sm">
              <span className="text-2xl font-bold">
                {movies.reduce((acc, m) => acc + m.sessions.length, 0)}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Weekly Sessions</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <footer className="mt-24 border-t border-zinc-900 pt-12 text-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Berlin Cinema. All rights reserved.</p>
          <p className="mt-2">Data provided by Yorck Kinos and OMDB.</p>
        </footer>
      </div>
    </main>
  );
}
