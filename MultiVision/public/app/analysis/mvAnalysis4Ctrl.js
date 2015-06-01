// http://stackoverflow.com/questions/5643321/how-to-make-remote-rest-call-inside-node-js-any-curl
angular.module('app').controller('mvAnalysis4Ctrl', function($scope, $q,
                                    mvTransactionsRollupByType, 
                                    mvTransactionsRollupByTypeYear, 
                                    mvTransactionsRollupByTypeYearMonth) {

mvTransactionsRollupByType.query({type: "category"}).$promise.then(function (collection) {
    $scope.transactionsRollupByCategory = collection;
});

mvTransactionsRollupByType.query({type: "merchant"}).$promise.then(function (collection) {
    $scope.transactionsRollupByMerchant = collection;
});

mvTransactionsRollupByTypeYear.query({type: "category", year: 2013}).$promise.then(function (collection) {
    $scope.transactionsRollupByCategoryYear = collection;
});

mvTransactionsRollupByTypeYear.query({type: "merchant", year: 2013}).$promise.then(function (collection) {
    $scope.transactionsRollupByMerchantYear = collection;
});

mvTransactionsRollupByTypeYearMonth.query({type: "category", year: 2014, month: 2}).$promise.then(function (collection) {
    $scope.transactionsRollupByCategoryYearMonth = collection;
});

mvTransactionsRollupByTypeYearMonth.query({type: "merchant", year: 2014, month: 2}).$promise.then(function (collection) {
    $scope.transactionsRollupByMerchantYearMonth = collection;
});

var max_merchant_to_show = 10;

var month = (new Date()).getMonth();
var year = (new Date()).getFullYear();

$scope.month = month;
$scope.year = year;

function doQuery(intype) {
   var d = $q.defer();

   mvTransactionsRollupByType.query({type: intype}, function(collection) {
    d.resolve(collection);
    console.log ("doQuery >> result >> " +collection);
    $scope.xxx=collection;
   });

   return d.promise;
}

$scope.getDataAndConfirm = function() {
    console.log("getDataAndConfirm");

    $q.all(doQuery("category")).then(function(output){
        console.log("$q.all");
        console.log(output);
    });

    console.log("getDataAndConfirm - done");
}

$scope.$watch("xxx", function() {
    if ($scope.xxx) {
        console.log("xxx changed");

        var dataArray = [];
        $scope.xxx.forEach(function(entry) {
            dataArray.push([entry.name.toUpperCase(), Math.round(entry.total)]);            
        });
        console.log(dataArray);
        
        c3.generate({
            bindto: '#piechart123',
            data: {
                columns: dataArray,
                type: 'pie'
            },
            legend: {
                show: true,
                position: 'right'
            },            
            pie: {
                label: {
                    format: function (value, ratio, id) {
                        return d3.format('$')(value);
                    }
                }
            }
        });

        c3.generate({
            bindto: '#donutchart123',
            data: {
                columns:dataArray,
                type : 'donut',
                onclick: function (d, i) { console.log("onclick", d, i); },
                onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            },
            legend: {
                show: true,
                position: 'right'
            },            
            donut: {
                title: "Iris Petal Width"
            }
        });


    }
});

function updateCharts(intype) {
    $scope.categoryType = intype;

    mvTransactionsRollupByType.query({type: intype}, function(collection) {
        drawCharts(collection);
    });
}

function filterData(collection) {
    if ($scope.categoryType === "merchant") {
    /* only show top 10 */
        if (collection.length > max_merchant_to_show) {
            collection = collection.slice(0, max_merchant_to_show);
        }
    }
    return collection;
}

function updateChartsForYear(selectedYear) {
    console.log("updateChartsForYear");

    $scope.year = selectedYear;

    if (selectedYear > 0) {
        mvTransactionsRollupByTypeYear.query({type: $scope.categoryType, year: selectedYear}, function(collection) {
            drawCharts(collection);
        });
    } else {
        updateCharts($scope.categoryType);
    }
}

function drawCharts(inCollection) {
        collection = filterData(inCollection);
        var dataArray = [];
        collection.forEach(function(entry) {
            dataArray.push([entry.name.toUpperCase(), Math.round(entry.total)]);            
        });
        console.log(dataArray);
        
        c3.generate({
            bindto: '#piechart123',
            data: {
                columns: dataArray,
                type: 'pie'
            },
            legend: {
                show: false,
                position: 'bottom'
            },
            // transition: {
            //         duration: 500
            // },
            // subchart: {
            //         show: true
            // },
            // size: {
            //         height: 840,
            //         width: 480
            // },            
            pie: {
                label: {
                    format: function (value, ratio, id) {
                        return d3.format('$')(value);
                    }
                }
            }
        });

        c3.generate({
            bindto: '#donutchart123',
            data: {
                columns:dataArray,
                type : 'donut',
                onclick: function (d, i) { console.log("onclick", d, i); },
                onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            },
            legend: {
                show:true,
                position: 'bottom'
            },
            // transition: {
            //         duration: 500
            // },
            donut: {
                title: "TOP " + ($scope.categoryType).toUpperCase()
            }
        });
 
    updateBubbleChart(inCollection);   
}

$scope.updateCharts = updateCharts;
$scope.updateChartsForYear = updateChartsForYear;

/* launch categories chart by default */
updateCharts ("category");

function updateBubbleChart(data) {

    console.log("updateBubbleChart --> " + data);

    d3.select('#viz').html("");

    var margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        width = $('#viz').width() - margin.left - margin.right,
        // height = $(window).height() - margin.top - margin.bottom,
        height = $(window).height() - margin.top - margin.bottom,
        n = 6,
        m = 1,
        padding = 6,
        radius = d3.scale.sqrt().range([0, 12]),
        color = d3.scale.category10().domain(d3.range(m)),
        x = d3.scale.ordinal().domain(d3.range(m)).rangePoints([0, width], 1),
        center = {
          x: width / 2,
          y: height / 2
        },
        damper = .1;

    //d3.json('./merchant.json', function(data) {
    // d3.json('/tryouts/merchant.json', function(data) {
    // collection.forEach(function(data){

        var i = 0;
        
    //    data.forEach(function(item){
    //      item.id = i;
    //      $('#sideBar').append("<div class = 'agency" + item.id + "'>" + item.name +"</div>");
    //      i++;
    //    });

        $('div[class^=agency]').mouseover(function(){
          var thisClass = $(this).attr('class');
          //$('circle.' + thisClass).animate({
          d3.select('circle.' + thisClass).attr('class','highlight ' + thisClass)
            .transition().duration(250).style('fill','red');
            var thisAgency = $(this).html();
            nodes.forEach(function(d){
              if(d.name == thisAgency) {
                d.charge = d.radius + 40;
              }
            });
            force.start();
        }).mouseout(function(){
          var thisClass = $(this).attr('class');
          d3.select('circle.' + thisClass).attr('class',thisClass)
            .transition().duration(250).style('fill','#1B8BCD');
          var thisAgency = $(this).html();
          nodes.forEach(function(d){
              if(d.name == thisAgency) {
                d.charge = d.radius;
              }
          });
          force.start();
        });

        var max_amount = d3.max(data, function(d) {
                return parseInt(d.total);
            }),
            radius_scale = d3.scale.pow()
              .exponent(0.5)
              .domain([0,max_amount])
              .range([3, 100]),
            nodes = [];

        data.forEach(function(d) {
            var node;
            node = {
                id: d.id,
                name: d.name,
                total: d.total,
                radius: radius_scale(parseInt(d.total)),
                charge: radius_scale(parseInt(d.total)),
                name: d.name,
                cx: Math.random() * 10,
                cy: Math.random() * 10
            }
            nodes.push(node);
        });

        var charge = function(d) {
            return -Math.pow(d.charge, 2.0) / 8;
        };

        var force = d3.layout.force()
          .nodes(nodes)
          .size([width, height])
          .gravity(.1)
          .charge(charge)
          .on("tick", tick)
          .start();

        var svg = d3.select("#viz")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var tooltip = d3.select('body').append('div')
                .style('position', 'absolute')
                .style('padding', '0 10px')
                .style('background', 'white')
                .style('opacity', 0)
                .style('font-size', '0.8em')
                .style('font-family', 'sans-serif')
                .style('box-shadow', '3px 5px 8px #888888')
        
        var circle = svg.selectAll("circle")
          .data(nodes).enter().append("circle")
          .attr("r", function(d) {
            return d.radius;
          })
          .attr("class",function(d){
            return "agency" + d.id;
          }).style("fill", function(d) {
            return d.color;
          }).call(force.drag)      
          .on('mouseover', function(d) {
            tooltip.transition()
                .style('opacity', .9)
        
            tooltip.html(d.name +" ($" + Math.round(d.total) +")")
                .style('left', (d3.event.pageX - 35) + 'px')
                .style('top',  (d3.event.pageY - 30) + 'px')  
        
            d3.select(this)
    //            .style('opacity', .5)
                .style('fill', 'red')
          })
          .on('mouseout', function(d) {
            tooltip.transition()
                .style('opacity', 0)  // added by MWC to make tooltip disappear on mouseout
        
            d3.select(this)
                //.style('opacity', 1)
                .style('fill', d.color) 
        });

        //pull to center on tick
        function tick(e) {
                circle.attr("cx", function(d) {
                    return d.x + (center.x - d.x) * (damper + 0.02) *
                        e.alpha;
                }).attr("cy", function(d) {
                    return d.y + (center.y - d.y) * (damper + 0.02) *
                        e.alpha;
                });
            }
            // Move nodes toward cluster focus.

        function gravity(alpha) {
                return function(d) {
                    d.y += (d.cy - d.y) * alpha;
                    d.x += (d.cx - d.x) * alpha;
                };
            }
            // Resolve collisions between nodes.

        function collide(alpha) {
            var quadtree = d3.geom.quadtree(nodes);
            return function(d) {
                var r = d.radius + radius.domain()[1] + padding,
                    nx1 = d.x - r,
                    nx2 = d.x + r,
                    ny1 = d.y - r,
                    ny2 = d.y + r;
                quadtree.visit(function(quad, x1, y1, x2, y2) {
                    if (quad.point && (quad.point !== d)) {
                        var x = d.x - quad.point.x,
                            y = d.y - quad.point.y,
                            l = Math.sqrt(x * x + y * y),
                            r = d.radius + quad.point.radius +
                            (d.color !== quad.point.color) *
                            padding;
                        if (l < r) {
                            l = (l - r) / l * alpha;
                            d.x -= x *= l;
                            d.y -= y *= l;
                            quad.point.x += x;
                            quad.point.y += y;
                        }
                    }
                    return x1 > nx2 || x2 < nx1 || y1 > ny2 ||
                        y2 < ny1;
                });
            };
        }
    //}); //end d3.json    
console.log ("updateBubbleChart - end");

} /* end of updateBubbleChart */

});
