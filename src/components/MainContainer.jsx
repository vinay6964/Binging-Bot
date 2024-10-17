import React from "react";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const mainMovie = useSelector((store) => {
    return store.movies?.nowPlayingMovies;
  });

  if (!mainMovie) return;
  const { original_title, overview, id } = mainMovie[0];

  return (
    <div className="bg-black">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id}/>
    </div>
  );
};

export default MainContainer;
