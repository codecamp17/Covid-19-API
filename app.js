angular.module('CovidSearch', ['ngResource'])
      .factory('Covid', function($resource) {
        return $resource( 'https://coronavirus-19-api.herokuapp.com/countries/{countryname}?countryname=:query',{query: '@query'}, {
          search: {
            method: 'JSONP',
            params: {
                   callback: 'JSON_CALLBACK'
            }
          }
        });
      })
      .controller('CovidCtrl', function($scope, Covid) {
        $scope.query = '';
        $scope.$watchCollection('query', function() {
          if ($scope.query.length > 0) {
            Covid.search({ query: $scope.query}, function(data) {
              $scope.results = data.results;
            });
          } else {
            $scope.results = [];
          }
        });
      });

