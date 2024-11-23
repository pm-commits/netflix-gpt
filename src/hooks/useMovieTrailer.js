import { useEffect } from "react";
import { addTailerVideo } from "../utils/movieSlice";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  async function getMovieVideos() {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      API_OPTIONS
    );
    const json = await data.json();
    const trailerVideos = json.results.filter((obj) => obj.type === "Trailer");
    const trailer = trailerVideos.length ? trailerVideos[0] : json.results[0];
    dispatch(addTailerVideo(trailer));
  }
  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
