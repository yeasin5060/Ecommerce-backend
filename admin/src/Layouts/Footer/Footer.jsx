import React from 'react'
import Heading from '../../utils/Heading/Heading';
import './Footer.css'

const Footer = () => {
  return (
    <section id='footer'>
      <div className='container'>
        <div className='footer_wrapper'>
          <div className='footer_wrapper_copyright_box'>
              <Heading level="h4" text="Copyright © 2024. All rights are reserved" className="footer_wrapper_copyright_contant"/>
          </div>
        </div>
      </div>
   </section>
  )
}

export default Footer