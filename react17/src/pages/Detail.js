import React from 'react';
import { useLocation, Link} from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useState, useEffect } from 'react';
import {Pagination} from 'react-bootstrap';
import Spinner from "react-bootstrap/Spinner";



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
  const MAX_PAGES_TO_SHOW = 5;

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


  if (loading)
    return (
      <div className="d-flex justify-content-center m-5 pt-3">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error) {
    return <h2>Erro: {error.message}</h2>; 
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

  // Ordenando o array de resultados por 'vote_average' do maior para o menor
  const sortedResults = data.results.sort((a, b) => b.vote_average - a.vote_average);


  return (
    <div className="container mt-5 pt-5">
     
      <h3 className='text-center'>Serie´s List</h3>
      <Pagination>{paginationItems}</Pagination>
      {query ? (
        <div className="row">
          {sortedResults.map((series) => (
            <div className="col-12 col-md-6 col-lg-3 mb-4" key={series.id}>
              {/* Bootstrap Card */}
              <div className="card h-100   border-0">
                {/* Imagem do Card */}
                <img
                  src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                  className="card-img-top"
                  alt={series.name}
                />
                <div className="card-body ">
                  <h5 className="card-title">{series.name}</h5>
                  
                  
                </div>
                <div className="card-footer">
              <span><i className="bi bi-star-fill"></i></span> {series.vote_average}
                </div>
                       {/* Link para a página de Series com o series.id */}
                       <Link to={`/series/${series.id}`} className="btn btn-secondary rounded-0">
                  More Details
                </Link>
              </div>
             
            </div>
            
          ))}
      
        </div>
      ) : (
        <p>No query was provided.</p>
      )}
          <Pagination>{paginationItems}</Pagination>
    </div>
  );
};

export default Detail;
