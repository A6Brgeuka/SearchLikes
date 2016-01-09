#config#

'use strict';

MainModule.config ['$httpProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider', '$sceDelegateProvider'
    ($httpProvider, $locationProvider, $stateProvider, $urlRouterProvider, $sceDelegateProvider) ->
        $httpProvider.defaults.useXDomain = true;

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $httpProvider.defaults.headers.common =
            'Accept': 'application/hal+json'

        $httpProvider.defaults.headers.post =
            'Content-Type': 'application/json'


        # включаем html5-режим работы с урлами
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        $sceDelegateProvider.resourceUrlWhitelist(['**']);

#        $routeProvider.when('/login',
#            controller: 'MainController',
#            templateUrl: 'index.html'
#        )
#
#        $routeProvider.when('/project',
#            controller: 'ProjectController'
#            templateUrl: 'components/views/project.html'
#            resolve:
#                params: (LocalStorage) -> LocalStorage.getItem('params');
#        )

        $stateProvider

        .state('friends',
            url         : '/friends',
            controller  : 'FriendsController',
            templateUrl : 'components/friends/views/index.html',
            resolve     :
                params: (LocalStorage) -> LocalStorage.getItem('params')
        )

        .state('user',
            url         : '/user/:userId',
            controller  : 'UserController',
            templateUrl : 'components/user/views/index.html',
            resolve     :
                params: (LocalStorage) -> LocalStorage.getItem('params');
                user: ($stateParams, LocalStorage, RestModel) -> RestModel.moreInfo($stateParams.userId, LocalStorage.getItem('params'));
        )

        .state('wall',
            url         : '/user/:userId/selected/:selectedId/wall',
            controller  : 'WallController',
            templateUrl : 'components/wall/views/index.html',
            resolve     :
                user: ($stateParams, LocalStorage, RestModel) -> RestModel.moreInfo($stateParams.userId, LocalStorage.getItem('params'));
                params: (LocalStorage) -> LocalStorage.getItem('params');
        )

        .state('photo',
            url         : '/user/:userId/selected/:selectedId/photo',
            controller  : 'PhotoController',
            templateUrl : 'components/photo/views/index.html',
            resolve     :
                user: ($stateParams, LocalStorage, RestModel) -> RestModel.moreInfo($stateParams.userId, LocalStorage.getItem('params'));
                params: (LocalStorage) -> LocalStorage.getItem('params');
        )

        .state('user-friend',
            url         : '/user/:userId/friends',
            controller  : 'UserFriendsController',
            templateUrl : 'components/userFriendsList/views/index.html',
            resolve     :
                params: (LocalStorage) -> LocalStorage.getItem('params');
        )

        .state('selected',
            url         : '/user/:userId/selected/:type',
            controller  : 'SelectedController',
            templateUrl : 'components/selected/views/index.html',
            resolve     :
                params: (LocalStorage) -> LocalStorage.getItem('params');
        )

        .state('tetris',
            url         : '/tetris',
            controller  : 'tetris',
            templateUrl : 'tetris/index.html',
        )

#        .when('/gallery',
#            controller: 'GalleryController',
#            templateUrl: 'components/gallery/views/index.html'
#        );

        $urlRouterProvider.otherwise('/login');
    ]
