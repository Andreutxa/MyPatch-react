import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Dropdown from "../../Dropdown/Dropdown";
import Nav from "../../Nav/Nav";
import { getProfile, editUser } from "../../../services/mypatch-api.service";
import "./EditProfile.css";

export default function EditProfile({ user, onLogOut, onLogIn }) {
  const [profile, setProfile] = useState(user);
  const [body, setBody] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    getProfile(user.id)
    .then((response) => {
      console.log(response);
      const { email, name, lastName, age, period, durationPeriod, contraceptionMth, avatar} = response;
      setProfile(response);
      setBody({ email, name, lastName, age, period, durationPeriod, contraceptionMth, avatar});
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
    editUser(user.id, body)
      .then((editedUser) => {
        onLogIn(editedUser);
        console.log("Reminder edited", editedUser);
        setProfile(editedUser);
        setRedirect(true);
      })
      .catch((e) => console.log(e));
  };

  if (redirect) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="edit-profile-flex">
      <div className="edit-main-pic">
        {user ? <Dropdown user={user} onLogOut={onLogOut} /> : ""}
        <h4>EDITING YOUR PROFILE</h4>
      </div>

      <div className='edit-profile-form'>
        <form>
          <div className="form-group">
            <label htmlFor="recipient-email" className="col-form-label">
              Email
            </label>
            <input
              value={body?.email}
              type="text"
              className="form-control"
              id="recipient-email"
              name="email"
              placeholder={profile.email}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name">Name</label>
            <input
              value={body?.name}
              className="form-control"
              id="recipient-name"
              name="name"
              rows="3"
              placeholder={profile.name}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="recipient-lastName" className="col-form-label">
              Lastname
            </label>
            <input
              value={body?.lastName}
              type="text"
              className="form-control"
              id="recipient-price"
              name="lastName"
              placeholder={profile.lastName}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="recipient-age" className="col-form-label">
              Age
            </label>
            <input
              value={body?.age}
              type="text"
              className="form-control"
              id="recipient-image"
              name="age"
              placeholder={profile.age}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="recipient-period" className="col-form-label">
              Period
            </label>
            <input
              value={body?.period}
              type="text"
              className="form-control"
              id="recipient-image"
              name="period"
              placeholder={profile.period}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="recipient-duration-period"
              className="col-form-label"
            >
              Duration period
            </label>
            <input
              value={body?.durationPeriod}
              type="text"
              className="form-control"
              id="recipient-image"
              name="durationPeriod"
              placeholder={profile.durationPeriod}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="recipient-contrateptive" className="col-form-label">
              Contraception method
            </label>
            <input
              value={body?.contraceptionMth}
              type="text"
              className="form-control"
              id="recipient-image"
              name="contraceptionMth"
              placeholder={profile.contraceptionMth}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="recipient-avatar" className="col-form-label">
              Avatar
            </label>
            <input
              type="file"
              className="form-control-file"
              id="recipient-avatar"
              name="avatar"
              placeholder={profile.avatar}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
            />
          </div>
        </form>
      </div>
          <button type="submit" className="btn edit-profile-btn" onClick={onSubmit}>
            Submit
          </button>

      <Nav />
    </div>
  );
}
