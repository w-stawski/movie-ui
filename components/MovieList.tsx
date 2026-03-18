import { MovieCard } from "./MovieCard";
import { ProcessedMovie } from "@/types/movie";

interface MovieListProps {
  movies: ProcessedMovie[];
}

export function MovieList({ movies }: MovieListProps) {
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">No movies found</h3>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
