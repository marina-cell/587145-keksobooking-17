'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var Y_MIN = 130;
var Y_MAX = 630;
var OFFERS_NUMBER = 8;

var mapBlock = document.querySelector('.map');

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

mapBlock.classList.remove('map--faded');
renderOffersOnMap(createOffersArray());
