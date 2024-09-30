import React from 'react'
import { useAuth } from '../../context/authContext'

const Home = () => {
    const { currentUser } = useAuth();      
    return (
        <div> aaa {currentUser.displayName ? currentUser.displayName : currentUser.email} </div>
    )
}

export default Home;