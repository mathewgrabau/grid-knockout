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

	return {
		getProducts: getProducts
	};
};