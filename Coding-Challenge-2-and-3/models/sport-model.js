const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

const sportsSchema = mongoose.Schema({
    id: {
        type: String,
        default: uuid.v4(),
        required: true
    },
    name: {
        type: String,
        required: true
    },
    num_players: {
        type: Number,
        require: true
    }

})

const sportsCollection = mongoose.model('sports', sportsSchema)

const Sports = {
    create: function(sport){
        return sportsCollection
            .create(sport)
            .then(result => {
                return result
            })
            .catch (err => {
                return error
            })
    },
    delete: function(sport){
        return sportsCollection
            .deleteOne(sportsCollection.find({id: sport}))
            .then(response => {
                if(response.n > 0)
                    return true
                else
                    return false
            })
            .catch (err => {
                return error
            })
    }
}

module.exports = {
    Sports
};