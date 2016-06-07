// Generated by CoffeeScript 1.7.1

/*
 *StaticsService#
Сервис статистики
 */
'use strict';
MainModule.service('Static', function($timeout, $q, RestModel, Loader) {
  var Static;
  Static = (function() {
    function Static() {}

    Static.prototype.resultFriends = [];

    Static.prototype.params = null;

    Static.prototype.getListCountFriends = function(friends) {
      var tempFriendsArray;
      if (friends.length > 25) {
        tempFriendsArray = friends.splice(0, 25);
        return $timeout((function(_this) {
          return function() {
            return RestModel.getAllCountFriends(tempFriendsArray, _this.params).then(function(data) {
              angular.forEach(data.response, function(user) {
                return _this.resultFriends.push(user[0]);
              });
              return _this.getListCountFriends(friends);
            }, function(error) {
              return console.log(error);
            });
          };
        })(this), 330);
      } else {
        if (friends.length !== 0) {
          return $timeout((function(_this) {
            return function() {
              return RestModel.getAllCountFriends(friends, _this.params).then(function(data) {
                angular.forEach(data.response, function(user) {
                  return _this.resultFriends.push(user[0]);
                });
                _this.resultFriends = _this.resultFriends.sort(_this.sortableFriends);
                _this.resultFriends = Loader.renderBand(_this.resultFriends);
                return _this.resultFriends;
              });
            };
          })(this), 330);
        } else {
          return console.log('dct');
        }
      }
    };

    Static.prototype.sortableFriends = function(a, b) {
      return b.counters.friends - a.counters.friends;
    };

    return Static;

  })();
  return new Static();
});

//# sourceMappingURL=StaticsService.map