'use strict';

app.controller('auth_controller', function(User, $localStorage,$rootScope){
	var vm = this;

	// return user logged
    User.me(function(res) {
        if (res.type) {
            vm.perfil = res;
            window.location = "/#dashboard";
        }

    }, function() {
        $rootScope.error = 'Failed to fetch details';
    });


	// login
	var obj_login = {};
	vm.login = function(){
        obj_login = {
            email: vm.email,
            password: vm.password
        };

        User.login(obj_login, function(res) {
        	console.log(res);
            if (res.type == false) {
                alert(res.data)
            } else {
                $localStorage.token = res.data.token;
                window.location.reload();
                window.location = "/#dashboard";
            }
	    }, function() {
	        $rootScope.error = 'Failed to signin';
	    });
        console.log(obj_login);
    }



    // signup
    var obj_signup = {};
    vm.signup = function(){
        obj_signup = {
            name: vm.name,
            tel: vm.tel,
            email: vm.email,
            password: vm.password
        };

     	User.signup(obj_signup, function(res) {
     		console.log(res);
            if (res.type == false) {
                alert(res.data)
            } else {
                $localStorage.token = res.data.token;
                window.location.reload();
                window.location = "/#dashboard";
            }
	    }, function() {
	        $rootScope.error = 'Failed to signup';
	    });
    }

})