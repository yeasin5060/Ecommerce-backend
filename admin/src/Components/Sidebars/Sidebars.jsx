import React from 'react'
import { Link } from 'react-router-dom'

const Sidebars = () => {
  return (
    <div id='sidebars'>
       <div className="sidebar-link-wrapper">
       <    div className="addproduct">
                <Link to = "addproduct" className='addproduct'>Addproduct</Link>
            </div>
            <div className="product-list">
                <Link to = "productlist" className='product-list'>Product list</Link>
            </div>
        </div>
    </div>
  )
}

export default Sidebars