import React, { Fragment } from 'react'

const Sidenar2 = () => {
  return (
    <Fragment>
         <nav className='sidebar'>
            <div className='sidebar-header'>
                <ion-icon name="person-outline" className='sidebar-header-icon' ></ion-icon>
                <h5 className='sidebar-link' >Lucas Varone</h5>
            </div>
            <hr></hr>
            <div>
                < li className="sidebar-item" >
                    <ion-icon name="add-circle-outline" ></ion-icon>
                    <span className='sidebar-item-text'>Nuevo Registro</span>
                </li >

                < li className="sidebar-item" >
                    <ion-icon name="list-circle-outline" ></ion-icon>
                    <span className='sidebar-item-text'>Listado de Registros</span>
                </li >

                < li className="sidebar-item" >
                    <ion-icon name="arrow-up-circle-outline" ></ion-icon>
                    <span className='sidebar-item-text'>Listado de Ingresos</span>
                </li >

                < li className="sidebar-item" >
                    <ion-icon name="arrow-down-circle-outline" ></ion-icon>
                    <span className='sidebar-item-text'>Listado de Egresos</span>
                </li >
            </div>
        </nav>
    </Fragment>
  )
}

export default Sidenar2