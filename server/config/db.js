const mongoose = require('mongoose')

function connectToDB () {
    mongoose.connect(process.env.MONGO_URI).then(()=>console.log("MongoDB Connected")).catch((error)=>console.log(error))
}

module.exports = connectToDB;