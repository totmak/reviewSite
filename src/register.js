import React from 'react'
import Input from './components/input.js'
import Button from './components/button.js'
import List from './components/list.js'
import {socket} from './App.js'

const inputSlots = [
  {"id": "username",  "name": "Username", "type": "text", "length": {"min": 6, "max": 16},
  "ruleset": {"upperCasin": -1, "numbers": -1, "special": -1}
  },
  {"id": "firstname",  "name": "Forename", "type": "text", "length": {"min": 3, "max": 16},
  "ruleset": {"upperCasin": 0, "numbers": -1, "special": -1}
  },
  {"id": "lastname",  "name": "Surname", "type": "text", "length": {"min": 3, "max": 16},
  "ruleset": {"upperCasin": 0, "numbers": -1, "special": -1}
  },
  {"id": "password", "name": "Password", "type": "password", "length": {"min": 8, "max": 32},
  "ruleset": {"upperCasin": 1, "numbers": 1, "special": 0}
  }
];

const numberArray = [0,1,2,3,4,5,6,7,8,9];

/*
  Ruleset guide lines dictate what is allowed or needed
  ruleset ID: meaning
  -1: disallowed (e.g. "numbers": -1 means input must not have numbers)
  0: allowed (everything goes, but isn't isn't must)
  1: required (e.g. "upperCasin": 1 means input must include at least one upper case letter)

*/


const inputSlotDic = {};
inputSlots.forEach((item, i) => { inputSlotDic[item.id] = item; });


export default class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = {};
    this.style = {};
    inputSlots.forEach((item, i) => {
      this.state[item.id] = '';
      this.style[item.id] = '';
    });

    this.style["submitButtonIsDisabled"] = true;
    this.invalidList = [];
    this.style.invalidList = this.getInvalidListContent.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmitHandle.bind(this);

  }

  onSubmitHandle(event){
    event.preventDefault();
    socket.emit('submit', this.state);
  }

  getInvalidListContent(){
    return this.getStringOfInvalidList().map((item, i) => {
      return <li key={i}>{item}</li>
    })
  }

  /*
    change is value from this.state
  */
  getInvalids(raw, change){
    let list = [];
    if (!this.validateInputLength(raw, change)) {
      list.push([raw.id, 0])
    }
    if (!this.validateRuleset(raw, change)) {
      list.push([raw.id, 1])
    }
    return list;
  }

  getRulesetString(key){
    var rules = [];
    switch (key.ruleset.upperCasin) {
      case 1:
        rules.push(`requires at least one upper-case letter`);
        break;
      case -1:
        rules.push(`mustn't include any upper-case letters`);
        break;
    }
    switch (key.ruleset.numbers) {
      case 1:
        rules.push(`requires at least one number`);
        break;
      case -1:
        rules.push(`mustn't include numbers`);
        break;
    }
    switch (key.ruleset.special) {
      case 1:
        rules.push(`requires at least one special character`);
        break;
      case -1:
        rules.push(`mustn't include special characters`);
        break;
    }

   return `${key.name} `+rules.map((item, i) => { return i>0?" "+item:item })
  }

  getStringOfInvalidList(){
    const list = [];
    this.invalidList.forEach((item, i) => {
      const key = inputSlotDic[item[0]];
      switch (item[1]) {
        case 0:
          list.push(`${key.name} must contain between ${key.length.min} and ${key.length.max} characters`);
          break;
        case 1:
        list.push(this.getRulesetString(key));

      }
    });
    console.log(list)
    return list;
  }

  validateInputs(event){
    this.invalidList.length = 0;
    inputSlots.forEach((item, i) => {
      this.invalidList = this.invalidList.concat(
        this.getInvalids(inputSlotDic[item.id], this.state[item.id])
      )
    });
    if (this.invalidList.length > 0){
      this.style.submitButtonIsDisabled = true;
    } else {
      this.style.submitButtonIsDisabled = false;
    }
  }

  setStyleValid(raw){ this.style[raw.id] = "validText"; }
  setStyleInvalid(raw){ this.style[raw.id] = "invalidText"; }

  onInputChange(event){
    this.validateInputs(event);
    const id = event.target.id;
    const value = event.target.value;
    this.setState( { [id]: value } )
    if (this.validateInputLength(inputSlotDic[id], value) && this.validateRuleset(inputSlotDic[id], value)){
      this.style[inputSlotDic[id].id] = "validText";
    } else {
      this.style[inputSlotDic[id].id] = "invalidText";
    }
  }

  /*
    raw orginates from inputSlots, is therefore static
    change orginates from HTML input change
  */


  validateUpperCasinRuleset(raw, change){
    switch (raw.ruleset.upperCasin) {
      case 1:
        return /[A-Z]/.test(change);
        break;
      case -1:
        return !/[A-Z]/.test(change);
      default:
      return true;
    }
  }

  validateNumberRuleset(raw, change){
    switch (raw.ruleset.numbers) {
      case 1:
        return /[0-9]/.test(change);
        break;
      case -1:
        return !/[0-9]/.test(change);
      default:
      return true;
    }
  }


  validateInputLength(raw, change){
    return this.validateInputMinLength(raw, change) && this.validateInputMaxLength(raw, change);
  }

  validateInputMinLength(raw, change){
    if (change.length > raw.length.min){
      return true;
    } else {
      return false;
    }
  }

  validateInputMaxLength(raw, change){
    if (change.length <= raw.length.max){
      return true;
    } else {
      return false;
    }
  }

  validateSpecialRuleset(raw, change){
    switch (raw.ruleset.special) {
      case 1:
        return /[^a-z0-9]/i.test(change);
        break;
      case -1:
        return !/[^a-z0-9]/i.test(change);
      default:
      return true;
    }
  }

  validateRuleset(raw, change){
    return this.validateUpperCasinRuleset(raw, change) && this.validateNumberRuleset(raw, change) && this.validateSpecialRuleset(raw, change);
  }




  render(){
    const rForm = inputSlots.map((item, i) => {
      const id = item.id;
      return <div key={id}><label htmlFor={item.id}>{item.name}</label>:
      {<Input id={item.id} name={item.name} register={this} type={item.type}/>}</div>
    })
    const toolTip = <List content={this.style.invalidList}/>;

    return <form onSubmit={this.onSubmit} >{rForm}<div><Button id="registerButton" text="Submit" isDisabled={this.style.submitButtonIsDisabled} type="submit"/></div>{toolTip}</form>;
  }
}
