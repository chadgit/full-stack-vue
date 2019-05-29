import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8081/',
  json: true
})

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request
    let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
      return req.data
    })
  },
  getMessages () {
    return this.execute('get', '/messages')
  },
  getMessagesBySourceId (id) {
    return this.execute('get', `/messages?source_id=${id}`)
  },
  getMessage (id) {
    return this.execute('get', `/messages/${id}`)
  },
  createMessage (data) {
    return this.execute('post', '/messages', data)
  },
  updateMessage (id, data) {
    return this.execute('put', `/messages/${id}`, data)
  },
  deleteMessage (id) {
    return this.execute('delete', `/messages/${id}`)
  },
  getSources () {
    return this.execute('get', '/sources')
  },
  getSource (id) {
    return this.execute('get', `/sources/${id}`)
  },
  createSource (data) {
    return this.execute('post', '/sources', data)
  },
  updateSource (id, data) {
    return this.execute('put', `/sources/${id}`, data)
  },
  deleteSource (id) {
    return this.execute('delete', `/sources/${id}`)
  }
}
