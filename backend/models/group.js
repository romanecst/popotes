const mongoose = require('mongoose')

const groupSchema = mongoose.Schema({
    list_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'list' },
    user_id:Array,
    name: String,
    avatar: String,
    group_token: String,
})

const groupModel = mongoose.model('group', groupSchema)

module.exports = groupModel
