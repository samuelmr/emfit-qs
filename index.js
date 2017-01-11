const request = require('request-promise'),
  config = require('./config')

function Client(token) {
  this.token = token
  this.request = request.defaults({
    baseUrl: config.baseUrl,
    qs: {'remember_token': token},
    transform: function (response) {
      return JSON.parse(response)
    }
  })
}

Client.prototype.user = function () {
  var opts = {
    uri: '/api/v1/user/get',
  }
  return this.request.get(opts)
}

Client.prototype.latest = function (deviceId) {
  return this.request.get('/v4/presence/' + deviceId + '/latest')
}

module.exports = Client
