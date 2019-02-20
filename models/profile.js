/**
 * Created by stevegibbs on 14/05/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema ({
  //  user: {type: Schema.Types.ObjectId, ref: 'User'}, //store id from the user model
    title: {type: String, required: true},
    name: {type: String, required: true},
    imagePath: {type: String, required: true},
    description: {type: String, required: true},
    work_addressline1: {type: String, required: true},
    work_addressline2:{type: String, required: true},
    qualifications: {type: String, required: true},
    home_addressline1: {type: String, required: true},
    home_addressline2:{type: String, required: true}
});

module.exports = mongoose.model('Profile', schema);