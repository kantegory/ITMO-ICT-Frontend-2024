import axios from 'axios'


const apiURL = 'http://localhost:8080'


const instance = axios.create({
    baseURL: apiURL
})


export default instance
