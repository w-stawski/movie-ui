import { ProcessedMovie } from "@/types/movie";

const API_BASE_URL = "http://localhost:3000/api";

export async function getMovies(): Promise<ProcessedMovie[]> {
  const token = process.env.MOVIE_API_TOKEN;

  if (!token) {
    console.warn("MOVIE_API_TOKEN is not set in environment variables");
  }

  try {
    const response = await fetch(`http://localhost:3000/movies`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data as ProcessedMovie[];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}
