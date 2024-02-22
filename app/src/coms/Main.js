import React from 'react';
import {itemData} from './ItemData';
import {Link} from 'react-router-dom';

const Item = ({id,title,desc,src}) => {
  return (
      <>
      <img src={src} alt="" />
      <p>{title}</p>
      <p>{desc}</p>
     </>
  )
}


const Main = () => {


  return (
    <>
    <Item {itemData.title}></Item>
    </>
  )
}

export default Main;