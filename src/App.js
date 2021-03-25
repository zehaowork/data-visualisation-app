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
  
  useEffect(() => {
    query("sample size",'Total')
    query("Trading Status by Industry")
  }, [])


  useEffect(() => {
   
   
  
  }, [result])


   const query  = (table,dimensions)=>{
     let queryTable = BCISDATA['BCISDATA'].find(el => el.name === table)
     let res =queryTable['dataset'].filter(el=>el['WorkForce'] === dimensions)
     console.log(res);
     setResult(res);

   }

  return (
    <div className="App">
    <h1>BCISSurvey Data</h1>
    <div className="visual-area">
    <Column data={result} className='bg'  xField="Industry" yField='value' seriesField='TradingStatus'  isPercent point={{ size: 5, shape: 'diamon' }}
         />
    </div>
    <div className="filter_area" >filter area</div>
    </div>
  );
}

export default App;
