import React from "react";
import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

//  MovieList - Popular
//  movies * n
//  MovieList - Now Playing
//  MovieList - Trending
//  MovieList - Horror

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="-mt-[325px] relative z-20">
      <MoviesList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
      <MoviesList title={"Popular"} movies={movies?.popularMovies} />
      <MoviesList title={"Top Rated"} movies={movies?.topRatedMovies} />
      <MoviesList title={"Upcoming movies"} movies={movies?.nowPlayingMovies} />
    </div>
  );
};

export default SecondaryContainer;
