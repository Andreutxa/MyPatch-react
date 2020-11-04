import React, { useState, useEffect } from "react";
import MyCalendar from "./Calendar";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import Nav from "../Nav/Nav";
import {
  getReminders,
  createReminder,
} from "../../services/mypatch-api.service";
import "./CalendarView.css";

export default function CalendarView({ user, onLogOut }) {
  const [reminderList, setReminderList] = useState([]);
  const [body, setBody] = useState(null);
  // const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState();

  useEffect(() => {
    getReminders()
      .then((reminders) => setReminderList(reminders))
      .catch((e) => {
        if (e.response.status === 401) {
          onLogOut();
        } else {
          setError(true);
        }
      });
  }, []);

  const handleChange = (val, name) => {
    setBody({
      ...body,
      [name]: val,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("body", body);
    createReminder(body)
      .then((createdReminder) => {
        console.log("Reminder created", createdReminder);

        setReminderList((old) => {
          return [...old, createdReminder];
        });
      })

      .catch((e) => console.log(e));
  };

  const formatedDate = (date) => {
    return date.split("/").reverse().join("-");
  };

  const formattedList = reminderList.reduce((acc, e) => {
    acc.push({ title: e.title, date: formatedDate(e.date) });
    return acc;
  }, []);

  return (
    <div className="calendar-flex">
      <div className="main-pic">
        {user ? <Dropdown user={user} onLogOut={onLogOut} /> : ""}
        <div className="calendar-deco">
          <h4>Calendar</h4>
          <div className="calendar-pic-position">
            <img src="/images/calendar.png" alt="Calendar pic" />
          </div>
        </div>
      </div>

      <div className="calendar-position">
        <MyCalendar events={formattedList} />
      </div>

      <div className="calendar-btn">
        <button>Change {user.contraceptionMth}</button>
      </div>
      <div className="calendar-btn">
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
          data-whatever="@mdo"
        >
          Add reminder
        </button>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New reminder
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="recipient-name" className="col-form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    value={body?.title}
                    name="title"
                    className="form-control"
                    id="recipient-name"
                    onChange={(e) =>
                      handleChange(e.target.value, e.target.name)
                    }
                  />
                </div>
                <div className="form-group">
                  <label for="message-text" className="col-form-label">
                    Type
                  </label>
                  <select
                    value={body?.type}
                    name="type"
                    class="custom-select"
                    onChange={(e) =>
                      handleChange(e.target.value, e.target.name)
                    }
                  >
                    <option selected value="Period">
                      Period
                    </option>
                    <option value="Take pill">Take pill</option>
                    <option value="Change patch">Change patch</option>
                    <option value="Change ring">Change ring</option>
                    <option value="Take injection">Take injection</option>
                    <option value="Change IUD">Change IUD</option>
                    <option value="Change IUS">Change IUS</option>
                    <option value="Medical appointment">
                      Medical appointment
                    </option>
                    <option value="Gynecologist appointment">
                      Gynecologist appointment
                    </option>
                  </select>
                </div>
                <div className="form-group">
                  <label for="message-text" className="col-form-label">
                    Date
                  </label>
                  <input
                    className="form-control"
                    value={body?.date}
                    name="date"
                    id="message-text"
                    onChange={(e) =>
                      handleChange(e.target.value, e.target.name)
                    }
                  ></input>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSubmit}
              >
                Save reminder
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="calendar-link">
        <Link to="/period/incidence">Troubles with my friend</Link>
      </div>

      <Nav />
    </div>
  );
}
