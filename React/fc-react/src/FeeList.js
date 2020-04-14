import CollegeDetails from './CollegeDetails';
import React, { Component } from 'react';
import Popup from "reactjs-popup";
import history from './history';
import { Route, Redirect, Link } from 'react-router-dom'
import FeeDetails from './FeeDetails';

const feeDetails = new FeeDetails();

class FeeList extends Component {

    constructor(props) {
        super(props)
        const params = new URLSearchParams(props.location.search);
        const foo = params.get('id');
        console.log(foo)
        this.state = {
            params: foo,
            collegeName: params.get('name').toUpperCase(),
            showPopup: false,
            openCategory:0,
            obc:0,
            sbc:0,
            sc:0,
            st:0,
            name:'',
            seats:'',
            fees: []
        };
        this.goBack=this.goBack.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpenCategoryChange=this.handleOpenCategoryChange.bind(this);
        this.handleOBCChange=this.handleOBCChange.bind(this);
        this.handleSBCChange=this.handleSBCChange.bind(this);
        this.handleSCChange=this.handleSCChange.bind(this);
        this.handleSTChange=this.handleSTChange.bind(this);
    }

    handleOpenCategoryChange(event){
        this.setState({openCategory: event.target.value }); 
    }
    handleOBCChange(event){
        this.setState({obc: event.target.value }); 
    }
    handleSBCChange(event){
        this.setState({sbc:event.target.value})
    }
    handleSCChange(event){
        this.setState({sc:event.target.value})
    }
    handleSTChange(event){
        this.setState({st:event.target.value})
    }
    
    handleSubmit(event) {
       if(this.state.fees.length==0){
        if(this.state.openCategory!==0 && this.state.openCategory!==null && this.state.openCategory!==undefined &&
            this.state.obc!==0 && this.state.obc!==null && this.state.obc!==undefined &&
            this.state.sbc!==0 && this.state.sbc!==null && this.state.sbc!==undefined && 
            this.state.sc!==0 && this.state.sc!==null && this.state.sc!==undefined &&
            this.state.st!==0 && this.state.st!==null && this.state.st!==undefined){
            var body1= JSON.stringify({
                cid:this.state.params,
                openCategory: this.state.openCategory,
                    obc:this.state.obc,
                    sbc:this.state.sbc,
                    sc:this.state.sc,
                    st:this.state.st
            })  
            console.log("POSTING"+body1)
            fetch('http://localhost:8000/addFeeDetails', {
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
       }else{
           alert("Fee details already added.")
       }
       
    
    // 
      }
    

    componentDidMount() {
        var self = this;

        feeDetails.getFeeDetails(this.state.params).then(function (result) {

            self.setState({ fees: result })
            
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
    if(this.state.openCategory!==0 && this.state.openCategory!==null && this.state.openCategory!==undefined &&
        this.state.obc!==0 && this.state.obc!==null && this.state.obc!==undefined &&
        this.state.sbc!==0 && this.state.sbc!==null && this.state.sbc!==undefined && 
        this.state.sc!==0 && this.state.sc!==null && this.state.sc!==undefined &&
        this.state.st!==0 && this.state.st!==null && this.state.st!==undefined){
        var body1= JSON.stringify({
            id:Id,
            openCategory: this.state.openCategory,
                obc:this.state.obc,
                sbc:this.state.sbc,
                sc:this.state.sc,
                st:this.state.st
        })  
        console.log("POSTING"+body1)
        fetch('http://localhost:8000/updateFeeDetails', {
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
                <Popup   trigger={<button onClick={this.togglePopup.bind(this)}>Add Fee Details</button>} position="left center">
                <div>
                                                           Open Category:
                                                           <br></br>
                                            <input type="number" value={this.state.openCategory} onChange={(e)=>this.handleOpenCategoryChange(e) } />

                                            <br></br>
                                            OBC Category:
                                                           <br></br>
                                            <input type="number" value={this.state.obc} onChange={(e)=>this.handleOBCChange(e) } />

                                            <br></br>
                                            SBC Category:
                                                           <br></br>
                                            <input type="number" value={this.state.sbc} onChange={(e)=>this.handleSBCChange(e) } />

                                            <br></br>
                                            SC Category:
                                                           <br></br>
                                            <input type="number" value={this.state.sc} onChange={(e)=>this.handleSCChange(e) } />

                                            <br></br>
                                            ST Category:
                                                           <br></br>
                                            <input type="number" value={this.state.st} onChange={(e)=>this.handleSTChange(e) } />

                                            <br></br>

<br></br>

    
                                    <button onClick={e=>this.handleSubmit(e)}>Add</button>
    
                                    
    
                    
                                    </div>
                </Popup>

                <br></br>
                <br></br>
                <label>{this.state.collegeName}</label>
                <table className="table">
                    <thead key="thead">
                        <tr><th>ID</th>
                            <th>Open</th>
                            <th>OBC</th>
                            <th>SBC</th>
                            <th>SC</th>
                            <th>ST</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.fees.map(c =>
                            <tr key={c.id}>
                                <td>{c.id}</td>

                    <td>{c.openCategory}</td>
                    <td>{c.obc}</td>
                    <td>{c.sbc}</td>
                    <td>{c.sc}</td>
                    <td>{c.st}</td>
                    <td><Popup   trigger={<button onClick={this.togglePopup.bind(this)}>Update Fee Details</button>} position="left center">
                    <div>
                                                           Open Category:
                                                           <br></br>
                                            <input type="number" value={this.state.openCategory} onChange={(e)=>this.handleOpenCategoryChange(e) } />

                                            <br></br>
                                            OBC Category:
                                                           <br></br>
                                            <input type="number" value={this.state.obc} onChange={(e)=>this.handleOBCChange(e) } />

                                            <br></br>
                                            SBC Category:
                                                           <br></br>
                                            <input type="number" value={this.state.sbc} onChange={(e)=>this.handleSBCChange(e) } />

                                            <br></br>
                                            SC Category:
                                                           <br></br>
                                            <input type="number" value={this.state.sc} onChange={(e)=>this.handleSCChange(e) } />

                                            <br></br>
                                            ST Category:
                                                           <br></br>
                                            <input type="number" value={this.state.st} onChange={(e)=>this.handleSTChange(e) } />

                                            <br></br>

<br></br>

    
                                    <button onClick={e=>this.handleUpdateSubmit(e,c.id)}>Update</button>
    
                                    
    
                    
                                    </div>
                </Popup></td>
                                            </tr>
                            )}
                    </tbody>
                </table>
            </div>);

    }


}
export default FeeList