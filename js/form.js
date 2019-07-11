'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var checkInTime = adForm.querySelector('#timein');
  var checkOutTime = adForm.querySelector('#timeout');
  var housingType = adForm.querySelector('#type');
  var housingPrice = adForm.querySelector('#price');

  checkInTime.addEventListener('change', function (evt) {
    checkOutTime.value = evt.target.value;
  });

  checkOutTime.addEventListener('change', function (evt) {
    checkInTime.value = evt.target.value;
  });

  housingType.addEventListener('change', function (evt) {
    var typeIndex = window.offerParams.TYPES.indexOf(evt.target.value);
    if (typeIndex !== -1) {
      housingPrice.min = window.offerParams.MIN_PRICES[typeIndex];
      housingPrice.placeholder = window.offerParams.MIN_PRICES[typeIndex];
    }
  });
}());
