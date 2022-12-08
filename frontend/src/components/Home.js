import React, {Fragment} from 'react'
import '../App.js'
import { LoginButton } from './Login.js'

const Home = () => { 
  return (
    <Fragment>
        <div className='home'>
            <h2>Debe logear para usar el dashboard</h2>
            <LoginButton />
        </div>
    </Fragment>     
  )
}

export default Home