import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o comportamento padrão de recarregar a página
    if (inputValue.trim()) {
      // Redireciona para a página Detail com o valor do input como search param
      navigate(`/detail?query=${encodeURIComponent(inputValue)}`);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a value"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Searchbar;
