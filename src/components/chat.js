import React from 'react'
import Button from '../elements/button.js'
import Input from '../elements/input.js'
import List from '../elements/list.js'

import {socket} from '../App.js'


export default class Chat extends React.Component {
  constructor(props){
    super(props);
    this.onSubmitJoin = this.onSubmitJoinHandle.bind(this);
    this.onSubmitSendMsg = this.onSubmitSendMsgHandle.bind(this);
    this.onChangeTypingMessage = this.onChangeTypingMessageHandle.bind(this);
    this.onChangeGroupName = this.onGroupInputChangeHandle.bind(this);
    this.messageForm = this.getMessageForm.bind(this)
    this.state = {};
    this.state["group"] = "";
    this.state["isConnectedToGroup"] = false;
    this.state["messages"] = [];
    this.state["typingMessage"] = "";
    this.state["participants"] = [];
    this.onMessageHTML = this.handleMessageHTML.bind(this);
  }

  componentDidMount() {
    socket.on('updateChatLog', (msg, socket) => {
      this.setState(() => { return {participants: msg.participants} } );
      if (this.state.isConnectedToGroup == false){
        this.setState(() => { return {isConnectedToGroup: true} } );
      }
      this.updateMessageTo(msg.messages);
    })
  }


  updateMessageTo(raw){
    const updList = raw.map((item, i) => {
      return item;
    });
    this.setState(() => { return {messages: updList} });
  }

  handleMessageHTML(){
    return this.state.messages.map((item, i) => {
      const mesHeight = (20*(1+Math.floor(item.message.length/75)));
      return <li  style={{height: mesHeight +"px"}} key={i}><b>{this.state.participants[item.user]}</b>:{item.message}</li>
    })
  }

  onChangeTypingMessageHandle(e){
    this.setState(() => {
      return {typingMessage: e.target.value}
    });
  }

  onGroupInputChangeHandle(e){
    this.setState(() => {
      return {group: e.target.value}
    });
  }

  onSubmitSendMsgHandle(e){
    socket.emit('sendChatMessage', {"group": this.state.group, "message": this.state.typingMessage, "user": sessionStorage.getItem("user_id") });
    e.preventDefault()

  }

  onSubmitJoinHandle(e){
    const uid = (sessionStorage.getItem("user_id"))==null?1:sessionStorage.getItem("user_id")
    const req = {"uID": uid, "group": this.state.group }
    socket.emit('requestJoiningGroup', req);
    e.preventDefault()
  }

  getMessageForm(){
    if (this.state.isConnectedToGroup == true){
     return <form onSubmit={this.onSubmitSendMsg}><label htmlFor="messageInputIn">Message</label>:<Input style="basicInput" name="insert message here" id="messageInputIn" onChange={this.onChangeTypingMessage} value={this.state.value}/><Button id="sendMsgButton" text="Send" type="submit"/></form>
  } else { return ""; }
  }

  render(){
    const Msgform = this.messageForm;
    return <div id="aside">
      <p><i>Use anonymously or register and login to get a username.</i></p>
      <form onSubmit={this.onSubmitJoin}>
           <label htmlFor="groupName">Group name</label>
           <Input style="basicInput" name="some" id="groupConnectId"
           onChange={this.onChangeGroupName} value={this.state.value}/>
           <Button id="groupButton" text="Join" type="submit"/>
      </form>
      <List id="chatList" content={this.onMessageHTML}/>
      <this.messageForm/>
    </div>
  }
}
