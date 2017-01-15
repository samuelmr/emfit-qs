require('chai').should()
const nock = require('nock'),
  QS = require('../index'),
  config = require('../config')

describe('Latest information ', function () {

    var qs = new QS('token')
    var v1Data = {
      "id": "1234",
      "device_id": 131,
      "duration": 26247,
      "duration_in_bed": 26095,
      "avg_hr": 60,
      "avg_rr": 14,
      "avg_act": 67,
      "min_hr": 47,
      "max_hr": 85,
      "min_rr": 4,
      "max_rr": 26,
      "calc_data": [],
      "hr_min": "50.1",
      "hr_max": "71.40000000000001",
      "rr_min": "5.4",
      "rr_max": "25.5",
      "hrv_rmssd_evening": "22.4",
      "hrv_rmssd_morning": "39.9",
      "object_id": "1234",
      "user_utc_offset_minutes": 120,
      "resting_hr": 0,
      "start": 1484256000000,
      "end": 1484282280000,
      "system_nodata_periods": false,
      "siblings": {
        "prev": {
          "id": 0,
          "start": 1484170920000,
          "end": 1484197440000
        },
        "next": {
          "id": 0,
          "start": 1484256000000,
          "end": 1484282280000
        }
      },
      "note": null,
      "from_string": "12.01. 23:20",
      "to_string": "06:38"
    }

    var v4Data = {
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
      sleep_class_awake_duration: 2280
    }

    beforeEach(function (done) {
      nock(config.baseUrl)
      .get('/api/v1/presence/1234')
      .query({
        remember_token: 'token'
      })
      .reply(200, JSON.stringify(v1Data))

      nock(config.baseUrl)
      .get('/v4/presence/131/1234')
      .query({
        remember_token: 'token'
      })
      .reply(200, JSON.stringify(v4Data))

      done()
    })

    it('should get presence data of device (v1)', function (done) {
      qs.presence(1234, null, 1).then(function (response) {
        should.exist.response
        response.device_id.should.equal(131)
        response.duration_in_bed.should.equal(26095)
        done()
      })
    })

    it('should get presence data of device (v4)', function (done) {
      qs.presence(1234, 131, 4).then(function (response) {
        should.exist.response
        response.device_id.should.equal(131)
        response.time_duration.should.equal(26552)
        done()
      })
    })

  }
)
