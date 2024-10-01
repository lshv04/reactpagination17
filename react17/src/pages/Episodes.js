import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "react-bootstrap/Spinner";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgyYmRhY2FjYjkzYzAyM2M3Y2M3OTRmOTA2OWIwNiIsIm5iZiI6MTcyNzcxMjIzNy4xNDEwNzgsInN1YiI6IjY2ZTA0MzE2NWEyZDUwZDc4YzhhM2Q5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xcw8LykIapSuECTaVhwLlJkJYn3iLbNKa53TlN9rBZk",
  },
};

const Episodes = () => {
  const { id, seasonNumber, episodeNumber } = useParams(); // Extrai o ID da série, número da temporada e do episódio

  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}?language=en-US`,
    options
  );

  if (loading)
    return (
      <div className="d-flex justify-content-center m-5 pt-3">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error) {
    return <h2>Erro: {error.message}</h2>; // Exibe uma mensagem de erro, se houver
  }

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center flex-column">
        <img
            src={`https://image.tmdb.org/t/p/w500${data.still_path
            }`}
            className="img-fluid"
            alt={data.name}
          />
          <h3>{data.name} - Episode {data.episode_number}</h3>
          <p><strong>Air Date:</strong> {data.air_date}</p>
          <p><strong>Episode Overview:</strong> {data.overview}</p>
          <p><strong>Rating:</strong> {data.vote_average}</p>
          <p><strong>Runtime:</strong> {data.runtime} minutes</p>
        </div>
      </div>
    </div>
  );
};

export default Episodes;
