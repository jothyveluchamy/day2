var request = require('request');


module.exports = function(location, callback) {
    return new Promise(function(resolve, reject){
        var encodedLocation = encodeURIComponent(location);
        var url = 'http://api.openweathermap.org/data/2.5/weather?q='+ encodedLocation +'&appid=c872774a0310edb5c2f9093f0d0a6f77&units=metric';
    
        if(!location)
        {
            return reject('no location provided');
        }
        request(
        {
            url: url,
            json: true,
            }, function(error, response, body) {
                if(error)
                {
                    reject('Unable to fetrch weather');
                }
                else
                {
                    
                    resolve('It\'s ' + body.main.temp + ' in ' + body.name + ' with humidity ' + body.main.humidity+ '!');
                }
        });
    })
    
}


