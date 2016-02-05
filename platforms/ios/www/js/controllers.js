angular.module('starter.controllers', ["ionic", "ngCordova"])

.controller('DashCtrl', function ($scope, Nags, $state) {
    $scope.nagger = Nags.getCurrentNagger();
    if ($scope.nagger != null) {
        $scope.endingDate = new Date($scope.nagger.nags[$scope.nagger.nags.length - 1].date);
    }

    $scope.chooseNagger = function () {
        $state.go('tab.naggers');
    }
})

.controller('NagsCtrl', function ($scope, Nags, $ionicHistory, $state, $cordovaLocalNotification) {
    $scope.nagger = Nags.getCurrentNagger();
    $scope.remove = function (nag) {
        Nags.remove(nag);
        $cordovaLocalNotification.clear(nag.id).then(function (result) {
            // ...
        });
       // cordova.plugins.notification.local.clear(nag.id);
        Nags.setBadgeNumber();
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

.controller('NagDetailCtrl', function ($scope, $stateParams, Nags, $ionicHistory, $state, $cordovaLocalNotification) {
    $ionicHistory.clearHistory();
    $scope.nagger = Nags.getCurrentNagger();
    $scope.nag = Nags.get($stateParams.nagId);
    $scope.remove = function (nag) {
        Nags.remove(nag);
        $cordovaLocalNotification.clear(nag.id).then(function (result) {
            // ...
        });
        //cordova.plugins.notification.local.clear(nag.id);
        Nags.setBadgeNumber();
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

.controller('NaggersCtrl',['$scope', '$rootScope', '$ionicPlatform', '$cordovaLocalNotification', '$ionicHistory', '$state', '$ionicPopup','Nags', function ($scope,$rootScope, $ionicPlatform, $cordovaLocalNotification, $ionicHistory, $state, $ionicPopup,Nags ) {
    $ionicPlatform.ready(function () {
        alert('ionic ready');
        $scope.settings = {
            enableFriends: true
        };

        $scope.naggers = Nags.getAllNaggers();
        $scope.nagger = Nags.getCurrentNagger();

        $scope.cancelNagger = function () {
            Nags.clearBadgeNumber();
            Nags.cancelCurrentNagger();
            $scope.nagger = null;
        };

        // A confirm dialog
        $scope.showConfirm = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Cancel Nagger',
                template: 'Are you sure you want to cancel this Nagger?',
                cancelText: 'No',
                okText: 'Yes'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    $scope.cancelNagger();
                } else {
                    //do nothing
                }
            });
        };

        $scope.scheduleNagger = function (naggerName) {
            //window.plugin.notification.local.cancelAll(function () {
            $cordovaLocalNotification.cancelAll().then(function (result) {
                $scope.nagger = Nags.setCurrentNaggerByName(naggerName);
                var notifications = [];
                $scope.nagger.nags.forEach(function (nag, index) {
                    var date = new Date();
                    date.setDate(date.getDate() + nag.day);
                    date.setHours(nag.hour);
                    date.setMinutes(nag.minute);
                    date.setSeconds(0);
                    $scope.nagger.nags[index].date = date;
                    var guid = index;//Math.floor((Math.random() * 999999999999999) + 1);
                    $scope.nagger.nags[index].id = guid;
                    var notification = {};
                    notification.id = guid;
                    notification.title = nag.title;
                    notification.text = nag.message;
                    notification.date = date;
                    notification.sound = 'file://sounds/cork-pop.wav';
                    if (notification.date > new Date())
                    {
                        notifications.push(notification);
                    }
          
                });

                $scope.nagger = Nags.setCurrentNaggerByName(naggerName);
                $cordovaLocalNotification.schedule(notifications).then(function (result) {;
                    $cordovaLocalNotification.clearAll();
                    alert('cleared');
                });
                $state.go('tab.nag-detail', { nagId: $scope.nagger.nags[0].id });

            }, this);

            $rootScope.$on('$cordovaLocalNotification:click', function (event, notification, state) {
                $state.go('tab.nag-detail', { nagId: notification.id });
            });
            //cordova.plugins.notification.local.on("click", function (notification) {
            //    $state.go('tab.nag-detail', { nagId: notification.id });
            //});

            $rootScope.$on('$cordovaLocalNotification:trigger', function (event, notification, state) {
                Nags.setBadgeNumber();
            });
            //cordova.plugins.notification.local.on("trigger", function (notification) {
            //    Nags.setBadgeNumber();
            //});

            //    $rootScope.$on('$cordovaLocalNotification:schedule',function (event, notification, state) {
            //        $cordovaLocalNotification.clearAll();
            //});

            $ionicHistory.nextViewOptions({
                disableBack: true
            });


        };
    });
}]);
