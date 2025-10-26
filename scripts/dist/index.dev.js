"use strict";

var initialCards = [{
  name: "Golden Gate Bridge",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
}, {
  name: "Val Thorens",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
}, {
  name: "Restaurant terrace",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
}, {
  name: "An outdoor cafe",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
}, {
  name: "A very long bridge, over the forest and through the trees",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
}, {
  name: "Tunnel with morning light",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
}, {
  name: "Mountain house",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
}]; //import { initialCards } from "./data.js";

var editProfileBtn = document.querySelector(".profile__edit-btn");
var editProfileModal = document.querySelector("#edit-profile-modal");
var editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
var editProfileForm = editProfileModal.querySelector(".modal__form");
var editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
var editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");
var profileTitleEl = document.querySelector(".profile__title");
var profileDescriptionEl = document.querySelector(".profile__description");
var newPostBtn = document.querySelector(".profile__new-post-btn");
var newPostModal = document.querySelector("#new-post-modal");
var newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
var newPostForm = newPostModal.querySelector(".modal__form");
var newPostCardImageLinkInput = newPostModal.querySelector("#card-image-input");
var newPostCardCaptionInput = newPostModal.querySelector("#card-caption-input");
var previewImageModal = document.querySelector("#preview-image-modal");
var previewImagetCloseBtn = previewImageModal.querySelector(".modal__close-btn");
var previewImage = previewImageModal.querySelector(".modal__image");
var previewImageCaption = previewImageModal.querySelector(".modal__caption");
var cardsList = document.querySelector(".cards__list");
var cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

function getCardElement(data) {
  var cardElement = cardTemplate.cloneNode(true);
  var cardTitle = cardElement.querySelector(".card__title");
  var cardImageLink = cardElement.querySelector(".card__image");
  cardImageLink.src = data.link;
  cardImageLink.setAttribute("alt", data.name);
  cardTitle.textContent = data.name;
  var cardLikeBtn = cardElement.querySelector(".card__like-btn");
  cardLikeBtn.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-btn_active");
  });
  var cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtn.addEventListener("click", function () {
    cardElement.remove();
    /* other ways:
       cardDeleteBtn.closest(".card").remove();
       cardElement = null; */
  });
  cardImageLink.addEventListener("click", function () {
    previewImageCaption.textContent = data.name;
    previewImage.src = data.link;
    previewImage.alt = data.name;
    openModal(previewImageModal);
  });
  return cardElement;
}

previewImagetCloseBtn.addEventListener("click", function () {
  closeModal(previewImageModal);
});

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileTitleEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  var data = {
    name: newPostCardCaptionInput.value,
    link: newPostCardImageLinkInput.value
  };
  var cardElement = getCardElement(data);
  cardsList.prepend(cardElement);
  closeModal(newPostModal);
}

newPostForm.addEventListener("submit", handleNewPostSubmit);
editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileTitleEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
});
newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});
editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});
newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});
initialCards.forEach(function (card) {
  var cardElement = getCardElement(card);
  cardsList.append(cardElement);
});