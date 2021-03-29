const mongoose = require('mongoose')


var categorySchema = mongoose.Schema({
   name: String,
   ingredients: Array
});

const categoryModel = mongoose.model('categories', categorySchema)

module.exports = categoryModel