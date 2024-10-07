import React, {useState, useEffect, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { doSignOut } from '../../firebase/auth'
// import { dropdownItem } from '../dropdownItem'
import DropdownItem from '../dropdownItem/DropdownItem'
import './index.css'
import userInterface from './user-interface.png'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()

    const [active, setActive] = useState('nav__menu')
    const [toggleIcon, setToggleIcon] = useState('nav__toggler');
    const [openProfile, setOpenProfile] = useState(false)

    const navToggle = () => {
      if (active === 'nav__menu') {
        setActive('nav__menu nav__active')
      } else {
        setActive('nav__menu')
      }

      if (toggleIcon === 'nav__toggler') {
        setToggleIcon('nav__toggler toggle')
      } else {
        setToggleIcon('nav__toggler')
      }
    }
    
    return (
      <header className="header">
        <nav className="navbar">
          {
            userLoggedIn
              ?
              <>
                {/* <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }}>Logout</button> */}
                {/* <ul>
                    <ol className='ol-home'><a href="/">Home</a></ol>
                </ul> */}
                <a href='/home' className='nav__brand'> Biblioteca </a>
                <ul className={active}>
                  <li className="nav__item"><a href='/home' className='nav__link'>Inicio</a> </li>
                  <li className="nav__item"><a href='/add-book' className='nav__link'>Registrar livro</a> </li>
                </ul>
                <div onClick={navToggle} className={toggleIcon}>
                  <div className='line1'></div>
                  <div className='line2'></div>
                  <div className='line3'></div>
                </div>
                <div>
                  <img src={userInterface} alt='user-interface' onClick={() => setOpenProfile((prev) => !prev)} className='user-interface-img' />
                </div>
                {
                  openProfile && <DropdownItem />
                    
                }

              </>
              :
              <>
                {/* <a href="/login">teste login tela</a>
                <a href="/register">teste registro tela</a> */}
              </>
          }
        </nav>
      </header>

      );
      
}

export default Header