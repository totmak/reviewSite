import React from 'react'

const Input = (props) => {
  return <input className={props.style} type="text" placeholder={props.name} id={props.id} onChange={props.onChange} value={props.value} type={props.type} />
}

export default Input
