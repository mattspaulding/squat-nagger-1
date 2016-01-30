angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) { })

.controller('NagsCtrl', function ($scope, Nags, $ionicHistory, $state) {
    $scope.nagger = Nags.getCurrentNagger();

    $scope.remove = function (nag) {
        Nags.remove(nag);
    }
    $scope.detail = function (nagId) {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.nag-detail', { nagId: nagId });
    }
})

.controller('NagDetailCtrl', function ($scope, $stateParams, Nags, $ionicHistory, $state) {
    $scope.nagger = Nags.getCurrentNagger();
    $scope.nag = Nags.get($stateParams.nagId);
    $scope.remove = function (nag) {
        Nags.remove(nag);
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.nags');
    }
    $scope.goBack = function () {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.nags');
    }

})

.controller('AccountCtrl', function ($scope, Nags, $ionicHistory, $state) {
    $scope.settings = {
        enableFriends: true
    };

    $scope.scheduleNagger = function (nagger) {

        cordova.plugins.notification.local.clearAll(function () {
            $scope.nagger = Nags.setCurrentNaggerByName('Marin');
            var notifications = [];
            $scope.nagger.nags.forEach(function (nag, index) {
                var date = new Date();
                date.setDate(date.getDate() + nag.date);
                date.setHours(nag.hour);
                date.setMinutes(nag.minute);
                var notification = {};
                notification.id = nag.id;
                notification.title = nag.title;
                notification.message = nag.message;
                notification.date = date;
                notifications.push(notification);
            });
            cordova.plugins.notification.local.schedule(notifications);
        }, this);


        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.nag-detail', { nagId: $scope.nagger.nags[0].id });

        cordova.plugins.notification.local.on("click", function (notification) {
            $state.go('tab.nag-detail', { nagId: notification.id });
        });


        cordova.plugins.notification.local.on("trigger", function (notification) {
            alert("triggered: " + notification.id);
        });
    };
});
