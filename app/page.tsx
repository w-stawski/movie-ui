import { getMovies } from "@/lib/api";
import { MovieList } from "@/components/MovieList";

export default async function Home() {
  const movies = await getMovies();

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center">
              <span className="text-white dark:text-black font-bold">M</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Berlin Movie Guide
            </h1>
          </div>
          <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {movies.length} movies currently playing
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Currently Showing in Yorck Cinemas
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Discover the latest films, sessions, and book your tickets directly at Yorck cinemas across Berlin.
          </p>
        </div>

        <MovieList movies={movies} />
      </main>

      <footer className="mt-20 border-t border-zinc-200 py-12 dark:border-zinc-800">
        <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} Berlin Movie Guide. Data provided by Yorck Cinemas.
          </p>
        </div>
      </footer>
    </div>
  );
}
