import './App.css';
import React, { useState} from 'react'

import ContactSearch from './components/contactSearch/ContactSearch';
import PopupContact from './components/popupContact/PopupContact';

function App() {
  const [openPopup, setOpenPopup] = useState(false);
  const [method, setMethod] = useState("CREATE");
  const [data, setData] = useState({});
  const [dataHasChanged, setDataHasChanged] = useState(false);
  const popupController = (open,type,dataContact)=>{
    setMethod(type);
    setOpenPopup(open);
    setData(dataContact);
  }
  return (
    <div className="App">
      <ContactSearch popupController={popupController} dataHasChanged={dataHasChanged}></ContactSearch>
      <button onClick={()=>popupController(true, "CREATE")} >Add New Contact</button>
      <PopupContact show={openPopup} popupController={popupController} methodType={method} contact={data} dataHasChanged={dataHasChanged} setDataHasChanged={setDataHasChanged}>
      </PopupContact>
    </div>
  );
}

export default App;
