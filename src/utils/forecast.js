const request = require('request');



const forecast = (lat, lon, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=bf29d859dec389367e7b9265cefd028e&query='+lat+','+lon;
    request({url: url, json: true}, (error, {body})=> {
        if(error){
            callback('Unable to connect to weather services')
        }else if(body.error){
            callback('Unable to find location')
        }else{
            callback(undefined, body.current.weather_descriptions[0]+" "+body.current.temperature + " " + body.current.feelslike + body.current.wind_speed)
        }
    })
}

module.exports = forecast;