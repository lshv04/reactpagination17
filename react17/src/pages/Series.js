import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgyYmRhY2FjYjkzYzAyM2M3Y2M3OTRmOTA2OWIwNiIsIm5iZiI6MTcyNzcxMjIzNy4xNDEwNzgsInN1YiI6IjY2ZTA0MzE2NWEyZDUwZDc4YzhhM2Q5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xcw8LykIapSuECTaVhwLlJkJYn3iLbNKa53TlN9rBZk",
  },
};

const Series = () => {
  const { id } = useParams(); // Extrai o ID da série da URL

  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
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
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            className="img-fluid"
            alt={data.name}
          />
          <h1>{data.name}</h1>
          <p>id: {data.id}</p>
          <p>{data.overview}</p>

          <p>
            <strong>First Air Date:</strong> {data.first_air_date}
          </p>
          <p>
            <strong>Rating:</strong> {data.vote_average}
          </p>

          <div>
            <strong>Seasons:</strong>
            <ul>
              {data.seasons.map((season) => (
                <li key={season.season_number}>
                  {/* Cria o Link dinâmico para a rota /series/:id/seasons/:seasonNumber */}
                  <Link to={`/series/${data.id}/seasons/${season.season_number}`}>
                    Season {season.season_number} - {season.episode_count} episodes
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p>
            <strong>Number of Episodes:</strong> {data.number_of_episodes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Series;
