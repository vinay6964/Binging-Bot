import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lang } from "../utils/languageConstants";
// import openai from "../utils/openAi";
import { API_OPTIONS } from "../utils/constants";
import { addMovieFromGpt } from "../utils/gptSlice";

const GptSearchBar = () => {
  const confiData = useSelector((store) => store.config.lang);
  const serachText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTmdb = async (movie) => {
    const movieResults = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, API_OPTIONS)
    const jsonData = await movieResults.json();
    return jsonData.results;
  }

  const handleGptSearch = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest xome movie for the query" +
      serachText.current.value +
      ". inly give me names of 5 movies, comma seperated. Like the example result given ahead Example Result : Gadar, Sholay, The girl next door, bahubali";


    try {
    //   const gptResults = await openai.chat.completions.create({
    //     messages: [{ role: "user", content: gptQuery }],
    //     model: "gpt-3.5-turbo",
    //   });

    const gptMovies = "Andaz apna apna  , Angoor, Hera Pheri, Titanic  ".split(",");
    //   const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
      const gptTrimmedMovies = gptMovies.map((movie)=> movie.trim()); // later remove this line and uncomment line no 34
      const promiseDataArray = gptTrimmedMovies.map((movie) => searchMovieTmdb(movie))

      const tmdbResults = await Promise.all(promiseDataArray);
      const filteredMovies = tmdbResults.filter((movie) => movie.length>0)
      dispatch(addMovieFromGpt({movieResults : filteredMovies, movieNames : gptTrimmedMovies}))

    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error("Rate limit exceeded. Please try again later.");
      } else {
        console.error("An error occurred:", error.message);
      }
    }
  };

  return (
    <div className="pt-[40%] md:pt-[8%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={serachText}
          type="text"
          className="p-4 m-4 col-span-9 text-black"
          placeholder={lang[confiData].getSearchPlaceHolder}
        />
        <button
          className="s:h-1/2 col-span-3 m-4 py-1 px-3 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearch}
        >
          {lang[confiData].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
