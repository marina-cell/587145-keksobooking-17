'use strict';

(function () {
  var renderPins = function (offer) {
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

    var onPinClick = function () {
      var mapCardRemovable = mapBlock.querySelector('.map__card');
      if (mapCardRemovable) {
        mapCardRemovable.remove();
      }
      renderPopup(offer);
    };

    pinElement.addEventListener('click', onPinClick);

    return pinElement;
  };

  var createFeatureFragment = function (element, offer) {
    var featureFragment = document.createDocumentFragment();
    var popupFeatures = element.querySelector('.popup__features');
    popupFeatures.innerHTML = '';

    offer.offer.features.forEach(function (feature) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + feature;
      featureFragment.appendChild(featureItem);
    });
    return featureFragment;
  };

  var createPhotoFragment = function (element, offer) {
    var photosFragment = document.createDocumentFragment();
    var popupPhotos = element.querySelector('.popup__photos');

    var popupPhotoElement = popupPhotos.removeChild(element.querySelector('.popup__photo'));

    offer.offer.photos.forEach(function (photo) {
      var imgElement = popupPhotoElement.cloneNode(true);
      imgElement.src = photo;
      photosFragment.appendChild(imgElement);
    });
    return photosFragment;
  };

  var renderPopup = function (offer) {
    var mapBlock = document.querySelector('.map');
    var mapFilters = mapBlock.querySelector('.map__filters-container');
    var popupTemplate = document.querySelector('#card').content.querySelector('.popup');
    var popupElement = popupTemplate.cloneNode(true);
    var typesMap = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    };

    popupElement.querySelector('.popup__avatar').src = offer.author.avatar;
    popupElement.querySelector('.popup__title').textContent = offer.offer.title;
    popupElement.querySelector('.popup__text--address').textContent = offer.offer.address;
    popupElement.querySelector('.popup__text--price').textContent = offer.offer.price + '₽/ночь';
    popupElement.querySelector('.popup__type').textContent = typesMap[offer.offer.type];
    popupElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    popupElement.querySelector('.popup__description').textContent = offer.offer.description;
    popupElement.querySelector('.popup__features').appendChild(createFeatureFragment(popupElement, offer));
    popupElement.querySelector('.popup__photos').appendChild(createPhotoFragment(popupElement, offer));

    var popupsFragment = document.createDocumentFragment();
    popupsFragment.appendChild(popupElement);
    mapBlock.insertBefore(popupsFragment, mapFilters);

    var closeBtn = popupElement.querySelector('.popup__close');

    var onEscPress = function (evt) {
      window.utils.doSmthIfEscEvent(evt, closePopup);
    };

    var closePopup = function () {
      popupElement.remove();
      document.removeEventListener('keydown', onEscPress);
    };

    closeBtn.addEventListener('click', closePopup);
    document.addEventListener('keydown', onEscPress);
  };

  window.renderOffers = function () {
    var mapElement = document.querySelector('.map');
    var mapPinsElement = mapElement.querySelector('.map__pins');
    var pinsFragment = document.createDocumentFragment();

    window.removeOffers();
    window.offers.filtered.forEach(function (it) {
      pinsFragment.appendChild(renderPins(it));
    });

    mapPinsElement.appendChild(pinsFragment);
  };

  window.removeOffers = function () {
    var pins = document.querySelectorAll('.map__pin');

    Array.from(pins).forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
  };
})();
