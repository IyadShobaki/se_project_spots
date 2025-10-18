"use strict";

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

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileTitleEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  console.log(newPostCardImageLinkInput.value);
  console.log(newPostCardCaptionInput.value);
  newPostModal.classList.remove("modal_is-opened");
}

newPostForm.addEventListener("submit", handleNewPostSubmit);
editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileTitleEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  editProfileModal.classList.add("modal_is-opened");
});
editProfileForm.addEventListener("submit", handleEditProfileSubmit);
editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileTitleEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  editProfileModal.classList.add("modal_is-opened");
});
newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});
editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});
newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});