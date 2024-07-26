import React from 'react'
import './Navbar.css'
import navlogo from '../Assets/nav-logo.svg'
import navProfile from '../Assets/nav-profile.svg'

function Navbar() {
  return (
    <div className='navbar'>
      <img className='nav-logo' src={navlogo} alt='navlogo'/>
      <img className='nav-profile' src={navProfile} alt='navProfile'/>
    </div>
  )
}

export default Navbar
