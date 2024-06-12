import axios from 'axios'


const URL = 'http://localhost:3000/api/auth'

export const registerRequest = user=> axios.post(`${URL}/register`, user)

export const loginRequest = user=> axios.post(`${URL}/login`, user)

export const profileRequest = user=> axios.post(`${URL}/profile`, user)