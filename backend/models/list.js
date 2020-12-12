const mongoose = require('mongoose')


var ingredientSchema = mongoose.Schema({
    aisle: String,
    amount: Number,
    measure: String,
    name: String,
    recipeName: String,
    buyer: String,
})

const listSchema = mongoose.Schema({
    name: String,
    ingredients: [ingredientSchema],
    tri: Boolean,
    favorite_ingredient: Array,

})

const listModel = mongoose.model('lists', listSchema)

module.exports = listModel