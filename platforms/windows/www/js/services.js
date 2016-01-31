angular.module('starter.services', [])

.factory('Nags', function () {
    // Might use a resource here that returns a JSON array

    var naggers = [
        {
            name: 'Sally Sloppybottom',
            face: 'https://cdnil0.fiverrcdn.com/photos/2170980/original/DSC_6769.jpg?1448408453',
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
                day: 0,
                hour: 0,
                minute: 0
            }, {
                title: '5 Lunges',
                message: 'And then some lunges.',
                day: 0,
                hour: 16,
                minute: 27
            }, {
                title: '32 Squats',
                message: 'Rise and shine sleepy head.',
                day: 1,
                hour: 9,
                minute: 0
            }, {
                title: '24 Squats',
                message: 'Morning pump.',
                day: 1,
                hour: 10,
                minute: 26
            }, {
                title: '10 Lunges',
                message: 'Pump them out.',
                day: 1,
                hour: 20,
                minute: 30
            }, {
                title: '20 Squats',
                message: 'Well good morning to you.',
                day: 2,
                hour: 8,
                minute: 26
            }, {
                title: '15 Lunges',
                message: 'One leg at a time.',
                day: 2,
                hour: 17,
                minute: 15
            }, {
                title: '45 Squats',
                message: 'This is it for today.',
                day: 1,
                hour: 20,
                minute: 0
            }, {
                title: 'All done',
                message: 'You made it. Woopty doo...',
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
                message: 'Welcome to Butt Nagger!',
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
                message: 'Welcome to Butt Nagger!',
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
