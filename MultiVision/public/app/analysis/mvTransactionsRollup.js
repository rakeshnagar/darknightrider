// app.get('/api/transactionsrollup/:type', transactionsRollup.getTransactionsRollup);
// app.get('/api/transactionsrollup/:type/:year', transactionsRollup.getTransactionsRollupByYear);
// app.get('/api/transactionsrollup/:type/:year/:month', transactionsRollup.getTransactionsRollupByMonth);    

angular.module('app').factory('mvTransactionsRollupByType', function ($resource) {
    return $resource('/api/transactionsrollup/:type', {type: "@type"});
});

angular.module('app').factory('mvTransactionsRollupByTypeYear', function ($resource) {
    return $resource('/api/transactionsrollup/:type/:year', {type: "@type", year: "@year"});
});

angular.module('app').factory('mvTransactionsRollupByTypeYearMonth', function ($resource) {
    return $resource('/api/transactionsrollup/:type/:year/:month', {type: "@type", year: "@year", month: "@month"});
});