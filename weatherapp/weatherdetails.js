var request = require('request');
var url = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=c872774a0310edb5c2f9093f0d0a6f77&units=metric'

module.exports = function(callback) {
    request(
    {
        url: url,
        json: true,
        }, function(error, response, body) {
            if(error)
            {
                callback('Unable to fetrch weather');
            }
            else
            {
                callback('It\'s ' + body.main.temp + ' in ' + body.name + '!');
            }
    });
}


