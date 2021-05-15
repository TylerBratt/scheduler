import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });

  // Hooks to ensure proper page loading
  useEffect(() => {
    const daysReq = axios.get("api/days");
    const appointmentReq = axios.get("api/appointments");
    const interviewersReq = axios.get("api/interviewers");
    Promise.all([daysReq, appointmentReq, interviewersReq]).then((all) => {
      setState((prev) => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  //helper to update spots counter dynamically. if the time slot interview = null, the remaining count will decrease, otherwise it will increase
  function calculateSpots(day, days, appointments) {
    let bookedSpots = 0;
    let totalSpots = 0;
    days.forEach((timeSlotsPerDay) => {
      totalSpots++;
      if (timeSlotsPerDay.name === day) {
        timeSlotsPerDay.appointments.forEach((apptId) => {
          if (appointments[apptId].interview !== null) {
            bookedSpots++;
          }
        });
      }
    });
    return totalSpots - bookedSpots;
  }
  //books the interview and updates the count conditionally on axios put
  const bookInterview = (id, interview) => {
    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };

    const days = state.days.map((day) => {
      if (state.day === day.name) {
        day.spots = calculateSpots(state.day, state.days, appointments);
        return day;
      } else {
        return day;
      }
    });
    return axios.put(`api/appointments/${id}`, appointment).then(() => {
      setState((state) => ({ ...state, appointments, days }));
    });
  };

  //cancels the interview and updates the count conditionally on axios delete
  const cancelInterview = (id) => {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };

    const days = state.days.map((day) => {
      if (state.day === day.name) {
        day.spots = calculateSpots(state.day, state.days, appointments);
        return day;
      } else {
        return day;
      }
    });

    return axios.delete(`/api/appointments/${id}`).then(() =>
      setState({
        ...state,
        appointments,
        days,
      })
    );
  };
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
