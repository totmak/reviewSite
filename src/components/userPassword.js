import React from 'react'

const Input = (props) => {

  return <input className={props.register.style[props.id]} type="text" placeholder={props.id} id={props.id} onChange={props.register.onInputChange} value={props.register.state[props.id]} />
}

export default Input
