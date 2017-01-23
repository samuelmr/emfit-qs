require('chai').should()
const nock = require('nock'),
  QS = require('../index'),
  config = require('../config')

describe('Trends ', function () {

    var qs = new QS('token')

    var v1Data = 'Unsufficient dataset'

    var v2Data = {
      data: [
        {
          datestamp: 1484085600,
          date: "2017-01-11",
          hrv_recovery_total: 1.1,
          hrv_recovery_ratio: 1.03,
          hrv_rmssd_evening: 37.9,
          hrv_rmssd_morning: 39,
          hrv_rmssd_morning_sma: null,
          hrv_lf: 45,
          hrv_lf_sma: null,
          meas_hr_min: 51.4,
          meas_hr_min_sma: null,
          meas_hr_max: 96,
          meas_hr_max_sma: null,
          meas_hr_avg: 58,
          meas_hr_avg_sma: null,
          meas_rr_min: 5,
          meas_rr_min_sma: null,
          meas_rr_max: 25,
          meas_rr_max_sma: null,
          meas_rr_avg: 13.5,
          meas_rr_avg_sma: null,
          meas_activity_avg: 13.5,
          meas_activity_avg_sma: null,
          time_in_bed_duration: 10.5,
          sleep_duration: 9.68,
          sleep_score: 100,
          sleep_score_sma: null,
          time_in_bed_duration_sma: null,
          sleep_duration_sma: null,
          sleep_class_rem_duration: 2.75,
          sleep_class_light_duration: 5.17,
          sleep_class_deep_duration: 1.77,
          sleep_class_awake_duration: 0.65,
          sleep_class_awake_duration_sma: null,
          sleep_class_rem_duration_sma: null,
          sleep_class_light_duration_sma: null,
          sleep_class_deep_duration_sma: null,
          bed_exit_count: 2,
          bed_exit_count_sma: 0,
          bed_exit_duration: 595,
          bed_exit_duration_sma: 0,
          tossnturn_count: 30,
          tossnturn_count_sma: null
        }
      ]
    }

    var v3Data = {
      data: [
        {
          date_ts: 1484092800,
          date: "2017-01-11",
          hrv_recovery_total: 1.1,
          hrv_recovery_total_sma: null,
          hrv_recovery_ratio: 1.03,
          hrv_recovery_ratio_sma: null,
          hrv_rmssd_evening: 37.9,
          hrv_rmssd_evening_sma: null,
          hrv_rmssd_morning: 39,
          hrv_rmssd_morning_sma: null,
          hrv_lf: 45,
          hrv_lf_sma: null,
          hrv_hf: 55,
          hrv_hf_sma: null,
          meas_hr_min: 51.4,
          meas_hr_min_sma: null,
          meas_hr_max: 96,
          meas_hr_max_sma: null,
          meas_hr_avg: 58,
          meas_hr_avg_sma: null,
          meas_rr_min: 5,
          meas_rr_min_sma: null,
          meas_rr_max: 25,
          meas_rr_max_sma: null,
          meas_rr_avg: 13.5,
          meas_rr_avg_sma: null,
          meas_activity_avg: 13.5,
          meas_activity_avg_sma: null,
          time_in_bed_duration: 10.5,
          sleep_duration: 9.68,
          sleep_score: 100,
          sleep_score_sma: null,
          time_in_bed_duration_sma: null,
          sleep_duration_sma: null,
          sleep_class_rem_duration: 2.75,
          sleep_class_light_duration: 5.17,
          sleep_class_deep_duration: 1.77,
          sleep_class_awake_duration: 0.65,
          sleep_class_awake_duration_sma: null,
          sleep_class_rem_duration_sma: null,
          sleep_class_light_duration_sma: null,
          sleep_class_deep_duration_sma: null,
          bed_exit_count: 2,
          bed_exit_count_sma: 0,
          bed_exit_duration: 595,
          bed_exit_duration_sma: 0,
          tossnturn_count: 30,
          tossnturn_count_sma: null
        }
      ]
    }

    beforeEach(function (done) {
      nock(config.baseUrl)
      .get('/api/v1/trends/131')
      .query({
        remember_token: 'token'
      })
      .reply(200, JSON.stringify(v1Data))

      nock(config.baseUrl)
      .get('/v2/trends/131')
      .query({
        remember_token: 'token'
      })
      .reply(200, JSON.stringify(v2Data))

      nock(config.baseUrl)
      .get('/v3/trends/131/2017-01-11/2017-01-17')
      .query({
        remember_token: 'token'
      })
      .reply(200, JSON.stringify(v3Data))

      done()
    })

    it('should get trend data of device (v1)', function (done) {
      qs.trends(131, null, null, 1).then(function (response) {
        should.exist.response
        // response.device_id.should.equal(131)
        // response.duration_in_bed.should.equal(26095)
        done()
      })
    })

    it('should get trend data of device (v2)', function (done) {
      qs.trends(131, null, null, 2).then(function (response) {
        should.exist.response
        should.exist.response.data
        response.data[0].hrv_rmssd_evening.should.equal(37.9)
        done()
      })
    })

    it('should get trend data of device (v3)', function (done) {
      qs.trends(131, '2017-01-11', '2017-01-17', 3).then(function (response) {
        should.exist.response
        should.exist.response.data
        response.data[0].sleep_class_awake_duration.should.equal(0.65)
        done()
      })
    })

  }
)
