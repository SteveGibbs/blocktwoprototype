/**
 * Created by stevegibbs on 14/05/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var equipmentSchema = new Schema ({
    site: {type: Schema.Types.ObjectId, ref: 'Site'}, //store id from the site model
    equipment_name: {type: String, required: true},
    equipment_imagePath: {type: String},
    equipment_description: {type: String, required: true}

});

module.exports = mongoose.model('Equipment', equipmentSchema);