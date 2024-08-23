import React, { useEffect, useState } from 'react'
import Heading from '../../utils/Heading/Heading'
import { RiChatDeleteLine } from "react-icons/ri";
import './productlist.css'

const Productlist = () => {
  const [allProduct , setAllProduct] = useState([])

  const fetchProduct = async () => {
    const res = await fetch("http://localhost:7000/api/v1/allproduct")
    const data = await res.json()
    setAllProduct(data.message)
  }

  useEffect(()=>{
    fetchProduct()
  },[])
  console.log(allProduct);
  
  return (
    <div id = "productlist">
       <div className="product-list-box">
        <Heading level="h1" text="All Product " className="product-list-head"/>
        <div className="product-lisr-items">
          <Heading level="p" text="Name" className="product-item"/>
          <Heading level="p" text="Description" className="product-item"/>
          <Heading level="p" text="Price" className="product-item"/>
          <Heading level="p" text="Oldprice" className="product-item"/>
          <Heading level="p" text="Descount" className="product-item"/>
          <Heading level="p" text="Categories" className="product-item"/>
          <Heading level="p" text="Bigimg" className="product-item"/>
          <Heading level="p" text="Smallimg" className="product-item"/>
          <Heading level="p" text="Remove" className="product-item"/>
        </div>
        <div className="product-list-allproduct">
          <hr/>
          {
            allProduct &&
            allProduct.map((item) => (              
              <>
                <div key={item.id} className='product-lisr-items product-list-all-product-box'>
                  <Heading level="h4" text={item.name} className="product-name"/>
                  <Heading level="h4" text={item.description} className="product-description"/>
                  <Heading level="h4" text={item.price} className="product-price"/>
                  <Heading level="h4" text={item.oldprice} className="product-oldprice"/>
                  <Heading level="h4" text={item.descount} className="product-descound"/>
                  <Heading level="h4" text={item.categories} className="product-category"/>
                  <div className='bigimage-box'>
                    <img src={item.image} alt="not found" />
                  </div>
                  <div className='smallimage-box'>
                    <img src={item.smallimage} alt="not found" />
                  </div>
                  <div className='remove-product'>
                    <button className='remove-product-btn'><RiChatDeleteLine /></button>
                  </div>
                </div> 
                <hr/>
              </>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Productlist