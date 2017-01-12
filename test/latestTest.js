require('chai').should()
const nock = require('nock'),
  QS = require('../index'),
  config = require('../config')

describe('Latest information ', function () {

    var qs = new QS('token')
    var latestData = {
      id: 'test',
      device_id: 131,
      tossnturn_count: 33,
      sleep_score: 75,
      hrv_lf: 42,
      hrv_hf: 58,
      hrv_rmssd_evening: 27.1,
      hrv_rmssd_morning: 52.6,
      hrv_rmssd_hist_data: null,
      object_id: 'test',
      time_start: 1484170920,
      time_end: 1484197440,
      time_duration: 26552,
      sleep_class_awake_duration: 2280,
    }
    beforeEach(function (done) {
      nock(config.baseUrl)
      .get('/v4/presence/131/latest')
      .query({
        remember_token: 'token'
      })
      .reply(200, JSON.stringify(latestData))
      done()
    })

    it('should get status for device', function (done) {

      qs.latest(131).then(function (response) {
        should.exist.response
        response.device_id.should.equal(131)
        response.sleep_class_awake_duration.should.equal(2280)
        done()
      })
    })

  }
)
