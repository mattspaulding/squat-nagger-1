angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) { })

.controller('NagsCtrl', function ($scope, Nags, $ionicHistory, $state) {
    $scope.nagger = Nags.getCurrentNagger();
    $scope.remove = function (nag) {
        Nags.remove(nag);
        $scope.nagger = Nags.getCurrentNagger();
    }
    $scope.detail = function (nagId) {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.nag-detail', { nagId: nagId });
    }

   $scope.isShow= function (dateString) {
        return new Date(dateString) < new Date();
    }
})

.controller('NagDetailCtrl', function ($scope, $stateParams, Nags, $ionicHistory, $state) {
    $ionicHistory.clearHistory();
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

        //cordova.plugins.notification.local.clearAll(function () {
        $scope.nagger = Nags.setCurrentNaggerByName('Marin');
        var notifications = [];
            $scope.nagger.nags.forEach(function (nag, index) {
                    var date = new Date();
                    date.setDate(date.getDate() + nag.day);
                    date.setHours(nag.hour);
                    date.setMinutes(nag.minute);
                    $scope.nagger.nags[index].date = date;
                    var notification = {};
                    notification.id = nag.id;
                    notification.title = nag.title;
                    notification.message = nag.message;
                    notification.date = date;
                    notifications.push(notification);
               
            });
            $scope.nagger = Nags.setCurrentNaggerByName('Marin');

            cordova.plugins.notification.local.schedule(notifications);

            cordova.plugins.notification.local.on("click", function (notification) {
                $state.go('tab.nag-detail', { nagId: notification.id });
            });

            


            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('tab.nag-detail', { nagId: $scope.nagger.nags[0].id });

       // }, this);

    };
});
