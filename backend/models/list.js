const mongoose = require('mongoose')


var ingredientSchema = mongoose.Schema({
    name: String,
    quantity: Number,
    buyer: String,
})

const listSchema = mongoose.Schema({
    name: String,
    ingredients: [ingredientSchema],
    tri: Boolean,
    favorite_ingredient: Array,

})

const listModel = mongoose.model('list', listSchema)

module.exports = listModel