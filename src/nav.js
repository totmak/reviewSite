import React from 'react'
import List from './components/list.js'
const options = ["login", "register", "chat"];

export default class Nav extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.state["optionArray"] = props.options;
    this.state["optionsMap"] = this.getOptionList.bind(this);
    this.props = props;
  }


  getOptionList(){
    const width = `${100*(1/this.state.optionArray.length)}%`
    const style = {"width": width}
    return this.state.optionArray.map((item, i) => {
      return <li onClick={this.props.onClick}  style={style} key={i}><a id={"nav."+item}>{item.toUpperCase()}</a></li>
    })
  }
  render(){
    return <nav><List content={this.state.optionsMap}/></nav>
  }
}
