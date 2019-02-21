/**
 * Created by stevegibbs on 14/05/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var siteSchema = new Schema ({
    user: {type: Schema.Types.ObjectId, ref: 'User'}, //store id from the user model
    site_name: {type: String, required: true},
    site_imagePath: {type: String},
    site_description: {type: String, required: true},
    site_address_line1: {type: String},
    site_address_line2: {type: String},
    site_postal_code: {type: String},
    site_address_state: {type: String}
});

module.exports = mongoose.model('Site', siteSchema);