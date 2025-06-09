const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ani'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About',
        name: "Ani"
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        message: 'Help text',
        title: 'Help',
        name: 'Ani'
    })
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: "Ani",
//         age: 27
//     },{
//         name: "jev",
//         age: 2
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
            error:'You must provide address term'
        })
    }
    geocode(address, (error, {lat, lon, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(lat, lon, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecastData,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ani',
        message: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ani',
        message: 'Page not found.'
    });
});

app.listen(port, () => {
    console.log('Server is up on ' + port);
})