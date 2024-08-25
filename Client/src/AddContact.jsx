import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddContact = ({
  handleModel,
  showModel,
  reload,
  setReload,
  id,
  setId,
  ApiData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (id) {
      const contact = ApiData.find((item) => item._id === id);
      if (contact) {
        setFormData({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
        });
      }
    }
  }, [id, ApiData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, email, phone } = formData;
    console.log(name, email, phone);
    handleModel();

    if(id){
     const api = await axios.put(
          `http://localhost:1000/update/${id}`,
          { name, email, phone },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
       
        );
        setReload(!reload);
        toast(api.data.message, {
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
    }else{
     try {
          // Send data to the API
          const api = await axios.post(
            "http://localhost:1000/add",
            { name, email, phone },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Form Submitted", api);
          setReload(!reload);
          setFormData({
               name:"",
               email: "",
               phone: "",
               id:""
          })
          toast(api.data.message, {
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
        } catch (error) {
          console.error("Error submitting form", error);
        }
    }

   
  };

  return (
    <div className="container mt-5" style={{ width: "200px",marginLeft:"14.8rem" }}>
      <button className="btn btn-warning" onClick={handleModel}>
        Add Contact
      </button>

      {/* Modal Code */}
      {showModel && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div
              className="modal-content bg-dark p-3"
              style={{ border: "2px solid yellow" }}
            >
              <div className="modal-header d-flex justify-content-center align-items-center">
                <h3 className="text-center">  {id ? "Edit Contact" : "Add Contact"}</h3>
              </div>
              <div className="modal-body">
                {/* Form */}
                <form onSubmit={submitHandler}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="text-center mt-3">
                    <button type="submit" className="btn btn-primary mx-2">
                      {id ? "Update Contact" : "Add Contact"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleModel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddContact;
