import InterviewerList from "components/InterviewerList";

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
    console.log('look here', interview)
    return interview
  }
}

// console.log('HERE', getInterview)