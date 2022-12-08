import React, { Fragment } from 'react'
import { Profile } from './Profile'
import { LogoutButton } from './Logout';

const Sidebar = () => {
  return (
    <Fragment>
        <div className='sidebar'>
            <div>
                <Profile />
            </div>
            <hr></hr>
            <div >
                < li className="sidebar-item" >
                    <ion-icon name="add-circle-outline" ></ion-icon>
                    <span className='sidebar-item-text' >New Record</span>
                </li >
                < li className="sidebar-item" >
                    <ion-icon name="list-circle-outline" ></ion-icon>
                    <span className='sidebar-item-text'>List of Records</span>
                </li >
                < li className="sidebar-item" >
                    <ion-icon name="arrow-up-circle-outline" ></ion-icon>
                    <span className='sidebar-item-text'>Income List</span>
                </li >
                < li className="sidebar-item" >
                    <ion-icon name="arrow-down-circle-outline" ></ion-icon>
                    <span className='sidebar-item-text'>Outflow List</span>
                </li >
                <hr style={{marginTop: '20%'}}></hr>
                <li className='sidebar-logout'>
                    <LogoutButton />
                </li>
            </div>
            {/* <hr style={{marginTop:'60%'}}></hr>
            <div className='sidebar-logout'>
                <LogoutButton />
            </div> */}
        </div>
    </Fragment>
  )
}

export default Sidebar