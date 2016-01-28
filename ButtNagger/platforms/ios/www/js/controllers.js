angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('NagsCtrl', function($scope, Nags) {
  $scope.nags = Nags.all();
  $scope.remove = function(nag) {
    Nags.remove(nag);
  }
})

.controller('NagDetailCtrl', function ($scope, $stateParams, Nags, $ionicHistory) {
    $scope.nag = Nags.get($stateParams.nagId);
    $scope.remove = function (nag) {
        Nags.remove(nag);
        $ionicHistory.goBack();
    }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
