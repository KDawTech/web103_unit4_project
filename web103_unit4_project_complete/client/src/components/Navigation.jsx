import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const Navigation = () => (
  <nav className='top-nav'>
    <Link className='brand' to='/'><span>⚡</span> BOLT BUCKET</Link>
    <div className='nav-actions'>
      <Link to='/' role='button'>Customize</Link>
      <Link to='/customcars' role='button'>View Cars</Link>
    </div>
  </nav>
)

export default Navigation
