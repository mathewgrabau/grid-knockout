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

	var addProduct = function(product, callback) {
		// Transfer to plain
		var plainProduct = ko.toJS(product.data);
		console.log("Saving product [" + JSON.stringify(plainProduct) + "]");
		$.ajax({
			url: baseUrl + "/products",
			type: "POST",
			data: JSON.stringify(plainProduct),
			contentType: "application/json",
			success: function(id) {
				callback(product, id);
			}
		});
	};

	return {
		getProducts: getProducts,
		deleteProduct: deleteProduct,
		addProduct: addProduct
	};
};