const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listSchema = new Schema ({
    title: String,
    tasks: [Schema.Types.ObjectId ]

})