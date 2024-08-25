import React, { useEffect, useState } from 'react'
import Contacts from './Contacts';
import axios from 'axios';
import AddContact from './AddContact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [ApiData, setApiData] = useState([]);
const[showModel, setShowModel] = useState(false);
const[opacity, setOpacity] = useState(false);
const [reload, setReload] = useState(false);
const [id, setId] =useState("")


  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const api = await axios.get("http://localhost:1000/", {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Data is coming from API:", api.data.contacts);
            setApiData(api.data.contacts)
        } catch (error) {
           console.log(error);
           
        }
    };
    fetchData();
}, [reload]);

const handleModel = () => {
  setShowModel(!showModel);
  setOpacity(!opacity)
}
  return (
    <>
    <ToastContainer />
    <div>
      <AddContact ApiData={ApiData} handleModel={handleModel} showModel={showModel}  reload={reload} setReload={setReload} id={id} setId={setId}/>
      <Contacts ApiData={ApiData} opacity={opacity} reload={reload} setReload={setReload} id={id} setId={setId}  handleModel={handleModel}/>
    </div>
    </>
    
  )
}

export default App
