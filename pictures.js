'use strict';

var MIN_LIKES = 15;
var MAX_LIKES = 201;
var PICTURES_AMOUNT = 25;


var commentsArray = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var descriptionsArray = ['Тестим новую камеру!', 'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];

var generateRandom = function (min, max) {
  var item = Math.floor(Math.random() * (max - min) + min);
  return item;
};

var pictures = [];

function PictureConstructor(url, likes, comments, description,id) {
  this.url = url;
  this.likes = likes;
  this.comments = comments;
  this.description = description;
  this.id = id;
}

var createPicturesArray = function (array) {
  for (var i = 1; i <= PICTURES_AMOUNT; i++) {
    var randomComment = commentsArray[generateRandom(0, commentsArray.length)];
    var randomLikes = generateRandom(MIN_LIKES, MAX_LIKES);
    var randomDescription = descriptionsArray[generateRandom(0, descriptionsArray.length)];
    var CreatePicture = new PictureConstructor('photos/' + i + '.jpg', randomLikes, randomComment, randomDescription, i + 'picture');

    pictures.push(CreatePicture);
  }
  return array;
};

createPicturesArray(pictures);

var pictiresList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

var createPicture = function (image) {
  var singlePicture = pictureTemplate.cloneNode(true);
  singlePicture.querySelector('.picture__img').src = image.url;
  singlePicture.querySelector('.picture__stat--likes').image = image.likes;
  singlePicture.querySelector('.picture__stat--comments').textContent = image.comments;
  singlePicture.querySelector('.picture__img').id = image.id


  return singlePicture;
};

var drawPicturesList = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 1; i < array.length; i++) {
    fragment.appendChild(createPicture(pictures[i]));
    pictiresList.appendChild(fragment);
  }
};

drawPicturesList(pictures);

var showBigPicture = function(image) {
var mainPicture = document.querySelector('.big-picture');
mainPicture.classList.remove('hidden');
mainPicture.querySelector('img').src = image.url;
mainPicture.querySelector('.likes-count').textContent = image.likes;
mainPicture.querySelector('.comments-count').textContent = commentsArray.length;
}

var avatars = document.querySelectorAll('.social__picture');

for (var i = 0; i < avatars.length; i++) {
  avatars[i].src = 'img/avatar-' + generateRandom(1, 7) + '.svg';
}

var hideElement = function (element) {
  element.setAttribute('class', 'visually-hidden');
};

hideElement(document.querySelector('.social__comment-count'));
hideElement(document.querySelector('.social__comment-loadmore'));

var uploadFile = document.querySelector('.img-upload__input');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');

uploadFile.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
  document.querySelector('.resize__control--value').value = '100%';
});

var closeImageButton = document.querySelector('.img-upload__cancel');

closeImageButton.addEventListener('click', function () {
  imgUploadOverlay.classList.add('hidden');
});

var minusButton = document.querySelector('.resize__control--minus');
var plusButton = document.querySelector('.resize__control--plus');


var minus = 100;
minusButton.addEventListener('click', function() {
if (minus > 25) {
document.querySelector('.resize__control--value').value = (minus -=25).toString() + '%';
}

document.querySelector('.img-upload__preview').style.transform = 'scale(' + minus/100 + ')';
});

plusButton.addEventListener('click', function() {
if (minus < 100) {
document.querySelector('.resize__control--value').value = (minus +=25).toString() + '%';
}

document.querySelector('.img-upload__preview').style.transform = 'scale(' + minus/100 + ')';
});

var dragBall = document.querySelector('.scale__pin');
var imageContainer = document.querySelector('.img-upload__preview');
var radio = document.querySelectorAll('.effects__radio');
var filterContainer = document.querySelectorAll('.effects__list');

dragBall.addEventListener('mouseup', function() {
  document.querySelector('.scale__value').value = '100';
  if (document.getElementById('effect-chrome').checked) {
    imageContainer.querySelector('img').style.filter = 'grayscale(' + Number(document.querySelector('.scale__value').value) + '%)';
  }

  if (document.getElementById('effect-marvin').checked) {
      imageContainer.querySelector('img').style.filter = 'invert(' + Number(document.querySelector('.scale__value').value) + '%)';
  }

  if (document.getElementById('effect-phobos').checked) {
    imageContainer.querySelector('img').style.filter = 'blur(' + 3/100 *  Number(document.querySelector('.scale__value').value) + 'px)';
  }

  if (document.getElementById('effect-heat').checked) {
    imageContainer.querySelector('img').style.filter = 'brightness('+ 3/100 *  Number(document.querySelector('.scale__value').value) + ')';
  }

  if (document.getElementById('effect-sepia').checked) {
    imageContainer.querySelector('img').style.filter = 'sepia(' + Number(document.querySelector('.scale__value').value) + '%)';
  }
});

document.getElementById('effect-none').addEventListener('change', function() {
  imageContainer.querySelector('img').style.filter = 'none';
  document.querySelector('.img-upload__scale').classList.add('hidden');
});

document.getElementById('effect-chrome').addEventListener('change', function() {
  imageContainer.querySelector('img').style.filter = 'grayscale(' + Number(document.querySelector('.scale__value').value) + '%)';
  document.querySelector('.img-upload__scale').classList.remove('hidden');

});

document.getElementById('effect-sepia').addEventListener('change', function() {
  imageContainer.querySelector('img').style.filter = 'sepia(' + Number(document.querySelector('.scale__value').value) + '%)';
  document.querySelector('.img-upload__scale').classList.remove('hidden');

});

document.getElementById('effect-marvin').addEventListener('change', function() {
  imageContainer.querySelector('img').style.filter = 'invert(' + Number(document.querySelector('.scale__value').value) + '%)';
  document.querySelector('.img-upload__scale').classList.remove('hidden');
});

document.getElementById('effect-phobos').addEventListener('change', function() {
  imageContainer.querySelector('img').style.filter = 'blur(' + 3/100 *  Number(document.querySelector('.scale__value').value) + 'px)';
  document.querySelector('.img-upload__scale').classList.remove('hidden');
});

document.getElementById('effect-heat').addEventListener('change', function() {
  imageContainer.querySelector('img').style.filter = 'brightness('+ 3/100 *  Number(document.querySelector('.scale__value').value) + ')';
  document.querySelector('.img-upload__scale').classList.remove('hidden');
});

document.querySelector('.big-picture__cancel').addEventListener('click', function() {
  document.querySelector('.big-picture').classList.add('hidden');
});


var find = function(value) {
  var index = 0;
  for (var i = 0; i < pictures.length; i++) {
    if (pictures[i].id == value) {
       var index = i;
    }
    showBigPicture(pictures[index])
  }
};

var targetPicture = document.querySelector('.pictures');

document.addEventListener('click', function(evt) {
  var target = evt.target;
  var img = target.closest('img');
  if (!img) return;
  var someId = target.id;
  find(someId);
});

var hashTags = document.querySelector('.text__hashtags').value;
var splitter = hashTags.split(' ');


var invalidities = [];

  // Метод, проверяющий валидность
var checkValidity = function(input) {
  if (splitter.length > 5) {
    invalidities.push('Не больше 5 хэштегов');
  }
};
var checkSymbolValidity = function(input) {
  for (var i = 0, i < splitter.length, i ++) {
    if (splitter[i] != '#') {
      invalidities.push('Хэштэг должен содержать #, хотя бы одну букву и быть не длиннее 20 символов');
    }
  }
};
var checkoutMatchValidity = function(input) {
  for (var i = 0, i < splitter.length, i ++) {
    var currentTag = splitter[i];
    for (var j = i + 1, i < splitter.length - 1, j ++) {
       if (currentTag.toUpperCase() == splitter[j].toUpperCase()) {
         invalidities.push('Хэштэги не должны повторяться');
       }
    }
  }
};
