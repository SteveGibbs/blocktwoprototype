/**
 * Created by stevegibbs on 14/05/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var portfolioSchema = new Schema ({
    user: {type: Schema.Types.ObjectId, ref: 'User'}, //store id from the user model
    portfolio_title: {type: String, required: true},
    portfolio_one_imagePath: {type: String},
    portfolio_one_description: {type: String, required: true}
});

module.exports = mongoose.model('Portfolio', portfolioSchema);