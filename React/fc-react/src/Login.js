import React,{ Component } from "react";
import Main from './Main'
import { Route,Redirect ,Link} from  'react-router-dom'
import Modal from './LoginCred'
import EmpList from './EmpList'
import AttendanceList from './AttendanceList'
import { Button } from 'react-bootstrap';
import history from './history';

const MainLayout = () => (
    <div className="content">
        <Route path="/Main" exact component={Main} />
       
       
      </div>
  )
class Login extends Component{

    constructor(props){
        super(props);
        this.state ={
            username: '',
            password:'',
            show: false,
            navigate:false
        }
        /*if (window.performance) {
            if (performance.navigation.type == 1) {
              alert( "This page is reloaded"+this.state.navigate );
             
            } else {
              alert( "This page is not reloaded");
            }
          }*/
          //this.onUnload = this.onUnload.bind(this);
    }
   
handleSubmit(e){
    if(this.state.username!=='' && this.state.username!==null && this.state.username!==undefined &&
    this.state.password!=='' && this.state.password!==null && this.state.password!==undefined){
        console.log("HHHHHHHH")
        fetch('http://localhost:8000/login', {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          
          
        })
        
      }).then((response) => {
          return response.json() // << This is the problem
       })
       .then((responseData) => { // responseData = undefined
           alert(responseData.status);
           if(responseData.status==="Success"){
            this.setState({ navigate: true});
            localStorage.setItem('loginStatus',true)
            console.log(this.state.navigate)
            history.push('/Main')            
           }
           else{
            this.setState({ navigate: false});
window.location.reload(true);
           }
          
           return responseData;
       })
     .catch(function(err) {
         console.log(err);
     })
    }
    else{
      alert("Enter all the fields")
    }
    
}

renderRedirect = () => {
    if (this.state.navigate) {
      return <MainLayout />
    }
    else{
        return null;
    }
  }

handleUNChange(event){
    this.setState({username:event.target.value})
}

handlePwdChange(event){
    this.setState({password:event.target.value})
}
showModal = e => {
    let flag=this.state.show
    this.setState({
      show: !flag
    });
  };


  handleClick = () => {
    console.log('Button is cliked!');
    this.setState({referrer: '/Main'});
}

    render(){
       

        return(
            <div align="center">
               
       


    <div>

<label>
        Username&nbsp;&nbsp;
          <input type="text" value={this.state.username} onChange={(e)=>this.handleUNChange(e)} />
        </label>
        <br></br><br></br>
        <label>
          Password&nbsp;&nbsp;
          <input type="password" value={this.state.password} onChange={(e)=>this.handlePwdChange(e)} />
        </label>
        <br></br><br></br>
        <button onClick={(e)=>this.handleSubmit(e)} >Login</button>
    

    <br></br><br></br>
    <Button variant="btn btn-success" onClick={ this.showModal}>Create Account</Button>
<Modal show={this.state.show}/>
        </div>

            </div>
        )
    }

}

export default Login