import axios from 'axios';
const API_URL = 'http://localhost:8000/getCollegeDetails';

export default class CollegeDetails{
   // constructor(){}
    getCollegeDetails() {
        const url = `${API_URL}`;
        return axios.get(url).then(response => response.data);
    }  
}