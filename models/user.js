var mongoose = require('mongoose');

var genders = 'MALE FEMALE OTHER'.split(' ');

var userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, match: /\S+@\S+\.\S+/, required: true, unique: true},
    password: {type: String, required: true},
    //birthday: {type: Date, required: true},
    gender: {type: String, required: true, enum: genders},
    location: {
        city: {type: String, required: true},
        state: {type: String, required: true},
        country: {type: String, required: true}
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;