var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: {type: String},
    last_name: {type: String},
    membership_number: {type: String},
    imagePath: {type: String},
    description: {type: String},
    home_address_line1: {type: String},
    home_address_line2: {type: String},
    postal_code: {type: String},
    address_state: {type: String},
    address_country: {type: String},
    provider_one: {type: String},
    qualification_one: {type: String},
    provider_two: {type: String},
    qualification_two: {type: String},
    provider_three: {type: String},
    qualification_three: {type: String},
    provider_four: {type: String},
    qualification_four: {type: String},
    visa_status: {type: String},
    licence_one: {type: String},
    licence_one_expiry: {type: String},
    licence_two: {type: String},
    licence_three: {type: String},
    licence_four: {type: String},
    // portfolios:[{type: Schema.Types.ObjectId,
    //     ref: 'Portfolio' }],
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
    ;}

// userSchema.pre('save', function(next) {
//     var user = this;
//     var SALT_FACTOR = 5;
//
//     if (!user.isModified('password')) return next();
//
//     bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
//         if (err) return next(err);
//
//         bcrypt.hash(user.password, salt, null, function(err, hash) {
//             if (err) return next(err);
//             user.password = hash;
//             next();
//         });
//     });
// });
//
// userSchema.methods.comparePassword = function(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };

module.exports = mongoose.model('User', userSchema);