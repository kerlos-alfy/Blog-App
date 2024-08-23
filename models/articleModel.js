const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	tags: [String], // An array of strings for tags
	published: {
		type: Boolean,
		default: false,
	},
	publishedDate: {
		type: Date,
		default: Date.now,
	},
	views: {
		type: Number,
		default: 0,
	},
});

module.exports = mongoose.model("Article", articleSchema);
