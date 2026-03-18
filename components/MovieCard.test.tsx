import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MovieCard } from '@/components/MovieCard'
import { ProcessedMovie } from '@/types/movie'

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string, alt: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} />
  },
}))

const mockMovie: ProcessedMovie = {
  id: "HO00005573",
  title: "The Testament of Ann Lee",
  link: "https://www.yorck.de/en/films/the-testament-of-ann-lee",
  sessions: [
    {
      id: "1013-5600",
      startTime: "2026-03-18T16:15:00+01:00",
      formats: ["DF"],
      cinema: {
        name: "Delphi Filmpalast",
        accessibility: "Not accessible"
      }
    }
  ],
  Title: "The Testament of Ann Lee",
  Year: "2025",
  Rated: "R",
  Released: "23 Jan 2026",
  Runtime: "137 min",
  Genre: "Biography, Drama, History",
  Director: "Mona Fastvold",
  Writer: "Brady Corbet, Mona Fastvold",
  Actors: "Amanda Seyfried, Lewis Pullman, Thomasin McKenzie",
  Plot: "Ann Lee, the founding leader of the Shaker Movement, is proclaimed as the female Christ by her followers.",
  Language: "English",
  Country: "United Kingdom, United States",
  Awards: "5 wins & 57 nominations total",
  Poster: "https://m.media-amazon.com/images/M/MV5BMTU3Y2U1MTQtYjA1NS00YmJlLTk3NDktZGViYTAwY2I0NDM1XkEyXkFqcGc@._V1_SX300.jpg",
  Ratings: [
    { Source: "Internet Movie Database", Value: "7.1/10" },
    { Source: "Rotten Tomatoes", Value: "89%" },
    { Source: "Metacritic", Value: "80/100" }
  ],
  Metascore: "80",
  imdbRating: "7.1",
  imdbVotes: "2,528",
  imdbID: "tt34819091",
  Type: "movie",
  DVD: "N/A",
  BoxOffice: "$2,515,020",
  Production: "N/A",
  Website: "N/A",
  Response: "True"
}

describe('MovieCard', () => {
  it('renders movie title and metadata correctly', () => {
    render(<MovieCard movie={mockMovie} />)

    expect(screen.getByText(mockMovie.Title)).toBeInTheDocument()
    expect(screen.getByText(mockMovie.Year)).toBeInTheDocument()
    expect(screen.getByText(/Biography, Drama, History/)).toBeInTheDocument()
    expect(screen.getByText(/137 min/)).toBeInTheDocument()
  })

  it('renders ratings when available', () => {
    render(<MovieCard movie={mockMovie} />)

    expect(screen.getByText('7.1/10')).toBeInTheDocument()
    expect(screen.getByText('89%')).toBeInTheDocument()
    expect(screen.getByText('80/100')).toBeInTheDocument()
  })

  it('renders sessions correctly', () => {
    render(<MovieCard movie={mockMovie} />)

    expect(screen.getByText('Delphi Filmpalast')).toBeInTheDocument()
    expect(screen.getByText('DF')).toBeInTheDocument()
  })

  it('cleans up backticks in link', () => {
    const movieWithBackticks = {
      ...mockMovie,
      link: " `https://example.com` "
    }
    render(<MovieCard movie={movieWithBackticks} />)

    const link = screen.getByRole('link', { name: /Book Tickets/i })
    expect(link).toHaveAttribute('href', 'https://example.com')
  })
})
