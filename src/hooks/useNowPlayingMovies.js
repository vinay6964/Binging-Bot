import { useDispatch } from "react-redux";
import { API_OPTIONS, NOW_PLAYING_URL } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect, useCallback } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getNowPlayingMovies = useCallback(async () => {
    const data = await fetch(NOW_PLAYING_URL, API_OPTIONS);
    const jsonData = await data.json();
    dispatch(addNowPlayingMovies(jsonData.results));
  }, [dispatch]); 

  useEffect(() => {
    getNowPlayingMovies();
  }, [getNowPlayingMovies]); 
};

export default useNowPlayingMovies;
