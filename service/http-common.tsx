import axios from 'axios';
const url = "http://localhost:8080/api/v1/lead/";

export default axios.create({
    baseURL: url, 
    headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
    }
})