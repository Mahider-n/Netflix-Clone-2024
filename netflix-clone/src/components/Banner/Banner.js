/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import axios from "../../utils/axios";
import reqests from "../../utils/requests";
import "./banner.css"

const Banner = () => {
    const [movie,setMovie]=useState([]);
    useEffect(()=>{
        (async () => {
            try{
                const request=await axios.get(reqests.fetchNetflixOriginals)
                setMovie(request.data.results[
                    Math.floor(Math.random()*request.data.results.length)
                ]);
            } catch(error){
                console.log("error",error)
            }
        })()
    },[])

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        // movie?-optional chaining 
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundPosition: "center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>

  )
}

export default Banner
