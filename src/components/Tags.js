import React from 'react'
import Badge from 'react-bootstrap/Badge'
const uuid = require('uuidv4');
function Tags(props) {
  if (props.tags[0]) {
    return (
    <div>
    {props.tags.map(tag => {
      return(<Badge pill variant="warning" key={uuid()}>{tag.tag}</Badge>)}
    )}
    <Badge pill variant="dark" onClick={props.addTags} key={uuid()}>Add Recommendation</Badge>
    </div>
)}
  else {
    return ""
  }
}


export default Tags
