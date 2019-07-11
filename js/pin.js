'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  // var mapFiltersBlock = mapBlock.querySelector('.map__filters');
  var mainPin = mapBlock.querySelector('.map__pin--main');
  // var adForm = document.querySelector('.ad-form');
  // var adFormElements = adForm.querySelectorAll('fieldset');
  // var filtersFormElements = mapFiltersBlock.children;
  // var addressInput = adForm.querySelector('#address');
  // var isActiveMode = false;

  // Перемещение метки
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.pageX,
        y: startCoords.y - moveEvt.pageY
      };

      startCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      var xMovement = mainPin.offsetLeft - shift.x;
      var yMovement = mainPin.offsetTop - shift.y;

      var xMax = mapBlock.clientWidth - mainPin.clientWidth;

      xMovement = (xMovement < window.map.sizes.X_MIN) ? window.map.sizes.X_MIN : xMovement;
      xMovement = (xMovement > xMax) ? xMax : xMovement;

      yMovement = (yMovement < window.map.sizes.Y_MIN) ? window.map.sizes.Y_MIN : yMovement;
      yMovement = (yMovement > window.map.sizes.Y_MAX) ? window.map.sizes.Y_MAX : yMovement;

      mainPin.style.left = xMovement + 'px';
      mainPin.style.top = yMovement + 'px';

      // Заполнение строки "Адрес" (координатами острого конца метки)
      window.map.setAddress(Math.round(xMovement + mainPin.clientWidth / 2), Math.round(yMovement + mainPin.clientHeight));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      window.map.setAddress(Math.round(mainPin.offsetLeft + mainPin.clientWidth / 2), Math.round(mainPin.offsetTop + mainPin.clientHeight));
      window.map.setActiveMode();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
