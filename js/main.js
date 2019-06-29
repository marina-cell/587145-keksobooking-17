'use strict';

var TYPES = ['bungalo', 'flat', 'house', 'palace'];
var MIN_PRICES = [0, 1000, 5000, 10000];
var Y_MIN = 130;
var Y_MAX = 630;
var OFFERS_NUMBER = 8;

var mapBlock = document.querySelector('.map');
var mainPin = mapBlock.querySelector('.map__pin--main');
var mapFiltersBlock = mapBlock.querySelector('.map__filters');
var adForm = document.querySelector('.ad-form');
var adFormElements = adForm.querySelectorAll('fieldset');
var filtersFormElements = mapFiltersBlock.children;
var addressInput = adForm.querySelector('#address');
var checkInTime = adForm.querySelector('#timein');
var checkOutTime = adForm.querySelector('#timeout');
var housingType = adForm.querySelector('#type');
var housingPrice = adForm.querySelector('#price');

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomValueFromArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomUniqueNumber = function (count) {
  var array = [];
  for (var i = 0; i < count; i++) {
    array[i] = i + 1;
  }
  array.sort(function () {
    return Math.random() - 0.5;
  });
  return array;
};

var createOffersArray = function () {
  var offers = [];
  var randomOfferNumbers = getRandomUniqueNumber(OFFERS_NUMBER);
  for (var i = 0; i < OFFERS_NUMBER; i++) {
    var offersItem =
      {
        'author': {
          'avatar': 'img/avatars/user0' + randomOfferNumbers[i] + '.png'
        },
        'offer': {
          'type': getRandomValueFromArray(TYPES)
        },
        'location': {
          'x': getRandomValue(0, document.documentElement.clientWidth),
          'y': getRandomValue(Y_MIN, Y_MAX)
        }
      };
    offers.push(offersItem);
  }

  return offers;
};

var renderOffer = function (offer) {
  mapBlock.classList.remove('map--faded');

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);
  var pinImage = pinElement.querySelector('img');

  // Находим координаты пина, учитывая размер изображения
  pinElement.style = 'left: ' + Number(offer.location.x + pinImage.width / 2) + 'px; top: ' + Number(offer.location.y + pinImage.height) + 'px;';
  pinImage.src = offer.author.avatar;
  pinImage.alt = 'Заголовок объявления';
  return pinElement;
};

var renderOffersOnMap = function (offers) {
  var mapElement = document.querySelector('.map__pins');
  var pinsFragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    pinsFragment.appendChild(renderOffer(offers[i]));
  }
  mapElement.appendChild(pinsFragment);
};

var setActiveMode = function () {
  mapBlock.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  for (var i = 0; i < adFormElements.length; i++) {
    adFormElements[i].disabled = false;
  }

  for (i = 0; i < filtersFormElements.length; i++) {
    filtersFormElements[i].disabled = false;
  }

  renderOffersOnMap(createOffersArray());
};

var setInactiveMode = function () {
  mapBlock.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');

  for (var i = 0; i < adFormElements.length; i++) {
    adFormElements[i].disabled = true;
  }

  for (i = 0; i < filtersFormElements.length; i++) {
    filtersFormElements[i].disabled = true;
  }
};

var setAddress = function (x, y) {
  addressInput.value = x + ', ' + y;
};

var setInitialMode = function () {
  setInactiveMode();
  var dimensions = mainPin.getBoundingClientRect();
  setAddress(Math.round(dimensions.left + dimensions.width / 2), Math.round(dimensions.top + dimensions.height / 2));
};

mainPin.addEventListener('click', setActiveMode);

mainPin.addEventListener('mouseup', function (evt) {
  setAddress(evt.clientX, evt.clientY); // не использовать координаты client, т.к. они относительно окна (без учета прокрутки)
});

checkInTime.addEventListener('change', function (evt) {
  checkOutTime.value = evt.target.value;
});

checkOutTime.addEventListener('change', function (evt) {
  checkInTime.value = evt.target.value;
});

housingType.addEventListener('change', function (evt) {
  var typeIndex = TYPES.indexOf(evt.target.value);
  if (typeIndex !== -1) {
    housingPrice.min = MIN_PRICES[typeIndex];
    housingPrice.placeholder = MIN_PRICES[typeIndex];
  }
});

setInitialMode();
