import React from 'react'

const List = (props) => {
  return <ul id={props.id}>{<props.content/>}</ul>
}

export default List
