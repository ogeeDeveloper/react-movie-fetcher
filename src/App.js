import React, { useState } from "react"

import MoviesList from "./components/MoviesList"
import "./App.css"

function App() {
  // Create a state to old the movie results from the API result
  const [movie, setMovie] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMovieHandler = async () => {
    setIsLoading(true)
    const respose = await fetch(`https://swapi.dev/api/films`)
    const data = await respose.json() // Get thhe jsonn data from the API

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
    setIsLoading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movie.length > 0 && <MoviesList movies={movie} />}
        {!isLoading && movie.length === 0 && <p>Movie list is empty</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  )
}

export default App
