import React from 'react'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import './DropdownItem.css'
import { doSignOut } from '../../firebase/auth'



const DropdownItem = () => {
    const { currentUser } = useAuth(); 
    const navigate = useNavigate()
     
    return (
        <div className='flex flex-col dropDownProfile'>
            <h5 className='h5_class'> {currentUser.displayName ? currentUser.displayName : currentUser.email} </h5>
            <ul className=''>
                <li className='logout-item' onClick={() => { doSignOut().then(() => { navigate('/login') }) }}> Logout </li>
            </ul>
        </div>
    )
}

export default DropdownItem;