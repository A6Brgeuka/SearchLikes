#GroupContentController#

'use strict';

GroupContentModule.controller 'GroupContentController', ($scope, $stateParams, $state, $timeout, Loader, $location, RestModel, Notification, LocalStorage, params, group) ->

    $scope.window = window;
    $scope.params = params;
    $scope.stateParams = $stateParams;
    $scope.loading = true;
    $scope.usersGroups = [];
    $scope.offset = 0;
    $scope.deactivated = [];
    $scope.localed = [];
    Loader.startLoad();


    $scope.group = group.response[0];
    console.log($scope.group);

    $scope.getAllUsersInGroup = (countUser = null) ->


        if ($scope.group.is_closed != 2) && !$scope.group.deactivated

            if countUser is null then countUser = $scope.group.members_count;

            if countUser < 25000
                $timeout(()->
                    console.log($scope.offset);
                    RestModel.getMemeberInGroup($scope.group.id, $scope.params, countUser, $scope.offset).then(
                        (data)->
                            angular.forEach(data.response, (item) ->
                                $scope.usersGroups.push(item.users);
                            )

                            $scope.offset = 0;
                            $scope.loading = false;

                            angular.forEach($scope.usersGroups, (arrayUsers)->
                                angular.forEach(arrayUsers, (user)->
                                    if user.deactivated then $scope.deactivated.push(user);
                                    if (user.city && $scope.group.city) && (user.city == $scope.group.city.id) then $scope.localed.push(user);
                                )

                            );
                            Loader.stopLoad();
                            $scope.procentDogs = Math.floor($scope.deactivated.length / $scope.group.members_count * 100);
                            $scope.procentLocal= Math.floor($scope.localed.length / $scope.group.members_count * 100);
                        (error)->
                            console.log(error);
                            $scope.getAllUsersInGroup(countUser);
                    )
                ,350)
            else
                $scope.arrayComments = [];
                $timeout(()->

                    RestModel.getMemeberInGroup($scope.group.id, $scope.params, countUser, $scope.offset).then(
                        (data)->
                            angular.forEach(data.response, (item) ->
                                $scope.usersGroups.push(item.users);

                                Loader.process(Math.floor($scope.usersGroups.length * 100 / Math.ceil($scope.group.members_count / 1000)));
                            )
                            $scope.offset = $scope.offset + 25000;
                            countUser = countUser - 25000;
                            $scope.getAllUsersInGroup(countUser);
                        (error)->
                            console.log(error);
                            $scope.getAllUsersInGroup(countUser);
                    )
                ,350);

        else
            $scope.loading = false;


    $scope.getAllUsersInGroup($scope.group.members_count);





    $scope.listGroups = () ->
        $state.transitionTo('groups');


    $scope.returnListFriends = () ->
        $state.transitionTo('friends');
