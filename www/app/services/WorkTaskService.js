define([
  'app'
], function (app) {
  'use strict';

  app.factory('WorkTaskService', function ($http) {

     return {
    	 worktasklist:function(len){

    		 return $http({
 			   url:window.siteurl+'sms/QueryWorkTask',
 			   method:"POST",
 			   headers: {
 					'Content-Type': 'application/x-www-form-urlencoded'
 			   },
 			   data: {
 			   	rowstart:len,
 			   	rowcounts:9
 			   	
 	           // map: params,
 	            //test: 'test_lwp'
 			   }
 			}).success(function(data){
 				//items=data.data;
 				//return items;
 	        }).error(function(error){
 				alert(error);
 	        }).finally(function() {
 	           //$scope.$broadcast('scroll.refreshComplete');
 	        });	
    		 
    		 
    	 }
    	 
     
     
     
     
     }


   
    	
    });
});
