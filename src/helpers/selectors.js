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
