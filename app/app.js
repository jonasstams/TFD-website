var myApp = angular.module("myApp", ["ngRoute", 'ngMap']);
myApp.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "views/home.html"
        })
        .when("/menu", {
            templateUrl : "views/menu.html"
        })
        .when("/contact", {
            templateUrl : "views/contact.html"
        })
        .when("/gallery", {
            templateUrl : "views/gallery.html"
        })
        .when("/menu/main-dishes", {
            templateUrl : "views/mainDishes.html"
        })
        .when("/menu/starters", {
            templateUrl : "views/starters.html"
        })
        .when("/menu/desserts", {
            templateUrl : "views/desserts.html"
        })
        .when("/menu/drinks", {
            templateUrl : "views/drinks.html"
        });
});
myApp.controller('contactController', function($scope) {
    $scope.result = 'hidden';
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    $scope.submit = function(contactform) {
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        if (contactform.$valid) {
            $http({
                method  : 'POST',
                url     : 'app/shared/contact-form/contact-form.php',
                data    : $.param($scope.formData),  //param method from jQuery
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
            }).success(function(data){
                console.log(data);
                if (data.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-success';
                } else {
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-danger';
                }
            });
        } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Failed <img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley">  Please fill out all the fields.';
            $scope.result='bg-danger';
        }
    }
});

myApp.controller('navigationController', ['$scope', '$location',   function($scope, $location){
   $scope.navItems = [];
   $scope.navItems.home = [{
       "title": "Home"  ,
       "url": "#/"
   },{
       "title": "Menu"  ,
       "url": "#/menu/main-dishes"
   },{
       "title": "Gallery"  ,
       "url": "#/gallery"
   },{
       "title": "Contact"  ,
       "url": "#/contact"
   }];

   $scope.navItems.menu =  [{
       "title": "Starters"  ,
       "url": "#/menu/starters"
   },{
       "title": "Main"  ,
       "url": "#/menu/main-dishes"
   },{
       "title": "Desserts"  ,
       "url": "#/menu/desserts"
   },{
       "title": "Drinks"  ,
       "url": "#/menu/drinks"
   }];

    $scope.currentLocation = '#' + $location.path();
}]);

myApp.directive("navigation", function(){
    {
        return {
            restrict: 'E',
            scope: { objects:  '=', current: '='},
            templateUrl: 'views/navigation.html'
        }

    }
});

myApp.controller('menuController', function($scope){
   $scope.drinks = [];
   $scope.dessert = {
     "name": "Vanilla Ice cream"  ,
     "price": "5$"  ,
     "description": "Tasty steak with a little touch of my balls."
   };
   $scope.dessert2 = {
     "name": "chocolade Ice cream"  ,
     "price": "5$"  ,
     "description": "Tasty steak with a little touch of my balls."
   };
});

myApp.directive("menuItem", function(){
    {
        return {
            restrict: 'E',
            scope: { obj1:  '=', obj2: '='},
            templateUrl: 'views/menuItem.html'
        }

    }
});




