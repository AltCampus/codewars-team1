var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    codewars: {
        type: Object
    },
},{timestamps: true});

userSchema.pre('save', function(next) {
    // hash password using bcrypt.hashing
    this.password = bcrypt.hashSync(this.password, 10);
    return next();
})

userSchema.methods.validatePassword = function(password){
    // compare password using bcrypt.compareSync
    return bcrypt.compareSync('password', this.password)
}

var User = mongoose.model('User', userSchema)

module.exports = User;