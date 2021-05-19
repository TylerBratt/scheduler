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
    const daysReq = axios.get("/api/days");
    const appointmentReq = axios.get("/api/appointments");
    const interviewersReq = axios.get("/api/interviewers");
    Promise.all([daysReq, appointmentReq, interviewersReq])
    .then((all) => {
      setState((prev) => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  }, []);

  //helper to update spots counter dynamically. if the time slot interview = null, the remaining count will decrease, otherwise it will increase
  function updatedSpots(day, days, appointments) {
    const dayName = day;
    const dayObject = days.find((day) => day.name === dayName);
    const allAppointmentIds = dayObject.appointments;
    const openSpots = allAppointmentIds.filter((apptId) => appointments[apptId].interview === null).length;
    const updatedDayObject = { ...dayObject, spots: openSpots };
    const updatedDays = [...days];
    const useMe = updatedDays.map((day) => (day.name === dayName ? updatedDayObject : day));
    return useMe;
  }
  //books the interview and updates the count conditionally on axios put
  const bookInterview = (id, interview) => {
    const appointment = { ...state.appointments[id], interview: { ...interview } };
    const appointments = { ...state.appointments, [id]: appointment };
    const days = updatedSpots(state.day, state.days, appointments);
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState((state) => ({ ...state, appointments, days }));
    });
  };

  //cancels the interview and updates the count conditionally on axios delete
  const cancelInterview = (id) => {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    const days = updatedSpots(state.day, state.days, appointments);
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
