import React, { useState } from 'react'
import Heading from '../../utils/Heading/Heading'
import './Addproduct.css'

const Addproduct = () => {

  const [productData , setProductData] = useState({
    productname : "",
    productdes : "",
    productprice : "",
    productoldprice : "",
    category : "",
    productbigimg : "",
    productsmaillimg : ""
  });

  const handleProduct = (e)=>{
    let {name ,value} = e.target
    setProductData({...productData,[name]:value})
  }

  let [error , setError] = useState({
    productname : "",
    productdes : "",
    productprice : "",
    productoldprice : "",
    category : "",
    productbigimg : "",
    productsmaillimg : ""
  });
  const productAdd = (e)=>{
    e.preventDefault();
    if(!productData.productname){
      setError({productname : "Product Name Is Require"});
    }
    else if(!productData.productdes){
      setError({productname : ""});
      setError({productdes : "Product Description Is Require"});
    }
    else if(!productData.productprice){
      setError({productdes : ""});
      setError({productprice : "Product Price Is Require"});
    }
    else if(!productData.productoldprice){
      setError({productprice : ""});
      setError({category : "Product Old Price Is require"});
    }
    else if(!productData.category){
      setError({productproldice : ""});
      setError({category : "Category Is Require"});
    }
    else if(!productData.productbigimg){
      setError({category : ""});
      setError({productbigimg : "Big Image Is Require"});
    }
    else if(!productData.productsmaillimg){
      setError({productbigimg : ""});
      setError({productsmaillimg : "Small Image Is Require"});
    }
    else{
      setError({productsmaillimg : ""})
      console.log(productData);
    }
  }
  return (
    <section id = "addproduct">
      <from className="addproduct-from">
        <div className="addproduct-field">
          <Heading level="p" text="Product Title" className="product-details"/>
          <input type="text" name ="productname" placeholder='Type Filed' onChange={handleProduct}/>
          {error.productname && <p className='sign_error'>{error.productname}</p>}
        </div>
        <div className="addproduct-field">
          <Heading level="p" text="Product Description" className="product-details"/>
          <input type="text" name ="productdes" placeholder='Type Filed ' onChange={handleProduct}/>
          {error.productdes && <p className='sign_error'>{error.productdes}</p>}
        </div>
        <div className='addproduct-price-box'>
          <div className="addproduct-price">
            <Heading level="p" text="Price" className="product-details"/>
            <input type="text" name ="productprice" placeholder='Type Filed' onChange={handleProduct}/>
            {error.productprice && <p className='sign_error'>{error.productprice}</p>}
          </div>
          <div className="addproduct-price">
            <Heading level="p" text="Offer Price" className="product-details"/>
            <input type="text" name ="productprice" placeholder='Type Filed' onChange={handleProduct}/>
            {error.productoldprice && <p className='sign_error'>{error.productoldprice}</p>}
          </div>
        </div>
        <div className="addproduct-field-category">
        <Heading level="p" text="Select Category" className="product-details"/>
         <select className='category-select' name='category' onChange={handleProduct}>
          <option value="man">Man</option>
          <option value="woman">Woman</option>
          <option value= "kid">Kid</option>
         </select>
         {error.category && <p className='sign_error'>{error.category}</p>}
        </div>
        <div className="addproduct-images-box">
          <div className="addproduct-field">
            <Heading level="p" text="Select Big Image" className="product-details"/>
            <input type="file" name ="productbigimg"  onChange={handleProduct} />
            {error.productbigimg && <p className='sign_error'>{error.productbigimg}</p>}
          </div>
          <div className="addproduct-field">
            <Heading level="p" text="Select Small Image" className="product-details"/>
            <input type="file" name ="productsmaillimg" onChange={handleProduct}/>
            {error.productsmaillimg && <p className='sign_error'>{error.productsmaillimg}</p>}
          </div>
        </div>
        <div className="addproduct-btn">
          <button className ="btn" onClick={productAdd}>Add</button>
        </div>
      </from>
    </section>
  )
}

export default Addproduct