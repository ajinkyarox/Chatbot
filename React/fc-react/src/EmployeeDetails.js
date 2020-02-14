import axios from 'axios';
const API_URL = 'http://localhost:8000/empdetails';

export default class EmployeeDetails{
   // constructor(){}
    getEmployees() {
        const url = `${API_URL}`;
        return axios.get(url).then(response => response.data);
    }  
}