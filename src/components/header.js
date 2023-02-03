import React from 'react'
import {socket} from '../App.js'

const unregistered = {"login": undefined};



export default class Header extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
    this.loginChange = this.handleLoginChange.bind(this);

  }

  handleLoginChange(newlogin){
    if (newlogin == undefined){
      this.props.setLogin(undefined)
    } else {
      this.props.setLogin(newlogin)
      this.props.setPage("nav.chat");    }
  }

  componentDidMount() {
    socket.on('loginFailNoUsername', (msg, socket) => {
      sessionStorage.clear();
      alert("Sorry, incorrect username");
    })

    socket.on('loginOutConfirm', (msg, socket) => {
      sessionStorage.clear();
      this.handleLoginChange(undefined);
      alert("You have logged out");
    })


    socket.on('loginSuccess', (msg, socket) => {
      const userName = msg.value;
      this.handleLoginChange(userName);
      sessionStorage.setItem("loggedInAs", userName);
      sessionStorage.setItem("user_id", msg.uID);
      alert(`You have succesfully logged in as ${userName}`)
    })

    socket.on('loginFailWrongPassword', (msg, socket) => {
      alert("Sorry, incorrect password");
    })
  }

  render(){
    let loginStatus;
    const logi = this.loginChange;
    if (this.props.login == undefined){
      loginStatus = "unlogged (visitor)";
    } else {
      loginStatus = "logged in as "+this.props.login;
    }

    return <div id="header">
    <div id="banner">
      <h3>{loginStatus}</h3>
    </div>
    {this.props.navBar}</div>
  }
}
