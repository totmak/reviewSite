import React from 'react'


export default class Chat extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
  }


  render(){
    return <div id="body">This is the chat.</div>
  }
}
