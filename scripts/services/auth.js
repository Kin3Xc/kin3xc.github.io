'use strict';

app.factory('User', function($http, $localStorage){
	var baseUrl = "https://api-lendingfront.herokuapp.com";

	function changeUser(user) {
    angular.extend(currentUser, user);
  }

	function urlBase64Decode(str) {
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
          case 0:
              break;
          case 2:
              output += '==';
              break;
          case 3:
              output += '=';
              break;
          default:
              throw 'Illegal base64url string!';
      }
      return window.atob(output);
  }

	function getUserFromToken() {
      var token = $localStorage.token;
      var user = {};
      if (typeof token !== 'undefined') {
          var encoded = token.split('.')[1];
          user = JSON.parse(urlBase64Decode(encoded));
      }
      return user;
  	}

	var currentUser = getUserFromToken();

	return {
		 signup: function(data, success, error) {
				 $http.post(baseUrl + '/api/v1/signup', data).success(success).error(error)
		 },
		 login: function(data, success, error) {
				 $http.post(baseUrl + '/api/v1/login', data).success(success).error(error)
		 },
		 me: function(success, error) {
				 $http.get(baseUrl + '/api/v1/me').success(success).error(error)
		 },
		 logout: function(success) {
				 changeUser({});
				 delete $localStorage.token;
				 success();
		 }
 };

});