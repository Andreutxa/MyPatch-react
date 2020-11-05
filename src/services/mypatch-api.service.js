import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3007'
axios.defaults.withCredentials = true

export const login = (email, password) => {
    return axios.post('/login', {email, password})
        .then(res => res.data)
}

export const logout = () => {
    return axios.post('/logout')
        .then((res) => res.data)
}

//userInfo ??
export const getProfile = () => {
    return axios.get('/user')
        .then((res) => res.data)
}

export const editUser = (id, body) => {
    return axios.post(`/users/${id}/edit`, body)
    .then((res) => res.data)
}

export const getReminders = () => {
    return axios.get('/reminders')
        .then((res) => res.data)
}

export const getPeriods = () => {
    return axios.get('/periods')
        .then((res) => res.data)
}

export const createPeriods = (body) => {
    return axios.post('/period/new', body)
        .then((res) => res.data)
}

export const getContraceptive = () => {
    return axios.get('/contraceptive')
        .then((res) => res.data)
}

export const createContraceptive = (body) => {
    return axios.post('/contraceptive/new', body)
        .then((res) => res.data)
}

export const singleReminder = (id) => {
    return axios.get(`/reminder/${id}`)
        .then((res) => res.data)
}

export const createReminder = (body) => {
    return axios.post('/reminder/new', body)
        .then((res) => res.data)
}

export const editReminder = (id, body) => {
    return axios.patch(`/reminder/${id}/edit`, body)
    .then((res) => res.data)
}

export const deleteRem = (id) => {
    return axios.delete(`/reminder/${id}/delete`)
    .then((res) => res.data)
}