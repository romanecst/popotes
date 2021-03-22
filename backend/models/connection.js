var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

mongoose.connect(process.env.DB_URL,
    options,
    function(err){
        console.log(err);
    }
)

module.exports = mongoose