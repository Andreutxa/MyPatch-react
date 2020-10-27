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
    return axios.get('/user/:id')
        .then((res) => res.data)
}

export const getReminders = () => {
    return axios.get('/reminders')
        .then((res) => res.data)
}

export const singleReminder = (id) => {
    return axios.get(`/reminder/${id}`)
        .then((res) => res.data)
}

export const createReminder = () => {
    axios.post('/reminder/new')
        .then((res) => res.data)
}

export const editReminder = (id) => {
    return axios.patch(`/reminder/${id}/edit`)
    .then((res) => res.data)
}

export const deleteRem = (id) => {
    return axios.delete(`/reminder/${id}/delete`)
    .then((res) => res.data)
}