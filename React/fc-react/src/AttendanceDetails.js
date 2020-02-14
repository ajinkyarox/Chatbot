import axios from 'axios';
const API_URL = 'http://localhost:8000/getAttendance';

export default class AttendanceDetails{
   // constructor(){}
    getAttendanceDetails() {
        const url = `${API_URL}`;
        return axios.get(url).then(response => response.data);
    }  
}