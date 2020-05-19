import axios from 'axios'

const httpClient = axios.create({
    //baseURL: 'http://localhost:8080'
    baseURL: 'https://mperozo-consultorio-api.herokuapp.com/' 
})


class ApiService {

    constructor(apiURL) {
        this.apiURL = apiURL
    }

    post(url, objeto) {
        const requestURL = `${this.apiURL}${url}`
        return httpClient.post(requestURL, objeto);
    }

    put(url, objeto) {
        const requestURL = `${this.apiURL}${url}`
        return httpClient.put(requestURL, objeto);
    }

    delete(url) {
        const requestURL = `${this.apiURL}${url}`
        return httpClient.delete(requestURL);
    }

    get(url) {
        const requestURL = `${this.apiURL}${url}`
        return httpClient.get(requestURL);
    }

}
export default ApiService