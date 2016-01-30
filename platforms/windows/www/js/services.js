angular.module('starter.services', [])

.factory('Nags', function () {
    // Might use a resource here that returns a JSON array

    var naggers = [{
        id:1,
        name: 'Marin',
        face: 'https://cdnil0.fiverrcdn.com/photos/2170980/original/DSC_6769.jpg?1448408453',
        nags: [{
            id: 100,
            title: '10 Squats',
            message: 'Let\'s start off easy.',
            date: 0,
            hour: 23,
            minute:0
        }, {
            id: 101,
            title: '15 Squats',
            message: 'Let\'s do more.',
            date: 0,
            hour: 23,
            minute: 0
        }, {
            id: 102,
            title: '20 Squats',
            message: 'Let\'s burn it.',
            date: 0,
            hour: 23,
            minute: 0
        }]
    }];

    return {
        //all: function () {
        //    return naggers[0].nags;
        //},
        getNaggerByName: function (name) {
            for (var i = 0; i < naggers.length; i++) {
                if (naggers[i].name === name) {
                    return naggers[i];
                }
            }
            throw "Couldn't find object with name: " + name;
        },
        remove: function (nag) {
           var currentNagger= window.localStorage.getItem("currentNagger");
           currentNagger.nags.splice(nags.indexOf(nag), 1);
           window.localStorage.setItem("currentNagger", currentNagger);
        },
        setCurrentNaggerByName: function (name) {
            for (var i = 0; i < naggers.length; i++) {
                if (naggers[i].name === name) {
                    window.localStorage.setItem("currentNagger", naggers[i]);
                    return naggers[i];
                }
            }
            throw "Couldn't find object with name: " + name;
        },
        getCurrentNagger:function(){
            return window.localStorage.getItem("currentNagger");
        },
        get: function (nagId) {
            var currentNagger = window.localStorage.getItem("currentNagger");
            for (var i = 0; i < currentNagger.nags.length; i++) {
                if (currentNagger.nags[i].id === parseInt(nagId)) {
                    return currentNagger.nags[i];
                }
            }
            return null;
        }
    };
});
