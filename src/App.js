
//import './App.css';
import React, {useState} from 'react';
import { Nav_bar } from './component/nav_bar/Nav_bar.js';
import { Button } from './component/Button/Button.jsx';
import { DataTable } from './component/DataTable/DataTable.jsx'
import {Footer} from './component/footer/Footer'
// import {Test} from './component/test/test.js'
function App() {
  const [selection, setselection] = useState([])
  const handleCallback = (childData) => {
    setselection(childData);
  }

  // fetching data 
  const [rows, setRows] = useState([]);
  const getData = (data)=>{
    setRows(data);
  }

  return (
    <>
      <Nav_bar />
      <Button selectedRows={selection} getData = {getData} />
      <DataTable selectedRowsCallback = {handleCallback} rowData = {rows} />
      <Footer />
      {/* <Test/> */}
    </>
  );
}

export default App;
