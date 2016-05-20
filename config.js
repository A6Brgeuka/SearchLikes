// Generated by CoffeeScript 1.7.1
'use strict';
MainModule.config([
  '$httpProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', function($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider, $sceDelegateProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common = {
      'Accept': 'application/hal+json'
    };
    $httpProvider.defaults.headers.post = {
      'Content-Type': 'application/json'
    };
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $sceDelegateProvider.resourceUrlWhitelist(['**']);
    $stateProvider.state('login', {
      url: '/login',
      controller: 'MainController',
      templateUrl: 'components/login/views/login.html'
    }).state('friends', {
      url: '/friends',
      controller: 'FriendsController',
      templateUrl: 'components/friends/views/friends.html',
      resolve: {
        params: function(LocalStorage) {
          return LocalStorage.getItem('params');
        },
        currentUser: function(RestModel, params, $q) {
          var deffered;
          deffered = $q.defer();
          if (params) {
            RestModel.getUserById(params.user_id, params).then(function(data) {
              return deffered.resolve(data.response[0]);
            }, function(error) {
              return deffered.reject(error);
            });
            return deffered.promise;
          } else {
            return false;
          }
        }
      }
    }).state('user', {
      url: '/user/:userId',
      controller: 'UserController',
      templateUrl: 'components/user/views/user.html',
      resolve: {
        params: function(LocalStorage) {
          return LocalStorage.getItem('params');
        },
        user: function($stateParams, params, RestModel) {
          return RestModel.moreInfo($stateParams.userId, params);
        }
      }
    }).state('wall', {
      url: '/user/:userId/selected/:selectedId/wall',
      controller: 'WallController',
      templateUrl: 'components/wall/views/wall.html',
      resolve: {
        params: function(LocalStorage) {
          return LocalStorage.getItem('params');
        },
        user: function($stateParams, params, RestModel) {
          return RestModel.moreInfo($stateParams.userId, params);
        },
        userSearchFor: function($stateParams, params, RestModel, $q) {
          var deffered;
          deffered = $q.defer();
          RestModel.moreInfo($stateParams.selectedId, params).then(function(data) {
            return deffered.resolve(data.response[0]);
          }, function(error) {
            return deffered.reject(error);
          });
          return deffered.promise;
        }
      }
    }).state('photo', {
      url: '/user/:userId/selected/:selectedId/photo',
      controller: 'PhotoController',
      templateUrl: 'components/photo/views/photo.html',
      resolve: {
        params: function(LocalStorage) {
          return LocalStorage.getItem('params');
        },
        user: function($stateParams, params, RestModel) {
          return RestModel.moreInfo($stateParams.userId, params);
        },
        userSearchFor: function($stateParams, params, RestModel, $q) {
          var deffered;
          deffered = $q.defer();
          RestModel.moreInfo($stateParams.selectedId, params).then(function(data) {
            return deffered.resolve(data.response[0]);
          }, function(error) {
            return deffered.reject(error);
          });
          return deffered.promise;
        }
      }
    }).state('user-friend', {
      url: '/user/:userId/friends',
      controller: 'UserFriendsController',
      templateUrl: 'components/userFriendsList/views/userFriendList.html',
      resolve: {
        params: function(LocalStorage) {
          return LocalStorage.getItem('params');
        },
        currentUser: function(RestModel, $stateParams, params, $q) {
          var deffered;
          deffered = $q.defer();
          RestModel.getUserById($stateParams.userId, params).then(function(data) {
            return deffered.resolve(data.response[0]);
          }, function(error) {
            return deffered.reject(error);
          });
          return deffered.promise;
        }
      }
    }).state('selected', {
      url: '/user/:userId/selected/:type',
      controller: 'SelectedController',
      templateUrl: 'components/selected/views/selected.html',
      resolve: {
        params: function(LocalStorage) {
          return LocalStorage.getItem('params');
        },
        currentUser: function(RestModel, $stateParams, params, $q) {
          var deffered;
          deffered = $q.defer();
          RestModel.getUserById($stateParams.userId, params).then(function(data) {
            return deffered.resolve(data.response[0]);
          }, function(error) {
            return deffered.reject(error);
          });
          return deffered.promise;
        }
      }
    }).state('processingPhoto', {
      url: '/user/:userId/processingPhoto',
      controller: 'ProcessingPhotoController',
      templateUrl: 'components/processingPhoto/views/processingPhoto.html',
      resolve: {
        params: function(LocalStorage) {
          return LocalStorage.getItem('params');
        },
        currentUser: function(RestModel, $stateParams, params) {
          return RestModel.getUserById($stateParams.userId, params);
        },
        friends: function(RestModel, $stateParams, params, currentUser) {
          return RestModel.getFriends(params, $stateParams.userId);
        }
      }
    }).state('processingWall', {
      url: '/user/:userId/processingWall',
      controller: 'ProcessingWallController',
      templateUrl: 'components/processingWall/views/processingWall.html',
      resolve: {
        params: function(LocalStorage) {
          return LocalStorage.getItem('params');
        },
        currentUser: function(RestModel, $stateParams, params) {
          return RestModel.getUserById($stateParams.userId, params);
        },
        friends: function(RestModel, $stateParams, params, currentUser) {
          return RestModel.getFriends(params, $stateParams.userId);
        }
      }
    }).state('commentsPhoto', {
      url: '/user/:userId/commentsPhoto',
      controller: 'CommentsPhotoController',
      templateUrl: 'components/commentsPhoto/views/commentsPhoto.html',
      resolve: {
        params: function(LocalStorage) {
          return LocalStorage.getItem('params');
        },
        currentUser: function(RestModel, $stateParams, params) {
          return RestModel.getUserById($stateParams.userId, params);
        },
        friends: function(RestModel, $stateParams, params, currentUser) {
          return RestModel.getFriends(params, $stateParams.userId);
        }
      }
    }).state('statistics', {
      url: '/statisticsFriends/:userId',
      controller: 'StatisticsFriendsController',
      templateUrl: 'components/statisticFriends/views/index.html',
      resolve: {
        params: function(LocalStorage) {
          return LocalStorage.getItem('params');
        },
        currentUser: function(RestModel, $stateParams, params) {
          return RestModel.moreInfo($stateParams.userId, params);
        },
        friends: function(RestModel, $stateParams, params, currentUser) {
          return RestModel.getFriends(params, $stateParams.userId);
        }
      }
    }).state('groups', {
      url: '/groups',
      controller: 'GroupsController',
      templateUrl: 'components/groups/views/group.html',
      resolve: {
        params: function(LocalStorage) {
          return LocalStorage.getItem('params');
        },
        groups: function(RestModel, params) {
          return RestModel.getGroupCurentUserAdmin(params.user_id, params);
        }
      }
    }).state('groupContent', {
      url: '/group/:groupId',
      controller: 'GroupContentController',
      templateUrl: 'components/groupContent/views/content.html',
      resolve: {
        params: function(LocalStorage) {
          return LocalStorage.getItem('params');
        },
        group: function($stateParams, RestModel, params) {
          return RestModel.getGroupById($stateParams.groupId, params);
        }
      }
    });
    return $urlRouterProvider.otherwise('/login');
  }
]);

MainModule.run(function($rootScope, $state) {
  return $rootScope.$on('$stateChangeSuccess', function() {
    return $('body').scrollTop(0);
  });
});

//# sourceMappingURL=config.map
