import React, { useState, useEffect, useCallback } from "react"

import MoviesList from "./components/MoviesList"
import "./App.css"

function App() {
  // Create a state to old the movie results from the API result
  const [movie, setMovie] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const respose = await fetch(`https://swapi.dev/api/films`)

      if (!respose.ok) {
        throw new Error("Something went wrong, please try again later")
      }

      const data = await respose.json() // Get the jsonn data from the API

      // Parse Result
      const transformedData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          release_date: movieData.release_date,
        }
      })
      setMovie(transformedData)
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchMovieHandler()
  }, [fetchMovieHandler])

  let content = <p>Movie list is empty</p>

  if (movie.length > 0) {
    content = <MoviesList movies={movie} />
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  )
}

export default App
