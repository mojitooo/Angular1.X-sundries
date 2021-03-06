/***
 Metronic AngularJS App Main Script
 ***/

/* Metronic App */

var MetronicApp = angular.module("MetronicApp", [
    "oc.lazyLoad",
    "ui.router",
    "ui.bootstrap",
    "ngSanitize",
    'ui.grid',
    'ui.grid.selection',
    'ui.grid.autoResize',
    'ui.grid.pagination',
    'ui.grid.resizeColumns',
    'ngJsTree',
    'selectize',
    "ngSelect2",
    "ngMaterial",
    "ngMessages",
    "ngAnimate",
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

MetronicApp.filter('totwo',function(){
    return function(inputArray){
        if(inputArray){
            return inputArray.toFixed(2);
        }
    }
});

MetronicApp.filter('percent',function(){
    return function(inputArray){
        if(inputArray){
            return  Math.round(inputArray * 100) / 100 *100;
        }
    }
});



MetronicApp.filter('toint',function(){
    return function(inputArray){
        if(inputArray){
            return parseInt(inputArray);
        }
    }
});

MetronicApp.filter('tozero',function(){
    return function(inputArray){
        if(inputArray){
            return inputArray.toFixed(0);
        }
    }
});

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
 *********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000, // auto scroll to top on page load
            pageSidebarMenuHover:true
        },
        assetsPath: '../assets',
        globalPath: '../assets/global',
        layoutPath: '../assets/layouts/layout',
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        //App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
    });
}]);

/***
 Layout Partials.
 By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial
 initialization can be disabled and Layout.init() should be called on page load complete as explained above.
 ***/

MetronicApp.controller('d2dHeaderController', ['$location','$rootScope','$state','$scope','$http', function($location,$rootScope,$state,$scope,$http) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
        Layout.initSidebar($state); // init sidebar
    });
    $scope.loginName = Cookies("loginUser");
    $scope.loginPhoto = Cookies("loginPhoto");
    if($scope.loginPhoto=="null"){
        $scope.loginPhoto = '../assets/layouts/layout/img/avatar.png';
    }
    if($scope.loginName=="null"){
        $scope.loginName = ' ';
    }
    $rootScope.pathUrl = $location.path();
    $scope.loginOut = function () {
        $http.get("/logout").success(function (data) {
            Cookies("loginUser", "", { expires: -1 });
            Cookies("loginPhoto", "", { expires: -1 });
            window.location.href="#/wholesale/goods";
            window.location.reload();
        })
    }

    $http.get("/d2d/cart/list").success(function (data) {
        $rootScope.cartTotal = data.total;
    })

    $scope.toPage = function (index) {
        if(index==1){
            window.location.href="#/wholesale/goods"
        }else if(index==2){
            msgAlert.tips('暂未开发');
            return false;
        }else if(index == 3){
            window.location.href="#/wholesale/shopcart"
        }else if(index == 4){
            window.location.href="#/wholesale/order"
        }
    }

}]);

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope','$http', function($scope,$http) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
    $scope.loginName = Cookies("loginUser");
    $scope.loginPhoto = Cookies("loginPhoto");
    if($scope.loginPhoto=="null"){
        $scope.loginPhoto = '../assets/layouts/layout/img/avatar.png';
    }
    if($scope.loginName=="null"){
        $scope.loginName = ' ';
    }
    console.log($scope.loginPhoto)
    $scope.loginOut = function () {
        $http.get("/logout").success(function (data) {
            window.location.href="/login"
        })
    }

}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$state', '$scope','$http', function($state, $scope,$http) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar($state); // init sidebar
    });
    $http.get("/sys/resource/menu/0").success(function (data) {
        $scope.menu = data.data
    })



    var body = $('body');
    body.addClass("right-sidebar-close");
    body.removeClass("right-sidebar-open");

    $scope.toPage = function(url){
        $('.left-toggle-btn').hide();
        var url = url.split('.');
        $scope.extraBarMenu = [];
        var body = $('body');
        body.addClass("right-sidebar-close");
        body.removeClass("right-sidebar-open");
        window.location.href="#/"+url.join('/');
    }

    $scope.extraBar = function(id){
        $scope.extraBarMenu = [];
        $http.get("/sys/resource/menu/"+id).success(function (data) {
            $scope.extraBarMenu = data.data;
            $scope.extraBarTitle = data.name;
            if($scope.extraBarMenu.length>0){
                var body = $('body');
                body.addClass("right-sidebar-open");
                body.removeClass("right-sidebar-close");
                $('.left-toggle-btn').hide()
            }
        })
    }

    $scope.toindex = function(){
        $scope.extraBarMenu = [];
        console.log($scope.extraBarMenu.length)
        var body = $('body');
        body.addClass("right-sidebar-close");
        body.removeClass("right-sidebar-open");
        window.location.href="#/dashboard";
    }

    $scope.moveToLeft = function(){
        var body = $('body');
        body.addClass("right-sidebar-close");
        body.removeClass("right-sidebar-open");
        $('.left-toggle-btn').show()
    }

    $scope.moveToRight = function(){
        var body = $('body');
        body.addClass("right-sidebar-open");
        body.removeClass("right-sidebar-close");
        $('.left-toggle-btn').hide()
    }
}]);

/* Setup Layout Part - Quick Sidebar */
MetronicApp.controller('QuickSidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        setTimeout(function(){
            // QuickSidebar.init(); // init quick sidebar
            //初始化右侧栏的方法
        }, 2000)
    });
}]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

MetronicApp.run(function ($rootScope,$state,$stateParams,settings) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$settings = settings; // state to be accessed from view
})
.config(['$stateProvider', '$urlRouterProvider','$httpProvider', function ($stateProvider,   $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('httpInterceptor');
    //跳转错误返回首页
    $urlRouterProvider.otherwise('/dashboard');

    $httpProvider.defaults.withCredentials = true;

}])
.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('light-blue')
        .accentPalette('orange');
})
.factory('httpInterceptor', [ '$q', '$injector',function($q, $injector) {
    var httpInterceptor = {
        'responseError' : function(response) {
            if (response.status == 401) {
                window.location.href="/login";
                return $q.reject(response);
            } else if (response.status == 404) {
                return $q.reject(response);
            }else if (response.status == 406)
            {
                alert("NO PERMISSION!");
                return $q.reject(response);
            }else if (response.status == 400)
            {
                alert("请求错误!");
                return $q.reject(response);
            }

        },
        'response' : function(response) {
            return response;
        }
    }
    return httpInterceptor;
}
]);
