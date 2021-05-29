import axios from 'axios';

export default axios.create({
    // baseURL: "http://localhost:5000",
    baseURL: "https://project-kcane.herokuapp.com",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});