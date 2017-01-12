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
Supported APis

### latest
```js

qs.latest(deviceId)

```

### login
```js

qs.login('myusername', 'mypassword').then(function(data) {
  qs.statuses() // token set automatically
})

```

### status
```js

qs.status(deviceId)

```

### statuses
```js

qs.statuses()

```

### user
```js

qs.user()

```
