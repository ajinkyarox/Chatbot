import Attendance from './AttendanceDetails';
import  EmployeeDetails  from  './EmployeeDetails';
import React,{ Component } from  'react';
import Popup from "reactjs-popup";


const attendanceDetails=new Attendance();
const  employeeDetails  =  new  EmployeeDetails();
const techCompanies = [];
  
class AttendanceList extends Component{

constructor(props){
    super(props)
    this.state = {
        attendanceDetails:[],
        employeeDet: [],
        
    };
}



getMonthlyReport(event,id){

    fetch('http://localhost:8000/getMonthlyReport', {
        method: 'POST',
        body: JSON.stringify({
          eid: id,
          
        })
        
      }).then((response) => {
          return response.json() // << This is the problem
       })
       .then((responseData) => { // responseData = undefined
        console.log(responseData.responseObject)
        if(responseData.responseObject===null || responseData.responseObject===undefined){
            alert("Attendance Record not present.")
        }
        else{
            var data = new Blob([this.dataURItoBlob(responseData.responseObject)], {type: 'text/xlsx'});
            var url = window.URL.createObjectURL(data);
            var tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.setAttribute('download', responseData.filename);
                    
    tempLink.click();
        }
        
           //window.open(tempLink)
           
         
           
           //return Base64.decode(responseData.responseObject);
       })
     .catch(function(err) {
         console.log(err);
     })
}


dataURItoBlob(b64Data) {
   const sliceSize=512;
   const contentType='';
    const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}
componentDidMount() {
    var  self  =  this;
    attendanceDetails.getAttendanceDetails().then(function (result) {
        
        self.setState({ attendanceDetails:  result})
    });
    employeeDetails.getEmployees().then(function (result) {
            
        self.setState({ employeeDet:  result})
        
    });
     
    
     

}
test(){
    for (let index = 0; index < this.state.employeeDet.length; index++) {
        const element = this.state.employeeDet[index];
        if(!techCompanies.includes({label:element.id,value:index})){
            techCompanies.push({label:element.id,value:index})
        }
        
       
    }
   
}

render(){
    
    return(
    <div align="center">
         <Popup trigger={<button>Generate Monthly Report</button>}>
             <div>
        Select Employee ID 
    <br></br>
    <select name="country"  >
    
    {this.state.employeeDet.map((e, key) => {
        return <option key={key} value={e.id} onClick={(event)=>this.getMonthlyReport(event,e.id)}>{e.firstname+" "+e.lastname}</option>;
    })}
</select>
&nbsp;

</div>
         </Popup>
        <table  className="table">
        <thead  key="thead">
            <tr>
                <th>ID</th>
                <th>Emp ID</th>
                <th>Attendance</th>
                <th>Date & Time</th>
                
            </tr>
            </thead>
            <tbody>

                {this.state.attendanceDetails.map(c=>
                <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.eid}</td>
                    <td>{c.attendance}</td>
                    <td>{c.datetime}</td>
                    
                </tr>

                )}
            </tbody>
        </table>

    </div>);

}


}
export  default  AttendanceList;