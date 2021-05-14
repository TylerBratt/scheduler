

export function getAppointmentsForDay(state, day) {
  if (!state.days) {
    return [];
  }

  let appointmentDay = state.days.find(elem => elem.name === day);
  if (!appointmentDay) {
    return [];
  }

  return appointmentDay.appointments.length < 1
    ? []
    : appointmentDay.appointments.map(apptID => state.appointments[apptID]);
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    const interviewer = state.interviewers[interview.interviewer];
    interview.interviewer = interviewer;
    return interview
  }
}

export function getInterviewerForDay(state, day) {
  if (!state.days) {
    return [];
  }

  let interviewerForDay = state.days.find(elem => elem.name === day);
  if (!interviewerForDay) {
    return [];
  }

  return interviewerForDay.interviewers.length < 1
    ? []
    : interviewerForDay.interviewers.map(interviewerID => state.interviewers[interviewerID]);
}

const getNumberOfSpots = (state, day) => {
  const dayFound = state.days.find(elem => elem.name === day);

  const numberSpots = dayFound.appointments.filter(appointmentID => state.appointments[appointmentID].interview === null).length

  console.log({numberSpots});
}

// const numberSpots = getNumberOfSpots(state, state.day);
// console.timeLog(numberSpots)