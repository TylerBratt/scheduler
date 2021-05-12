import React, { useState } from 'react'
import InterviewerList from 'components/InterviewerList'
import Button from 'components/Button'
import 'components/appointment/styles.scss'

export default function Form(props) {
  const { onSave, onCancel }= props;
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || '');

  const reset = () => {
    setName('');
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off"
              onSubmit={event => event.preventDefault()}>
          <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={event => setName(event.target.value)}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={interviewer}
          setInterviewer={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button 
          onClick={()=> cancel()}
          danger>Cancel</Button>
          <Button 
          onClick={onSave}
          confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};