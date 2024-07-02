import React, { Component } from 'react';
import CalendarDays from './calendar-days';
import './calendar.css';
import impDates from './impdates.json'; // Importing impdates.json

export default class Calendar extends Component {
  constructor() {
    super();

    this.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    this.state = {
      currentDay: new Date(),
      events: impDates, // Using impDates from JSON directly
      eventsByMonth: this.groupHolidaysByMonth(impDates)
    }
  }

  // Function to group holidays by month
  groupHolidaysByMonth(holidays) {
    const holidaysByMonth = {};

    holidays.forEach(holiday => {
      const date = new Date(holiday.date);
      const monthYearKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!holidaysByMonth[monthYearKey]) {
        holidaysByMonth[monthYearKey] = [];
      }

      holidaysByMonth[monthYearKey].push(holiday);
    });

    return holidaysByMonth;
  }

  changeCurrentDay = (day) => {
    this.setState({ currentDay: new Date(day.year, day.month, day.number) });
  }

  nextDay = () => {
    this.setState({ currentDay: new Date(this.state.currentDay.setDate(this.state.currentDay.getDate() + 1)) });
  }

  previousDay = () => {
    this.setState({ currentDay: new Date(this.state.currentDay.setDate(this.state.currentDay.getDate() - 1)) });
  }

  handleMonthChange = (event) => {
    const month = this.months.indexOf(event.target.value);
    const currentDay = new Date(this.state.currentDay.setMonth(month));
    this.setState({ currentDay });
  }

  render() {
    const { currentDay, eventsByMonth } = this.state;
    const currentMonthKey = `${currentDay.getFullYear()}-${currentDay.getMonth() + 1}`;
    const currentMonthEvents = eventsByMonth[currentMonthKey] || [];

    return (
      <div className="calendar">
        <div className="calendar-header">
          <div>
            <button>Your Notes</button>
          </div>
          <div className="title">
            <h2>
              <select value={this.months[this.state.currentDay.getMonth()]} onChange={this.handleMonthChange}>
                {this.months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              {this.state.currentDay.getFullYear()}
            </h2>
          </div>
          <div className="tools">
            <button onClick={this.previousDay}>
              <span className="material-icons">
                &lt;
              </span>
            </button>
            <p>{this.months[this.state.currentDay.getMonth()].substring(0, 3)} {this.state.currentDay.getDate()}</p>
            <button onClick={this.nextDay}>
              <span className="material-icons">
                &gt;
              </span>
            </button>
          </div>
        </div>
        <div className="calendar-body">
          <div className="table-header">
            {
              this.weekdays.map((weekday) => (
                <div className="weekday" key={weekday}><p>{weekday}</p></div>
              ))
            }
          </div>
          <CalendarDays day={this.state.currentDay} events={this.state.events} changeCurrentDay={this.changeCurrentDay} />
        </div>
        {/* <div className="events-list">
          <h3>Important Dates Below Calendar</h3>
          <ul>
            {
              this.state.events.map(event => (
                <li key={event.date}>
                  {event.name} - {event.date}
                </li>
              ))
            }
          </ul>
        </div> */}
        <div className="events-list">
          <h3>Schedule</h3>
          <ul>
            {
              currentMonthEvents.map(event => (
                <li key={event.date}>
                  {event.date} {event.name}
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}
