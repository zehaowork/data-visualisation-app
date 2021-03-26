/* eslint-disable no-loop-func */
import logo from './logo.svg';
import './App.css';

import React,{ useEffect,useState } from 'react';
import { Column } from '@ant-design/charts';
import BCISDATA from './data.json'

function App() {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];
  const config = {
    data,
    
    xField: 'value',
    yField: 'year',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };
  const [result, setResult] = useState([]);
  const [columns, setColumns] = useState({});
  const [queryTable, setQueryTable] = useState("sample size");
  const [queryParam, setQueryParam] = useState({Industry:[],WorkForce:[]});
  const [xField, setXField] = useState("Industry");
  const [yField, setYField] = useState("value");
  const [seriesField, setSerisField] = useState("WorkForce");
  const [isPercent, setIsPercent] = useState(false);
  const [isStack, setIsStack] = useState(false)
  
  useEffect(() => {
    query();
    
  }, [])

  const renderTable = BCISDATA['BCISDATA'].map((el,index)=>{
    return <div onClick={()=>{findColumns(index)}} className="table" >{el.name}</div>
  })

  const renderColumns = ()=>{
    let res = []
    for(var key in columns){

      res.push(<div className='tables'>
        {key}
        {

columns[key].map(el=>{
        let tmpKey = key;
        return<div  onClick={()=>{addQueryParams(tmpKey,el)}} className='table'>{el}</div>
})
        }
      </div>)
      
    }
   return res;
  }

  const addQueryParams = (key,el)=>{
    console.log(key)
      let tmpParam = {...queryParam}
      let tmpFilterArray = [...tmpParam[key]]
      tmpFilterArray.push(el);
      tmpParam[key] = tmpFilterArray;
      console.log(tmpParam)
      setQueryParam(tmpParam)
  }

  useEffect(() => {
    renderColumns()
  }, [columns])

  useEffect(() => {
    query()
  }, [queryParam])

  const findColumns =(index)=>{ 
    setQueryTable(BCISDATA['BCISDATA'][index]['name'])
    let tableElement = BCISDATA['BCISDATA'][index]['dataset'][0]
    let columns = {}
    let queryParam = {};
    if(tableElement['value'] <1){
      setIsPercent(true);
    }else{
      setIsPercent(false);
    }
    for(var key  in tableElement){
        if (key !== 'value'){
          columns[key] = []
        }

    }
    
    BCISDATA['BCISDATA'][index]['dataset'].forEach(el =>{
      for (var key in el){
        if (key !=='value' && !columns[key].includes(el[key])){
            columns[key].push(el[key])
            queryParam[key] = []
        }
      }
    })
   setColumns(columns);
    setXField(Object.keys(columns)[1])
    setYField("value")
    setSerisField(Object.keys(columns)[0])
   setQueryParam(queryParam)
  }

 

   const query  = ()=>{
     
     let table = BCISDATA['BCISDATA'].find(el => el.name === queryTable)['dataset']
     
     
     for(var key in queryParam){
       if(queryParam[key].length ===0){
         continue;
       }
        table = table.filter(el=> queryParam[key].includes(el[key]))
     }
   
     setResult(table);
     
   }

const swap =()=>{
  let tmp = xField
  setXField(seriesField);
  setSerisField(tmp);
}

  return (
    <div className="App">
    <h1>BCISSurvey Data</h1>
    <div className="visual-area">
    <Column data={result} className='bg'  xAxis={{label:{rotate:100,offset:40,style:{fontSize:7}}}}  isGroup={!isStack} isStack={isStack}  autoFit  xField={xField} yField={yField} seriesField={seriesField}  isPercent={isPercent} point={{ size: 5, shape: 'diamon' }}
         />
    </div>
    <div className="filter_area" ><div  className="tables">
      Tables
      {renderTable}
      </div>
     {renderColumns()}
     <div>
     <div onClick={()=>{swap()}} className='swap-axis'>
        Swap Axis
      </div>
      <div onClick={()=>{setIsStack(!isStack)}} className='swap-axis'>
        Stack Bar
      </div>
     </div>
     
      </div>
      
    </div>
  );
}

export default App;
