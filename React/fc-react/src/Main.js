import React,{ Component } from "react";
import EmpList from './EmpList'
import AttendanceList from './AttendanceList'
import { Route,withRouter, Redirect } from  'react-router-dom'
import {Navbar,Nav,Container} from 'react-bootstrap'
import history from './history';
import {Launcher} from 'react-chat-window'

const EmpLayout = () => (
    <div className="content">
        <Route path="/EmpList" exact component={EmpList} />
       
       
      </div>
  )

const AttLayout = () =>(
    <div className="content">
        
        <Route path="/AttendanceList" exact component={AttendanceList} />
       
      </div>
)
class Main extends Component{
    constructor(props){
        super(props)
        this.state={
            empflag:false,
            attflag:false,
            messageList: []
        }
    }

    _onMessageWasSent(message) {
        console.log(message.data.text)
        
        let tempArr = [...this.state.messageList,message];
     tempArr.push({
        author: 'them',
        type: 'text',
        data: { text:'Hello' }
      })
     this.setState({
        messageList: tempArr
    });
        
      }


      _sendMessage(text) {
        if (text.length > 0) {
          this.setState({
            messageList: [...this.state.messageList, {
              author: 'them',
              type: 'text',
              data: { text }
            }]
          })
        }
      }



changeEmpNavFlag(e){
    let flag=this.state.empflag
    this.setState({empflag:!flag})
    this.setState({attflag:false})
}
changeAttNavFlag(e){
    let flag=this.state.attflag
    this.setState({empflag:false})
    this.setState({attflag:!flag})
}
navToEmpList(e){
    return <EmpLayout/>
}
navToAttList(e){
    return <AttLayout/>
}

logout(e)
{
   localStorage.setItem('loginStatus',false)
   history.push('/')
   
}
render(){

    
    return(
    <div align="center">
        <div align="right">
            <button onClick={(e)=>{this.logout(e)}}>Logout</button>
        </div>
      <Launcher
        agentProfile={{
          teamName: 'react-chat-window',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
      />

    {this.state.empflag?(<EmpList/>):(<h3></h3>)}
    {this.state.attflag?(<AttendanceList/>):(<h3></h3>)}
    </div>
    );
}

}

export default Main