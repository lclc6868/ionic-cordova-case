window.siteurl="http://www.360lzy.com/markethelper/lanyu_sport/";
define([
	'angular',
	'angularAMD',
	'ngCordova',
	'angular-translate',
	'angular-translate-languager',
  'angularCss',
	'ionic',
	'jquery',
	'ocLazyLoad',
	'lazy-image',
	'file-upload',
  'moment',
  'angular-ui-calendar',
  'fullcalendar',
  'gcal',
  'angular-bootstrap',
	//'angularUiRouterExtra',
], function (angular,angularAMD) {
'use strict';
// the app with its used plugins
var app = angular.module('app', [
'ionic', 'ngCordova', 'ngCordova.plugins.ble','door3.css','pascalprecht.translate','oc.lazyLoad','afkl.lazyImage', 'ngFileUpload','ui.calendar','ui.bootstrap'
	//'ionic','pascalprecht.translate','ui.router', 'ngCordova','ngCordova.plugins.ble'
]);

app.config(function($httpProvider) {
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                            + encodeURIComponent(value) + '&';
                }
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        return angular.isObject(data) && String(data) !== '[object File]'
                ? param(data)
                : data;
    }];
});
//全局常量
app.constant('glables',{service: '1', measurement: '2'});
// config
app.config(function($stateProvider, $urlRouterProvider, $translateProvider,$httpProvider){

// default
$urlRouterProvider.otherwise("boot");
$stateProvider
//入口
.state('app', angularAMD.route({
	url: '/app',
	abstract: true,
	templateUrl: 'app/templates/main.html',
	resolve: {
	loadController: ['$q', '$stateParams',
	function ($q, $stateParams)
	{
	    // get the controller name === here as a path to Controller_Name.js
	    // which is set in main.js path {}
	    var load1 = "app/controllers/demo/MainController.js";
        var load2 = "app/common/sha1.js";
	    var deferred = $q.defer();
	    require([load1,load2], function () { deferred.resolve(); });
	    return deferred.promise;
	    }]
	},
	controllerProvider: function ($stateParams)
	{
	    // get the controller name === here as a dynamic controller Name
	   // var controllerName = controllerNameByParams($stateParams);
	    return "MainCtrl";
	}
}))
.state('boot', angularAMD.route({
url: '/boot',
resolve: {
    loadController: ['$q', '$stateParams',
        function ($q, $stateParams)
        {
            // get the controller name === here as a path to Controller_Name.js
            // which is set in main.js path {}
            var load1 = "app/controllers/common/BootController.js";
            var deferred = $q.defer();
            require([load1], function () { deferred.resolve(); });
            return deferred.promise;
        }]
},
controllerProvider: function ($stateParams)
{

    // get the controller name === here as a dynamic controller Name
    // var controllerName = controllerNameByParams($stateParams);
    return "MainCtrl";
    }
}))
  .state('first', angularAMD.route({
  url: '/first',
  templateUrl: 'app/templates/first.html'

  }))
//首页
.state('app.index', angularAMD.route({
	url: '/index',
	views: {
	  'menuContent': {
	  	templateUrl: 'app/templates/oa/IndexList.html',
        controller: 'firstPageCtrl'
	  }
	},
    resolve: {
        loadController: ['$q', '$stateParams',
            function ($q, $stateParams)
            {
                // get the controller name === here as a path to Controller_Name.js
                // which is set in main.js path {}
                var controllerName = "app/controllers/demo/IndexController.js";
                var deferred = $q.defer();
                require([controllerName], function () { deferred.resolve(); });
                return deferred.promise;
            }]
    }
}))
//图表列表
.state('app.chartslist', angularAMD.route({
	url: '/chartslist',
	views: {
	  'menuContent': {
	    templateUrl: 'app/templates/charts/chartslist.html',
		controller: 'ChartslistCtrl'
	  }
	},
	resolve: {
	    loadController: ['$q', '$stateParams',
        function ($q, $stateParams)
        {
            // get the controller name === here as a path to Controller_Name.js
            // which is set in main.js path {}
            var controllerName = "app/controllers/demo/ChartController.js";
            var deferred = $q.defer();
            require([controllerName], function () { deferred.resolve(); });
            return deferred.promise;
        }]
	}
}))
//highchart图
.state('app.highchart',angularAMD.route({
	url: '/highchart/:params:xxx:zzz',
	views: {
	  'menuContent': {
		templateUrl: 'app/templates/charts/highcharts.html',
		controller: 'HighchartChart'
		}
	},
	resolve: {
	    loadController: ['$q', '$stateParams',
	    function ($q, $stateParams)
	    {
	        // get the controller name === here as a path to Controller_Name.js
	        // which is set in main.js path {}
	        var load1 = "lib/highcharts-ng/dist/highcharts-ng.js";
	        var load2 = "lib/highcharts-ng/dist/highstock.js";
	        var load3 = "app/controllers/demo/HighchartController.js";
            var deferred = $q.defer();
            require([load1,load2,load3], function () { deferred.resolve(); });
            return deferred.promise;
		}]
	}
}))
//设备列表
.state('app.devicelist', angularAMD.route({
	url: '/devicelist',
	views: {
	  'menuContent': {
	    templateUrl: 'app/templates/device/devicelist.html'
		//controller: 'DevicelistCtrl'
	   }
	}
}))
//功能列表
.state('app.functionlist', angularAMD.route({
	url: '/functionlist',
	views: {
	  'menuContent': {
	    templateUrl: 'app/templates/function/functionlist.html'
		//controller: 'FunctionlistCtrl'
	   }
	}
}))
//sqlite示例sqlite
.state('app.sqlite', angularAMD.route({
	    url: '/sqlite',
	    views: {
	      'menuContent': {
	        templateUrl: 'app/templates/function/sqlite.html',
			controller: 'SqliteCtrl'
	      }
	    },
		resolve: {
		    loadController: ['$q', '$stateParams',
		    function ($q, $stateParams)
		    {
		        // get the controller name === here as a path to Controller_Name.js
		        // which is set in main.js path {}
		        var load1 = "app/controllers/demo/SqliteController.js";
	            var deferred = $q.defer();
	            require([load1], function () { deferred.resolve(); });
	            return deferred.promise;
		    }]
		}
}))

//新建工作任务
.state('app.newTask', angularAMD.route({
	    url: '/newTask?:userid:username:img:isclear:arr1:arr2:arr3',
	    //cache:'false',
	    views: {
	      'menuContent': {
	        templateUrl: 'app/templates/oa/NewTask.html',
			controller: 'NewTaskCtrl',
          css:'lib/angular-bootstrap/bootstrap.min.css',
	      }
	    },
	    //templateUrl: 'app/templates/oa/NewTask.html',
	    //controller: 'NewTaskCtrl',
	    //路由前执行如下

		resolve: {
            loadController: ['$q','$ocLazyLoad',
		    function ($q,$ocLazyLoad)
		    {

		        var load1 = "app/controllers/oa/NewTaskController.js";
	            var deferred = $q.defer();
	            require([load1], function () {

	            	$ocLazyLoad.load(
						[
	                        {
	                            name: 'css',
	                            //insertBefore: '#xxx',
	                            files: [
                                //'lib/fullcalendar/dist/fullcalendar.css',
                                //'lib/angular-bootstrap/bootstrap.min.css'
	                            ]
	                        },
              {
                name: 'vendors',
                files: [

                ]
              }
            ]
					);
	            	deferred.resolve();
	            });
	            return deferred.promise;
		    }]
		}

}))
//工作交办
.state('app.workTask', angularAMD.route({
	    url: '/workTask',
	    views: {
	      'menuContent': {
	        templateUrl: 'app/templates/oa/WorkTask.html',
			    controller: 'WorkTaskCtrl',

	      }
	    },

	    //templateUrl: 'app/templates/oa/NewTask.html',
	    //controller: 'NewTaskCtrl',
	    //路由前执行如下
		resolve: {
		    loadcss: ['$q','$ocLazyLoad','$ionicLoading',
		    function ($q,$ocLazyLoad,$ionicLoading)
		    {
          $ionicLoading.show({
            //content: 'Loading',
            //animation: 'fade-in',
            //showBackdrop: true,
            //maxWidth: 200,
            //showDelay: 0
            template: 'Loading...'
          });
		        // get the controller name === here as a path to Controller_Name.js
		        // which is set in main.js path {}
				//JS加载交给requirejs管理。ionic框架底层对route进行了绑定，不能oclazyload来加载页面。
				//angularAMD：它的作用把angularjs和requirejs结合在一起。
				//requirejs+angularAMD可以整合ionic框架，所以按需加载都用requestjs。
				//由于不能加载js以外文件，$ocLazyLoad来加载其他。
		        var load1 = "app/controllers/oa/WorkTaskController.js";
		        var load2 = "app/services/WorkTaskService.js";
	            var deferred = $q.defer();
	            require([load1,load2], function () {
                $ionicLoading.hide();
	            	//加载css,requirejs,html等。
	            	$ocLazyLoad.load(
						[
	                        {
	                            name: 'css',
	                            //insertBefore: '#xxx',
	                            files: [
                                'app/controllers/oa/staff.js',
                                //'lib/angular-bootstrap/bootstrap.min.css'
	                                //'lib/angular-lazy-image/lazy-image-style.css',
	                                //'app/controllers/discuss/DsMainController.js'
	                            ]
	                        }
	                    ]
					);
	            	deferred.resolve();
	            });
	            return deferred.promise;
		    }]
		}
}))
//选择一个成员
.state('app.selectPerson', angularAMD.route({
	    url: '/selectPerson?:a',
      cache: false,
	    views: {
	      'menuContent': {
          templateUrl: 'app/templates/oa/SelectPerson.html',
			  controller: 'SelectPersonCtrl'
	      }
	    },
	    //templateUrl: 'app/templates/oa/NewTask.html',
	    //controller: 'NewTaskCtrl',
	    //路由前执行如下

		resolve: {
		    loadcss: ['$q','$ocLazyLoad','$ionicLoading',
		    function ($q,$ocLazyLoad,$ionicLoading)
		    {
          $ionicLoading.show({
            //content: 'Loading',
            //animation: 'fade-in',
            //showBackdrop: true,
            //maxWidth: 200,
            //showDelay: 0
            template: 'Loading...'
          });
		        // get the controller name === here as a path to Controller_Name.js
		        // which is set in main.js path {}
				//JS加载交给requirejs管理。ionic框架底层对route进行了绑定，不能oclazyload来加载页面。
				//angularAMD：它的作用把angularjs和requirejs结合在一起。
				//requirejs+angularAMD可以整合ionic框架，所以按需加载都用requestjs。
				//由于不能加载js以外文件，$ocLazyLoad来加载其他。
		      var load2='app/controllers/oa/staff.js';
		          var load1 = "app/controllers/oa/SelectPersonController.js";

	            var deferred = $q.defer();
	            require([load2,load1], function () {
                $ionicLoading.hide();
	            	//加载css,requirejs,html等。
	            	$ocLazyLoad.load(
						[
	                        {
	                            name: 'css',
	                            //insertBefore: '#xxx',
	                            files: [


                                //'lib/angular-lazy-image/lazy-image-style.css',
	                                //'app/controllers/discuss/DsMainController.js'
	                            ]
	                        }
	                    ]
					);
	            	deferred.resolve();
	            });
	            return deferred.promise;
		    }]
		}

}))
//选择多个成员
.state('app.selectMorePerson', angularAMD.route({
	    url: '/selectMorePerson?:a',
      cache: false,
	    views: {
	      'menuContent': {
	        templateUrl: 'app/templates/oa/SelectMorePerson.html',
			controller: 'SelectMorePersonCtrl'
	      }
	    },
	    //templateUrl: 'app/templates/oa/NewTask.html',
	    //controller: 'NewTaskCtrl',
	    //路由前执行如下

		resolve: {
		    loadcss: ['$q','$ocLazyLoad','$ionicLoading',
		    function ($q,$ocLazyLoad,$ionicLoading)
		    {
          $ionicLoading.show({
            //content: 'Loading',
            //animation: 'fade-in',
            //showBackdrop: true,
            //maxWidth: 200,
            //showDelay: 0
            template: 'Loading...'
          });
		        // get the controller name === here as a path to Controller_Name.js
		        // which is set in main.js path {}
				//JS加载交给requirejs管理。ionic框架底层对route进行了绑定，不能oclazyload来加载页面。
				//angularAMD：它的作用把angularjs和requirejs结合在一起。
				//requirejs+angularAMD可以整合ionic框架，所以按需加载都用requestjs。
				//由于不能加载js以外文件，$ocLazyLoad来加载其他。
          var load2='app/controllers/oa/staff.js';
		        var load1 = "app/controllers/oa/SelectMorePersonController.js";
	            var deferred = $q.defer();
	            require([load2,load1], function () {
                $ionicLoading.hide();

	            	//加载css,requirejs,html等。
	            	$ocLazyLoad.load(
						[
	                        {
	                            name: 'css',
	                            //insertBefore: '#xxx',
	                            files: [
                                'app/controllers/oa/staff.js'

                                //'lib/angular-lazy-image/lazy-image-style.css',
	                                //'app/controllers/discuss/DsMainController.js'
	                            ]
	                        }
	                    ]
					);
	            	deferred.resolve();
	            });
	            return deferred.promise;
		    }]
		}

}))
//圈子
.state('app.discuss', angularAMD.route({
	    url: '/discuss',
	    views: {
	      'menuContent': {
	        templateUrl: 'app/templates/discuss/dsindex.html',
			controller: 'DiscussCtrl'
	      }
	    },
	    //路由前执行如下
		resolve: {
		    loadcss: ['$q','$ocLazyLoad',
		    function ($q,$ocLazyLoad)
		    {
		        // get the controller name === here as a path to Controller_Name.js
		        // which is set in main.js path {}
				//JS加载交给requirejs管理。ionic框架底层对route进行了绑定，不能oclazyload来加载页面。
				//angularAMD：它的作用把angularjs和requirejs结合在一起。
				//requirejs+angularAMD可以整合ionic框架，所以按需加载都用requestjs。
				//由于不能加载js以外文件，$ocLazyLoad来加载其他。
		        var load1 = "app/controllers/discuss/DsMainController.js";
	            var deferred = $q.defer();
	            require([load1], function () {
	            	//加载css,requirejs,html等。
	            	$ocLazyLoad.load(
						[
	                        {
	                            name: 'css',
	                            //insertBefore: '#xxx',
	                            files: [
	                                'lib/angular-lazy-image/lazy-image-style.css'
	                                //'app/controllers/discuss/DsMainController.js'
	                            ]
	                        }
	                    ]
					);
	            	deferred.resolve();
	            });
	            return deferred.promise;



		    }]
		}
}))
//scancode
.state('app.scancode', angularAMD.route({
	    url: '/scancode',
	    views: {
	      'menuContent': {
	        templateUrl: 'app/templates/oa/scancode.html',
			controller: 'ScancodeCtrl'
	      }
	    },
	    //路由前执行如下
		resolve: {
		    loadcss: ['$q','$ocLazyLoad',
		    function ($q,$ocLazyLoad)
		    {
		        // get the controller name === here as a path to Controller_Name.js
		        // which is set in main.js path {}
				//JS加载交给requirejs管理。ionic框架底层对route进行了绑定，不能oclazyload来加载页面。
				//angularAMD：它的作用把angularjs和requirejs结合在一起。
				//requirejs+angularAMD可以整合ionic框架，所以按需加载都用requestjs。
				//由于不能加载js以外文件，$ocLazyLoad来加载其他。
		        var load1 = "app/controllers/oa/ScancodeController.js";
	            var deferred = $q.defer();
	            require([load1], function () {
	            	//加载css,requirejs,html等。
	            	$ocLazyLoad.load(
						[
	                        {
	                            name: 'css',
	                            //insertBefore: '#xxx',
	                            files: [
	                                'lib/angular-lazy-image/lazy-image-style.css'
	                                //'app/controllers/discuss/DsMainController.js'
	                            ]
	                        }
	                    ]
					);
	            	deferred.resolve();
	            });
	            return deferred.promise;



		    }]
		}
}))
//选择语言
.state('app.languageSet', angularAMD.route({
	url: '/languageSet',
	views: {
	  'menuContent': {
		templateUrl: 'app/templates/function/language-setting.html',
		controller: 'LanguageCtrl'
	  }
	},
	resolve: {
	    loadController: ['$q', '$stateParams',
	    function ($q, $stateParams)
	    {
	        // get the controller name === here as a path to Controller_Name.js
	        // which is set in main.js path {}
	        var load1 = "app/controllers/demo/FunctionController.js";
            var deferred = $q.defer();
            require([load1], function () { deferred.resolve(); });
            return deferred.promise;
	    }]
	}
}));
//国际化配置
	$translateProvider.useSanitizeValueStrategy('escaped');
	$translateProvider.translations('en', translationsEN);
	$translateProvider.translations('zh', translationZH);
	//$translateProvider.preferredLanguage('en');
	//$translateProvider.fallbackLanguage('en');
	$translateProvider.determinePreferredLanguage();//这个方法是获取手机默认语言设置
	$translateProvider.registerAvailableLanguageKeys(['en','zh'],{
	'en-*':'en',
	'zh-*':'zh'
	});
});
app.run(function($ionicPlatform, $ionicPopup,$rootScope, $location,$timeout, $ionicHistory) {
	function showConfirm() {
    var confirmPopup = $ionicPopup.confirm({
        title: '<strong>退出应用?</strong>',
        template: '你确定要退出应用吗?',
        okText: '退出',
        cancelText: '取消'
    });
    confirmPopup.then(function (res) {
        if (res) {
            ionic.Platform.exitApp();
        } else {
            // Don't close
        }
    });
  	}
	//注意：$cordovaToast是消息提示框，若要使用需要安装才支持。命令cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
	$ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }



	});
	//双击退出
	$ionicPlatform.registerBackButtonAction(function (e) {
		e.preventDefault();
	    //判断处于哪个页面时退出
	  	//if($location.path()=='/app/index'){
	  	showConfirm();
	  	//}else
	  	//if($rootScope.$viewHistory.backView){
		//	$rootScope.$viewHistory.backView.go();
	  	//}else{
	  	//	showConfirm();
	  	//}
	    return false;
	}, 101);
  });
  return  angularAMD.bootstrap(app);     //replace angular.bootstrap(document, ['app']);

});
