import React from "react";
export default class Modal extends React.Component {

constructor(props){
    super(props)
    this.state={
        username: '',
        firstname:'',
        lastname:'',
        password:'',
        reenterpwd:''
    }
}


handleUNChange(event){
    this.setState({username:event.target.value})
}

handlePwdChange(event){
    this.setState({password:event.target.value})
}

handleRePwdChange(event){
    this.setState({reenterpwd:event.target.value})
}
handleFirstNameChange(event){
    this.setState({firstname:event.target.value})
}
handleLastNameChange(event){
    this.setState({lastname:event.target.value})
}
handleSubmit(e){
if(this.state.firstname!=='' && this.state.firstname!==undefined && this.state.firstname!==null &&
this.state.lastname!=='' && this.state.lastname!==undefined && this.state.lastname!==null &&
this.state.username!=='' && this.state.username!==undefined && this.state.username!==null &&
this.state.password!=='' && this.state.password!==undefined && this.state.password!==null &&
this.state.reenterpwd!=='' && this.state.reenterpwd!==undefined && this.state.reenterpwd!==null &&
this.state.password===this.state.reenterpwd){
    fetch('http://localhost:8000/addLoginCredentials', {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          reenterpwd:this.state.reenterpwd,
          firstname:this.state.firstname,
          lastname:this.state.lastname
          
        })
        
      }).then((response) => {
          return response.json() // << This is the problem
       })
       .then((responseData) => { // responseData = undefined
           alert(responseData.status);
           window.location.reload(true);
           return responseData;
       })
     .catch(function(err) {
         console.log(err);
     })
}
    else if(this.state.password!==this.state.reenterpwd){
        alert("Enter password correctly")
    }
    else{
        alert("Enter all fields") 
    }

}
handleReset(e){
   
    this.setState({username:''})

        this.setState({password:''})
    
        this.setState({reenterpwd:''})
   
        this.setState({firstname:''})
    
        this.setState({lastname:''})
        window.location.reload(true);

}
    render() {


        if(!this.props.show){
            return null;
        }
else{
      return (
      <div align="center">
          <h3>Create Admin Login</h3>

          <table>
              <tr>
                  <td>
                  Username
                  </td>
                  <td>
                  <input type="text" value={this.state.username} onChange={(e)=>this.handleUNChange(e)} />
                  </td>
              </tr>
              <tr>
                  <td>
                  Password
                  </td>
                  <td>
                  <input type="password" value={this.state.password} onChange={(e)=>this.handlePwdChange(e)} />
                  </td>
              </tr>
              <tr>
                  <td>
                  Re-Enter Password
                  </td>
                  <td>
                  <input type="password" value={this.state.reenterpwd} onChange={(e)=>this.handleRePwdChange(e)} />
                  </td>
              </tr>
              <tr>
                  <td>
                  First-Name
                  </td>
                  <td>
                  <input type="text" value={this.state.firstname} onChange={(e)=>this.handleFirstNameChange(e)} />
                  </td>
              </tr>
              <tr>
                  <td>
                  Last-Name
                  </td>
                  <td>
                  <input type="text" value={this.state.lastname} onChange={(e)=>this.handleLastNameChange(e)} /> 
                </td>
              </tr>
          </table>
    
        <button onClick={(e)=>this.handleSubmit(e)} >Create</button> &nbsp;&nbsp;&nbsp;
        <button onClick={(e)=>this.handleReset(e)} >Reset</button>
      </div>
      );
    }
}
  }