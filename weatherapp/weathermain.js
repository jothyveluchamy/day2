var weather = require('./weatherdetails.js');
var location = require('./location.js');


weather(function(curWeather)
{
    console.log(curWeather);
});

location(function(l)
{
    if(!l)
    {
        console.log('unable to find location');
        return;
    }

    console.log(l.loc);
})
