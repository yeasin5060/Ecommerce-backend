import React from 'react'
import Sidebars from '../../Components/Sidebars/Sidebars'
import './Admin.css'
import { Route, Routes } from 'react-router-dom'
import Addproduct from '../Addproduct/Addproduct'
import Productlist from '../Productlist/Productlist'

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebars/>
      <Routes>
        <Route path='/addproduct' element ={<Addproduct/>}/>
        <Route path='productlist' element = {<Productlist/>}/>
      </Routes>
    </div>
  )
}

export default Admin