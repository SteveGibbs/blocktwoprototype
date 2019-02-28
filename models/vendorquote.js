/**
 * Created by stevegibbs on 14/05/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vendorquoteSchema = new Schema ({
    site: {type: Schema.Types.ObjectId, ref: 'Site'}, //store id from the site model
    quote_experience: {type: String},
    quote_category: {type: String},
    quote_requirements: {type: String},
    quote_duration: {type: String},
    quote_rate: {type: String},

});

module.exports = mongoose.model('Vendorquote', vendorquoteSchema);