const request = require('request')

module.exports = function (req_object) {
  return new Promise(function (resolve, reject) {
    request(
      req_object,
      function (error, response, body) {
        if (error) {
          console.log('Error sending request: ' + response.error)
          reject(response.error)
        } else {
          resolve(body)
        }
      }
    )
  })
}
