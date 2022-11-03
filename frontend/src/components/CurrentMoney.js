import React, { Fragment, useState} from 'react'
import PopUp from './PopUp'
import Form from './Form'


function CurrentMoney(props) {


  const [buttonPopup, setPopUp] = useState(false)

  const AddRecordData = ({data_}) =>{
    const [data, setData] = useState(data_)
    return <Fragment>
      <h3>Add Record</h3>
      <Form data={data} setData={setData} setRecordUpdated={props.setRecordUpdated} setPopUp={setPopUp} btn={'Add'}></Form>
    </Fragment>
  }

  const handleAddRecordData = () => {
    return setPopUp(() => {
      return <AddRecordData data_={props.data}/>
    })
  }

  return (
    <Fragment>
      <div className='grid'>
        <div className='currentMoney'>
          <h6>
            Current Balance <strong>$ {parseFloat(props.currentMoney).toFixed(2)}</strong>
          </h6>
        </div>
          <button class="bnRecord" onClick={()=> handleAddRecordData()}>Add Record</button>
      </div>
      <PopUp trigger={buttonPopup} setPopUp={setPopUp}></PopUp>
    </Fragment>
  )
}

export default CurrentMoney