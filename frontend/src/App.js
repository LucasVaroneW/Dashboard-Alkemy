import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.css'
// import Sidebar from './components/Sidebar'
import Records from './components/Records'
import { Fragment, useEffect, useState } from 'react';
import Sidenar from './components/Sidebar';
// import AddRecord from './components/AddRecord';

function App(data_) {
  // const [data, setData] = useState(data_)
  const [allData, setAllData] = useState([])
  useEffect(() => {
    const getRecords = ()=>{
      fetch('http://localhost:9000/api/records')
      .then(records => records.json())
      .then(records => {
        console.log(records)
        return fetch('http://localhost:9000/api/categories')
        .then(categories => categories.json())
        .then(categories => {
          records.map(r => {
            for (let c of categories){
              if(c.id === parseInt(r.id_category)){
                r.id_category = c.name
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
                r.id_typs = t.type
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
  }, [])

  return (
    <Fragment>
      <div className='dashboard'>
        <Sidenar />
        <Records allData={allData}/>
        {/* <div className='list'>
          <Records allData={allData}/>
        </div> */}
        {/* <div>
          <AddRecord data={data} setData={setData}/>
        </div> */}
      </div>
    </Fragment>
  );
}

export default App;
