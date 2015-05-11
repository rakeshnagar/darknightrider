// 'use strict';

require.config({
	paths: {
		"d3": "../vendor/d3/d3",
		"crossfilter": "../vendor/crossfilter/crossfilter.min",
		"d3.geo.projection": "http://d3js.org/d3.geo.projection.v0.min",
		"crossfilter.geo.projection": "http://localhost:3030/vendor/crossfilter/crossfilter.min",
		// "../vendor/crossfilter/crossfilter.min",
		// "https://raw.githubusercontent.com/square/crossfilter/master/crossfilter.min",		
    	"topojson": "http://d3js.org/topojson.v1.min"
  },
  shim: {
    "d3.geo.projection": ["d3.global"],
    "crossfilter.geo.projection": ["crossfilter.global"]
  }

});

// define("d3", function(_) {
// 	d3 = _;
// });

// require(["d3"], function(d3) {
//   console.log(d3);
// });


define("d3.global", ["d3"], function(_) {
	console.log("define.d3 >> " + _);
  	window.d3 = _;
});

define("crossfilter.global", ["crossfilter"], function(_) {
	console.log("define.crossfilter >> " + _);
  	window.crossfilter = _;
});

require(["d3", "topojson", "d3.geo.projection"], function(d3, topojson) {
	console.log("require.d3 >> " + d3);
});

require(["crossfilter", "topojson", "crossfilter.geo.projection"], function(crossfilter, topojson) {	
	console.log("require.crossfilter >> " + crossfilter);
});