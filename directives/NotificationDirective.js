// Generated by CoffeeScript 1.7.1
'use_strict';
MainModule.directive('notification', function($http, $compile, $timeout) {
  return {
    restrict: 'E',
    link: function(scope, element) {
      scope.show = function(data, template) {
        var notification;
        scope = angular.extend(scope, data);
        notification = $compile(template)(scope);
        $('body').append(notification);
        console.log(notification);
        notification.show();
        return notification;
      };
      scope.close = function(notification) {
        console.log(1);
        return $('body').find(notification).remove();
      };
      return scope.$on('message:show', function(event, data) {
        var template;
        template = '/directives/views/notification.html';
        return $http.get(template).success(function(template_get) {
          var notice;
          notice = scope.show(data, template_get);
          return $timeout(function() {
            return scope.close(notice);
          }, 2000);
        });
      });
    }
  };
});

//# sourceMappingURL=NotificationDirective.map