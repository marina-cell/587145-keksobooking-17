'use strict';

(function () {

  var filtersBlock = document.querySelector('.map__filters');
  var housingTypeFilter = filtersBlock.querySelector('#housing-type');

  var getFilteredData = function (array) {
    return array.filter(function (it) {
      return it.offer.type === housingTypeFilter.value;
    });
  };

  var filterPins = function (filter) {
    window.offers.filtered = window.offers.initial.slice();
    if (filter === housingTypeFilter) {
      if (housingTypeFilter.value !== 'any') {
        window.offers.filtered = getFilteredData(window.offers.filtered);
      }
    }
    window.renderOffers();
  };

  housingTypeFilter.addEventListener('change', function (evt) {
    filterPins(evt.target);
  });
})();
