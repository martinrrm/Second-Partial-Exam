const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const morgan = require('morgan')
const { Sports} = require('./models/sport-model')
const { DATABASE_URL, PORT } = require( './config' );
const uuid = require( 'uuid' );

const app = express();
app.use(morgan('dev'))
app.use(jsonParser)

const sports = [
    {
        id: 2
    },
    {
        id: 3
    }
]

app.post('/sports', (req, res) => {
    Sports.create({
        id: uuid.v4(), 
        name: "Test",
        num_players: 123
    })
    .then(result => {
        return res.status(201).json(result)
    })
})

///// Third Challenge
app.delete('/sports/delete', (req, res) => {
    let {id} = req.body
    if(!id){
        res.statusMessage = "ID not found in body of the request"
        res.status(406).end()
    }

    let {sportId} = req.query
    if(!sportId){
        res.statusMessage = "ID not found in query params of the request"
        res.status(406).end()
    }

    if(id !== sportId){
        res.statusMessage = "ID's doesn't match"
        res.status(409).end()
    }

    Sports.delete(id)
    .then(result => {
        if(result === true)
        return res.status(204).end()
        else 
            res.statusMessage = `Sport with ${id} doesnt exist`
            return res.status(404).end()
    })
    .catch(err => {
        res.statusMessage = "Error in the database"
        return res.status(500).end()
    })

})

///// Second Challenge
// app.delete('/sports/delete', (req, res) => {
//     let {id} = req.body
//     if(!id){
//         res.statusMessage = "ID not found in body of the request"
//         res.status(406).end()
//     }

//     let {sportId} = req.query
//     if(!sportId){
//         res.statusMessage = "ID not found in query params of the request"
//         res.status(406).end()
//     }

//     if(id !== sportId){
//         res.statusMessage = "ID's doesn't match"
//         res.status(409).end()
//     }

//     sports.find((sport) => {
//         if(sport.id === id){
//             return res.status(204).end()
//         }
//     })

//     res.statusMessage = `Sport with ${id} doesnt exist`
//     return res.status(404).end()
// })



app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});