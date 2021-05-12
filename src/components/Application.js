import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from 'components/DayList'
import Appointment from'components/appointment/index'
import getAppointmentsForDay from '../helpers/selectors'
import axios from 'axios'



export default function Application(props) {
  
  const [state, setState] = useState({
    day:'Monday',
    days:[],
    appointments:{}
  });
  
  const dailyAppointments= getAppointmentsForDay(state, state.day)
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  
      
  useEffect(()=>{
    const daysReq = axios.get('api/days')
    const appointmentReq = axios.get('api/appointments')
    const interviewersReq = axios.get('api/interviewers')
    Promise.all([daysReq, appointmentReq, interviewersReq
    ])
    .then((all)=> {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  },[])

  //Iterate through the dailyAppointment Object to get its' keys -- set appointment to each key -- spread and render the arrays to the appointment section
  const appointmentList = Object.keys(dailyAppointments).map(key => {
      const appointment = dailyAppointments[key]
      return <Appointment key={appointment.id} {...appointment}/>
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
        {appointmentList}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}


