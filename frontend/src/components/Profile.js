import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading){
        return <div>Loading...</div>
    }
    return (
        isAuthenticated && (
            <div className='sidebar-header'>
                <img src={user.picture} alt={user.name} className='sidebar-header-img'/>
                <h2 className='sidebar-header-name'>{user.name}</h2>
            </div>
        )
    )
}

