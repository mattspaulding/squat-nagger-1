angular.module('starter.services', [])

.factory('Nags', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var nags = [{
        id: 0,
        name: '10 Squats',
        lastText: 'Let\'s start off easy.',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
        id: 1,
        name: '20 Squats',
        lastText: 'You can do it!',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
        id: 2,
        name: '25 Squats',
        lastText: 'You can do it!',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
        id: 3,
        name: '10 Wide Squats',
        lastText: 'You can do it!',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }];

    return {
        all: function () {
            return nags;
        },
        remove: function (nag) {
            nags.splice(nags.indexOf(nag), 1);
        },
        get: function (nagId) {
            for (var i = 0; i < nags.length; i++) {
                if (nags[i].id === parseInt(nagId)) {
                    return nags[i];
                }
            }
            return null;
        }
    };
});
