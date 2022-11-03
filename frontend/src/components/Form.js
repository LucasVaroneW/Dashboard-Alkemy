import React, {Fragment,useState, useEffect} from "react";
import {Toaster, toast} from "react-hot-toast";
import PopUp from "./PopUp";
import Select from "react-select"

/**
 * Form for Insert/Update data in list
 * @param {object} props Component props
 * @param {object} props.data data collection with atributtes
 * @param {string} props.setData
 * @param {string} props.btn To get diference between add/update functionality 
 * @param {function} props.setRecordUpdated actualize list view
 * @param {function} props.setPopUp to remove popUp in update data
 */

const Form = (props) => {
    const [buttonPopup, setPopUp] = useState(false)
    const handleChange = (e) => {
        let data_ = {...props.data}
        if(e.target){
            data_[e.target.name] = e.target.value
        } else {
            data_[e.name] = e.value
        }
        props.setData(data_)
    }

    const [categoriesData, setCategories] = useState([])
    useEffect(() => {
        const getCategory = ()=>{
        fetch('http://localhost:9000/api/categories')
            .then(res => res.json())
                .then(res => {
                    let categories = []
                    for(let c of res){
                        categories.push({value: c.name, label: c.name})
                    }
                    setCategories(categories)
                    })
        }
        getCategory()
    }, [])


    let {date, category, amount, type} = props.data

    const handleSubmit = (e) =>{
        e.preventDefault()
        amount = parseFloat(amount)
        // validation
        if(date === "" || category === "" || amount === 0 || type < 0){
            return toast.error("Todos los campos son obligatorios",{style: {borderRadius: '10px',background: '#333',color: '#fff'}})
        }
        
        //format date
        props.data.date = date.split('T')[0]
        //query
        if(props.btn === 'add'){
            const requestInit = {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(props.data)
            }
            console.log(props.data)
            fetch('http://localhost:9000/api/records', requestInit)
                .then(res => res.json())
                    .then(res => toast.success((res.msg,{style: {borderRadius: '10px',background: '#333',color: '#fff'}})))
        } else {
            const requestInit = {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(props.data)
            }

            fetch('http://localhost:9000/api/records/'+props.data.id, requestInit)
            .then(res => res.text())
            .then(res => {
                toast.success(res,{style: {borderRadius: '10px',background: '#333',color: '#fff'}})
            })
        }
        props.setPopUp("")
        //Actualize list view
        props.setRecordUpdated(true)
    }

    //types
    let types = [
        {value: '1', label: 'Income'},
        {value: '2', label: 'Egress'},
    ]
    
    const [valueType, setValueType] = useState([])
    
    useEffect(() => {
        if(props.data.type){
            for(let t of types){
                if(parseInt(t.value) === props.data.type){
                    setValueType(t)
                }
            }
        }
    }, [])
    
    
    let disable = props.btn === "update" ? true : false
    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <div className="input_container">
                    <label htmlFor="date">Date</label>
                    <input name="date" type="date" onChange={handleChange} id="date"/>
                </div>
                <div className="input_container">
                    <label htmlFor="amount">Amount</label>
                    <input step="any" name="amount" onChange={handleChange} type="number" id="amount"/>
                </div>
                <div className="input_container">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <label htmlFor="category">Category</label>
                    </div>
                    <Select
                        onChange={(e)=> {
                            handleChange({...e, 'name': 'category'})
                        }} 
                        options={categoriesData}
                    />
                </div>
                <div className="input_container">
                    <label htmlFor="type">Type</label>
                    <Select
                        onChange={(e)=> {
                            handleChange({...e, 'name': 'type'})
                            setValueType(e)
                        }}
                        value={valueType}
                        options={types}
                        isDisabled={disable}
                    />
                </div>
                <div className="input_container">
                    <label htmlFor="description">Others</label>
                    <input name="description" type="text" id="description"/>
                </div>
                
                <button type="submit" className="bnRecord" style={{marginTop: '20px'}}>{props.btn}</button>
            </form>
            <Toaster position="bottom-right"/>
            <PopUp trigger={buttonPopup} setPopUp={setPopUp}></PopUp>
        </Fragment>
  )
}

export default Form





// {"code":"ER_BAD_FIELD_ERROR","errno":1054,"sqlState":"42S22",
// "sqlMessage":"Unknown column 'undefined' in 'where clause'","sql":
// "UPDATE records set `category` = 'Others', `type` = '1', `Others` = '', `amount` = '6', `dat