angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) { })

.controller('NagsCtrl', function ($scope, Nags) {
    $scope.nags = Nags.all();
    $scope.remove = function (nag) {
        Nags.remove(nag);
    }
})

.controller('NagDetailCtrl', function ($scope, $stateParams, Nags, $ionicHistory,$state) {
    $scope.nag = Nags.get($stateParams.nagId);
    $scope.remove = function (nag) {
        Nags.remove(nag);
        $ionicHistory.goBack();
    }
    $scope.notification = function (nag) {
        debugger;
       // var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
        var date = new Date();

        cordova.plugins.notification.local.schedule({
            id: 1,
            title: nag.name,
            message: nag.lastText,
            every: 'minute',
            sound: 'file://beep.caf',
            icon: "https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png",
            data: { nagId: nag.id }
        });

        cordova.plugins.notification.local.on("click", function (notification) {
            $state.go('tab.nag-detail', { nagId: notification.data.nagId })
        });
    }
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
