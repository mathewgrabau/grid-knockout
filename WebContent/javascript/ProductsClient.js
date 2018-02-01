var ProductsClient = function(url) {

	var baseUrl = url;

	var getProducts = function(callback) {
		$.ajax({
			url: baseUrl + "/products",
			type: "GET",
			success: function(result) {
				console.log("Successfully retrieved products: " + JSON.stringify(result));
				callback(result);
			}
		});
	};

	var deleteProduct = function(product, callback) {
		console.log("Deleting product [" + product.data.id() + "]");
		$.ajax({
			url: baseUrl + "/products/" + product.data.id(),
			type: "DELETE",
			success: function(result) {
				callback(product);
			}
		})
	};

	return {
		getProducts: getProducts,
		deleteProduct: deleteProduct
	};
};