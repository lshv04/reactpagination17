import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Series from './pages/Series';
import Seasons from "./pages/Seasons"; 
import Episodes from "./pages/Episodes"; 
import Mynavbar from './components/Navbar';

const App = () => {
  return (
    <Router>
     <Mynavbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/series/:id" element={<Series />} />
        <Route path="/series/:id/seasons/:seasonNumber" element={<Seasons />} /> 
        <Route path="/series/:id/seasons/:seasonNumber/episodes/:episodeNumber" element={<Episodes />} /> 
      </Routes>
      
    </Router>
  );
};

export default App;
