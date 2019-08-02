'use strict';

window.utils = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    doSmthIfEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    doSmthIfEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomValue: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    getRandomValueFromArray: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    getRandomUniqueNumber: function (count) {
      var array = [];
      for (var i = 0; i < count; i++) {
        array[i] = i + 1;
      }
      array.sort(function () {
        return Math.random() - 0.5;
      });
      return array;
    },
  };
})();
