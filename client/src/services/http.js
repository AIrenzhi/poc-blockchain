import axios from 'axios'
let baseURL = ""

axios.defaults.withCredentials = true
axios.interceptors.response.use((response)=> {
    return response.data
})

let Http = {
    baseURL: baseURL,
    header: {
        'Content-Type': 'application/json; charset=utf-8',
    },
    asyncrequest(method, api, data={}, header={}) {
        let reqBody = {}
        let reqBodyKeys = Object.keys(data)
        reqBodyKeys.forEach(function (item) {
            if (data[item] !== '') {
                reqBody[item] = data[item]
            }
        })
        let req = {
            method: method,
            url: api,
            baseURL: baseURL,
            headers: Object.assign(this.header, header),
            transformRequest: [function (data) {
                return JSON.stringify(data)
            }]
        }
        if (method === 'get') {
            req.params = reqBody
        } else {
            req.data = reqBody
        }
        return axios(req)
    },
    get(api, data) {
       return this.asyncrequest('get', api, data)
    },
    post(api, data) {
        return this.asyncrequest('post', api, data)
    },
    postBinary(api, data) {
        return this.asyncrequest('post', api, data,{
            'Content-Type': 'application/octet-stream'
        })
    },
    patch(api, data) {
        return this.asyncrequest('patch', api, data)
    },
    put(api, data) {
        return this.asyncrequest('put', api, data)
    },
    delete(api, data) {
        return this.asyncrequest('delete', api, data)
    }

}

export default Http