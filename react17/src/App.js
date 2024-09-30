import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Series from './pages/Series';
import Seasons from "./pages/Seasons"; 

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
         
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        {/* Rota dinâmica para exibir a série com base no ID */}
        <Route path="/series/:id" element={<Series />} />
        <Route path="/series/:id/seasons/:seasonNumber" element={<Seasons />} /> {/* Nova rota dinâmica */}
      </Routes>
    </Router>
  );
};

export default App;
