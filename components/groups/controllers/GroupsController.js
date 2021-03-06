// Generated by CoffeeScript 1.7.1
'use strict';
GroupsUserModule.controller('GroupsController', function($scope, $stateParams, $state, $timeout, $location, RestModel, Notification, LocalStorage, params, groups) {
  $scope.window = window;
  $scope.params = params;
  $scope.stateParams = $stateParams;
  $scope.loading = false;
  $scope.page = 1;
  $scope.pageSize = 4;
  $scope.otherGroup = {};
  $scope.groups = groups.response.items;
  $scope.returnListFriends = function() {
    return $state.transitionTo('friends');
  };
  $scope.getMoreinfo = function(group) {
    return $state.transitionTo('groupContent', {
      groupId: group.id
    });
  };
  return $scope.searchGroup = function() {
    if ($scope.otherGroup.id) {
      return RestModel.getGroupById($scope.otherGroup.id, $scope.params).then(function(data) {
        return $scope.groups = data.response;
      });
    }
  };
});

//# sourceMappingURL=GroupsController.map
