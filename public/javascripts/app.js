angular.module('product', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.products = [];
    $scope.cart = [];
    $scope.create = function(product) {
        return $http.post('/products', product).success(function(data){
        $scope.products.push(data);
      });
    };
    $scope.addProduct = function() {
      var newProduct = {title:$scope.formContentTitle,ordered:0,value:0,price:$scope.formContentPrice,productUrl:$scope.formContentUrl};
      $scope.create(newProduct);
      console.log(newProduct);
      $scope.formContentTitle = "";
      $scope.formContentPrice = "";
      $scope.formContentUrl = "";
    };
    $scope.order = function(product) {
      return $http.put('/products/' + product._id + '/order')
        .success(function(data){
          console.log("vote worked");
          product.ordered = data.ordered;
        });
    };
    $scope.doOrder = function() {
       $scope.cart.length = 0;
       console.log("In Dovote");
       angular.forEach($scope.products, function(value,key) {
          console.log(value);
          console.log(value.value);
          if(value.value) {
             $scope.order(value);
             $scope.cart.push(value);
          }
       });
    };
    $scope.toggle = function(product) {
       if(product.value){
          product.value = 0;
       }
       else {
          product.value = 1;
       }
    }
    $scope.incrementOrders = function(product) {
       $scope.order(product);
    };
    $scope.getAll = function() {
      return $http.get('/products').success(function(data){
        angular.copy(data, $scope.products);
      });
    };
    $scope.getAll();
    $scope.delete = function(product) {
      $http.delete('/products/' + product._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };

  }
]);

