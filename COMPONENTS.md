
    Button
    DayList
    DayListItem
    InterviewerList
    InterviewerListItem
    Appointment
    Appointment/Header
    Appointment/Empty
    Appointment/Show
    Appointment/Form
    Appointment/Status
    Appointment/Error
    Appointment/Confirm

Button

    State:
    Props:
        confirm
        danger
        clickable
        disabled
    Used by:

DayList

    State:
    Props:
        days: Array a list of day objects (each object includes an id, name, and spots)
        day: String the currently selected day
        setDay: Function accepts the name of the day eg. "Monday", "Tuesday"
    Used by:

DayListItem

    State:
    Props:
        name: String the name of the day
        spots: Number the number of spots remaining
        selected: Boolean true or false declaring that this day is selected
        setDay: Function accepts the name of the day eg. "Monday", "Tuesday"

    Used by:

InterviewerList

    State:
    Props:
        interviewers: array - an array of objects containing the information of each interviewer
        interviewer: number - the id of an interviewer
        setInterviewer: function - a function that accepts an interviewer id
    Used by:

InterviewerListItem

    State:
    Props:
        id: number - the id of the interviewer
        name: string - the name of the interviewer
        avatar: url - a url to an image of the interviewer
        selected: boolean - to determine if an interview is selected or not
        setInterviewer: function - sets the interviewer upon selection
    Used by:

Appointment

    State:
    Props:
    Used by:

Appointment/Header

    State:
    Props:
    Used by:

Appointment/Empty

    State:
    Props:
    Used by:

Appointment/Show

    State:
    Props:
    Used by:

Appointment/Form

    State:
    Props:
    Used by:

Appointment/Status

    State:
    Props:
    Used by:

Appointment/Error

    State:
    Props:
    Used by:

Appointment/Confirm

    State:
    Props:
    Used by:
