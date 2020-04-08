import CollegeDetails from './CollegeDetails';
import React, { Component } from 'react';
import Popup from "reactjs-popup";
import history from './history';
import CourseList from './CourseList'
import { Route,Redirect ,Link} from  'react-router-dom'

const collegeDetails = new CollegeDetails();



class CollegeList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            collegeDetails: [],
            showPopup: false,
name:'',
address:'',
shortForm:'',
admitCriteria:'',
fees:'',
typeOfClg:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleAddressChange=this.handleAddressChange.bind(this);
        this.handleAdmitCriteriaChange=this.handleAdmitCriteriaChange.bind(this);
        this.handleFeesChange=this.handleFeesChange.bind(this);
        this.handleShortFormChange=this.handleShortFormChange.bind(this);
        this.handleTypeChange=this.handleTypeChange.bind(this);
        this.handleUpdateSubmit=this.handleUpdateSubmit.bind(this);
        this.handleDeleteSubmit=this.handleDeleteSubmit.bind(this);
        this.handleCourseDetails=this.handleCourseDetails.bind(this);
    }




    componentDidMount() {
        var self = this;

        collegeDetails.getCollegeDetails().then(function (result) {

            self.setState({ collegeDetails: result })

        });




    }
    togglePopup() {
        this.setState({
            showPopup: false
        });
    }

    handleNameChange(event){
        this.setState({name: event.target.value }); 
    }
handleAddressChange(event){
    this.setState({address: event.target.value }); 
}
handleShortFormChange(event){
    this.setState({shortForm: event.target.value }); 
}
handleAdmitCriteriaChange(event){
    this.setState({admitCriteria: event.target.value }); 
}
handleFeesChange(event){
    this.setState({fees: event.target.value }); 
}
handleTypeChange(event){
    this.setState({typeOfClg: event.target.value }); 
}

handleSubmit(event) {
    console.log(this.state.name)
    if(this.state.name.trim()!='' && this.state.name!=null && this.state.name!=undefined &&
    this.state.address.trim()!='' && this.state.address!=null && this.state.address!=undefined &&
    this.state.shortForm.trim()!='' && this.state.shortForm!=null && this.state.shortForm!=undefined &&
    this.state.admitCriteria.trim()!='' && this.state.admitCriteria!=null && this.state.admitCriteria!=undefined &&
    this.state.fees.trim()!='' && this.state.fees!=null && this.state.fees!=undefined &&
    this.state.typeOfClg.trim()!='' && this.state.typeOfClg!=null && this.state.typeOfClg!=undefined){
        var body1= JSON.stringify({
            name: this.state.name,
            address: this.state.address,
            shortForm:this.state.shortForm,
            admitCriteria:this.state.admitCriteria,
            fees:this.state.fees,
            typeOfClg:this.state.typeOfClg
          })  
        console.log("POSTING"+body1)
        fetch('http://localhost:8000/addCollege', {
      method: 'POST',
      body: body1  
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
else{
    alert("Please enter all the values")
}   

// 
  }

  handleCourseDetails(event,id,name){
      
    history.push('/CourseList?id='+id+'&name='+name)            
}

handleDeleteSubmit(event,id){
    

    fetch('http://localhost:8000/deleteCollege?id='+id, {
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


  handleUpdateSubmit(event,Id) {
    console.log(this.state.name)
    if(this.state.name.trim()!='' && this.state.name!=null && this.state.name!=undefined &&
    this.state.address.trim()!='' && this.state.address!=null && this.state.address!=undefined &&
    this.state.shortForm.trim()!='' && this.state.shortForm!=null && this.state.shortForm!=undefined &&
    this.state.admitCriteria.trim()!='' && this.state.admitCriteria!=null && this.state.admitCriteria!=undefined &&
    this.state.fees.trim()!='' && this.state.fees!=null && this.state.fees!=undefined &&
    this.state.typeOfClg.trim()!='' && this.state.typeOfClg!=null && this.state.typeOfClg!=undefined
    ){
        var body1= JSON.stringify({
            id:Id,
             name: this.state.name,
             address: this.state.address,
             shortForm:this.state.shortForm,
             admitCriteria:this.state.admitCriteria,
             fees:this.state.fees,
             typeOfClg:this.state.typeOfClg
           })  
         console.log("POSTI"+body1)
         fetch('http://localhost:8000/updateCollege', {
       method: 'PUT',
       body: body1  
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
else{
    alert("Please enter all values")
}   

// 
  }


    render() {

        return (
            <div align="center">
                <br></br>
                <Popup   trigger={<button onClick={this.togglePopup.bind(this)}>Add Employee</button>} position="left center">
                    <div>
                                                           Name:
                                                           <br></br>
                                            <input type="text" value={this.state.name} onChange={(e)=>this.handleNameChange(e) } />

                                            Address:
        
                                    <input type="text" value={this.state.address} onChange={(e)=>this.handleAddressChange(e) } />
                               
                                    Shortform:
                                          <input type="text" value={this.state.shortForm} onChange={(e)=>this.handleShortFormChange(e) } />
                                          <br></br>
      
                                    Admit Criteria:
                                    <br></br>
                                    <input type="text" value={this.state.admitCriteria} onChange={(e)=>this.handleAdmitCriteriaChange(e) } />
                                    <br></br>
                                    Fees:
                                    <br></br>
                                    <input type="text" value={this.state.fees}  onChange={(e)=>this.handleFeesChange(e) } />
                                    <br></br>
                                    Type:
                                    <br></br>
                                    <input type="text" value={this.state.typeOfClg} onChange={(e)=>this.handleTypeChange(e) } />
    
<br></br>
<br></br>
    
                                    <button onClick={this.handleSubmit}>Add</button>
    
                                    
    
                    
                                    </div>
                </Popup>
                <br></br>
                <br></br>

                <table className="table">
                    <thead key="thead">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Shortform</th>
                            <th>Admit Criteria</th>
                            <th>Fees</th>
                            <th>Type</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.collegeDetails.map(c =>
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td> <button onClick={e=>this.handleCourseDetails(e,c.id,c.name)}>{c.name}</button></td>
                                <td>{c.address}</td>
                                <td>{c.shortForm}</td>
                                <td>{c.admitCriteria}</td>
                                <td>{c.fees}</td>
                                <td>{c.typeOfClg}</td>
                                <td><Popup   trigger={<button onClick={this.togglePopup.bind(this)}>Update College</button>} position="left center">
                    <div>
                                                           Name:
                                                           <br></br>
                                            <input type="text" value={this.state.name} onChange={(e)=>this.handleNameChange(e) } />

                                            Address:
        
                                    <input type="text" value={this.state.address} onChange={(e)=>this.handleAddressChange(e) } />
                               
                                    Shortform:
                                          <input type="text" value={this.state.shortForm} onChange={(e)=>this.handleShortFormChange(e) } />
                                          <br></br>
      
                                    Admit Criteria:
                                    <br></br>
                                    <input type="text" value={this.state.admitCriteria} onChange={(e)=>this.handleAdmitCriteriaChange(e) } />
                                    <br></br>
                                    Fees:
                                    <br></br>
                                    <input type="text" value={this.state.fees}  onChange={(e)=>this.handleFeesChange(e) } />
                                    <br></br>
                                    Type:
                                    <br></br>
                                    <input type="text" value={this.state.typeOfClg} onChange={(e)=>this.handleTypeChange(e) } />
    
<br></br>
<br></br>
    
                                    <button onClick={e=>this.handleUpdateSubmit(e,c.id)}>Update</button>
    
                                    
    
                    
                                    </div>
                </Popup></td>
                                <td><Popup   trigger={<button onClick={this.togglePopup.bind(this)}>Delete College</button>} position="left center">
                    <div>
                                                           
    
                                    <button onClick={e=>this.handleDeleteSubmit(e,c.id)}>Delete</button>
    
                                    
    
                    
                                    </div>
                </Popup></td>
                            </tr>

                        )}
                    </tbody>
                </table>

            </div>);

    }


}
export default CollegeList;