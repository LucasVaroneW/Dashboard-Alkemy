import React, {Fragment, useState} from 'react'
import '../App.js'
import Form from "./Form";
import {toast, Toaster} from 'react-hot-toast'
import PopUp from "./PopUp";
import CurrentMoney from "./CurrentMoney"



const Records = ({allData,data,setData, setRecordUpdated}) => {

  const [buttonPopup, setPopUp] = useState(false)

  const handlePopUpDelete = (id) => {
      setPopUp(() => {
          return <Fragment>
              <h3>Delete Confirmation</h3>
              <p>Are you sure you want to delete?</p>
              <div style={{display: 'flex',width: '100%',justifyContent: 'flex-end',gap: '10px'}}>
                  <button style={{cursor: 'pointer', background: 'unset', border: 'unset'}} onClick={()=>setPopUp("")}>Cancel</button>
                  <button style={{cursor: 'pointer',background: 'red',border: 'unset',padding: '9px 20px',fontSize: '14px',borderRadius: '10px',color: 'white'}}  onClick={()=>{
                      handleDelete(id)
                      setPopUp('')
                  }}>Delete</button>
              </div>
          </Fragment>
      })
  }

  const handleDelete = (id) => {
    const requestInit = {
        method: 'DELETE'
    }

    fetch('http://localhost:9000/api/records/'+id, requestInit)
    .then(res => res.text())
    .then(res => toast.success(res,{style: {borderRadius: '10px',background: '#333',color: '#fff'}}))

    setRecordUpdated(true)
  }

  const UpdateForm = ({id, data_})=>{
    const [data, setData] = useState(data_)
    return <Fragment>
        <h3>Edit Activity</h3>
        <Form data={data} setData={setData} setRecordUpdated={setRecordUpdated} setPopUp={setPopUp} btn={'Update'}></Form>
    </Fragment>
}

const handleUpdate = (id, data_) => {
    //validation
    setPopUp(() => {
        return <UpdateForm id={id} data_={data_}/>
    })
    // setListUpdated(true)
}
  
  // const handleFilter = () => {
  //   toast.success('added',{style: {borderRadius: '10px',background: '#333',color: '#fff'}})
  // }

  let [currentMoney, setCurrentMoney] = useState(0.00)


  return (
    <Fragment>
      <div style={{margin: '20px'}}>
        <CurrentMoney data={data} setData={setData} currentMoney={currentMoney} setRecordUpdated={setRecordUpdated}/>
        <div className="table_container">
          <table className="table">
            <thead className='table_head'>
              <tr>
                <th className='table_cell'>Category</th>
                <th className='table_cell'>Type</th>
                <th className='table_cell'>Others</th>
                <th className='table_cell'>Amount</th>
                <th className='table_cell'>Date</th>
                <th className='table_cell'>Modification Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                {
                allData.map((data, i) => {
                  currentMoney += parseFloat(data.amount)
                    return (<tr className='table_row' key={i}>
                      <th className='table_cell' >{data.id_category}</th>
                      <th className='table_cell' >{data.id_typs}</th>
                      <th className='table_cell' >{data.others}</th>
                      <th className='table_cell' >${data.amount}</th>
                      <th className='table_cell' >{data.date.split('T')[0].split('-').join('/')}</th>
                      <th className='table_cell' >{data.date.split('T')[0].split('-').join('/')}</th>
                      <th>
                        <ion-icon name="create-outline" size="small" style={{cursor: 'pointer'}} onClick={()=>handleUpdate(data.id, data)}></ion-icon>
                        <ion-icon name="trash-outline" size="small" style={{cursor: 'pointer', marginRight: '10px', marginLeft: '5px'}} onClick={()=>handlePopUpDelete(data.id)}></ion-icon>
                      </th>                                                
                    </tr>)
                  })
                }
            </tbody>
          </table> 
        </div>
        <PopUp trigger={buttonPopup} setPopUp={setPopUp}></PopUp>
        <Toaster position="bottom-right"/>
      </div>
    </Fragment>     
  )
}

export default Records