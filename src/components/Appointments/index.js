import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointmentList: [], title: '', date: '', starred: false}

  onAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const consultant = {
      id: {uuidv4},
      title,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, consultant],
      title: '',
      date: '',
    }))
  }

  onTitle = event => {
    this.setState({title: event.target.value})
  }

  onDate = event => {
    this.setState({date: event.target.value})
  }

  starFilled = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickStarred = () => {
    this.setState(prevState => ({starred: !prevState.starred}))
  }

  onFilteredList = () => {
    const {starred, appointmentList} = this.state
    let filteredList = []

    if (starred === true) {
      filteredList = appointmentList.filter(
        eachAppoint => eachAppoint.isStarred === true,
      )
    } else {
      filteredList = appointmentList.map(eachAppoint => eachAppoint)
    }
    return filteredList
  }

  render() {
    const totalList = this.onFilteredList()
    const {title, date, starred} = this.state
    const classStarred = starred ? 'button-on' : 'button-off'
    return (
      <div className="bg-container">
        <div className="box-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="form-container">
            <form onSubmit={this.onAppointment}>
              <label htmlFor="TitleId">TITLE</label>
              <br />
              <input
                onChange={this.onTitle}
                value={title}
                placeholder="Title"
                type="text"
                id="TitleId"
              />
              <br />
              <label htmlFor="dateId">DATE</label>
              <br />
              <input
                onChange={this.onDate}
                value={date}
                type="date"
                id="dateId"
              />
              <br />
              <button type="select" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr />
          <div className="starred-container">
            <h1>Appointments</h1>
            <button onClick={this.onClickStarred} className={classStarred}>
              Starred
            </button>
          </div>
          <ul>
            {totalList.map(eachAppointent => (
              <AppointmentItem
                eachAppointment={eachAppointent}
                selectStar={this.starFilled}
                key={eachAppointent.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
