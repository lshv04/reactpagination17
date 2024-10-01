import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar} from 'react-bootstrap';
import Searchbar from './Searchbar';

const Mynavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className='px-3 navbarcolor fixed-top'>
      <Navbar.Brand as={Link} to="/" className='brand'>
      Home
        
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className=''/>
      <Navbar.Collapse id="basic-navbar-nav" className=' '>
    
        <div className='ms-auto'>
        <Searchbar />
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Mynavbar;
