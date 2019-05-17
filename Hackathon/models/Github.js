var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gitSchema = new Schema({
	github : {
		name: String,
	},
	codewars: {
        type: Object,
    }

})
var Github = mongoose.model('Github', gitSchema)


module.exports = Github;
