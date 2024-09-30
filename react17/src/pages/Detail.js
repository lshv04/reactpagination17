import React from 'react';
import { useLocation, Link} from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useState, useEffect } from 'react';
import {Pagination} from 'react-bootstrap';


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzgyYmRhY2FjYjkzYzAyM2M3Y2M3OTRmOTA2OWIwNiIsIm5iZiI6MTcyNzcxMjIzNy4xNDEwNzgsInN1YiI6IjY2ZTA0MzE2NWEyZDUwZDc4YzhhM2Q5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xcw8LykIapSuECTaVhwLlJkJYn3iLbNKa53TlN9rBZk',
  },
};

const Detail = () => {

    const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual
  const [totalPages, setTotalPages] = useState(1); // Estado para o total de páginas

  // Define o máximo de páginas exibidas
  const MAX_PAGES_TO_SHOW = 10;

  const location = useLocation();

  // Extrai os search params da URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  console.log(query);

  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=${currentPage}`,
    options
  );
  useEffect(() => {
    if (data && data.total_pages) {
      setTotalPages(data.total_pages); // Atualiza o total de páginas conforme a resposta da API
    }
  }, [data]);


  if (loading) {
    return <h2>Carregando...</h2>; // Exibe uma mensagem de carregamento
  }

  if (error) {
    return <h2>Erro: {error.message}</h2>; // Exibe uma mensagem de erro, se houver
  }




// Função para mudar de página
  const handlePageChange = (page) => {
    setCurrentPage(page); // Atualiza o estado da página atual
  };
 
  // Lógica para paginação com limite de 10 páginas
  const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES_TO_SHOW / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGES_TO_SHOW - 1);

  // Renderizando os botões de paginação do Bootstrap
  let paginationItems = [];

  // Botão "Anterior" (se não estiver na primeira página)
  paginationItems.push(
    <Pagination.Prev
      key="prev"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    />
  );

 
  // Gerar as páginas, limitando a 10 no máximo
  for (let number = startPage; number <= endPage; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  
  // Botão "Próximo" (se não estiver na última página)
  paginationItems.push(
    <Pagination.Next
      key="next"
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    />
  );



  return (
    <div className="container mt-5">
      <h1>Details</h1>
      <Pagination>{paginationItems}</Pagination>
      {query ? (
        <div className="row">
          {data.results.map((series) => (
            <div className="col-12 col-md-6 col-lg-3 mb-4" key={series.id}>
              {/* Bootstrap Card */}
              <div className="card h-100">
                {/* Imagem do Card */}
                <img
                  src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                  className="card-img-top"
                  alt={series.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{series.name}</h5>
                  <p className="card-text">ID: {series.id}</p>
                  
                </div>
                <div className="card-footer">
                  <small className="text-muted">Rating: {series.vote_average}</small>
                </div>
                       {/* Link para a página de Series com o series.id */}
                       <Link to={`/series/${series.id}`} className="btn btn-primary">
                  More Details
                </Link>
              </div>
             
            </div>
            
          ))}
          <Pagination>{paginationItems}</Pagination>
        </div>
      ) : (
        <p>No query was provided.</p>
      )}
    </div>
  );
};

export default Detail;
