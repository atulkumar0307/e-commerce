import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../item/Item'

function NewCollections() {

  const [new_collections, setNew_collection] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:4000/newcollection')
    .then((response)=>response.json())
    .then((data)=>setNew_collection(data));
  },[])

  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONs</h1>
        <hr />
        <div className='collections'>
            {new_collections.map((item, index)=>(
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

export default NewCollections
