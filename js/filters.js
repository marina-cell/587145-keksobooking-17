'use strict';

(function () {

  var filtersBlock = document.querySelector('.map__filters');
  var housingTypeFilter = filtersBlock.querySelector('#housing-type');
  var housingPriceFilter = filtersBlock.querySelector('#housing-price');
  var Price = {
    MIN: 10000,
    MAX: 50000
  };

  var getTypeFilteredData = function (array) {
    return array.filter(function (it) {
      return it.offer.type === housingTypeFilter.value;
    });
  };

  var getPriceFilteredData = function (array) {
    return array.filter(function (it) {
      var exp;
      switch (housingPriceFilter.value) {
        case 'middle':
          exp = it.offer.price >= Price.MIN && it.offer.price <= Price.MAX;
          break;
        case 'low':
          exp = it.offer.price < Price.MIN;
          break;
        case 'high':
          exp = it.offer.price > Price.MAX;
          break;
        default:
          exp = true;
          break;
      }
      return exp;
    });
  };

  var filterPins = function () {
    window.offers.filtered = window.offers.initial.slice();

    if (housingTypeFilter.value !== 'any') {
      window.offers.filtered = getTypeFilteredData(window.offers.filtered);
    }

    if (housingPriceFilter.value !== 'any') {
      window.offers.filtered = getPriceFilteredData(window.offers.filtered);
    }

    window.renderOffers();
  };

  housingTypeFilter.addEventListener('change', function () {
    filterPins();
  });

  housingPriceFilter.addEventListener('change', function () {
    filterPins();
  });
})();
