const axios = require("axios");

const Product = require("../models/product.model");

/**
 * use to save the product
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 */
const saveProduct = async (req, res) => {
	// request body validation
	if (req.body) {
		const { name, description, price, status, src } = req.body;
		const userId = req.body.userId;

		if (!src) {
			return res.status(400).json({ message: "Please select an image link" });
		}

		// user inputs validation
		if (!name || !description || !price || !status || !src) {
			return res.status(400).json({ message: "Please fill all the fields" });
		}

		try {
			const response = await axios.get(`http://localhost:5005/${userId}`);

			// save product
			const newProduct = new Product({
				name,
				description,
				price,
				status,
				src,
				added_by: response.data.data,
			});
			await newProduct.save();

			// sending as saved
			return res.status(201).json({ message: "Product saved successfully", data: newProduct });
		} catch (err) {
			return res.status(500).send({ message: "Something went wrong" });
		}
	}

	return res.status(400).send({ message: "Client error" });
};

/**
 * use to get all the products
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 */
const getProducts = async (req, res) => {
	try {
		const products = await Product.find();
		return res.status(200).json({ message: "Products received", data: products });
	} catch (err) {
		return res.status(500).json({ message: "Something went wrong" });
	}
};

/**
 * use to get all the products based on status
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 */
const getProductsBasedOnStatus = async (req, res) => {
	if (req.params.status) {
		try {
			const products = await Product.find({ status: req.params.status });
			return res.status(200).json({ message: "Products received", data: products });
		} catch (err) {
			return res.status(500).json({ message: "Something went wrong" });
		}
	}
};

/**
 * use to get Product based on id
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 */
const getProduct = async (req, res) => {
	if (req.params.id) {
		try {
			const singleProduct = await Product.findById(req.params.id);
			return res.status(200).json({ message: "Product received", data: singleProduct });
		} catch (err) {
			return res.status(500).json({ message: "Something went wrong" });
		}
	}
};

/**
 * use to get total of the Products
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 */
const getProductsTotal = async (req, res) => {
	try {
		const Products = await Product.find();
		return res.status(200).json({ message: "Products total", data: Products.length });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send();
	}
};

/**
 * use to update the specific Product
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 */
const updateProduct = async (req, res) => {
	// request body and params validation
	if (req.params.id && req.body) {
		const { name, description, price, status, src } = req.body;

		if (!src) {
			return res.status(400).json({ message: "Please select an image url" });
		}

		try {
			// update Product
			const updatedProduct = await Product.findByIdAndUpdate(
				req.params.id,
				{
					name,
					description,
					price,
					status,
					src,
				},
				{ new: true }
			);

			// sending as updated
			return res.status(201).json({ message: "Product updated successfully", data: updateProduct });
		} catch (err) {
			return res.status(500).json({ message: "Something went wrong" });
		}
	}

	return res.status(400).json({ message: "Client error" });
};

/**
 * use to delete the specific Product
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 */
const deleteProduct = async (req, res) => {
	if (req.params.id) {
		try {
			const toBeDeletedProduct = await Product.findById(req.params.id);

			if (!toBeDeletedProduct) {
				return res.status(400).json({ message: "Product not found" });
			}

			await Product.findByIdAndDelete(req.params.id);

			return res
				.status(200)
				.json({ message: "Product deleted successfully", data: toBeDeletedProduct });
		} catch (err) {
			return res.status(500).json({ message: "Something went wrong" });
		}
	}
};

module.exports = {
	saveProduct,
	deleteProduct,
	updateProduct,
	getProducts,
	getProduct,
	getProductsTotal,
	getProductsBasedOnStatus,
};
