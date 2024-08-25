import React, { useEffect } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contacts = ({ ApiData, opacity, reload, setReload , id, setId, handleModel}) => {
  const deleteContact = async (id) => {
    const api = await axios.delete(`http://localhost:1000/del/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Deleted data", api);
    toast.success(api.data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
    setReload(!reload);
  };

  const blur = opacity ? "0.1" : "1";
  console.log("Getting id for edit", id);
  
  return (
    <div
      className="container my-5"
      style={{
        width: "700px",
        opacity: `${blur}`,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column"
      }}
    >
      {ApiData.map((data) => {
        return (
          <div
            key={data._id}
            className="bg-black p-3 my-3"
            style={{
              borderRadius: "10px",
              border: "2px solid yellow",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width:"460px"
            }}
          >
            <div>
              <h2>
                <IoPersonOutline className="mx-3" />  {data.name}
              </h2>
              <h4>
                <MdEmail className="mx-3" /> {data.email}
              </h4>
              <h4>
                <FaPhoneAlt className="mx-3" />  {data.phone}
              </h4>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {id ? (  <button className="btn btn-primary" onClick={() =>{handleModel(), setId(data._id)}}>Add</button>) : ( <button className="btn btn-primary" onClick={() =>{handleModel(), setId(data._id)}}>Edit</button>)}
            
              <button
                className="btn btn-danger"
                onClick={() => deleteContact(data._id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Contacts;
