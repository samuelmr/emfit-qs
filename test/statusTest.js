require('chai').should()
const nock = require('nock'),
  QS = require('../index'),
  config = require('../config')

describe('Device status ', function () {

    var qs = new QS('token')
    var statusData = {
      DeviceIndex: 131,
      description: 'absent',
      from: 1484197481000
    }
    beforeEach(function (done) {
      nock(config.baseUrl)
      .get('/api/v1/device/status/131')
      .query({
        remember_token: 'token'
      })
      .reply(200, JSON.stringify(statusData))
      done()
    })

    it('should get status for device', function (done) {

      qs.status(131).then(function (response) {
        should.exist.response
        response.DeviceIndex.should.equal(131)
        response.description.should.equal('absent')
        done()
      })
    })

  }
)
