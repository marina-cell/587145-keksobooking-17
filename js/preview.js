'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var houseChooser = document.querySelector('#images');
  var housePreviewBlock = document.querySelector('.ad-form__photo');

  var renderPreviewImage = function (field, previewImage) {
    field.src = previewImage;
  };

  var readPhotos = function (source, field) {
    var file = source.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        renderPreviewImage(field, reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  houseChooser.addEventListener('change', function () {
    var housePreview = document.createElement('img');
    housePreview.width = '70';
    housePreview.height = '70';
    housePreviewBlock.appendChild(housePreview);
    renderPreviewImage(housePreview, '');
    readPhotos(houseChooser, housePreview);
  });

  avatarChooser.addEventListener('change', function () {
    renderPreviewImage(avatarPreview, '');
    readPhotos(avatarChooser, avatarPreview);
  });
})();
