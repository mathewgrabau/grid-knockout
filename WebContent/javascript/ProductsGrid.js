var ProductsGrid = function() {

	// products model 
	var productModel = function(item, itemMode) {
		this.data = {};
		this.data.id = ko.observable(item.id);
		this.data.name = ko.observable(item.name);
		this.data.description = ko.observable(item.description);
		this.data.price = ko.observable(item.price);
		this.displayMode = ko.observable(itemMode);
	};

	var displayMode = {
		view: "VIEW",
		edit: "EDIT"
	};

	var products = ko.observableArray();

	var client = ProductsClient("http://localhost:8080");

	var retrieveProducts = function() {
		console.log("Retrieving products from the server");
		client.getProducts(retrieveProductsCallback);
	};

	var retrieveProductsCallback = function(data) {
		data.forEach(function(item) {
			products.push(new productModel(item, displayMode.view));
		});
	};

	/* Function to add a blank product to the products array. */
	var addProduct = function() {
		console.log("Adding a new product");
		var item = {
			sku: null,
			name: null,
			description: null,
			price: null
		};
		products.push(new productModel(item, displayMode.edit));
	};

	var deleteProduct = function(product) {
		client.deleteProduct(product, deleteProductCallback);
	};

	var deleteProductCallback = function(product) {
		products.remove(product);
		console.log("Product [" + product.data.id() + "] deleted");
	};

	var saveProduct = function(product) {
		client.addProduct(product, saveProductCallback);
	};

	var saveProductCallback = function(product, id) {
		product.data.id(id);
		product.displayMode(displayMode.view);
		console.log("Product saved with id [" + product.data.id() + "]");
	};

	var editProduct = function(product) {
		// Start editing the product
		product.displayMode(displayMode.edit);
		console.log("Editing product [" + product.data.id() + "]");
	};

	var updateProduct = function(product) {
		client.updateProduct(product, updateProductCallback);
	};

	var updateProductCallback = function(product) {
		console.log("Product [" + product.data.id() + "] updated");
		// revert to the displaying mode
		product.displayMode(displayMode.view);
	};

	var init = function() {

		retrieveProducts();

		ko.applyBindings(ProductsGrid);
	};

	$(init);

	return {
		products: products,
		displayMode: displayMode,
		deleteProduct: deleteProduct,
		addProduct: addProduct,
		saveProduct: saveProduct,
		editProduct: editProduct,
		updateProduct: updateProduct
	};

}();