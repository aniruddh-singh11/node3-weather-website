const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ2F1ZHktY2Fybml2YWwiLCJhIjoiY21iZXZlcm5yMjI0eTJqcXV4eXpwMDZudCJ9.-ljWdTOKyPiYiXRD4Wd5fA&limit=1';
    request({url, json:true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to geocoding service', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;