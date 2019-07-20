'use strict';

(function () {

  var successHandler = function (offersForRender) {
    var offers = offersForRender.slice(0, window.offerParams.MAX_COUNT);
    window.offers = {
      initial: offers,
      filtered: offers
    };
  };

  window.backend.load(successHandler, window.backend.errorHandler);
})();
