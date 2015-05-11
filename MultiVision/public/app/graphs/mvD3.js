//angular.module('app', []).factory('mvD3', ['$document', '$window', '$q', '$rootScope',
//  function($document, $window, $q, $rootScope) {



  // alert($window.d3);

  //   var d = $q.defer(),
  //       mvD3 = {
  //         d3: function() { return d.promise; }
  //       };

  // function onScriptLoad() {
  //   // Load client in the browser
  //   $rootScope.$apply(function() { d.resolve($window.d3); });
  // }

  // var scriptTag = $document[0].createElement('script');
  // scriptTag.type = 'text/javascript'; 
  // scriptTag.async = true;
  // scriptTag.src = 'http://d3js.org/d3.v3.min.js';

  // scriptTag.onreadystatechange = function () {
  // 	console.log('onreadystatechange');

  //   if (this.readyState == 'complete') {
  //   	onScriptLoad();

  //   	console.log('onScriptLoad');
  //   }
  // }

  // scriptTag.onload = onScriptLoad;
 
  // var s = $document[0].getElementsByTagName('body')[0];
  // s.appendChild(scriptTag);
 
//  return mvD3;

//}]);