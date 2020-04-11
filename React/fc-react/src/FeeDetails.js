import axios from 'axios';
const API_URL = 'http://localhost:8000/getFeeDetails';

export default class FeeDetails{
   // constructor(){}
    getFeeDetails(id) {
        const url = API_URL+'?cid='+id;
        return axios.get(url).then(response => response.data);
    }  
}