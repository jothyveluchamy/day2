var request = require('request');


module.exports = function(location, callback) {
    var encodedLocation = encodeURIComponent(location);
    var url = 'http://api.openweathermap.org/data/2.5/weather?q='+ encodedLocation +'&appid=c872774a0310edb5c2f9093f0d0a6f77&units=metric';

    if(!location)
    {
        return callback('no location provided');
    }
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


