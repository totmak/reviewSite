import React from 'react'


export default class Body extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
  }


  render(){
    return <div id="body">{this.props.content}</div>
  }
}
