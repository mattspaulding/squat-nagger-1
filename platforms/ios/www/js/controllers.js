angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) { })

.controller('NagsCtrl', function ($scope, Nags) {
    $scope.nags = Nags.all();
    $scope.remove = function (nag) {
        Nags.remove(nag);
    }
})

.controller('NagDetailCtrl', function ($scope, $stateParams) {
    $scope.nag = Nags.get($stateParams.nagId);
    $scope.remove = function (nag) {
        Nags.remove(nag);
        $ionicHistory.goBack();
    }
   
})

.controller('AccountCtrl', function ($scope, Nags, $ionicHistory,$state) {
    $scope.settings = {
        enableFriends: true
    };

    $scope.scheduleNagger = function (nagger) {
        debugger;
        $scope.nags = Nags.all();
        var nag = $scope.nags[0];
        var nag1 = $scope.nags[1];
        // var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
        var date1 = new Date();
        var oneMinute = new Date();
        oneMinute.setMinutes(oneMinute.getMinutes() + 1);
        cordova.plugins.notification.local.schedule([{
            id: nag.id,
            title: 'notif0',//nag.name,
            message: nag.lastText,
            at: date1,
            sound: 'file://beep.caf',
            icon: "https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png",
            data: { nagId: nag.id }
        }, {
            id: nag1.id,
            title:'notif1',// nag1.name,
            message: nag1.lastText,
            at: oneMinute,
            sound: 'file://beep.caf',
            icon: "https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png",
            data: { nagId: nag1.id }
        }]);

        cordova.plugins.notification.local.on("click", function (notification) {
            $state.go('tab.nag-detail', { nagId: notification.id });
        });
    };
});
