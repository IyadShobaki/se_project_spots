"use strict";

var editProfileBtn = document.querySelector(".profile__edit-btn");
var editProfileModal = document.querySelector("#edit-profile-modal");
var editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
var newPostBtn = document.querySelector(".profile__new-post-btn");
var newPostModal = document.querySelector("#new-post-modal");
var newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
editProfileBtn.addEventListener("click", function () {
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