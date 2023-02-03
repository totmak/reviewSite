import React from 'react'
import List from '../elements/list.js'
const options = ["login", "register", "chat"];


const navOptions = {
  "unsigned": ["login", "register", "chat", "about"],
  "signed": ["chat", "about", "logout"],
}

export default class Nav extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.state["optionArray"] = [];
    this.update = this.updateHandle.bind(this)
  //  this.state["optionStyle"] = this.getStyle.bind(this);
    this.onStateChange = this.getStyle.bind(this);
    this.props = props;
    this.options = [];
  }

  componentDidMount(){
    this.updateHandle();
  }


  updateHandle(){
    if (this.props.login == undefined){
      this.setState(() => { return {optionArray: navOptions.unsigned} });
    } else {
      this.setState(() => { return {optionArray: navOptions.signed} });
    }
  }


  getStyle(){
    /*
    const width = `${100*(1/this.state.optionArray.length)}%`
    const style = {"width": width}
    return this.state.optionArray.map((item, i) => {
      return <li onClick={this.props.onClick}  style={style} key={i}><a id={"nav."+item}>{item.toUpperCase()}</a></li>
    })*/
    const width = `${100*(1/this.options.length)}%`
    const style = {"width": width}
    return this.options.map((item, i) => {
      return <li onClick={this.props.onClick}  style={style} key={i}><a id={"nav."+item}>{item.toUpperCase()}</a></li>
    })

  }
  render(){

    if (this.props.login == undefined){
      this.options = navOptions.unsigned
    } else {
      this.options = navOptions.signed
    }


    return <nav>
    <List content={this.onStateChange}/></nav>
  }
}
