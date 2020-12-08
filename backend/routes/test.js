const request = require('supertest'); 
const app = require('../app');
const mongoose = require('mongoose');
const Recipe = require('../models/recipes');
const { TestScheduler } = require('jest');

// beforeAll(async() =>{
//     var options = {
//         connectTimeoutMS: 5000,
//         useUnifiedTopology : true,
//         useNewUrlParser: true,
//     }
    
//     mongoose.connect('mongodb+srv://team:team@cluster-forget-me-not.37dbs.mongodb.net/popotes?retryWrites=true&w=majority',
//         options,
//         function(err){
//             console.log(err);
//         }
//     )
// });

// aterAll(async()=>{
//     await mongoose.connection.close()
// })

describe('test route fiters', function(){
    test('test post filters', async (done) => {
        await request(app).post('/filters')
        .send({cuisine: '', time:''})
        .expect({result:{
            // cuisines: {$all: ['French']}
            // readyInMinutes: {$lte: 30}
          }})
    done()
    })
})