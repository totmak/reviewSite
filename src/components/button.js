import React from 'react'

const Button = (props) => {
  return <button id={props.id} type={props.type} disabled={props.isDisabled}>{props.text}</button>
}

export default Button
