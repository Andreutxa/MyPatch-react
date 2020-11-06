import React, { useState, useEffect } from "react";
import MyCalendar from "./Calendar";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import Nav from "../Nav/Nav";
import { getReminders, createReminder, getPeriods, getContraceptive, deleteRem, editReminder, singleReminder} from "../../services/mypatch-api.service";
import { useSnackbar } from 'react-simple-snackbar'
import "./CalendarView.css";
import { convertDate } from "../../helpers/helpers";
import { BiPlusMedical, BiCalendarPlus } from 'react-icons/bi';
// import ReminderCard from "../ReminderCard/ReminderCard";
import ReminderSingle from "../ReminderSingle/ReminderSingle";

export default function CalendarView({ user, onLogOut, props }) {
    const options = {
        position: 'top-center',
        style: {
          backgroundColor: '#68BEA7',
          border: '2px solid #2d6656',
          borderRadius: '10px',
          color: '#FFFFFF',
          fontFamily: 'Montserrat',
          fontSize: '20px',
          textAlign: 'center',
        },
        closeStyle: {
          color: '#2d6656',
          fontSize: '16px',
        },
    }

    const [openSnackbar, closeSnackbar] = useSnackbar(options)
    const [reminderList, setReminderList] = useState([]);
    const [body, setBody] = useState({title: '', date: ''});
    const [periodDate, setPeriodDate] = useState(user.period)
    const [error, setError] = useState();


    const formattedPeriod = (period) => {
        return ({
            title: 'Period',
            start: formattedDate(period.start_date),
            end: formattedDate(period.end_date),
            backgroundColor: '#444998'
        })
    };

    const formattedContraceptive = (contraceptive, user) => {
        return ({
            title: user.contraceptionMth,
            start: formattedDate(contraceptive.start_date),
            border: '1px solid #f6b391eb',
            backgroundColor: '#f6b391eb'
        })
    };

    useEffect(() => {
        getReminders()
            .then((reminders) => {
                const findRemin = reminders.find(reminder => {
                    return reminder.date === convertDate(new Date())
                })
                
                if (findRemin) openSnackbar(`Remember! ${findRemin.title}`)
                
                // console.log(convertDate(new Date()))
                return setReminderList((old) => [...old, ...formattedList(reminders)])
            })
            .catch((e) => console.log(e));
        getPeriods()
            .then((periods) => {
                const formattedPeriods = periods.reduce((acc, e) => {
                    return [...acc, formattedPeriod(e)]
                }, [])
                setReminderList((old) => {
                    return [ ...old, ...formattedPeriods ]
                })
            })
            .catch((e) => console.log(e))
        getContraceptive()
            .then((contraceptives) => {
                const formattedContraceptives = contraceptives.reduce((acc, e) => {
                    return [...acc, formattedContraceptive(e, user)]
                }, [])
                setReminderList((old) => {
                    return [ ...old, ...formattedContraceptives ]
                })
            })
            .catch((e) => console.log(e))
    }, []);

    

    // useEffect(() => {
     

    //     const endPeriodDate = (periodDate) => {
    //         const splittedDate = periodDate.split("/");
    //         let endDayNum = Number(splittedDate[0]);
    //         let realEndDay = endDayNum += user.durationPeriod
    //         let realEndDayString = realEndDay.toString()
    //         let datecompleted = periodDate.replace(splittedDate[0] , realEndDayString)

    //         return datecompleted.split("/").reverse().join("-");
    //     }
       
    //     setReminderList((old) => {
    //         return [...old, formattedPeriod(periodDate)]
    //     })
    // }, [periodDate, user])

    const handleChange = (val, name) => {
        setBody({
            ...body,
            [name]: val,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        createReminder(body)
            .then((createdReminder) => {
                console.log("Reminder created", createdReminder);
                setReminderList((old) => {
                    return [...old, {...createdReminder, date: formattedDate(createdReminder.date)}]
                });
            })

            .catch((e) => console.log(e));
    };

    const formattedDate = (date) => {
    return date.split("/").reverse().join("-");
    };

    const formattedList = (reminders) => {
    return reminders.reduce((acc, e) => {
        acc.push({ ...e, date: formattedDate(e.date) });
        return acc;
    }, [])
    };


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
            
            <div className='calendar-main-info'>
                <div className="calendar-position">
                    <MyCalendar events={reminderList} user={user} />
                </div>

                <div className='calculate-imp-reminders-flex'>
                    <div className="calendar-link">
                        <Link to="/contraceptive">{user.contraceptionMth}</Link>
                    </div>
                    <div className="calendar-link">
                        <Link to="/period/routine">Period</Link>
                    </div>
                </div>

                <div>
                    <div className='add-rem-flex'>
                        <h4>Reminders</h4>
                        <div className="calendar-btn">
                            <button type="button" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">
                                <BiCalendarPlus className='add-icon'/>
                            </button>
                        </div>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New reminder</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">
                                        Title
                                    </label>
                                    <input
                                    type="text"
                                    value={body?.title}
                                    name="title"
                                    className="form-control"
                                    id="recipient-name"
                                    onChange={(e) => handleChange(e.target.value, e.target.name)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Type</label>
                                    <select
                                        value={body?.type}
                                        name="type"
                                        className="custom-select"
                                        onChange={(e) => handleChange(e.target.value, e.target.name)}
                                    >
                                        {/* <option value={body?.type}>Period</option> */}
                                        <option selected={body?.type}>Open to choose</option>
                                        <option value={body?.type}>Medical appointment </option>
                                        <option value={body?.type}>Gynecologist appointment</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Date</label>
                                    <input
                                        className="form-control"
                                        value={body?.date}
                                        name="date"
                                        id="message-text"
                                        onChange={(e) => handleChange(e.target.value, e.target.name)}
                                    ></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" data-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn" data-dismiss="modal" onClick={onSubmit}>
                                Save reminder
                            </button>
                        </div>
                    </div>
                </div>
            </div>

                </div>
                    {reminderList.length && reminderList.map((reminder) => { 
                        
                        const currentMonth = Number(convertDate(new Date()).split('/')[1]);
                        const eachReminderMonth = reminder.date ? Number(reminder.date.split('-')[1]) : Number(reminder.start.split('-')[1])
                        if (reminder.type !== 'Period' && reminder.title !== 'Period'  && reminder.title !== user.contraceptionMth && eachReminderMonth === currentMonth) {
                            const originalFormatDate = reminder.date.split('-').reverse().join('/')
                            return (
                                <ReminderSingle
                                    setReminderList={setReminderList}
                                    originalFormatDate={originalFormatDate}
                                    title={reminder.title}
                                    type={reminder.type}
                                    date={reminder.date}
                                    id={reminder.id}
                                    key={reminder.id}
                                />
                            )
                        }
                    })}
                </div>

            </div>

            <Nav />

            {/* <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New reminder</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">
                                        Title
                                    </label>
                                    <input
                                    type="text"
                                    value={body?.title}
                                    name="title"
                                    className="form-control"
                                    id="recipient-name"
                                    onChange={(e) => handleChange(e.target.value, e.target.name)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Type</label>
                                    <select
                                        value={body?.type}
                                        name="type"
                                        className="custom-select"
                                        onChange={(e) => handleChange(e.target.value, e.target.name)}
                                    >
                                         <option value={body?.type}>Period</option> 
                                        <option value={body?.type}>Take pill</option>
                                        <option value={body?.type}>Change patch</option>
                                        <option value={body?.type}>Change ring</option>
                                        <option value={body?.type}>Take injection</option>
                                        <option value={body?.type}>Change IUD</option>
                                        <option value={body?.type}>Change IUS</option>
                                        <option value={body?.type}>Medical appointment </option>
                                        <option value={body?.type}>Gynecologist appointment</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Date</label>
                                    <input
                                        className="form-control"
                                        value={body?.date}
                                        name="date"
                                        id="message-text"
                                        onChange={(e) => handleChange(e.target.value, e.target.name)}
                                    ></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={onSubmit}>
                                Save reminder
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}

            
        </div>
    );
}
