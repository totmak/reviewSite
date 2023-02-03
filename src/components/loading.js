import React from 'react'
import {socket} from '../App.js'


export default class Loading extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
  }

  componentDidMount() {
    socket.on('affirmConnection', (msg, socket) => {
      this.props.connect(true);
    })
  }

  render(){
    return <h3>Connecting...</h3>
  }
}
