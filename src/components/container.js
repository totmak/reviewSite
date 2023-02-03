import React from 'react'


export default class Container extends React.Component {
  constructor(props){
    super(props)
    this.props = props;
  }

  render(){
    return <div id="container">
      {this.props.header}
      {this.props.body}
    </div>
  }
}
//      <this.header/>
