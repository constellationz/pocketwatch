// Header.jsx
// Header for the webpages

import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from 'react-icons/fa'
import { BsGearFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className='header'>
            <div className="logo">
                <Link to='/'>Pocketwatch</Link> 
            </div>
            <ul>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUserAlt /> Register
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaSignOutAlt /> Logout
                    </Link>
                </li>
                <li>
                    <Link to='/settings'>
                        <BsGearFill /> Settings
                    </Link>
                </li>
            </ul>
        </header>)
}

export default Header
