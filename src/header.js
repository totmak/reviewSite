import React from 'react'
import {socket} from './App.js'


export default class Header extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = {"login": sessionStorage.getItem('loggedInAs')}
    this.loginChange = this.handleLoginChange.bind(this);
  }

  handleLoginChange(newlogin){
    this.setState(() => {
      return {login: newlogin}
    });
  }

  componentDidMount() {
    socket.on('loginFailNoUsername', (msg, socket) => {
      sessionStorage.clear();
      alert("Sorry, incorrect username");
    })

    socket.on('loginSuccess', (msg, socket) => {
      const userName = msg.value;
      this.handleLoginChange(userName);
      sessionStorage.setItem("loggedInAs", userName);
      alert(`You have succesfully logged in as ${userName}`)
    })

    socket.on('loginFailWrongPassword', (msg, socket) => {
      alert("Sorry, incorrect password");
    })
  }

  render(){
    let loginStatus;

    const logi = this.loginChange;
    if (logi == undefined){

      loginStatus = "unlogged (visitor)";
    } else {
      loginStatus = "logged in as "+this.state.login;
    }

    return <div id="header">
    <div id="banner">
      <h3>{loginStatus}</h3>
    </div>
    {this.props.navBar}</div>
  }
}
