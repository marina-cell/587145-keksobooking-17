'use strict';

var TYPES = ['bungalo', 'flat', 'house', 'palace'];
var MIN_PRICES = [0, 1000, 5000, 10000];
var X_MIN = 0;
var Y_MIN = 130;
var Y_MAX = 630;
var OFFERS_NUMBER = 8;

var mapBlock = document.querySelector('.map');
var mainPin = mapBlock.querySelector('.map__pin--main');
var isActiveMode = false;
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
          'x': getRandomValue(X_MIN, mapBlock.clientWidth),
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
  var xCoordinate = Number(offer.location.x + pinImage.clientWidth / 2);
  var yCoodinate = Number(offer.location.y + pinImage.clientHeight);
  pinElement.style = 'left: ' + xCoordinate + 'px; top: ' + yCoodinate + 'px;';
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
  if (!isActiveMode) {
    mapBlock.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].disabled = false;
    }

    for (i = 0; i < filtersFormElements.length; i++) {
      filtersFormElements[i].disabled = false;
    }

    renderOffersOnMap(createOffersArray());
    isActiveMode = true;
  }
};

var setInactiveMode = function () {
  if (isActiveMode) {
    mapBlock.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].disabled = true;
    }

    for (i = 0; i < filtersFormElements.length; i++) {
      filtersFormElements[i].disabled = true;
    }

    isActiveMode = false;
  }
};

var setAddress = function (x, y) {
  addressInput.value = x + ', ' + y;
};

var setInitialMode = function () {
  setInactiveMode();
  setAddress(Math.round(mainPin.offsetLeft + mainPin.clientWidth / 2), Math.round(mainPin.offsetTop + mainPin.clientHeight / 2));
};

// Перемещение окна диалога
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

    xMovement = (xMovement < X_MIN) ? X_MIN : xMovement;
    xMovement = (xMovement > xMax) ? xMax : xMovement;

    yMovement = (yMovement < Y_MIN) ? Y_MIN : yMovement;
    yMovement = (yMovement > Y_MAX) ? Y_MAX : yMovement;

    mainPin.style.left = xMovement + 'px';
    mainPin.style.top = yMovement + 'px';

    setAddress(Math.round(xMovement + mainPin.clientWidth / 2), Math.round(yMovement + mainPin.clientHeight));
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    setAddress(Math.round(mainPin.offsetLeft + mainPin.clientWidth / 2), Math.round(mainPin.offsetTop + mainPin.clientHeight));
    setActiveMode();
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
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
