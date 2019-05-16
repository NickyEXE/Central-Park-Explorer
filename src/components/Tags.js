import React from 'react'
import Badge from 'react-bootstrap/Badge'

function Tags(props) {
  console.log("tag props", props)
  if (props.tags[0]) {
    console.log("in the if")
    return (
    props.tags.map(tag => {
      return(
        <Badge pill variant="warning">{tag.tag}</Badge>
      )
  }))}
  else {
    return ""
  }
}


export default Tags
