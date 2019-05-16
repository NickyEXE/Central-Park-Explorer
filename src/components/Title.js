import React from 'react'

function Title(props) {


  if (props.name) {
  return <center><h4>Welcome to {props.name}</h4></center>
  }
  else {
    return ""
  }
}


export default Title
