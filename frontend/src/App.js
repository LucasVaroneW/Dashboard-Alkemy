import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.css'
import { useAuth0 } from '@auth0/auth0-react'
import Records from './components/Records'
import { Fragment, useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';

function App() {
  const { isAuthenticated } = useAuth0()

  const [data, setData] = useState({
    id_category:{},
    id_typs:{},
    others:"",
    amount: 0,
    date: ""
  })

  const [recordUpdated, setRecordUpdated] = useState(false)


  // const [data, setData] = useState(data_)
  const [allData, setAllData] = useState([])
  useEffect(() => {
    const getRecords = ()=>{
      fetch('http://localhost:9000/api/records')
      .then(records => records.json())
      .then(records => {
        return fetch('http://localhost:9000/api/categories')
        .then(categories => categories.json())
        .then(categories => {
          records.map(r => {
            for (let c of categories){
              if(c.id === parseInt(r.id_category)){
                const catValName = {}
                catValName.value = r.id_category
                catValName.name= c.name
                r.id_category = catValName
              }
            }
            return r
          })
          return records
        })
      })
      .then(records => {
        return fetch('http://localhost:9000/api/typs')
        .then(typs => typs.json())
        .then(typs => {
          records.map(r => {
            for (let t of typs){
              if(t.id === parseInt(r.id_typs)){
                const typeValName = {}
                typeValName.value = r.id_typs
                typeValName.name= t.type
                r.id_typs = typeValName
              }
            }
            return r
          })
          return records
        })
      })


      .then(records => setAllData(records))
    }
    getRecords()
    setRecordUpdated(false)
  }, [recordUpdated])

  return (
    <Fragment>
        
        {isAuthenticated ? (<>
            <div className='dashboard'>
              <Sidebar className='sidebar-position' />
              <div className='dashboard-content' style={{marginLeft: '15%'}} >
                <Records allData={allData} data={data} setData={setData} setRecordUpdated={setRecordUpdated}/>
              </div>
            </div>
          </>) : (
          <>
          <div className='home-content'>
            <div className='home-logIn'>
              <Home />
            </div>
          </div>
          </>
          )
        }  
    </Fragment>
  );
}

export default App;
