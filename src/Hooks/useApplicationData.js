import { useState, useEffect } from 'react'
import axios from 'axios'


export default function useApplicationData() {

  const [state, setState] = useState({
    day:'Monday',
    days:[],
    appointments:{}
  });
  
  const setDay = day => setState({ ...state, day });
  

  
  useEffect(()=>{
    const daysReq = axios.get('api/days')
    const appointmentReq = axios.get('api/appointments')
    const interviewersReq = axios.get('api/interviewers')
    Promise.all([
      daysReq, 
      appointmentReq, 
      interviewersReq
    ]).then((all)=> {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  },[])
  
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments});
    return axios.put(`api/appointments/${id}`, appointment)
      .then(() => {
        if(!state.appointments[id].interview) {
          const dayObject = state.days.find(day => day.name === state.day);
          console.log('state.days', state.days, 'dayObject', dayObject)
          state.days[dayObject.id].spots--;
        } 
      })
  }
  
  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const dayFound = state.days.find(elem => elem.name === state.day);
        
        const numberSpots = dayFound.appointments.filter(appointmentID => state.appointments[appointmentID].interview === null).length
        console.log('a', dayFound, 'b', numberSpots)
        
      })  
  }
  const getNumberOfSpots = (state, day) => {
    const dayFound = state.days.find(elem => elem.name === day);
  
    const numberSpots = dayFound.appointments.filter(appointmentID => state.appointments[appointmentID].interview === null).length
  
    console.log({numberSpots});
    
  }


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
