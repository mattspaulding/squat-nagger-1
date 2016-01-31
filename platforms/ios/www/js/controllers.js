angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, Nags, $state) {
    $scope.nagger = Nags.getCurrentNagger();
    if ($scope.nagger != null) {
        $scope.endingDate = new Date($scope.nagger.nags[$scope.nagger.nags.length - 1].date);
    }

    $scope.chooseNagger = function () {
        $state.go('tab.naggers');
    }
})

.controller('NagsCtrl', function ($scope, Nags, $ionicHistory, $state) {
    $scope.nagger = Nags.getCurrentNagger();
    $scope.remove = function (nag) {
        Nags.remove(nag);
        cordova.plugins.notification.local.clear(nag.id);
        $scope.nagger = Nags.getCurrentNagger();
    }
    $scope.detail = function (nagId) {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.nag-detail', { nagId: nagId });
    }

    $scope.isShowNag = function (dateString) {
        return new Date(dateString) < new Date();
    }

    $scope.isShowCaughtUp = function () {
        return new Date($scope.nagger.nags[0].date) > new Date();
    }

    $scope.chooseNagger = function () {
        $state.go('tab.naggers');
    }
})

.controller('NagDetailCtrl', function ($scope, $stateParams, Nags, $ionicHistory, $state) {
    $ionicHistory.clearHistory();
    $scope.nagger = Nags.getCurrentNagger();
    $scope.nag = Nags.get($stateParams.nagId);
    $scope.remove = function (nag) {
        Nags.remove(nag);
        cordova.plugins.notification.local.clear(nag.id);

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

.controller('NaggersCtrl', function ($scope, Nags, $ionicHistory, $state) {
    $scope.settings = {
        enableFriends: true
    };

    $scope.naggers = Nags.getAllNaggers();
    $scope.nagger = Nags.getCurrentNagger();

    $scope.cancelNagger = function () {
        Nags.cancelCurrentNagger();
        $scope.nagger = null;
    };

    $scope.scheduleNagger = function (naggerName) {

        cordova.plugins.notification.local.clearAll();
        $scope.nagger = Nags.setCurrentNaggerByName(naggerName);
        var notifications = [];
        $scope.nagger.nags.forEach(function (nag, index) {
            var date = new Date();
            date.setDate(date.getDate() + nag.day);
            date.setHours(nag.hour);
            date.setMinutes(nag.minute);
            date.setSeconds(0);
            $scope.nagger.nags[index].date = date;
            var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8; return v.toString(16); });
            $scope.nagger.nags[index].id = guid;
            var notification = {};
            notification.id = guid;
            notification.title = nag.title;
            notification.message = nag.message;
            notification.date = date;
            notifications.push(notification);

        });
        $scope.nagger = Nags.setCurrentNaggerByName(naggerName);

        cordova.plugins.notification.local.schedule(notifications);

        cordova.plugins.notification.local.on("click", function (notification) {
            $state.go('tab.nag-detail', { nagId: notification.id });
        });




        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.nag-detail', { nagId: $scope.nagger.nags[0].id });



    };
});
