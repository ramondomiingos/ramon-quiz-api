const mongoose = require('mongoose')

const UserScheema = new mongoose.Schema({
    name:String,
    password:String,
    username:String,
    createdAt:Date,
    typeUser:String
/*typeUserOptions:
    1: Teacher
    2: Student
* */
})
module.exports = mongoose.model('user', UserScheema)