import React from 'react';
import Searchbar from '../components/Searchbar';
import backgroundImage from '../img/background.jpg'; 

const Home = () => {
  return (
    <div className='container-fluid home  d-flex justify-content-start align-items-center ' style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
  
    }}>
       <div className="overlay"></div>
       <div className="container">
        <div className="row  ">
     
      <div className="col-12   content">
      <h1>Look up your favorite <br /> tv serie´s right now!</h1>
      <p>Try tiping key words of your favorite tv series and <br /> enjoy all the information you could get from it!</p>
      <Searchbar/>
      </div>
    </div>
   
    </div>
    </div>
  );
};

export default Home;
