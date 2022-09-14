import React, { useState, ChangeEvent } from "react";
import axios from 'axios';
import { PostData } from "../../../../service/types";
import FormDataService from "../../../../service/services";
import { type } from "os";

let newDate = new Date()

const AddForm: React.FC = () => {
  
  const [nameIn, setName] = useState('');
  const [emailIn, setEmail] = useState('');
  const [phoneIn, setPhone] = useState('');
  const [messageIn, setMessage] = useState('');

  const initSavePostForm = {
    tenant: "Kru",
    form: "Contact",
    date: newDate,
    status: "Sent",
    channels: ["email"],
    data: {name: nameIn, email: "", phone: "", message: ""}
  };
  
  const [formulario, setFormulario] = useState<PostData>(initSavePostForm);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormulario({...formulario, [name]: value});
  };

  //console.log('old value: ', nameIn);
  const saveForm = () => {
    var dt = {
      tenant: formulario.tenant,
      form: formulario.form,
      date: formulario.date,
      status: formulario.status,
      channels: formulario.channels,
      data: {name: nameIn, email: emailIn, 
            phone: phoneIn, message: messageIn}
    };

    console.log(dt);
    FormDataService.create(dt)
    .then((response:any) =>{
      setFormulario({
        tenant: response.dt.tenant,
        form : response.dt.form,
        date: response.dt.date,
        status: response.dt.status,
        channels: response.dt.channels,
        data: response.dt.data
      });
      setSubmitted(true);
      console.log(response.dt);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  };
  const newForm = () => {
    setFormulario(initSavePostForm);
    setSubmitted(false);
  }
  return( 
    <>
    <div>
      <h1>Form post</h1>
    </div>
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newForm}>
              Add
            </button>
        </div>
        ) : (
          <div>
            <div className="form-group" hidden>
              <label htmlFor="tenant">Tenant</label>
              <input
                type="text"
                className="form-control"
                id="tenant"
                required
                value={formulario.tenant}
                onChange={handleInputChange}
                name="tenant" />
            </div>

            <div className="form-group" hidden>
              <label htmlFor="form">Form</label>
              <input
                type="text"
                className="form-control"
                id="form"
                required
                value={formulario.form}
                onChange={handleInputChange}
                name="form" />
            </div>

            <div className="form-group" hidden>
              <label htmlFor="date">Date</label>
              <input
                type="text"
                className="form-control"
                id="date"
                required
                value={formulario.date}
                onChange={handleInputChange}
                name="date" />
            </div>

            <div className="form-group" hidden>
              <label htmlFor="status">Status</label>
              <input
                type="text"
                className="form-control"
                id="status"
                required
                value={formulario.status}
                onChange={handleInputChange}
                name="status" />
            </div>

            <div className="form-group">
              <label htmlFor="nameIn">Name</label>
              <input
                type="text"
                className="form-control"
                id="nameIn"
                required
                value={nameIn}
                onChange={e => setName(e.target.value)}
                name="nameIn" />
            </div>

            <div className="form-group">
              <label htmlFor="emailIn">Email</label>
              <input
                type="text"
                className="form-control"
                id="emailIn"
                required
                value={emailIn}
                onChange={e => setEmail(e.target.value)}
                name="emailIn" />
            </div>

            <div className="form-group">
              <label htmlFor="phoneIn">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phoneIn"
                required
                value={phoneIn}
                onChange={e => setPhone(e.target.value)}
                name="phoneIn" />
            </div>

            <div className="form-group">
              <label htmlFor="messageIn">Message</label>
              <input
                type="text"
                className="form-control"
                id="messageIn"
                required
                value={messageIn}
                onChange={e => setMessage(e.target.value)}
                name="messageIn" />
            </div>

            <button onClick={saveForm} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
      </>
  );
};

export default AddForm;