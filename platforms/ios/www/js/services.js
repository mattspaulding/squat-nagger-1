angular.module('starter.services', [])

.factory('Nags', function () {
    // Might use a resource here that returns a JSON array

    var naggers = [{
        id:1,
        name: 'Marin',
        face: 'https://cdnil0.fiverrcdn.com/photos/2170980/original/DSC_6769.jpg?1448408453',
        level: 'Easy',
        nags: [{
            id: 100,
            title: '10 Squats',
            message: 'Let\'s start off easy.',
            date: 0,
            hour: 2,
            minute:24
        }, {
            id: 101,
            title: '15 Squats',
            message: 'Let\'s do more.',
            date: 0,
            hour: 2,
            minute: 25
        }, {
            id: 102,
            title: '20 Squats',
            message: 'Let\'s burn it.',
            date: 0,
            hour: 2,
            minute:26
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
            var currentNagger = JSON.parse(window.localStorage.getItem("currentNagger"));
            for (var i = 0; i < currentNagger.nags.length; i++) {
                if (currentNagger.nags[i].id === nag.id) {
                    currentNagger.nags.splice(i,1);
                }
            }

          // currentNagger.nags.splice(currentNagger.nags.indexOf(nag), 1);
           window.localStorage.setItem("currentNagger", JSON.stringify(currentNagger));
        },
        setCurrentNaggerByName: function (name) {
            for (var i = 0; i < naggers.length; i++) {
                if (naggers[i].name === name) {
                    window.localStorage.setItem("currentNagger",JSON.stringify(naggers[i]));
                    return naggers[i];
                }
            }
            throw "Couldn't find object with name: " + name;
        },
        getCurrentNagger:function(){
            return JSON.parse(window.localStorage.getItem("currentNagger"));
        },
        enable: function (nagId) {
            var currentNagger = JSON.parse(window.localStorage.getItem("currentNagger"));
            for (var i = 0; i < currentNagger.nags.length; i++) {
                if (currentNagger.nags[i].id === parseInt(nagId)) {
                     currentNagger.nags[i].enabled=true;
                }
            }
            return null;
        }
  ,
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
