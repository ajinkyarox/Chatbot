import CollegeDetails from './CollegeDetails';
import React, { Component } from 'react';
import Popup from "reactjs-popup";
import history from './history';
import { Route, Redirect, Link } from 'react-router-dom'
import CourseDetails from './CourseDetails';

const courseDetails = new CourseDetails();

class CourseList extends Component {

    constructor(props) {
        super(props)
        const params = new URLSearchParams(props.location.search);
        const foo = params.get('id');
        console.log(foo)
        this.state = {
            params: foo,
            collegeName: params.get('name').toUpperCase(),
            showPopup: false,
            name:'',
            seats:'',
            courses: []
        };
        this.goBack=this.goBack.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleUpdateSubmit=this.handleUpdateSubmit.bind(this);
        this.handleDeleteSubmit=this.handleDeleteSubmit.bind(this);
        this.handleSeatsChange=this.handleSeatsChange.bind(this);
    }

    handleNameChange(event){
        this.setState({name: event.target.value }); 
    }
    handleSeatsChange(event){
        this.setState({seats: event.target.value }); 
    }
    handleSubmit(event) {
        console.log(this.state.name)
        if(this.state.name.trim()!='' && this.state.name!=null && this.state.name!=undefined){
            var body1= JSON.stringify({
                name: this.state.name,
                cid:this.state.params,
                seats:this.state.seats
            })  
            console.log("POSTING"+body1)
            fetch('http://localhost:8000/addCourse', {
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
    

    componentDidMount() {
        var self = this;

        courseDetails.getCourseDetails(this.state.params).then(function (result) {

            self.setState({ courses: result })
            
        });




    }



goBack(){
    history.push('/Main')
}

togglePopup() {
    this.setState({
        showPopup: false
    });
}
handleUpdateSubmit(e,Id){
    console.log(this.state.name+" "+Id)
    if(this.state.name.trim()!='' && this.state.name!=null && this.state.name!=undefined){
        var body1= JSON.stringify({
            id:Id,
            name: this.state.name,
                seats:this.state.seats
        })  
        console.log("POSTING"+body1)
        fetch('http://localhost:8000/updateCourse', {
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
    alert("Please enter all the values")
}   

// 
}

handleDeleteSubmit(event,id){
    

    fetch('http://localhost:8000/deleteCourse?id='+id, {
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




    render() {


        return (
            <div align="center">
                <div align="left">
                <button onClick={this.goBack}>Back</button>
                </div>
                <br></br>
                <Popup   trigger={<button onClick={this.togglePopup.bind(this)}>Add Course</button>} position="left center">
                    <div>
                                                           Name:
                                                           <br></br>
                                            <input type="text" value={this.state.name} onChange={(e)=>this.handleNameChange(e) } />

                                            <br></br>
                                            Seats:
<br></br>
<input type="text" value={this.state.seats} onChange={(e)=>this.handleSeatsChange(e) } />
<br></br>
                                    <button onClick={this.handleSubmit}>Add</button>
    
                                    
    
                    
                                    </div>
                </Popup>

                <br></br>
                <br></br>
                <label>{this.state.collegeName}</label>
                <table className="table">
                    <thead key="thead">
                        <tr><th>ID</th>
                            <th>Name</th>
                            <th>Seats</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.courses.map(c =>
                            <tr key={c.id}>
                                <td>{c.id}</td>

                    <td>{c.name.toUpperCase()}</td>
                    <td>{c.seats}</td>
                    <td><Popup   trigger={<button onClick={this.togglePopup.bind(this)}>Update Course</button>} position="left center">
                    <div>
                                                           Name:
                                                           <br></br>
                                            <input type="text" value={this.state.name} onChange={(e)=>this.handleNameChange(e) } />

                                            <br></br>
<br></br>
Seats:
<br></br>
<input type="text" value={this.state.seats} onChange={(e)=>this.handleSeatsChange(e) } />
<br></br>
    
                                    <button onClick={e=>this.handleUpdateSubmit(e,c.id)}>Update</button>
    
                                    
    
                    
                                    </div>
                </Popup></td>
                <td> <Popup trigger={<button onClick={this.togglePopup.bind(this)}>Delete College</button>} position="left center">
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
export default CourseList