require('chai').should()
const nock = require('nock'),
  QS = require('../index'),
  config = require('../config')

describe('Device status ', function () {

    var qs = new QS('token')
    var statusData = [
      {
        description: 'absent',
        from: 1484197481000,
        id: 131,
        name: 'QS',
        field1: null,
        field2: null,
        sn: '001122'
      }
    ]
    beforeEach(function (done) {
      nock(config.baseUrl)
      .get('/v2/device/status')
      .query({
        remember_token: 'token'
      })
      .reply(200, JSON.stringify(statusData))
      done()
    })

    it('should get status for device', function (done) {

      qs.statuses().then(function (response) {
        should.exist.response
        response.should.have.lengthOf(1)
        response[0].id.should.equal(131)
        response[0].description.should.equal('absent')
        done()
      })
    })

  }
)
