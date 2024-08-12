// Write your code here
import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {eachAppointment, selectStar} = props
  const {id, title, date, isStarred} = eachAppointment
  const dateDay = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const starring = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onStar = () => {
    selectStar(id)
  }
  return (
    <li>
      <div>
        <p>{title}</p>
        <p>{dateDay}</p>
        <button data-testid="star">
          <img src={starring} onClick={onStar} alt="star" />
        </button>
      </div>
    </li>
  )
}
export default AppointmentItem
