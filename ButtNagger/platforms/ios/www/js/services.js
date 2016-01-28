angular.module('starter.services', [])

.factory('Nags', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var nags = [{
    id: 0,
    name: '10 Squats',
    lastText: 'You can do it!',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: '5 Lunges',
    lastText: 'Work it',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: '20 Wide squats',
    lastText: 'Feel the burn?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }];

  return {
    all: function() {
      return nags;
    },
    remove: function(nag) {
      nags.splice(nags.indexOf(nag), 1);
    },
    get: function(nagId) {
      for (var i = 0; i < nags.length; i++) {
        if (nags[i].id === parseInt(nagId)) {
          return nags[i];
        }
      }
      return null;
    }
  };
});
