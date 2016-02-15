'use strict';

app.controller('dashboard_controller', function(User,$rootScope){
	var vm = this;
	vm.view = 'chart_none';
	vm.chart = 'View chart';

	vm.month = null;
	vm.months = [
		{month:'January'},
		{month:'February'},
		{month:'March'},
		{month:'April'},
		{month:'May'},
		{month:'June'},
		{month:'July'},
		{month:'August'},
		{month:'September'},
		{month:'October'},
		{month:'November'},
		{month:'December'}
	];

	vm.view_chart = function(){

		vm.ending_balance1 = parseInt(vm.beginning_balance1) + parseInt(vm.deposits1) - parseInt(vm.Withdrawals1);
		vm.ending_balance2 = parseInt(vm.beginning_balance2) + parseInt(vm.deposits2) - parseInt(vm.Withdrawals2);
		vm.ending_balance3 = parseInt(vm.beginning_balance3) + parseInt(vm.deposits3) - parseInt(vm.Withdrawals3);

		if (vm.view == 'chart_none') {
			vm.view = 'view_chart';
			vm.chart = 'Hide chart';

			var lineChartData = {
		        labels : [vm.month1.month,vm.month2.month,vm.month3.month],
		        datasets : [
		            {
		                label: "Chart month",
		                fillColor : "rgba(151,187,205,0.2)",
		                strokeColor : "rgba(151,187,205,1)",
		                pointColor : "rgba(151,187,205,1)",
		                pointStrokeColor : "#fff",
		                pointHighlightFill : "#fff",
		                pointHighlightStroke : "rgba(151,187,205,1)",
		                data : [vm.ending_balance1, vm.ending_balance2, vm.ending_balance3]
		            }
		        ]
		    }

			var ctx = document.getElementById("chart-month").getContext("2d");
	        window.myLine = new Chart(ctx).Line(lineChartData, {
	            responsive: true
	        }); 

		}else{
			vm.view = 'chart_none';
			vm.chart = 'View chart';
		}
	};

	// return user logged
    User.me(function(res) {
        if (res.type) {
            vm.perfil = res;
        }else{
            console.log('Not logged');
        }

    }, function() {
        $rootScope.error = 'Failed to fetch details';
    });

    // logout
    vm.logout = function() {
        User.logout(function() {
        	window.location.reload();
            window.location = "/#login"
        }, function() {
            alert("Failed to logout!");
        });
    };
	
})


app.filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    };
});