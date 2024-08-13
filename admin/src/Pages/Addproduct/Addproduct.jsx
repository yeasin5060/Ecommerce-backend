import React from 'react'
import Heading from '../../utils/Heading/Heading'
import './Addproduct.css'

const Addproduct = () => {
  return (
    <section id = "addproduct">
      <from className="addproduct-from">
        <div className="addproduct-field">
          <Heading level="p" text="Product Title" className="product-details"/>
          <input type="text" name ="productname" placeholder='Type Filed '/>
        </div>
        <div className="addproduct-field">
          <Heading level="p" text="Product Description" className="product-details"/>
          <input type="text" name ="productdes" placeholder='Type Filed '/>
        </div>
        <div className="addproduct-field">
          <Heading level="p" text="Product Price" className="product-details"/>
          <input type="text" name ="productprice" placeholder='Type Filed '/>
        </div>
        <div className="addproduct-field">
         <select className='category-select'>
          <option value="man">Man</option>
          <option value="woman">Woman</option>
          <option value= "kid">Kid</option>
         </select>
        </div>
        <div className="addproduct-field">
          <Heading level="p" text="Select Big Image" className="product-details"/>
          <input type="file" name ="productbigimg" />
        </div>
        <div className="addproduct-field">
          <Heading level="p" text="Select Small Image" className="product-details"/>
          <input type="file" name ="productbigimg"/>
        </div>
        <div className="addproduct-btn">
          <button className ="btn">Add</button>
        </div>
      </from>
    </section>
  )
}

export default Addproduct