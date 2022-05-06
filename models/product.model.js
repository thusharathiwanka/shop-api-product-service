const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		description: { type: String, required: true, trim: true },
		price: { type: Number, required: true, trim: true },
		src: { type: String, required: true, trim: true },
		status: { type: String, required: true, trim: true, default: "active" },
		added_by: {
			_id: { type: String, require: true },
			name: { type: String, required: true },
			username: { type: String, required: true },
			email: { type: String, required: true },
			mobile: { type: String, required: true },
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("products", ProductSchema);

module.exports = Product;
