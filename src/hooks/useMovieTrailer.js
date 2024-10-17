import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    const movieVideo = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const jsonData = await movieVideo.json();
    const filteredTrailer = jsonData.results.filter(
      (videos) => videos.type === "Trailer"
    );
    const firstTrailer = filteredTrailer.length
      ? filteredTrailer[0]
      : jsonData.results[0];
    dispatch(addTrailerVideo(firstTrailer));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
