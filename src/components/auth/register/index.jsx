import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/authContext'
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth'

import './index.css'

const Register = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password)
        }
    }

    return (
        <>
          {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
      
          <main className="full-screen">
            <div className="form-container">
      
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
      
                <div className="form-group">
                  <label>Senha</label>
                  <input
                    disabled={isRegistering}
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
      
                <div className="form-group">
                  <label>Confirme sua senha</label>
                  <input
                    disabled={isRegistering}
                    type="password"
                    autoComplete="off"
                    required
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                  />
                </div>
      
                {errorMessage && (
                  <span className="error-message">{errorMessage}</span>
                )}
      
                <button
                  type="submit"
                  disabled={isRegistering}
                  className={isRegistering ? 'disabled' : ''}
                >
                  {isRegistering ? 'Signing Up...' : 'Sign Up'}
                </button>
      
                <div className="form-footer">
                  Já tem uma conta?{' '}
                  <Link to={'/login'}>Se logue</Link>
                </div>
              </form>
            </div>
          </main>
        </>
      );
      
}

export default Register