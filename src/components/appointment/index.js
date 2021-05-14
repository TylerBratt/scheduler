import React from 'react'
import "./styles.scss"
import Header from './Header'
import Empty from './Empty'
import Show from './Show'
import Form from './Form'
import Status from './Status'
import Confirm from './Confirm'
import Error from './Error'
import useVisualMode from 'Hooks/useVisualMode'


export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
    .bookInterview(props.id, interview)
    .then(()=>transition(SHOW))
    .catch(error => { transition(ERROR_SAVE, true);
    })
  
  } 
  const deleteAppointment = () => {
    transition(CONFIRM);
  }
  const confirmDelete = (event) => {
    transition(DELETING, true);
    props
    .cancelInterview(props.id)
    .then(()=>transition(EMPTY))
    .catch(error => { transition(ERROR_DELETE, true);
  })
}
  const edit = () => {
    transition(EDIT);
  }




  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && 
        <Empty 
          onAdd={()=> transition(CREATE)} 
        />
      }

      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer}
          onDelete={(deleteAppointment)}
          onEdit={edit}
        />
      )}

      {mode === CREATE && (
        <Form 
          name={""}
          interviewer={""}
          interviewers={props.interviewers}
          onCancel={()=>back()}
          onSave={save}
        />
      )}

      {mode === SAVING && 
        <Status 
          message={'Saving'}
        />
      }

      {mode === DELETING && 
        <Status 
          message={'Deleting'}
        />}
      {mode === CONFIRM && (
        <Confirm 
          message={'Are you sure you want to cancel'}
          onConfirm={confirmDelete}
          onCancel={()=>back()}
        />
      )}  

      {mode === EDIT && (
        <Form 
          name={props.interview.student}
          interviewer={props.interview.interviewer && props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={()=>back()}
          onSave={save}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error 
          message={'Could not create appointment. Try again.'}
          onClose={back}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error 
          message={'Could not delete appointment. Try again.'}
          onClose={back}
        />
      )}
    </article>
  )

}
