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
    $scope.notification = function (nag) {
        debugger;
        cordova.plugins.notification.local.schedule({
            id: 1,
            title: "Production Jour fixe",
            text: "Duration 1h",
            //sound: "file://sounds/reminder.mp3",
            //icon: "http://icons.com/?cal_id=1",
            //data: { meetingId: "123#fg8" }
        });

        cordova.plugins.notification.local.on("click", function (notification) {
            debugger;
            joinMeeting(notification.data.meetingId);
        });
    }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
