angular.module('CovidSearch', ['ngResource'])
  .config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain. **.
      'https://coronavirus-19-api.herokuapp.com/**'
    ])
  })
  .factory('Covid', function ($http) {
    return {
      search: function () {
        return $http({
          method: 'GET',
          url: 'https://coronavirus-19-api.herokuapp.com/countries'
        });
      }
    }
  })
  .controller('CovidCtrl', function ($scope, Covid) {
    $scope.query = 'a'
    $scope.onKeyupSearch = function () {
      Covid.search({ query: $scope.query }).then(function (data) {
        console.log(data)
        $scope.results = data.data;
      }).catch(function (eror) {});
    }
  });
