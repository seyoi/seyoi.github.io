import React, { useState, useEffect } from 'react';
import './p8.css'
const P8 = () => {
  const [data, setData] = useState([]);
  const [filteredData,setFilteredData] = useState([])

  function getData() {
    const datas = [];
    for (let i = 1; i < 10; i++) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${i}`)
        .then((response) => response.json())
        .then((json) => {
          datas.push(json);
          if(i===9)
          setData(datas);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }console.log(datas)
  }


  return (
    <>
      <div className="p8">
        <header>
           <div className="p8-title">Our Menu</div>
        <svg width="100" height="5">
          <rect width="100" height="5" x="0" y="0" stroke="black" strokeWidth="0" fill="coral" />
        </svg>

        <div className="chips">
          <div className="all">
            <button onClick={getData}>All</button>
          </div>
          <div className="breakfast">
            <button onClick={getData}>Breakfast</button>
          </div>
          <div className="lunch">
            <button onClick={getData}>Lunch</button>
          </div>
          <div className="dinner">
            <button onClick={getData}>Dinner</button>
          </div>
          <div className="desert">
            <button onClick={getData}>Desert</button>
          </div>
        </div>
        </header>
       
        
        <div className="cards">
          {data.map((item, index) => (
            <div className='card' key={index}>
              <img src="https://source.unsplash.com/random/400x200/" alt="" />
              <div className="title-price">

              <span>{item.title}</span><span>11$</span>
              </div>
              <hr />
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default P8;
