var ProductsGrid = function() {

	// products model 
	var productModel = function(item) {
		this.data = {};
		this.data.id = ko.observable(item.id);
		this.data.name = ko.observable(item.name);
		this.data.description = ko.observable(item.description);
		this.data.price = ko.observable(item.price);
	};

	var products = ko.observableArray();

	var client = ProductsClient("http://localhost:8080");

	var retrieveProducts = function() {
		console.log("Retrieving products from the server");
		client.getProducts(retrieveProductsCallback);
	};

	var retrieveProductsCallback = function(data) {
		data.forEach(function(item) {
			products.push(new productModel(item));
		});
	};

	var deleteProduct = function(product) {
		client.deleteProduct(product, deleteProductCallback);
	};

	var deleteProductCallback = function(product) {
		products.remove(product);
		console.log("Product [" + product.data.id() + "] deleted");
	};

	var init = function() {

		retrieveProducts();

		ko.applyBindings(ProductsGrid);
	};

	$(init);

	return {
		products: products,
		deleteProduct: deleteProduct
	};

}();