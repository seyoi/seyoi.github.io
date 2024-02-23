import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';

const Home = () => {

  const dataLoader = useLoaderData();

  return (
    <>
    <div className="data-loader">
      {
// @ts-ignore
      dataLoader.map(data => (
          <Link to={data.src} key={data.id} target='_blank' >
            
              <p>{data.title}</p>
          </Link> 
          
      ))}
  </div>
    </>
    
  )
};

export default Home;
