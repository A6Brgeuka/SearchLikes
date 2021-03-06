// Generated by CoffeeScript 1.7.1
'use strict';
GroupContentModule.controller('GroupContentController', function($scope, $stateParams, $state, $timeout, Loader, $location, RestModel, Notification, LocalStorage, params, group) {
  $scope.window = window;
  $scope.params = params;
  $scope.stateParams = $stateParams;
  $scope.loading = true;
  $scope.showAllUser = false;
  $scope.usersGroups = [];
  $scope.offset = 0;
  $scope.deactivated = [];
  $scope.localed = [];
  Loader.startLoad();
  $scope.userGroup = {};
  $scope.arrayAllUsers = [];
  $scope.group = group.response[0];
  $scope.getAllUsersInGroup = function(countUser) {
    if (countUser == null) {
      countUser = null;
    }
    if (($scope.group.is_closed !== 2) && !$scope.group.deactivated) {
      if (countUser === null) {
        countUser = $scope.group.members_count;
      }
      if (countUser < 25000) {
        return $timeout(function() {
          return RestModel.getMemeberInGroup($scope.group.id, $scope.params, countUser, $scope.offset).then(function(data) {
            angular.forEach(data.response, function(item) {
              return $scope.usersGroups.push(item.users);
            });
            $scope.offset = 0;
            $scope.loading = false;
            angular.forEach($scope.usersGroups, function(arrayUsers) {
              return angular.forEach(arrayUsers, function(user) {
                if (user.deactivated) {
                  $scope.deactivated.push(user);
                } else {
                  $scope.arrayAllUsers.push(user);
                }
                if ((user.city && $scope.group.city) && (user.city === $scope.group.city.id)) {
                  return $scope.localed.push(user);
                }
              });
            });
            Loader.stopLoad();
            $scope.procentDogs = Math.floor($scope.deactivated.length / $scope.group.members_count * 100);
            return $scope.procentLocal = Math.floor($scope.localed.length / $scope.group.members_count * 100);
          }, function(error) {
            console.log(error);
            return $scope.getAllUsersInGroup(countUser);
          });
        }, 350);
      } else {
        $scope.arrayComments = [];
        return $timeout(function() {
          return RestModel.getMemeberInGroup($scope.group.id, $scope.params, countUser, $scope.offset).then(function(data) {
            angular.forEach(data.response, function(item) {
              $scope.usersGroups.push(item.users);
              return Loader.process(Math.floor($scope.usersGroups.length * 100 / Math.ceil($scope.group.members_count / 1000)));
            });
            $scope.offset = $scope.offset + 25000;
            countUser = countUser - 25000;
            return $scope.getAllUsersInGroup(countUser);
          }, function(error) {
            console.log(error);
            return $scope.getAllUsersInGroup(countUser);
          });
        }, 350);
      }
    } else {
      return $scope.loading = false;
    }
  };
  $scope.getAllUsersInGroup($scope.group.members_count);
  $scope.searchUsersLike = function() {
    return $state.transitionTo('groupPostsLikes', {
      groupId: $scope.group.id,
      userId: $scope.userGroup.id
    });
  };
  $scope.listGroups = function() {
    return $state.transitionTo('groups');
  };
  $scope.returnListFriends = function() {
    return $state.transitionTo('friends');
  };
  return $scope.getUsers = function() {
    var itemHtml, loading;
    loading = true;
    itemHtml = "";
    $scope.arrayAllUsers.forEach(function(user) {
      if (user.online) {
        return itemHtml = itemHtml + '<tr><td class="blue text-center">' + user.id + '</td><td class="blue text-center">' + user.first_name + ' ' + user.last_name + '</td></tr>';
      } else {
        return itemHtml = itemHtml + '<tr><td class="text-center">' + user.id + '</td><td class="text-center">' + user.first_name + ' ' + user.last_name + '</td></tr>';
      }
    });
    $timeout(function() {
      return $('#body-table')[0].innerHTML = itemHtml;
    });
    loading = false;
    return $scope.showAllUser = true;
  };
});

//# sourceMappingURL=GroupContentController.map
