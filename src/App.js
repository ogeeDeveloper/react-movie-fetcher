import React, { useState, useEffect, useCallback } from "react"

import MoviesList from "./components/MoviesList"
import AddMovie from "./components/AddMovie"
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
      const respose = await fetch(
        `https://react-movie-practice-default-rtdb.firebaseio.com/movies.json`
      )

      if (!respose.ok) {
        throw new Error("Something went wrong, please try again later")
      }

      const data = await respose.json() // Get the jsonn data from the API

      //Fetch movies from the data object
      const loadAllMovies = []

      for (const key in data) {
        loadAllMovies.push({
          id: key,
          title: data[key].title, // Get the name of the movie on the given ID in data
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText,
        })
      }

      // Parse Result
      setMovie(loadAllMovies)
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchMovieHandler()
  }, [fetchMovieHandler])

  const addMovieHandler = async (movie) => {
    const res = await fetch(
      `https://react-movie-practice-default-rtdb.firebaseio.com/movies.json`,
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const data = await res.json()
    console.log(data)
  }

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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  )
}

export default App
