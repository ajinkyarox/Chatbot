import React from 'react';
import './App.css';
import Login from './Login'
import Main from './Main'
import EmpList from './EmpList'
import AttendanceList from './AttendanceList'
import { BrowserRouter } from  'react-router-dom'
import { Route } from  'react-router-dom'
import {Navbar,Nav,Container} from 'react-bootstrap'


const LoginPage = () => (
  <div className="content">
      

      <Route path="" exact component={Login} />
      
     
    </div>
)
function App() {
  
  return (
    <div align="center">
      <h1>Chatbot</h1>
      <br></br><br></br><br></br>
      <BrowserRouter>
       <LoginPage/>
      </BrowserRouter>
      

    </div>
  );
}

export default App;
