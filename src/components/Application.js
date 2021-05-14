import React from "react";
import "components/Application.scss";
import DayList from 'components/DayList'
import Appointment from'components/appointment/index'
import { getAppointmentsForDay, getInterview, getInterviewerForDay } from '../helpers/selectors'
import useApplicationData from 'Hooks/useApplicationData'


export default function Application(props) {
  
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData()

  //Iterate through the dailyAppointment Object to get its' keys -- set appointment to each key -- spread and render the arrays to the appointment section
  
  const dailyAppointments= getAppointmentsForDay(state, state.day)
  const appointmentList = Object.keys(dailyAppointments).map(key => {
    const appointment = dailyAppointments[key]
    const interview = getInterview(state, appointment.interview)
    const interviewers = getInterviewerForDay(state, state.day)
    return (
      <Appointment 
        key={appointment.id} {...appointment}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        />
      );
    })
  
  return (
    <main className="layout">
      <section className="sidebar">
      <img 
      className="sidebar--centered"
      src="images/logo.png"
      alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav 
      className="sidebar__menu"
      >
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
      <img
      className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
      alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        <section className="schedule">
          {appointmentList}
          <Appointment key='last' time='5pm' />
        </section>
      </section>
    </main>
  );
}


