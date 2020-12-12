const mongoose = require('mongoose')

const recipesSchema = mongoose.Schema({
    title: String,
    instructions: String,
    image: String,
    vegetarian: Boolean,
    vegan: Boolean, 
    glutenFree: Boolean,
    dairyFree: Boolean,
    veryHealthy: Boolean,
    veryPopular: Boolean,
    cheap: Boolean,
    readyInMinutes: Number,
    servings: Number,
    cuisines: Array,
    extendedIngredients: Array,
    dishTypes: Array
})

const recipesModel = mongoose.model('recipes', recipesSchema)

module.exports = recipesModel