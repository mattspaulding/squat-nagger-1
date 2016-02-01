angular.module('starter.services', [])

.factory('Nags', function () {
    // Might use a resource here that returns a JSON array

    var naggers = [
        {
            name: 'Sally Slumpbottom',
            face: 'http://www.afamilyatwar.com/Index%20Photos/Margery%20Mason.jpg',
            level: 'Easy',
            nags: [{
                title: 'Hello, I\'m Sally',
                message: 'If I can do it, you can too.',
                details: 'We are going to start off easy today. Then we will pick up the pace first thing tomorrow morning. Click the \'Done\' button to get started.',
                day: 0,
                hour: 0,
                minute: 0
            }, {
                title: '15 Squats',
                message: 'Let\'s start with some squats.',
                video: 'squats',
                day: 0,
                hour: 19,
                minute: 52
            }, {
                title: '5 Lunges',
                message: 'And now some lunges.',
                video: 'lunges',
                day: 0,
                hour: 19,
                minute: 53
            }, {
                title: '32 Squats',
                message: 'Rise and shine sleepy head.',
                video: 'squats',
                day: 1,
                hour: 9,
                minute: 0
            }, {
                title: '24 Squats',
                message: 'Morning pump.',
                video: 'squats',
                day: 1,
                hour: 10,
                minute: 26
            }, {
                title: '10 Lunges',
                message: 'Pump them out.',
                video: 'lunges',
                day: 1,
                hour: 20,
                minute: 30
            }, {
                title: '20 Squats',
                message: 'Well good morning to you.',
                video: 'squats',
                day: 2,
                hour: 8,
                minute: 26
            }, {
                title: '15 Curtsey Lunges',
                message: 'One leg at a time.',
                video: 'curtsey-lunges',
                day: 2,
                hour: 17,
                minute: 15
            }, {
                title: '45 Squats',
                message: 'This is it for today.',
                video: 'squats',
                day: 1,
                hour: 20,
                minute: 0
            }, {
                title: 'All done',
                message: 'You made it. Woopty doo...',
                video: 'victory',
                day: 1,
                hour: 20,
                minute: 1
            }]
        },
        {
            name: 'Margery Moderation',
            face: 'https://cdnil1.fiverrcdn.com/photos/2795414/original/1590.jpg?1393353812',
            level: 'Moderate',
            nags: [{
                title: 'Hello',
                message: 'Welcome to Squat Nagger!',
                day: 0,
                hour: 0,
                minute: 0
            }, {
                title: '15 Squats',
                message: 'Let\'s do some squats.',
                day: 0,
                hour: 16,
                minute: 26
            }, {
                title: '20 Squats',
                message: 'Let\'s burn it.',
                day: 0,
                hour: 16,
                minute: 27
            }]
        },
       {
           name: 'Maddie Motheroftwo',
           face: 'http://images.agoramedia.com/wte3.0/gcms/just-for-mom-article.jpg',
           level: 'Moderate',
           nags: [{
               title: 'Hello',
               message: 'Welcome to Squat Nagger!',
               day: 0,
               hour: 0,
               minute: 0
           }, {
               title: '15 Squats',
               message: 'Let\'s do some squats.',
               day: 0,
               hour: 16,
               minute: 26
           }, {
               title: '20 Squats',
               message: 'Let\'s burn it.',
               day: 0,
               hour: 16,
               minute: 27
           }]
       },
       {
           name: 'Lily Likewhatever',
           face: 'http://i5.walmartimages.com/dfw/dce07b8c-26ed/k2-_37fcad99-ab2f-4f3a-9001-5f463f78a69a.v2.jpg',
           level: 'Hard',
           nags: [{
               title: 'Hello',
               message: 'Welcome to Squat Nagger!',
               day: 0,
               hour: 0,
               minute: 0
           }, {
               title: '15 Squats',
               message: 'Let\'s do some squats.',
               day: 0,
               hour: 16,
               minute: 26
           }, {
               title: '20 Squats',
               message: 'Let\'s burn it.',
               day: 0,
               hour: 16,
               minute: 27
           }]
       },
        {
            name: 'Bobbi & Bonnie Bunz',
            face: 'https://cdnil1.fiverrcdn.com/photos/2044703/original/image.jpg?1449095649',
            level: 'Advanced',
            nags: [{
                title: 'Hello',
                message: 'Welcome to Squat Nagger!',
                day: 0,
                hour: 0,
                minute: 0
            }, {
                title: '15 Squats',
                message: 'Let\'s do some squats.',
                day: 0,
                hour: 16,
                minute: 26
            }, {
                title: '20 Squats',
                message: 'Let\'s burn it.',
                day: 0,
                hour: 16,
                minute: 27
            }]
        }
    ];

    return {
        //all: function () {
        //    return naggers[0].nags;
        //},
        getAllNaggers: function () {
            return naggers;
        },
        getNaggerByName: function (name) {
            for (var i = 0; i < naggers.length; i++) {
                if (naggers[i].name === name) {
                    return naggers[i];
                }
            }
            throw "Couldn't find object with name: " + name;
        },
        remove: function (nag) {
            var currentNagger = JSON.parse(window.localStorage.getItem("currentNagger"));
            for (var i = 0; i < currentNagger.nags.length; i++) {
                if (currentNagger.nags[i].id === nag.id) {
                    currentNagger.nags.splice(i, 1);
                }
            }

            if (currentNagger.nags.length == 0) {
                currentNagger = null;
            }

            // currentNagger.nags.splice(currentNagger.nags.indexOf(nag), 1);
            window.localStorage.setItem("currentNagger", JSON.stringify(currentNagger));
        },
        cancelCurrentNagger: function () {
            window.localStorage.setItem("currentNagger", null);
            cordova.plugins.notification.local.clearAll();
        },
        setCurrentNaggerByName: function (name) {
            for (var i = 0; i < naggers.length; i++) {
                if (naggers[i].name === name) {
                    window.localStorage.setItem("currentNagger", JSON.stringify(naggers[i]));
                    return naggers[i];
                }
            }
            throw "Couldn't find object with name: " + name;
        },
        getCurrentNagger: function () {
            return JSON.parse(window.localStorage.getItem("currentNagger"));
        },
        clearBadgeNumber: function () {
            var nagger = JSON.parse(window.localStorage.getItem("currentNagger"));
           
            cordova.plugins.notification.local.update({
                id: nagger.nags[0].id,
                badge: 0
            });
        },
        setBadgeNumber: function () {
            var nagger = JSON.parse(window.localStorage.getItem("currentNagger"));
            var count = 0;
            if (nagger != null) {
                nagger.nags.forEach(function (nag, index) {
                    if (new Date(nagger.nags[index].date) < new Date()) {
                        count++;
                    }
                });
            }
            cordova.plugins.notification.local.update({
                id: nagger.nags[0].id,
                badge: count
            });
        },
        get: function (nagId) {
            var currentNagger = JSON.parse(window.localStorage.getItem("currentNagger"));
            for (var i = 0; i < currentNagger.nags.length; i++) {
                if (currentNagger.nags[i].id === parseInt(nagId)) {
                    return currentNagger.nags[i];
                }
            }
            return null;
        }
    };
});
