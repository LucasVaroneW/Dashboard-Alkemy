import React, { Fragment } from 'react'

const Sidebar = () => {
  return (
    <Fragment>
         <div className='sidebar'>
            <div className='sidebar-header'>
                <ion-icon name="person-outline" className='sidebar-header-icon' ></ion-icon>
                <h5 className='sidebar-link' >Lucas Varone</h5>
            </div>
            <hr></hr>
            <div>
                < li className="sidebar-item" >
                    <ion-icon name="add-circle-outline" ></ion-icon>
                    <span className='sidebar-item-text'>New Record</span>
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
            </div>
        </div>
    </Fragment>
  )
}

export default Sidebar