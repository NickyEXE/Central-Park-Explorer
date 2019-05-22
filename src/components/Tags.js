import React from 'react'
import Button from 'react-bootstrap/Button'
const uuid = require('uuidv4');
function Tags(props) {
  const style={
    // lineHeight: '40pt',
    marginTop: '7px'
  }
  if (props.tags[0]) {
    return (
    <div>
    {props.tags.map(tag => {
      return(<React.Fragment key={uuid()} ><Button variant="warning" style={style} size="sm" onClick={() => props.openViewTagsModal(tag.id)}key={uuid()}>{tag.tag}</Button>{"     "}</React.Fragment>)}
    )}
    <Button style={style} variant="dark" size="sm" onClick={props.openNewTagModal} key={uuid()}>Add Recommendation</Button>
    </div>
)}
  else {
    return ""
  }
}


export default Tags
