import axios from 'axios';
const API_URL = 'http://localhost:8000/getCourseDetails';

export default class CourseDetails{
   // constructor(){}
    getCourseDetails(id) {
        const url = API_URL+'?id='+id;
        
        return axios.get(url).then(response => response.data);
    }  
}