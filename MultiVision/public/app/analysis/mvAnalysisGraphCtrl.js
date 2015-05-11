//http://bjorn.tipling.com/maps-sets-and-iterators-in-javascript
// Chart Examples
//http://dc-js.github.io/dc.js/examples/cust.html
//http://frozen-hollows-5121.herokuapp.com/
//http://www.jasondavies.com/coffee-wheel/
// https://live.zoomdata.com/zoomdata/visualization#
// http://bl.ocks.org/kerryrodden/477c1bfb081b783f80ad

//var d3 = require("d3");
// http://beletsky.net/2013/11/using-angular-dot-js-with-require-dot-js.html


//http://codepen.io/sravikiran/pen/wFEvH
//http://www.ng-newsletter.com/posts/d3-on-angular.html

//best
// https://github.com/TomNeyland/angular-dc/blob/master/example/stocks/nasdaq.html
// http://dc-js.github.io/dc.js/examples/cust.html
// http://krispo.github.io/angular-nvd3/#/quickstart
// Ideas --> 
  // https://citizennet.com/quicksight.html
  // http://christopheviau.com/d3list/
  // http://codepen.io/xna2/pen/Dmqso
  // https://vox.sapient.com/resources/statics/236450/gmTechnology.html#/technology-radar/radar
// DC --> https://github.com/dc-js/dc.js
// Sequences sunburst --> 
    // http://bl.ocks.org/kerryrodden/7090426
    // http://jsfiddle.net/Karimjaafreh/2egqvct2/
    // http://jsfiddle.net/zbZ3S/
    // http://mlvl.github.io/Hierarchie/#/

angular.module('app').controller("mvAnalysisGraphCtrl", ["$scope", function($scope) {
  $scope.salesData = [
    {hour: 1,sales: 54},
    {hour: 2,sales: 66},
    {hour: 3,sales: 77},
    {hour: 4,sales: 70},
    {hour: 5,sales: 60},
    {hour: 6,sales: 63},
    {hour: 7,sales: 55},
    {hour: 8,sales: 47},
    {hour: 9,sales: 55},
    {hour: 10,sales: 30}
  ];

    $scope.greeting = "Resize the page to see the re-rendering";
    $scope.data = [
      {name: "Greg", score: 98},
      {name: "Ari", score: 96},
      {name: 'Q', score: 75},
      {name: "Loser", score: 48}
    ];



// http://codepen.io/nickmoreton/pen/ZYbvZO
// Simple AngularJS Graph
        // Data     
        $scope.xAxis = 'Sales';    
        $scope.yAxis = '2014';

        $scope.points = [
          {
          label: 'January',
          yValue: 1,
          xValue: 36
          },
          {
          label: 'February',
          yValue: 2,
          xValue: 54
          },
          {
          label: 'March',
          yValue: 3,
          xValue: 62
          },
          {
          label: 'April',
          yValue: 4,
          xValue: 82
          },
          {
          label: 'May',
          yValue: 5,
          xValue: 96
          },
          {
          label: 'June',
          yValue: 6,
          xValue: 104
          },
          {
          label: 'July',
          yValue: 7,
          xValue: 122
          },
          {
          label: 'August',
          yValue: 8,
          xValue: 152
          },
          {
          label: 'September',
          yValue: 9,
          xValue: 176
          },
          {
          label: 'October',
          yValue: 10,
          xValue: 180
          },
          {
          label: 'November',
          yValue: 11,
          xValue: 252
          },
          {
          label: 'December',
          yValue: 12,
          xValue: 342
          }
        ];
        
        // Find Maximum X & Y Axis Values - this is used to position the points as a percentage of the maximum
        $scope.maxX = 0;
        $scope.maxY = 0;
        
        var arrLength = $scope.points.length;
        for (var i = 0; i < arrLength; i++) {
            // Find Maximum X Axis Value
            if ($scope.points[i].xValue > $scope.maxX)
            $scope.maxX = $scope.points[i].xValue;
            // Find Maximum Y Axis Value
            if ($scope.points[i].yValue > $scope.maxY)
            $scope.maxY = $scope.points[i].yValue;
        }


}]);

angular.module('app').directive('linearChart', function($window){
   return{
        restrict:'EA',
        template:"<svg width='850' height='200'></svg>",
        link: function(scope, elem, attrs){
        // alert('in linearChart');
           var salesDataToPlot=scope[attrs.chartData];
           var padding = 20;
           var pathClass="path";
           var xScale, yScale, xAxisGen, yAxisGen, lineFun;

           var d3 = $window.d3;
           var rawSvg=elem.find('svg');
           var svg = d3.select(rawSvg[0]);

           function setChartParameters(){

               xScale = d3.scale.linear()
                   .domain([salesDataToPlot[0].hour, salesDataToPlot[salesDataToPlot.length-1].hour])
                   .range([padding + 5, rawSvg.attr("width") - padding]);

               yScale = d3.scale.linear()
                   .domain([0, d3.max(salesDataToPlot, function (d) {
                       return d.sales;
                   })])
                   .range([rawSvg.attr("height") - padding, 0]);

               xAxisGen = d3.svg.axis()
                   .scale(xScale)
                   .orient("bottom")
                   .ticks(salesDataToPlot.length - 1);

               yAxisGen = d3.svg.axis()
                   .scale(yScale)
                   .orient("left")
                   .ticks(5);

               lineFun = d3.svg.line()
                   .x(function (d) {
                       return xScale(d.hour);
                   })
                   .y(function (d) {
                       return yScale(d.sales);
                   })
                   .interpolate("basis");
           }
         
            function drawLineChart() {

               setChartParameters();

               svg.append("svg:g")
                   .attr("class", "x axis")
                   .attr("transform", "translate(0,180)")
                   .call(xAxisGen);

               svg.append("svg:g")
                   .attr("class", "y axis")
                   .attr("transform", "translate(20,0)")
                   .call(yAxisGen);

               svg.append("svg:path")
                   .attr({
                       d: lineFun(salesDataToPlot),
                       "stroke": "blue",
                       "stroke-width": 2,
                       "fill": "none",
                       "class": pathClass
                   });
           }

           drawLineChart();
       }
   };
});


angular.module('app').directive('d3Bars', function($window, $timeout) {
    return {
      restrict: 'EA',
      // template:"<svg width='850' height='200'></svg>",
      scope: {
        data: '=',
        label: '@',
        onClick: '&'
      },
      link: function(scope, ele, attrs) {
        // alert('in bars');
        var d3 = $window.d3;
        // $window.d3.then(function($window.d3) {
 
          var renderTimeout;
          var margin = parseInt(attrs.margin) || 20,
              barHeight = parseInt(attrs.barHeight) || 20,
              barPadding = parseInt(attrs.barPadding) || 5;
 
          var svg = d3.select(ele[0])
            .append('svg')
            .style('width', '100%');
 
          $window.onresize = function() {
            scope.$apply();
          };
 
          scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });
 
          scope.$watch('data', function(newData) {
            scope.render(newData);
          }, true);
 
          scope.render = function(data) {
            // alert('dfddfdfdfdf');
            svg.selectAll('*').remove();
 
            if (!data) return;
            if (renderTimeout) clearTimeout(renderTimeout);
 
            renderTimeout = $timeout(function() {
              var width = d3.select(ele[0])[0][0].offsetWidth - margin,
                  height = scope.data.length * (barHeight + barPadding),
                  color = d3.scale.category20(),
                  xScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) {
                      return d.score;
                    })])
                    .range([0, width]);
 
              svg.attr('height', height);
 
              svg.selectAll('rect')
                .data(data)
                .enter()
                  .append('rect')
                  .on('click', function(d,i) {
                    return scope.onClick({item: d});
                  })
                  .attr('height', barHeight)
                  .attr('width', 140)
                  .attr('x', Math.round(margin/2))
                  .attr('y', function(d,i) {
                    return i * (barHeight + barPadding);
                  })
                  .attr('fill', function(d) {
                    return color(d.score);
                  })
                  .transition()
                    .duration(1000)
                    .attr('width', function(d) {
                      return xScale(d.score);
                    });
              svg.selectAll('text')
                .data(data)
                .enter()
                  .append('text')
                  .attr('fill', '#fff')
                  .attr('y', function(d,i) {
                    return i * (barHeight + barPadding) + 15;
                  })
                  .attr('x', 15)
                  .text(function(d) {
                    return d.name + " (scored: " + d.score + ")";
                  });
            }, 200);
          };
        // });
      }}
});


// http://codepen.io/danielemoraschi/pen/qFmol
angular.module('app').directive('bars', function ($parse) {
      return {
         restrict: 'E',
         replace: true,
         template: '<div id="chart1"></div>',
         link: function (scope, element, attrs) {
           var data = attrs.data.split(','),
           chart = d3.select('#chart1')
             .append("div").attr("class", "chart")
             .selectAll('div')
             .data(data).enter()
             .append("div")
             .transition().ease("elastic")
             .style("width", function(d) { return d + "%"; })
             .text(function(d) { return d + "%"; });
         } 
      };
   });


//self invoking function
// $(function(){
//   InitChart(window.d3);
// });

// function InitChart(d3) {}

//http://codepen.io/MartynC/pen/viDBC
angular.module('app').directive('chart2', function ($parse) {
      return {
         restrict: 'E',
         replace: true,
         template: '<div id="chart2"></div>',
         link: function (scope, element, attrs) {

               var bardata = [];
               //var d3 = window.d3;
               console.log(d3);

              for (var i=0; i < 50; i++) {
                  bardata.push(Math.round(Math.random()*100)+10)
              }

              /*
              bardata.sort(function compareNumbers(a,b) {
                  return a -b;
              });
              */
              var margin = { top: 30, right: 30, bottom: 40, left:50 }

              var height = 400 - margin.top - margin.bottom,
                  width = 600 - margin.left - margin.right,
                  barWidth = 50,
                  barOffset = 5;

              var tempColor;

              var colors = d3.scale.linear()
              .domain([0, bardata.length*.33, bardata.length*.66, bardata.length])
              .range(['#B58929','#C61C6F', '#268BD2', '#85992C'])

              var yScale = d3.scale.linear()
                      .domain([0, d3.max(bardata)])
                      .range([0, height]);

              var xScale = d3.scale.ordinal()
                      .domain(d3.range(0, bardata.length))
                      .rangeBands([0, width], 0.2)

              var tooltip = d3.select('body').append('div')
                      .style('position', 'absolute')
                      .style('padding', '0 10px')
                      .style('background', 'white')
                      .style('opacity', 0)
                  .style('font-size', '0.7em')
                  .style('box-shadow', '3px 5px 8px #888888')

              var myChart = d3.select('#chart2').append('svg')
                  .style('background', '#E7E0CB')
                  .attr('width', width + margin.left + margin.right)
                  .attr('height', height + margin.top + margin.bottom)
                  .append('g')
                  .attr('transform', 'translate('+ margin.left +', '+ margin.top +')')
                  .selectAll('rect').data(bardata)
                  .enter().append('rect')
                      .style('fill', function(d,i) {
                          return colors(i);
                      })
                      .attr('width', xScale.rangeBand())
                      .attr('x', function(d,i) {
                          return xScale(i);
                      })
                      .attr('height', 0)
                      .attr('y', height)

                  .on('mouseover', function(d) {

                      tooltip.transition()
                          .style('opacity', .9)

                      tooltip.html(d)
                          .style('left', (d3.event.pageX - 35) + 'px')
                          .style('top',  (d3.event.pageY - 30) + 'px')


                      tempColor = this.style.fill;
                      d3.select(this)
                          .style('opacity', .5)
                          .style('fill', 'yellow')
                  })

                  .on('mouseout', function(d) {

                      tooltip.transition()
                          .style('opacity', 0)  // added by MWC to make tooltip disappear on mouseout

                      d3.select(this)
                          .style('opacity', 1)
                          .style('fill', tempColor)
                  })

              myChart.transition()
                  .attr('height', function(d) {
                      return yScale(d);
                  })
                  .attr('y', function(d) {
                      return height - yScale(d);
                  })
                  .delay(function(d, i) {
                      return i * 20;
                  })
                  .duration(1000)
                  .ease('elastic')

              var vGuideScale = d3.scale.linear()
                  .domain([0, d3.max(bardata)])
                  .range([height, 0])

              var vAxis = d3.svg.axis()
                  .scale(vGuideScale)
                  .orient('left')
                  .ticks(10)

              var vGuide = d3.select('#chart2').select('svg').append('g')//d3.select('svg').append('g')
                  vAxis(vGuide)
                  vGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
                  vGuide.selectAll('path')
                      .style({ fill: 'none', stroke: "#000"})
                  vGuide.selectAll('line')
                      .style({ stroke: "#000"})

              var hAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient('bottom')
                  .tickValues(xScale.domain().filter(function(d, i) {
                      return !(i % (bardata.length/5));
                  }))

              var hGuide = d3.select('#chart2').select('svg').append('g')//d3.select('svg').append('g')
                  hAxis(hGuide)
                  hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
                  hGuide.selectAll('path')
                      .style({ fill: 'none', stroke: "#000"})
                  hGuide.selectAll('line')
                      .style({ stroke: "#000"})          
         } 
      }      
   });



//***** template **** /
// angular.module('app').directive('chart2', function ($parse) {
//       return {
//          restrict: 'E',
//          replace: true,
//          template: '<div id="chart2"></div>',
//          link: function (scope, element, attrs) {
//       }      
//     }
//    });

// http://codepen.io/Siddharth11/pen/YPMWeE
angular.module('app').directive('chart3', function ($parse) {
      return {
         restrict: 'E',
         replace: true,
         template: '<div id="chart3"></div>',
         link: function (scope, element, attrs) {
         
         
         var w = 800,
      h = 400,
      padding = 25;
   
   var dataset = [
      [10, 10],
      [20, 50],
      [30, 40],
      [40, 80],
      [50, 90],
      [60, 50],
      [70, 70],
      [80, 60],
      [90, 10],
      [100, 50],
      [110, 40],
      [120, 70],
      [130, 20],
      [140, 40],
      [150, 30]
   ];
   
   /*create svg element*/
   var svg = d3.select('#chart3')
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .attr('id', 'chart3svg');
   

      /*define line*/
   var lines = d3.svg.line()
      .x(function(d) {
          return xScale(d[0])
      })
      .y(function(d) {
          return yScale(d[1])
      })
      .interpolate('monotone');
   
   var dragstarted = function () {
    // alert(d3);
    // alert(d3.event);
      d3.event.sourceEvent.stopPropagation();
      d3.select(this).classed("dragging datapoint", true);
   }

   
   var dragged = function () {
    // alert(d3.event);
      d3.select(this)
          .attr({
              'cx': Math.max(padding, Math.min(d3.event.x, w - padding)),
              'cy': Math.max(padding, Math.min(d3.event.y, h - padding))
          });
   }
   
   var dragended = function () {
    // alert(d3.event);
    // alert('eded');
    // alert(d3.select(this));
      d3.select(this).classed("chart3_datapoint", true);
      // get id of dragged point    
      var id = d3.select(this).attr('id'),
          // get new absolute position coordinates of the point         
          xPos = d3.select(this).attr('cx'),
          yPos = h - d3.select(this).attr('cy');
   
      // convert absolute position coordinates relative to scales
      xPos = (xPos - padding) * (xMax / (w - (padding * 2)));
      yPos = (yPos - padding) * (yMax / (h - (padding * 2)));
      dataset[id][0] = xPos;
      dataset[id][1] = yPos;
      // alert(xPos);
      // alert(yPos);
   // alert(svg.select('.lineChart'));
      // update line
      svg.select('.chart3_lineChart')
          .transition()
          .duration(500)
          .attr('d', lines(dataset));
   }
   
   var drag = d3.behavior.drag()
      .on("dragstart", dragstarted)
      .on("drag", dragged)
      .on("dragend", dragended);
   
   /*x scale*/
   var xScale = d3.scale.linear()
      .domain([0, d3.max(dataset, function(d) {
          return d[0];
      })])
      .range([padding, w - padding]);
   
   /*y scale*/
   var yScale = d3.scale.linear()
      .domain([0, d3.max(dataset, function(d) {
          return d[1];
      })])
      .range([h - padding, padding]);
   
   /*x axis*/
   var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom');
   
   /*append x axis*/
   svg.append('g')
      .attr({
          'class': 'xaxis',
          'transform': 'translate(0,' + (h - padding) + ')'
      })
      .call(xAxis);
   
   /*y axis*/
   var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left');
   
   /*append y axis*/
   svg.append('g')
      .attr({
          'class': 'yaxis',
          'transform': 'translate(' + padding + ',0)'
      })
      .call(yAxis);
   
   /*append line*/
   var path = svg.append('path')
      .attr({
          'd': lines(dataset),
          'class': 'chart3_lineChart'
      });
   
   svg.select('.chart3_lineChart')
      .style('opacity', 0)
      .transition()
      .duration(2500)
      .delay(1000)
      .style('opacity', 1);
   
   /*add points*/
   var points = svg.selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .call(drag);
   
   /*point attributes*/
   points.attr('cy', 0)
      .transition()
      .duration(1500)
      .delay(function(d, i) {
          return (i * 100) + 500;
      })
      .ease('elastic')
      .attr({
          'cx': function(d) {
              return xScale(d[0]);
          },
          'cy': function(d) {
              return yScale(d[1]);
          },
          'r': 7,
          'class': 'datapoint',
          'id': function(d, i) {
              return i;
          }
      })
      .style('opacity', 1);
   
   var xMax = d3.max(dataset, function(d) {
          return d[0];
      }),
      yMax = d3.max(dataset, function(d) {
          return d[1];
      });           
      }      
    }
   });

// http://codepen.io/paulbhartzog/pen/Enhsw
angular.module('app').directive('sunburst', function ($parse) {
      return {
         restrict: 'E',
         replace: true,      
          link: function (scope, element, attrs) {

          // Dimensions of sunburst.
          var width = 750;
          var height = 600;
          var radius = Math.min(width, height) / 2;

          // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
          var b = {
            w: 75, h: 30, s: 3, t: 10
          };

          // Mapping of step names to colors.
          var colors = {
            "home": "#5687d1",
            "product": "#7b615c",
            "search": "#de783b",
            "account": "#6ab975",
            "other": "#a173d1",
            "end": "#bbbbbb"
          };

          // Total size of all segments; we set this later, after loading the data.
          var totalSize = 0; 

          var vis = d3.select("#sunburst_chart").append("svg:svg")
              .attr("width", width)
              .attr("height", height)
              .append("svg:g")
              .attr("id", "container")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

          var partition = d3.layout.partition()
              .size([2 * Math.PI, radius * radius])
              .value(function(d) { return d.size; });

          var arc = d3.svg.arc()
              .startAngle(function(d) { return d.x; })
              .endAngle(function(d) { return d.x + d.dx; })
              .innerRadius(function(d) { return Math.sqrt(d.y); })
              .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

          var renderingServices = {
          createVisualization: function (json) {
            // Main function to draw and set up the visualization, once we have the data.
            // Basic setup of page elements.
            renderingServices.initializeBreadcrumbTrail();
            renderingServices.drawLegend();
            d3.select("#togglelegend").on("click", renderingServices.toggleLegend);

            // Bounding circle underneath the sunburst, to make it easier to detect
            // when the mouse leaves the parent g.
            vis.append("svg:circle")
                .attr("r", radius)
                .style("opacity", 0);

            // For efficiency, filter nodes to keep only those large enough to see.
            var nodes = partition.nodes(json)
                .filter(function(d) {
                return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
                });

            var path = vis.data([json]).selectAll("path")
                .data(nodes)
                .enter().append("svg:path")
                .attr("display", function(d) { return d.depth ? null : "none"; })
                .attr("d", arc)
                .attr("fill-rule", "evenodd")
                .style("fill", function(d) { return colors[d.name]; })
                .style("opacity", 1)
                .on("mouseover", renderingServices.mouseover);

            // Add the mouseleave handler to the bounding circle.
            d3.select("#container").on("mouseleave", renderingServices.mouseleave);

            // Get total size of the tree = value of root node from partition.
            totalSize = path.node().__data__.value;
           },
          mouseover:  function (d) {
          // Fade all but the current sequence, and show it in the breadcrumb trail.
            var percentage = (100 * d.value / totalSize).toPrecision(3);
            var percentageString = percentage + "%";
            if (percentage < 0.1) {
              percentageString = "< 0.1%";
            }

            d3.select("#sunburst_percentage")
                .text(percentageString);

            d3.select("#sunburst_explanation")
                .style("visibility", "");

            var sequenceArray = renderingServices.getAncestors(d);
            renderingServices.updateBreadcrumbs(sequenceArray, percentageString);

            // Fade all the segments.
            d3.selectAll("path")
                .style("opacity", 0.3);

            // Then highlight only those that are an ancestor of the current segment.
            vis.selectAll("path")
                .filter(function(node) {
                          return (sequenceArray.indexOf(node) >= 0);
                        })
                .style("opacity", 1);
          },
          mouseleave: function (d) {
          // Restore everything to full opacity when moving off the visualization.

            // Hide the breadcrumb trail
            d3.select("#trail")
                .style("visibility", "hidden");

            // Deactivate all segments during transition.
            d3.selectAll("path").on("mouseover", null);

            // Transition each segment to full opacity and then reactivate it.
            d3.selectAll("path")
                .transition()
                .duration(1000)
                .style("opacity", 1)
                .each("end", function() {
                        d3.select(this).on("mouseover", renderingServices.mouseover);
                      });

            d3.select("#sunburst_explanation")
                .transition()
                .duration(1000)
                .style("visibility", "hidden");
          },
          getAncestors: function (node) {
          // Given a node in a partition layout, return an array of all of its ancestor
          // nodes, highest first, but excluding the root.
            var path = [];
            var current = node;
            while (current.parent) {
              path.unshift(current);
              current = current.parent;
            }
            return path;
          },
          initializeBreadcrumbTrail: function () {
            // Add the svg area.
            var trail = d3.select("#sunburst_sequence").append("svg:svg")
                .attr("width", width)
                .attr("height", 50)
                .attr("id", "trail");
            // Add the label at the end, for the percentage.
            trail.append("svg:text")
              .attr("id", "endlabel")
              .style("fill", "#000");
          },
          breadcrumbPoints: function (d, i) {
          // Generate a string that describes the points of a breadcrumb polygon.
            var points = [];
            points.push("0,0");
            points.push(b.w + ",0");
            points.push(b.w + b.t + "," + (b.h / 2));
            points.push(b.w + "," + b.h);
            points.push("0," + b.h);
            if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
              points.push(b.t + "," + (b.h / 2));
            }
            return points.join(" ");
          },
          updateBreadcrumbs: function(nodeArray, percentageString) {
          // Update the breadcrumb trail to show the current sequence and percentage.

            // Data join; key function combines name and depth (= position in sequence).
            var g = d3.select("#trail")
                .selectAll("g")
                .data(nodeArray, function(d) { return d.name + d.depth; });

            // Add breadcrumb and label for entering nodes.
            var entering = g.enter().append("svg:g");

            entering.append("svg:polygon")
                .attr("points", renderingServices.breadcrumbPoints)
                .style("fill", function(d) { return colors[d.name]; });

            entering.append("svg:text")
                .attr("x", (b.w + b.t) / 2)
                .attr("y", b.h / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .text(function(d) { return d.name; });

            // Set position for entering and updating nodes.
            g.attr("transform", function(d, i) {
              return "translate(" + i * (b.w + b.s) + ", 0)";
            });

            // Remove exiting nodes.
            g.exit().remove();

            // Now move and update the percentage at the end.
            d3.select("#trail").select("#endlabel")
                .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
                .attr("y", b.h / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .text(percentageString);

            // Make the breadcrumb trail visible, if it's hidden.
            d3.select("#trail")
                .style("visibility", "");
          },
          drawLegend: function() {
            // Dimensions of legend item: width, height, spacing, radius of rounded rect.
            var li = {
              w: 75, h: 30, s: 3, r: 3
            };

            var legend = d3.select("#sunburst_legend").append("svg:svg")
                .attr("width", li.w)
                .attr("height", d3.keys(colors).length * (li.h + li.s));

            var g = legend.selectAll("g")
                .data(d3.entries(colors))
                .enter().append("svg:g")
                .attr("transform", function(d, i) {
                        return "translate(0," + i * (li.h + li.s) + ")";
                     });

            g.append("svg:rect")
                .attr("rx", li.r)
                .attr("ry", li.r)
                .attr("width", li.w)
                .attr("height", li.h)
                .style("fill", function(d) { return d.value; });

            g.append("svg:text")
                .attr("x", li.w / 2)
                .attr("y", li.h / 2)
                .attr("dy", "0.35em")
                .attr("text-anchor", "middle")
                .text(function(d) { return d.key; });
          },
          toggleLegend: function() {
            var legend = d3.select("#sunburst_legend");
            if (legend.style("visibility") == "hidden") {
              legend.style("visibility", "");
            } else {
              legend.style("visibility", "hidden");
            }
          },
          buildHierarchy: function(csv) {
          // Take a 2-column CSV and transform it into a hierarchical structure suitable
          // for a partition layout. The first column is a sequence of step names, from
          // root to leaf, separated by hyphens. The second column is a count of how 
          // often that sequence occurred.

            var root = {"name": "root", "children": []};
            for (var i = 0; i < csv.length; i++) {
              var sequence = csv[i][0];
              var size = +csv[i][1];
              if (isNaN(size)) { // e.g. if this is a header row
                continue;
              }
              var parts = sequence.split("-");
              var currentNode = root;
              for (var j = 0; j < parts.length; j++) {
                var children = currentNode["children"];
                var nodeName = parts[j];
                var childNode;
                if (j + 1 < parts.length) {
             // Not yet at the end of the sequence; move down the tree.
            var foundChild = false;
            for (var k = 0; k < children.length; k++) {
              if (children[k]["name"] == nodeName) {
                childNode = children[k];
                foundChild = true;
                break;
              }
            }
            // If we don't already have a child node for this branch, create it.
            if (!foundChild) {
              childNode = {"name": nodeName, "children": []};
              children.push(childNode);
            }
            currentNode = childNode;
                } else {
            // Reached the end of the sequence; create a leaf node.
            childNode = {"name": nodeName, "size": size};
            children.push(childNode);
                }
              }
            }
            return root;
          }
          };

          alert('before loading...');
          // Use d3.text and d3.csv.parseRows so that we do not need to have a header
          // row, and can receive the csv as an array of arrays.
          d3.text("http://paulbhartzog.org/codepen/visit-sequences.txt", function(text) {
            alert('loading...');
            console.log('loading...');
            var csv = d3.csv.parseRows(text);
            var json = renderingServices.buildHierarchy(csv);
            renderingServices.createVisualization(json);
          });
      }
    }
   });