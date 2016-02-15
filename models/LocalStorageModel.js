// Generated by CoffeeScript 1.7.1
'use strict';
MainModule.factory('LocalStorage', function() {
  var LocalStorage;
  LocalStorage = (function() {
    function LocalStorage() {}

    return LocalStorage;

  })();
  return {
    setItem: function(name, item) {
      if (angular.isObject(item) || angular.isArray(item)) {
        item = angular.toJson(item);
      }
      return window.localStorage.setItem(name, item);
    },
    getItem: function(name, item) {
      var e;
      item = window.localStorage.getItem(name);
      try {
        item = angular.fromJson(item);
      } catch (_error) {
        e = _error;
        console.log(e);
      }
      return item;
    },
    removeAllItem: function() {
      return window.localStorage.clear();
    }
  };
});

//# sourceMappingURL=LocalStorageModel.map
