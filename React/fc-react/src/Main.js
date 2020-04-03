import React,{ Component } from "react";
import EmpList from './EmpList'
import AttendanceList from './AttendanceList'
import CollegeList from './CollegeList'
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
var tmp=[]
        tmp.push({
          author: 'them',
          type: 'text',
          data: { text:'Hello' }
        })
class Main extends Component{
    constructor(props){
        super(props)
        this.state={
            empflag:false,
            attflag:false,
            messageList:[/*{
              author: 'them',
              type: 'text',
              data: { text:'Hello' }
            },*/]
           
        }

             
     
    }

    _onMessageWasSent(message) {
        console.log(message.data.text)
        let tempmsg=''
        var msgTemp=message.data.text;

        
        let tempArr = [...this.state.messageList,message];
        this.setState({
          messageList: tempArr
      });
        fetch('http://localhost:8000/mcresponse', {
        method: 'POST',
        body: JSON.stringify({
          msg: msgTemp.toLowerCase(),
          
          
          
        })
        
      }).then((response) => {
          return response.json() // << This is the problem
       })
       .then((responseData) => { // responseData = undefined
           
           if(responseData.status==="Success"){
            tempmsg=responseData.respmsg

             
             tempArr.push({
              author: 'them',
              type: 'text',
              data: { text:tempmsg }
            })
           this.setState({
              messageList: tempArr
          });

          var snd = new Audio("data:audio/mp3;base64," + responseData.respvoice);
snd.play();
           }
           else{


           }
          
           return responseData;
       })
     

        
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

        <Container>
      <Navbar bg="primary" variant="dark">
    
    <Nav className="mr-auto">
      
      <Nav.Link onClick={(e)=>{this.changeAttNavFlag(e)}}>College List</Nav.Link>
    </Nav>
    </Navbar>
    </Container>

      <Launcher 
     
        agentProfile={{
          teamName: 'ChatBot',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
      />

  
    {this.state.attflag?(<CollegeList/>):(<h3></h3>)}
    </div>
    );
}

}

export default Main