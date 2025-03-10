
import axios from 'axios'


const apiURL = 'http://localhost:5503'


const instance = axios.create({
    baseURL: apiURL
})


export default instance