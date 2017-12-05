var weather = require('./weather1.js');
var location = require('./location1.js');
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
    
weather(locationData).then(function(curWeather)
{
    console.log(curWeather);
}).catch(function (err)
{
    console.log(err);
});
}
else
{
    console.log("location was not provided so fetching location")
    location().then(function(l)
    {
        locationData = l.city;
        locationData = 'bangalore';//overriding cause bengaluru is not defined
        weather(locationData).then(function(curWeather)
        {
            console.log(curWeather);
        });
    }).catch(function(err){
        console.log(err);
    })
}



