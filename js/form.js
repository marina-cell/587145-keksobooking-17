'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var checkInTime = adForm.querySelector('#timein');
  var checkOutTime = adForm.querySelector('#timeout');
  var housingType = adForm.querySelector('#type');
  var housingPrice = adForm.querySelector('#price');
  var roomNumber = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');

  var roomCapacityMap = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

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

  roomNumber.addEventListener('change', function (evt) {
    var capacityOptions = capacitySelect.querySelectorAll('option');
    var roomGuests = roomCapacityMap[evt.target.value];

    capacityOptions.forEach(function (it) {
      it.disabled = true;
    });

    roomGuests.forEach(function (it) {
      capacitySelect.querySelector('option' + '[value="' + it + '"]').disabled = false;
    });

    var message = roomGuests.indexOf(capacitySelect.value) === -1 ? 'Количество гостей не соответствует количеству комнат' : '';
    capacitySelect.setCustomValidity(message);
  });

  capacitySelect.addEventListener('change', function (evt) {
    evt.target.setCustomValidity('');
  });
}());
