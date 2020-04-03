import CollegeDetails from './CollegeDetails';
import React,{ Component } from  'react';




const  collegeDetails  =  new  CollegeDetails();

  
class CollegeList extends Component{

constructor(props){
    super(props)
    this.state = {
        collegeDetails:[],
        
        
    };
}




componentDidMount() {
    var  self  =  this;
    
    collegeDetails.getCollegeDetails().then(function (result) {
            
        self.setState({ collegeDetails:  result})
        
    });
     
    
     

}
render(){
    
    return(
    <div align="center">
         
        <table  className="table">
        <thead  key="thead">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Shortform</th>
                <th>Admit Criteria</th>
                <th>Fees</th>
                <th>Type</th>
            </tr>
            </thead>
            <tbody>

                {this.state.collegeDetails.map(c=>
                <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.address}</td>
                    <td>{c.shortForm}</td>
                    <td>{c.admitCriteria}</td>
                    <td>{c.fees}</td>
                    <td>{c.typeOfClg}</td>
                    
                </tr>

                )}
            </tbody>
        </table>

    </div>);

}


}
export  default  CollegeList;