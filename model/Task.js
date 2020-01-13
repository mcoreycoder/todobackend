const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listSchema = new Schema ({
    title: String,
   complete: Boolean,
   due: Date
});
const Task = mongoose.model('task', listSchema)