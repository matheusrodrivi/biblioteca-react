import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { doSignOut } from '../../firebase/auth'
import './index.css'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    
    return (
        <nav className="navbar">
          {
            userLoggedIn
              ?
              <>
                <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }}>Logout</button>
              </>
              :
              <>
                {/* <a href="/login">teste login tela</a>
                <a href="/register">teste registro tela</a> */}
              </>
          }
        </nav>
      );
      
}

export default Header