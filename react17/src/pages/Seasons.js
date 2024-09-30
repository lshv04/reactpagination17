import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgyYmRhY2FjYjkzYzAyM2M3Y2M3OTRmOTA2OWIwNiIsIm5iZiI6MTcyNzcxMjIzNy4xNDEwNzgsInN1YiI6IjY2ZTA0MzE2NWEyZDUwZDc4YzhhM2Q5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xcw8LykIapSuECTaVhwLlJkJYn3iLbNKa53TlN9rBZk",
  },
};

const Seasons = () => {
  const { id, seasonNumber } = useParams(); // Extrai o ID da série e o número da temporada da URL

  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?language=en-US`,
    options
  );

  if (loading) {
    return <h2>Carregando...</h2>; // Exibe uma mensagem de carregamento
  }

  if (error) {
    return <h2>Erro: {error.message}</h2>; // Exibe uma mensagem de erro, se houver
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center flex-column">

          <h1>{data.name} - Season {data.season_number}</h1>
          <p>id: {id}</p>
          <p>{data.overview}</p>
          <p><strong>Air Date:</strong> {data.air_date}</p>
          <p><strong>Episodes in Season:</strong> {data.episodes.length}</p>
          <ul>
            {data.episodes.map((episode) => (
              <li key={episode.id}>
                <strong>{episode.name}</strong> - {episode.air_date}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Seasons;
