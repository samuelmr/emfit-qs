# Emfit QS API client

[![Build Status](https://travis-ci.org/samuelmr/emfit-qs.svg?branch=master)](https://travis-ci.org/samuelmr/emfit-qs)

Unofficial [Emfit QS](https://www.emfitqs.com/) API client for node.js

## Usage

### Install

```
npm install emfit-qs
```

### Quick example

```js

const QS = require('emfit-qs')

var token = 'MY_ACCESS_TOKEN'
var qs = new QS(token)

qs.user().then(function(data) {
  console.log(data.device_settings.length + ' devices found for ' + data.user.email)

  // get latest data for first device found
  let deviceId = data.device_settings[0].device_id
  qs.latest(deviceId).then(function (sleep) {
    // dump all data
    // console.log(JSON.stringify(sleep, null, 1))
    let d = new Date(sleep.time_end * 1000)
    console.log('Latest sleep ended at ' + d + ' with score: ' + sleep.sleep_score)
  })

}).catch(function(error){
  console.error(error)
})

```

## Features
Supported APis (in alphabetical order):

### latest
Get latest sleep periods' data from a device.
```js

qs.latest(deviceId, apiVersion).then(function(data) {
  console.log(data)
})

```

### login
Exchange username and password to a token (expires in 7 days).
You can also log in to [qs.emfit.com](https://qs.emfit.com/) and check
the ´remember_token´ parameter passed to API calls (e.g. with developer
tools of your browser).

The `data` parameter passed to callback function includes objects `user`,
`device_settings` and `remember_token`.

```js

qs.login('myusername', 'mypassword').then(function(data) {
  qs.statuses() // token set automatically
})

```
### presence
Get specific sleep period's data. You can set `apiVersion` to `1`, `2` or `4`.
`qs.pesence(deviceId)` is the same as `qs.latest(deviceId)`
```js

qs.pesence(periodId, deviceId, apiVersion).then(function(data) {
  console.log(data)
})

```

### status
Get status of a specific device. Possible statuses: "present", "absent",
"network-error", "sensor-error" or "undeployed".
```js

qs.status(deviceId).then(function(data) {
  console.log(data)
})

```

### statuses
Get status of all devices your account has access to.
```js

qs.statuses().then(function(data) {
  console.log(data)
})

```

### user
Get your account information.
```js

qs.user().then(function(data) {
  console.log(data)
})

```
