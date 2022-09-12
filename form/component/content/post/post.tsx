import axios from 'axios';
import styles from "./styles.module.css";
import React, {Component, useState} from 'react';
import { AccordionCollapse } from 'react-bootstrap';
import { PostData } from "../../../../service/types";

const datos = [
    {
      value: ['email'],
      label: "email"
    },
    {
      value: ['whatsapp'],
      label: "whatsapp"
    },
    {
      value: ["sms"],
      label: "sms"
    }
  ];

const url = "http://localhost:8080/api/v1/lead/";
//const [forms, setForms] = useState<Array<PostData>>([]);

class Post extends Component {

    state = {
        selectedOption: null,
      };
      handleChange = (selectedOption:any) => {
        this.setState({ selectedOption }, () =>
          console.log(`Option selected:`, this.state.selectedOption)
        );
      };

    
    constructor(props: Array<PostData>){
        super(props)

        this.state = {
            tenant: '',
            form:'',
            date:'',
            status:'',
            channels: []
        }
    }

    changeHandler = (e:any) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e:any) => {
        e.preventDefault();
        console.log(this.state);
        axios.post(url, this.state)
        .then(resonse => {
            console.log(resonse);
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        const { tenant, info, date, status, channels, form, selectedOption } = this.state;
        return(
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>Tenant: <input type="text" name="tenant" value={tenant} onChange={this.changeHandler} /></div>
                    <div>Formulario: <input type="text" name="form" value={form} onChange={this.changeHandler} /></div>
                    <div>Fecha: <input type="date" name="date" value={date} onChange={this.changeHandler} /></div>
                    <div>Status: <input type="text" name="status" value={status} onChange={this.changeHandler} /></div>
                    <select value={channels} name="channels" onChange={this.changeHandler}>
                        {datos.map((option: any) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>

                    <button type="submit">Send</button>
                </form>
            </div>
        );
    }
}

export default Post