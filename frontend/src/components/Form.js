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
        console.log(e)
        let data_ = {...props.data}
        if(e.value){
            data_[e.name] = e.value
        } else {
            data_[e.target.name] = e.target.value
        }
        console.log(data_)
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
                        categories.push({value: c.id, label: c.name})
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
        if(props.btn === 'Add'){
            const requestInit = {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(props.data)
            }
            fetch('http://localhost:9000/api/records', requestInit)
            .then(res => res.json())
            .then(res => toast.success(res.msg,{style: {borderRadius: '10px',background: '#333',color: '#fff'}}))
        } else {
            const requestInit = {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(props.data)
            }
            fetch('http://localhost:9000/api/records/'+props.data.id, requestInit)
            .then(res => res.json())
            .then(res => {
                toast.success(res.msg,{style: {borderRadius: '10px',background: '#333',color: '#fff'}})
            })
        }
        props.setPopUp("")
        //Actualize list view
        props.setRecordUpdated(true)
    }

    let date_ = ""
    if(props.data.date){
        let date_arr = props.data.date.split('T')[0].split('-')
        date_ = new Date()
        date_.setYear(date_arr[0])
        date_.setMonth(date_arr[1]-1)
        date_.setDate(date_arr[2])
        date_ = date_.toISOString().substring(0,10)
    }


    //types
    let types = [
        {value: '1', label: 'Income'},
        {value: '2', label: 'Egress'},
    ]
    
    const [valueType, setValueType] = useState([])
    const [valueCategory, setValueCategory] = useState([])

    useEffect(() => {
        if(props.data.id_category.value){
            setValueCategory({...props.data.id_category, 'label': props.data.id_category.name})
            props.data.id_category = props.data.id_category.value
        }
        if(props.data.id_typs.value){
            setValueType({...props.data.id_typs, 'label': props.data.id_typs.name})
            props.data.id_typs = props.data.id_typs.value
        }
    }, [props.data])
    
    let disable = props.btn === "Update" ? true : false
    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <div className="input_container">
                    <label htmlFor="date">Date</label>
                    <input name="date" type="date" onChange={handleChange} id="date" defaultValue={date_}/>
                </div>
                <div className="input_container">
                    <label htmlFor="amount">Amount</label>
                    <input step="any" name="amount" onChange={handleChange} type="number" id="amount" defaultValue={props.data.amount ? props.data.amount : ''}/>
                </div>
                <div className="input_container">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <label htmlFor="id_category">Category</label>
                    </div>
                    <Select
                        onChange={(e)=> {
                            handleChange({...e, 'name': 'id_category'})
                            setValueCategory(e)
                        }}
                        value={valueCategory}
                        options={categoriesData}
                    />
                </div>
                <div className="input_container">
                    <label htmlFor="id_typs">Type</label>
                    <Select
                        onChange={(e)=> {
            
                            handleChange({...e, 'name': 'id_typs'})
                            setValueType(e)
                        }}
                        value={valueType}
                        options={types}
                        isDisabled={disable}
                    />
                </div>
                <div className="input_container">
                    <label htmlFor="others">Others</label>
                    <input name="others" type="text" id="others"/>
                </div>
                
                <button type="submit" className="bnRecord" style={{marginTop: '20px'}}>{props.btn}</button>
            </form>
            <Toaster position="bottom-right"/>
            <PopUp trigger={buttonPopup} setPopUp={setPopUp}></PopUp>
        </Fragment>
  )
}

export default Form