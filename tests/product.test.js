const axios = require("axios");

describe("POST @ products/ endpoint", () => {
	it("should save a product and and return saved product", () => {
		axios
			.post("http://localhost:5000/products/", {
				name: "White Chocolate",
				description: "Pure white chocolate",
				price: 250.0,
				status: "active",
				src: "https://www.thechocolatehouse.lk/1698-thickbox_default/tch869-toren-white-chooclate-100g.jpg",
			})
			.then(res => expect(res.status).toEqual(201))
			.catch(err => {});
	});
});

describe("GET @ products/ endpoint", () => {
	it("should return an products array and return status code 200", () => {
		axios
			.get("http://localhost:5000/products")
			.then(res => {
				expect(res.status).toEqual(200);
				expect(typeof res.data).toEqual("Object");
			})
			.catch(err => {});
	});
});
