import  EmployeeDetails  from  './EmployeeDetails';
import React,{ Component } from  'react';
import Popup from "reactjs-popup";
import Webcam from "react-webcam";
 
const  employeeDetails  =  new  EmployeeDetails();

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

class  EmpList  extends  Component {

  setRef = webcam => {
    this.webcam = webcam;
  };


    constructor(props) {
        super(props);
        
        this.state  = {
            employeeDet: [],
            showPopup: false,
            firstname: '',lastname: '',ufname: '',ulname:''
            
        };
        this.imgPass=this.imgPass.bind(this)
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
this.handleLastNameChange=this.handleLastNameChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
        //this.nextPage  =  this.nextPage.bind(this);
        //this.handleDelete  =  this.handleDelete.bind(this);
    }
    togglePopup() {
        this.setState({
          showPopup: false 
        });
      }


      handleDeleteSubmit(id){
        fetch('http://localhost:8000/deleteEmployee?id='+id, {
      method: 'DELETE',
      
      
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

      handleFirstNameChange(event) {
        
        this.setState({firstname: event.target.value});
      }
    
      handleLastNameChange(event){
        this.setState({lastname: event.target.value});
      }
    
      handleSubmit(event) {
        console.log("POSTING")
        fetch('http://localhost:8000/addEmployee', {
      method: 'POST',
      body: JSON.stringify({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
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
    console.log("POST")
   
   // 
      }

     
      handleUpdateSubmit(event,eid,fname,lname) {
        fetch('http://localhost:8000/updateEmployee', {
      method: 'PUT',
      body: JSON.stringify({
        id:eid,
        firstname: fname,
        lastname: lname
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
    console.log("PUT")
   
   // 
      }


      maxSelectFile=(event)=>{
        let files = event.target.files // create file object
            if (files.length > 1) { 
               const msg = 'Only 1 images can be uploaded at a time'
               event.target.value = null // discard selected file
               console.log(msg)
              return false;
     
          }
        return true;
     
     }

      imgPass(event,eid){
        if(this.maxSelectFile(event) && ( event.target.files[0].name.includes(".JPG") || event.target.files[0].name.includes(".jpg") || event.target.files[0].name.includes(".png") || event.target.files[0].name.includes(".PNG") )){
          console.log(event.target.files[0].name)
          let idCardBase64 = '';
          let name=event.target.files[0].name
          this.getBase64(event.target.files[0],name, (result) => {
               idCardBase64 = result;
               fetch('http://localhost:8000/savePhoto', {
                method: 'POST',
                body: JSON.stringify({
                  id: eid,
                  photo: idCardBase64,
                  filename:name
                })
                
              }).then((response) => {
                  return response.json() // << This is the problem
               })
               .then((responseData) => { // responseData = undefined
                   alert(responseData.status);
                   idCardBase64=null
                   window.location.reload(true);
                   return responseData;
               })
             .catch(function(err) {
                 console.log(err);
             })
          });
         // console.log(idCardBase64)
        }
        else{
          alert("Incompatible file type")
          window.location.reload(true);
        }

}

getBase64(file,name, cb) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
      cb(reader.result)
  };
  reader.onerror = function (error) {
      console.log('Error: ', error);
  };
}
      
markAttendace(event){
  const imageSrc = this.webcam.getScreenshot();
console.log(imageSrc)
  fetch('http://localhost:8000/markAttendance', {
    method: 'POST',
    body: JSON.stringify({
      photo: imageSrc,
      
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

handleInputFNameChange(event,id){
  //param:event.target.value;
  this.setState({ufname: event.target.value }); 
  
}
handleInputLNameChange(event,id){
  //param:event.target.value;
  this.setState({ulname : event.target.value }); 
}
    render() {

        return ( <div align="center">
          <div align="center">
          <Popup prefWidth="auto" maxHeight="auto" trigger={<button >Mark Attendace</button>}>
           <div>
           <Webcam audio={false}
        height={200}
        ref={this.setRef}
        screenshotFormat="image/jpeg"
        width={170}
        videoConstraints={videoConstraints}/><br></br>
        <button onClick={e=>this.markAttendace(e)}>Mark</button>
        </div>
        </Popup>
          </div>
        <table  className="table">
            <thead  key="thead">
            <tr>
                <th>Emp ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Update/Delete</th>
                <th>Adding Photo</th>
                
            </tr>
            </thead>
            <tbody>
                {this.state.employeeDet.map( c  =>
                <tr  key={c.id}>
                    <td>{c.id}  </td>
                    <td>{c.firstname}</td>
                    <td>{c.lastname}</td>
                    <td>
                    <Popup trigger={<button onClick={this.togglePopup.bind(this)}>Update Employee</button>} position="right center">
                    
        <div>
        <label>
          ID:
          <input readOnly="readOnly" type="text" value={c.id}  />
        </label>
        <br></br>
        <label>
          Fisrt Name:
          <input type="text"  onChange={(e)=>this.handleInputFNameChange(e,c.id) } />
        </label>
        <br></br>
        <label>
          Last Name:
          <input type="text"  onChange={(e)=>this.handleInputLNameChange(e,c.id) } />
        </label>
        <br></br>
<button onClick={(e)=>this.handleUpdateSubmit(e,c.id,this.state.ufname,this.state.ulname) }>Update</button>
      </div>
          </Popup> &nbsp;
          <button onClick={(e)=>this.handleDeleteSubmit(c.id) }>Delete</button></td>
         <td> <input type="file" name="file" onChange={(e)=>this.imgPass(e,c.id)}/> </td>
         
                </tr>)}
            </tbody>
        </table>
    
        
        
       
        
        <Popup trigger={<button onClick={this.togglePopup.bind(this)}>Add Employee</button>} position="right center">
        <div>
        <label>
          Fisrt Name:
          <input type="text" value={this.state.firstname} onChange={this.handleFirstNameChange} />
        </label>
        <br></br>
        <label>
          Last Name:
          <input type="text" value={this.state.lastname} onChange={this.handleLastNameChange} />
        </label>
        <br></br>
<button onClick={this.handleSubmit}>Add</button>
      </div>
          </Popup>
      
    </div>);
    }
    componentDidMount() {
        var  self  =  this;
        employeeDetails.getEmployees().then(function (result) {
            
            self.setState({ employeeDet:  result})
        });
    }
}
export  default  EmpList;