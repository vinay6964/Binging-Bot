import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovieData = useSelector((store) => store.movies.popularMovies);

  // Memoizing the getPopularMovies function
  const getPopularMovies = useCallback(async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    console.log("🚀 ~ getPopularMovies ~ json:", json);
    dispatch(addPopularMovies(json.results));
  }, [dispatch]);

  useEffect(() => {
    if (!popularMovieData) {
      getPopularMovies();
    }
  }, [getPopularMovies, popularMovieData]); // Now getPopularMovies and popularMovieData are included in dependencies
};

export default usePopularMovies;
