import React from 'react'
import './popUp.css'

function PopUp(props) {
  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup-inner'>
            <ion-icon id='close-btn' name="close-circle-outline" size="small" style={{cursor: 'pointer', margin: '10px'}} onClick={() => props.setPopUp("")}></ion-icon>
            {props.trigger}
        </div>
    </div>
  ) : "";
}

export default PopUp