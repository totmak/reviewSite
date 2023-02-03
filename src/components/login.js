import React from 'react'
import Input from '../elements/input.js'
import Button from '../elements/button.js'
import {socket} from '../App.js'


const inputSlots = [
  {"id": "username", "name": "username", "type": "text"},
  {"id": "password", "name": "password", "type": "password"},
];



export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {};
    inputSlots.forEach((item, i) => {
      this.state[item.id] = '';
    });
    this.onChange = this.onChangeHandle.bind(this);
    this.onSubmit = this.onSubmitHandle.bind(this);
  }

  onSubmitHandle(){
    event.preventDefault();
    socket.emit('submitLoginAttempt', this.state);
  }


  onChangeHandle(event){
    const id = event.target.id;
    const value = event.target.value;
    this.setState(() => { return {[id]: value} });
  }

  render(){
    const rForm = inputSlots.map((item, i) => {
      const id = item.id;
      return <div key={i}><label htmlFor={item.id}>{item.name}</label>:
      {<Input id={item.id} name={item.name} onChange={this.onChange} type={item.type}/>}</div>
    })

    return <form id="loginForm" onSubmit={this.onSubmit}>
      {rForm}
      <div><Button id="loginButton" text="Login" type="submit"/>
      </div>
    </form>
  }
}
