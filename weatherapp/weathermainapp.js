var weather = require('./weather.js');
var location = require('./location.js');
var argv = require('yargs').option(
    'location', {
        alias: 'l',
        demand: false,
        describe: 'loction to fetch weather for',
        type: 'string'
    }
)
.help('help')
.argv;


var locationData;

if(typeof argv.l === 'string' && argv.l.length > 0)
{
    console.log("location providd" + argv.l);
    locationData = argv.l;
    
weather(locationData, function(curWeather)
{
    console.log(curWeather);
});

}
else
{
    console.log("location was not provided so fetching location")
    location(function(l)
    {
        if(l)
        {
            console.log(l.city);
            locationData = l.city;
            
        }
        else
        {
            console.log("unable to fetch location");
        }

        
    weather(locationData, function(curWeather)
    {
        console.log(curWeather);
    });

        
    })
}



