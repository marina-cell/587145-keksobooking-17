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

  window.renderOffers = function () {
    var mapElement = document.querySelector('.map__pins');
    var pins = mapElement.querySelectorAll('.map__pin');

    Array.from(pins).forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });

    var pinsFragment = document.createDocumentFragment();

    window.offers.filtered.forEach(function (pin) {
      pinsFragment.appendChild(renderOffer(pin));
    });

    mapElement.appendChild(pinsFragment);
  };
})();
