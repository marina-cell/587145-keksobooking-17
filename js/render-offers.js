'use strict';

(function () {
  var renderOffer = function (offer) {
    var mapBlock = document.querySelector('.map');
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

  window.renderOffers = function (offers) {
    var mapElement = document.querySelector('.map__pins');
    var pinsFragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      pinsFragment.appendChild(renderOffer(offers[i]));
    }
    mapElement.appendChild(pinsFragment);
  };
})();
