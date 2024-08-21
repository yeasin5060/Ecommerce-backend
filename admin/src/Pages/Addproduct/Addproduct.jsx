import React, { useState } from 'react'
import Heading from '../../utils/Heading/Heading'
import './Addproduct.css'

const Addproduct = () => {

  const [productData , setProductData] = useState({
    name : "",
    description : "",
    price : "",
    oldprice : "",
    descount : "",
    category : "",
    //user : "66a76c9de8b2489b585fb8af"
  });

  /*const [image , setImage] = useState({
      productbigimg : "",
      productsmaillimg : ""
  })*/

  const [image , setImage] = useState(null);
  const [smallimage , setSmallImage] = useState(null)

  const handleProduct = (e)=>{
    let {name ,value} = e.target;
    setProductData({...productData,[name]:value});
  }


  let [error , setError] = useState({
    name : "",
    description : "",
    price : "",
    oldprice : "",
    descount : "",
    category : "",
    image : "",
    smallimage : ""
  });
  const productAdd = async (e)=>{
    e.preventDefault();
    if(!productData.name){
      setError({name : "Product Name Is Require"});
    }
    else if(!productData.description){
      setError({name : ""});
      setError({description : "Product Description Is Require"});
    }
    else if(!productData.price){
      setError({description : ""});
      setError({price : "Product Price Is Require"});
    }
    else if(!productData.oldprice){
      setError({price : ""});
      setError({oldprice : "Product Offer Price Is require"});
    }
    else if(!productData.descount){
      setError({oldprice : ""});
      setError({descount : "Product Descount Is Require"});
    }
    else if(!productData.category){
      setError({descount : ""});
      setError({category : "Category Is Require"});
    }
    else if(!image){
      setError({category : ""});
      setError({image : "Big Image Is Require"});
    }
    else if(!smallimage){
      setError({image : ""});
      setError({smallimage : "Small Image Is Require"});
    }
    else{
      setError({smalliamge : ""})
      console.log(productData);
      console.log(image);
      console.log(smallimage);
      
      //let responseData ;
      //let product = productData;
      
      let formData = new FormData();
      formData.append("product ",productData);
      formData.append("image", image);
      formData.append("smallimage" , smallimage);

      try {
        let res = await fetch("http://localhost:7000/api/v1/product",{
          method : "POST",
          headers : {
            Accept : "application/json",
            "Contant-Type" : "application/json"
          },
          body : formData,
        })
        if(res.ok){
          alert("Product Added")
        }else{
          alert("Field")
        }
      } catch (error) {
        console.log("product added error");
      }
      //console.log(res);
      //console.log(fromData);
    }
  }
  return (
    <section id = "addproduct">
      <from className="addproduct-from">
        <div className="addproduct-field">
          <Heading level="p" text="Product Title" className="product-details"/>
          <input type="text" name ="name" placeholder='Type Filed' onChange={handleProduct}/>
          {error.name && <p className='sign_error'>{error.name}</p>}
        </div>
        <div className="addproduct-field">
          <Heading level="p" text="Product Description" className="product-details"/>
          <input type="text" name ="description" placeholder='Type Filed ' onChange={handleProduct}/>
          {error.description && <p className='sign_error'>{error.description}</p>}
        </div>
        <div className='addproduct-price-box'>
          <div className="addproduct-price">
            <Heading level="p" text="Price" className="product-details"/>
            <input type="number" name ="price" placeholder='Type Filed' onChange={handleProduct}/>
            {error.price && <p className='sign_error'>{error.price}</p>}
          </div>
          <div className="addproduct-price">
            <Heading level="p" text="Offer Price" className="product-details"/>
            <input type="number" name ="oldprice" placeholder='Type Filed' onChange={handleProduct}/>
            {error.oldprice && <p className='sign_error'>{error.oldprice}</p>}
          </div>
        </div>
        <div className="addproduct-categroy-descount-box">
          <div className="addproduct-field-category">
            <Heading level="p" text="Select Category" className="product-details"/>
            <select className='category-select' name='category' onChange={handleProduct}>
              <option value="man">Man</option>
              <option value="woman">Woman</option>
              <option value= "kid">Kid</option>
            </select>
            {error.category && <p className='sign_error'>{error.category}</p>}
          </div>
          <div className="addproduct-price">
            <Heading level="p" text="Descount" className="product-details"/>
            <input type="text" name ="descount" placeholder='Type Filed' onChange={handleProduct}/>
            {error.descount && <p className='sign_error'>{error.descount}</p>}
          </div>
        </div>
        <div className="addproduct-images-box">
          <div className="addproduct-field">
            <Heading level="p" text="Select Big Image" className="product-details"/>
            <input type="file"   onChange={(e) => setImage(e.target.files[0])}  />
            {error.image && <p className='sign_error'>{error.image}</p>}
          </div>
          <div className="addproduct-field">
            <Heading level="p" text="Select Small Image" className="product-details"/>
            <input type="file"  onChange={(e) => setSmallImage(e.target.files[0])} />
            {error.smallimage && <p className='sign_error'>{error.smallimage}</p>}
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