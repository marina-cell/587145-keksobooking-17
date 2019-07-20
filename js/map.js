'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mapFiltersBlock = mapBlock.querySelector('.map__filters');
  var mainPin = mapBlock.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.querySelectorAll('fieldset');
  var filtersFormElements = mapFiltersBlock.children;
  var addressInput = adForm.querySelector('#address');
  var isActiveMode = false;

  window.map = {
    sizes: {
      X_MIN: 0,
      Y_MIN: 130,
      Y_MAX: 630
    },
    setAddress: function (x, y) {
      addressInput.value = x + ', ' + y;
    },
    setActiveMode: function () {
      if (!isActiveMode) {
        mapBlock.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');

        for (var i = 0; i < adFormElements.length; i++) {
          adFormElements[i].disabled = false;
        }

        for (i = 0; i < filtersFormElements.length; i++) {
          filtersFormElements[i].disabled = false;
        }

        window.renderOffers();
        isActiveMode = true;
      }
    },
    setInactiveMode: function () {
      mapBlock.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');

      for (var i = 0; i < adFormElements.length; i++) {
        adFormElements[i].disabled = true;
      }

      for (i = 0; i < filtersFormElements.length; i++) {
        filtersFormElements[i].disabled = true;
      }

      // Заполнение строки "Адрес" (координатами центра круглой метки)
      this.setAddress(Math.round(mainPin.offsetLeft + mainPin.clientWidth / 2), Math.round(mainPin.offsetTop + mainPin.clientHeight / 2));

      isActiveMode = false;
    }
  };

  window.map.setInactiveMode();
})();
