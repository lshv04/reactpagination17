import React from "react";
import { useParams, Link } from "react-router-dom";
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

const Seasons = () => {
  const { id, seasonNumber } = useParams(); 

  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?language=en-US`,
    options
  );

  if (loading)
    return (
      <div className="d-flex justify-content-center m-5 pt-3">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error) {
    return <h2>Erro: {error.message}</h2>; 
  }

  return (
    <div className="container mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card h-100">
            {/* Verifica se existe o caminho da imagem (poster_path) */}
            {data.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                className="img-fluid"
                alt={data.name}
              />
            )}
            <div className="card-body">
              <h1 className="card-title">
                {data.name} - Season {data.season_number}
              </h1>
              <p className="card-text">
                <strong>Season overview:</strong> {data.overview}
              </p>
              <p className="card-text">
                <strong>Air Date:</strong> {data.air_date}
              </p>
              <p className="card-text">
                <strong>Episodes in Season:</strong> {data.episodes.length}
              </p>
            </div>
            <div className="card-footer">
              <ul className="list-unstyled ">
                {data.episodes.map((episode) => (
                  <li key={episode.episode_number}>
                    <Link
                      to={`/series/${id}/seasons/${seasonNumber}/episodes/${episode.episode_number}`}
                      className="lilink"
                    >
                      Episode {episode.episode_number}: {episode.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seasons;
