export function getAppointmentsForDay(state, day) {
  if (!state.days) {
    return [];
  }

  let appointmentDay = state.days.find((elem) => elem.name === day);
  if (!appointmentDay) {
    return [];
  }

  return appointmentDay.appointments.length < 1 ? [] : appointmentDay.appointments.map((apptID) => state.appointments[apptID]);
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    const result = {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
    };
    return result;
  }
}

export function getInterviewerForDay(state, day) {
  if (!state.days) {
    return [];
  }
  if (state.days.length < 1) {
    return [];
  }

  let openInterviews = state.days.find((elem) => elem.name === day);
  if (!openInterviews) {
    return [];
  }
  let openInterviewSlotsPerDay = openInterviews.interviewers;
  return !openInterviews || openInterviewSlotsPerDay.length < 1 ? [] : openInterviewSlotsPerDay.map((intID) => state.interviewers[intID]);
}
