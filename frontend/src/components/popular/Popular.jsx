import React, { useEffect, useState } from 'react'
import './Popular.css'
import data_product from '../Assets/data'
import Item from '../item/Item.jsx'

function Popular() {

  const [popularProducts, setPopularProducts] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:4000/populariwomen')
    .then((response)=>response.json())
    .then((data)=>setPopularProducts(data));
  },[])

  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className='popular-item'>
            {popularProducts.map((item, index)=>(
                <Item 
                    key={index} 
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    new_price={item.new_price}
                    old_price={item.old_price} 
                />
            ))}
        </div>
    </div>
  )
}

export default Popular
