import React from "react";
import { useState, useEffect } from "react";
import "./row.css";
import axios from "../../../utils/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const Row = ({ title, fetchUrl, isLargeRow }) => {

  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const base_url = "https://image.tmdb.org/t/p/original";


  useEffect(() => {
    (async()=> {
      try{
        const request = await axios.get(fetchUrl);
        console.log(request);
        setMovies(request.data.results);
        return request;
      }catch(error){
        console.log("error",error)
      }
    })()
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name).then(
        (url) => {
          console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams.get('v'));
          setTrailerUrl(urlParams.get("v"));
        }
      );
    }
  }
    const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  console.log(trailerUrl);
  
  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row__posters">
        {movies?.map((movie,index) => (
          <img
            onClick={() => handleClick(movie)}
            key={index} src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`} className={`row__poster ${isLargeRow && "row__posterLarge"}`} alt={movie.name}
          />
        ))}
      </div>

      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
};

export default Row;
