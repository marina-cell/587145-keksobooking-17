'use strict';

(function () {
  var X_MIN = 0;
  var Y_MIN = 130;
  var Y_MAX = 630;

  var mapBlock = document.querySelector('.map');

  window.createMock = function () {
    var offers = [];
    var randomOfferNumbers = window.utils.getRandomUniqueNumber(window.offerParams.OFFERS_NUMBER);
    for (var i = 0; i < window.offerParams.OFFERS_NUMBER; i++) {
      var offersItem =
        {
          'author': {
            'avatar': 'img/avatars/user0' + randomOfferNumbers[i] + '.png'
          },
          'offer': {
            'type': window.utils.getRandomValueFromArray(window.offerParams.TYPES).type
          },
          'location': {
            'x': window.utils.getRandomValue(X_MIN, mapBlock.clientWidth),
            'y': window.utils.getRandomValue(Y_MIN, Y_MAX)
          }
        };
      offers.push(offersItem);
    }
    return offers;
  };
})();
