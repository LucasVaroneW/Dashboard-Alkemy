import React, {Fragment,useState, useEffect} from 'react'
// import PopUp from "./PopUp";
import Select from "react-select"


/**
 * Form for Insert/Update data in list
 * @param {object} props Component props
 * @param {object} props.data data collection with atributtes
 * @param {string} props.setData
 */

const AddRecord = (props) => {
    // const [buttonPopup, setPopUp] = useState(false)
    // const i_date = useRef(null);
    // const i_description = useRef(null);
    // const i_amount = useRef(null);
    // const i_new_concept = useRef(null);
    const handleChange = (e) => {
        let data_ = {...props.data}
        if(e.target){
            data_[e.target.name] = e.target.value
        } else {
            data_[e.name] = e.value
        }
        props.setData(data_)
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

    let [categories, setCategories] = useState([])
    const [valueCategory, setValueCategory] = useState([])
    useEffect(() => {
        const getCategories = ()=>{
            fetch('http://localhost:9000/api/categories')
            .then(res => res.json())
            .then(res => {
                let categories = []
                for(let c of res){
                    categories.push({value: c.id, label: c.description})
                }
                setCategories(categories)
                if(props.data.category){
                    for(let c of categories){
                        if(c.label === props.data.category){
                            setValueCategory(c)
                        }
                    }
                }
            })
        }
        getCategories()
    }, [])


    return (
        <Fragment>
            <form>
                <div className='input_container'>
                    <label htmlFor=''>Amount</label>
                    <input ref="" name="amount" type="number" id="amount"></input>
                </div>
                <div className="input_container">
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <label htmlFor="concept">Concept</label>
                        <span style={{cursor: 'pointer', color: 'var(--m-blue)'}}>Edit Concepts</span>
                        </div>
                        <Select
                            onChange={(e)=> {
                                handleChange({...e, 'name': 'categories'})
                                setValueCategory(e)
                            }} 
                            value={valueCategory}
                            options={categories}
                            
                        />
                    </div>
                <div className='input_container'>
                    <label htmlFor=''></label>
                    <input ref="" name="" type="" id=""></input>
                </div>
                <div className='input_container'>
                    <label htmlFor=''></label>
                    <input ref="" name="" type="" id=""></input>
                </div>
                <div className='input_container'>
                    <label htmlFor=''></label>
                    <input ref="" name="" type="" id=""></input>
                </div>
                <div className='input_container'>
                    <label htmlFor=''></label>
                    <input ref="" name="" type="" id=""></input>
                </div>
            </form>
        </Fragment>
  )
}

export default AddRecord