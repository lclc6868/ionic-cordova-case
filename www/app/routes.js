define([
  'app',
  // Load Controllers here
  //'controllers/dashboard',
  'controllers/frameworkcontroller',
  'controllers/chartscontroller',
  'controllers/functioncontroller',
  'controllers/devicecontroller'
], function (app) {
  'use strict';
  // definition of routes
  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$translateProvider',
    function ($stateProvider, $urlRouterProvider,$translateProvider) {
      // url routes/states
      $urlRouterProvider.otherwise('/app/index');
			//加载各个视图文件
      $stateProvider
        // app states
	    .state('dashboard', {
	      url: '/dashboard',
	      templateUrl: 'app/templates/dashboard.html',
	      controller: 'DashboardCtrl'
	    })
	    //app入口
		  .state('app', {
		    url: '/app',
		    abstract: true,
		    templateUrl: 'app/templates/main.html',
				controller: 'HomeCtrl',


		  })
			  //首页
		  .state('app.index', {
		    url: '/index',
		    views: {
		      'menuContent': {
		        templateUrl: 'app/templates/firstindex.html',

		      }
		    }
		  })
		  //图表列表
		  .state('app.chartslist', {
		    url: '/chartslist',
		    views: {
		      'menuContent': {
		        templateUrl: 'app/templates/charts/chartslist.html',
						controller: 'ChartslistCtrl'
		      }
		    }
		  })
		  //设备列表
		  .state('app.devicelist', {
		    url: '/devicelist',
		    views: {
		      'menuContent': {
		        templateUrl: 'app/templates/device/devicelist.html',
						controller: 'DevicelistCtrl'
		      }
		    }
		  })
		  //功能列表
		  .state('app.functionlist', {
		    url: '/functionlist',
		    views: {
		      'menuContent': {
		        templateUrl: 'app/templates/function/functionlist.html',
						controller: 'FunctionlistCtrl'
		      }
		    }
		  })
		  //highcharts
		  .state('app.highcharts', {
		    url: '/highcharts',
		    views: {
		      'menuContent': {
		        templateUrl: 'app/templates/charts/highcharts.html',
						//controller: 'FunctionlistCtrl'
						/*
						resolve: {
				            EChartCtrl: function($ocLazyLoad){

				                return $ocLazyLoad.load(
				                    {
				                        name: "starter.function.chartscontroller",
				                        files: [
					"lib/highcharts-ng/dist/highcharts-ng.js",
			  	"lib/highcharts-ng/dist/highstock.js"
				                        ]
				                    }
				                )
				            }
				    	}
				    	*/
		      }
		    }
		  })
		  //echarts
		  .state('app.echarts', {
		    url: '/echarts',
		    views: {
		      'menuContent': {
		        templateUrl: 'app/templates/charts/echarts.html',
						controller: 'EChartCtrl',
				/**
				resolve: {
				    data: function ($http) {
				        return $http.get('ticket.action?method=projectTickets').then(function (data) {
				            return data;
				        }, function () {
				            return {};
				        });
				    }
				}
				**/
		    //路由懒加载,进入该路由后，执行如下完成后加载页面。所以下面加载的文件可以执行，可以加载一些CSS和Js文件。
		    /*
				resolve: {
		            EChartCtrl: function($ocLazyLoad){

		                return $ocLazyLoad.load(
		                    {
		                        name: "starter.function.chartscontroller",
		                        files: [
		                        		"lib/iu-echarts/example/libs/echarts.min.js",
										"lib/iu-echarts/src/iuChart.js"
		                        ]
		                    }
		                )
		            }
		    	}
*/
		      }
		    }
		  })
		  .state('app.languageSettings', {
			        url: '/languageSet',
			        views: {
			            'menuContent': {
			                templateUrl: 'app/templates/function/language-setting.html',
			                controller: 'LanguageCtrl'
			            }
			        }
			});
			//国际化配置
			$translateProvider.translations('en', translationsEN);
			$translateProvider.translations('zh', translationZH);
			//$translateProvider.preferredLanguage('en');
			//$translateProvider.fallbackLanguage('en');
			$translateProvider.determinePreferredLanguage();//这个方法是获取手机默认语言设置
			$translateProvider.registerAvailableLanguageKeys(['en','zh'],{
				'en-*':'en',
				'zh-*':'zh'
			}
			);
    }
  ]);
});