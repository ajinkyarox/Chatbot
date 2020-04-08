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
            courses: []
        };
        this.goBack=this.goBack.bind(this)

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


    render() {


        return (
            <div align="center">
                <div align="left">
                <button onClick={this.goBack}>Back</button>
                </div>
                
                <br></br>
                <br></br>
                <label>{this.state.collegeName}</label>
                <table className="table">
                    <thead key="thead">
                        <tr><th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.courses.map(c =>
                            <tr key={c.id}>
                                <td>{c.id}</td>
                    <td>{c.name}</td>
                            </tr>
                            )}
                    </tbody>
                </table>
            </div>);

    }


}
export default CourseList