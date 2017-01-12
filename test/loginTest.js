require('chai').should()
const nock = require('nock'),
  QS = require('../index'),
  config = require('../config')

describe('Log in ', function () {

    var qs = new QS('token')
    var loginData = {
      remember_token: 'token',
      user: {
        id: 1,
        username: '001122',
        email: 'mr@example.com',
        locale: 'en_EN',
        timezone_id: 153,
        gmt_offset: 7200,
        devices: '131',
        remember_token: 'token',
        time_format: 'H24',
        date_format: 'DD-MM',
        validic_user: null,
        timezone_name: 'Europe/Helsinki'
      },
      device_settings:[
        {
          device_id: 131,
          serial_number: '001122',
          device_name: 'Mr. Example home',
          field1: null,
          field2: null,
          email: 'mr@example.com',
          timezone_id: 153,
          gmt_offset: 7200,
          synced_wellmo: 0,
          synced_uacf: 0,
          synced_tpeaks: 0,
          enabled_wellmo: 1,
          enabled_uacf: 1,
          enabled_tpeaks: 1,
          firmware: '120.1.1.20',
          new_guide: 1,
          has_fm: 0,
          enabled_raw: 0,
          enabled_night: 0,
          enabled_notifs: 0,
          night_start: '2300',
          night_end: '0700',
          minitrend_days: 7
        }
      ],
      notification_settings: {
        '131': {
          device_id: 131,
          sms_alert: false,
          email_alert: false,
          email_alert_addresses: null,
          alarm_profile: 'off',
          morning_alarm: false,
          morning_alarm_time: '07:00',
          afternoon_assurance: false,
          afternoon_assurance_duration: 6,
          evening_assurance: false,
          night_alarm_time: '21:00',
          night_alarm_tolerance: 20,
          night_alarm_24note: false,
          night_alarm_inote: false,
          phone1_number: null,
          phone1_shift_lo: 0,
          phone1_shift_hi: 24,
          phone2_number: null,
          phone2_shift_lo: 0,
          phone2_shift_hi: 24,
          phone3_number: null,
          phone3_shift_lo: 0,
          phone3_shift_hi: 24,
          enable_apnea: false,
          enable_fm: false,
          created_at: '2017-01-10 20:14:00.000',
          updated_at: '2017-01-10 20:21:46.000'
        }
      }
    }
    beforeEach(function (done) {
      nock(config.baseUrl)
      .filteringRequestBody(/.*/, '*')
      .post('/api/v1/login', '*')
      .reply(200, JSON.stringify(loginData))
      done()
    })

    it('should get token for username and password', function (done) {

      qs.login('mr@example.com', 'password').then(function (response) {
        should.exist.response
        response.remember_token.should.equal('token')
        response.should.have.property('user').with.property('email')
        response.should.have.property('device_settings').with.lengthOf(1)
        done()
      })
    })

  }
)
