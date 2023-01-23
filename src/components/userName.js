import React from 'react'

const UserName = (props) => {

  return <input className={props.register.style.userName} type="text" placeholder="name" id="userName" onChange={props.register.onInputChange} value={props.register.state.userName} />
}

export default UserName
