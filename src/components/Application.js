import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from 'components/DayList'
import Appointment from'components/appointment/index'
import axios from 'axios'

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id:3,
    time: "1pm",
    interview: {
      student: "Terry Jeffords",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id:4,
    time: "12pm",
    interview: {
      student: "Rosa Diaz",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id:5,
    time:'1pm'
  }
];

export default function Application(props) {
  const [days, setDays] = useState([]);
  const [day, setDay] = useState("Monday");
  
  useEffect(()=>{
    const daysReq = '/api/days'
    axios.get(daysReq).then(response=> {
      setDays([...response.data])
    })

  },[days])
  const appointmentList = appointments.map(appointment => <Appointment 
    key={props.id} {...appointment}/>)
  
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
          days={days}
          day={day}
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


