const router = require("express").Router();
const {
	getProducts,
	saveProduct,
	deleteProduct,
	updateProduct,
	getProduct,
	getProductsTotal,
	getProductsBasedOnStatus,
} = require("../controllers/product.controller");

router.get("/", getProducts);
router.post("/", saveProduct);
router.get("/product/:id", getProduct);
router.get("/total", getProductsTotal);
router.get("/:status", getProductsBasedOnStatus);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
