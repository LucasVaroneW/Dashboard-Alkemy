import React, { Fragment, useState} from 'react'
import PopUp from './PopUp'
// import Form from './Form'

function CurrentMoney(props) {

  const [buttonPopup, setPopUp] = useState(false)

  return (
    <Fragment>
      <div className='grid'>
        <div className='currentMoney'>
          Current Balance 
          <strong>$ 1300</strong>
        </div>
        <a href="/">
          <button class="bn30">Add Record</button>
        </a>
      </div>
      <PopUp trigger={buttonPopup} setPopUp={setPopUp}></PopUp>
    </Fragment>
  )
}

export default CurrentMoney