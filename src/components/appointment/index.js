import React from 'react'
import "components/appointment/styles.scss"
import Header from 'components/appointment/Header'
import Empty from 'components/appointment/Empty'
import Show from 'components/appointment/Show'



export default function Appointment (props) {
  const { id, time } = props
  const timeSlot = props.interview ? 
        <Show student={ props.interview && props.interview.student}
        interviewer={props.interview && props.interview.interviewer}
        /> : <Empty />



  return (
    <article className="appointment">
      <Header time={time} />
        {timeSlot}
    </article>
  )
}
