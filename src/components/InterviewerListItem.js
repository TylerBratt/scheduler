import React from 'react'
import 'components/InterviewerListItem.scss'
import classNames from 'classnames'

export default function InterviewerListItem(props) {
const {id, name, avatar, selected, setInterviewer} = props
const InterviewerClass = classNames('interviewers__item', {
  'interviewers__item--selected':selected===true
});

  return(
  <li 
  onClick={() =>setInterviewer(name)}
  className={InterviewerClass}>

  <img
    className="interviewers__item-image"
    src={avatar}
    alt={name}
  />
  {selected && name}
</li>
  )
}