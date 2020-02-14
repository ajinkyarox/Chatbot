import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from './history';
import Login from "./Login";
import Main from "./Main";
import EmpList from "./EmpList";
import AttendanceList from "./AttendanceList";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/Main" component={Main} />
                    <Route path="/EmpList" component={EmpList} />
                    <Route path="/AttendanceList" component={AttendanceList} />
                </Switch>
            </Router>
        )
    }
}