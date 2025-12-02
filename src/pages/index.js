import "./index.css";
import {
  enableValidation,
  hideInputError,
  settings,
} from "../scripts/validation.js";
import Api from "../utils/api.js";
import { setButtonText } from "../utils/helper.js";

// API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3deb5cb0-25cc-41a0-b81d-23c312c12744",
    "Content-Type": "application/json",
  },
});

// Populate cards and profile Api request
let cardsArray;
api
  .getAppInfo()
  .then(([cards, user]) => {
    cardsArray = cards;
    cardsArray.forEach((card) => {
      const cardElement = getCardElement(card);
      cardsList.append(cardElement);
    });
    profileTitleEl.textContent = user.name;
    profileDescriptionEl.textContent = user.about;
    profileAvatarEl.src = user.avatar;
  })
  .catch(console.error);

// Avatar form elements
const editAvatarBtn = document.querySelector(".profile__avatar-btn");
const editAvatarModal = document.querySelector("#avatar-modal");
const editAvatarCloseBtn = editAvatarModal.querySelector(".modal__close-btn");
const editAvatarForm = editAvatarModal.querySelector(".modal__form");
const editAvatarSubmitBtn = editAvatarModal.querySelector(".modal__submit-btn");
const editAvatarInput = editAvatarModal.querySelector("#profile-avatar-input");
const profileAvatarEl = document.querySelector(".profile__avatar");

// Edit profile elements
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileSubmitBtn =
  editProfileModal.querySelector(".modal__submit-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const profileTitleEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");

// Card form elements
const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostCardImageLinkInput =
  newPostModal.querySelector("#card-image-input");
const newPostCardCaptionInput = newPostModal.querySelector(
  "#card-caption-input"
);

// Preview image popup elements
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageCloseBtn =
  previewImageModal.querySelector(".modal__close-btn");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewImageCaption = previewImageModal.querySelector(".modal__caption");

// Confirmation popup elements

const confirmationModal = document.querySelector("#confirmation-modal");
const confirmationtForm = confirmationModal.querySelector(".modal__form");

let selectedCard, selcetedCardId;

// Cards related elements
const cardsList = document.querySelector(".cards__list");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImageLink = cardElement.querySelector(".card__image");

  cardImageLink.src = data.link;
  cardImageLink.setAttribute("alt", data.name);
  cardTitle.textContent = data.name;

  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  if (data.isLiked) cardLikeBtn.classList.add("card__like-btn_active");
  cardLikeBtn.addEventListener("click", (evt) => handleLikeBtnClick(evt, data));

  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtn.addEventListener("click", () =>
    handleDeleteBtnClick(cardElement, data)
  );

  cardImageLink.addEventListener("click", () => {
    previewImageCaption.textContent = data.name;
    previewImage.src = data.link;
    previewImage.alt = data.name;
    openModal(previewImageModal);
  });

  return cardElement;
}

previewImageCloseBtn.addEventListener("click", () => {
  closeModal(previewImageModal);
});

// Open and close modals functions
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keyup", closeOnEscape);
  modal.addEventListener("mousedown", closeOnOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keyup", closeOnEscape);
  modal.removeEventListener("mousedown", closeOnOverlayClick);
}

function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_is-opened");
    closeModal(modal);
  }
}

function closeOnOverlayClick(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

// Edit profile open/close modal and handle form submission

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileTitleEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  hideInputError(editProfileModal, editProfileNameInput, settings);
  hideInputError(editProfileModal, editProfileDescriptionInput, settings);
  openModal(editProfileModal);
});

function handleEditProfileSubmit(evt) {
  if (!editProfileForm.checkValidity()) return;
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((updatedUser) => {
      profileTitleEl.textContent = updatedUser.name;
      profileDescriptionEl.textContent = updatedUser.about;
      editProfileSubmitBtn.classList.add(settings.inactiveBtnClass);
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

// Card open/close modal and handle form submission
newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

function handleNewPostSubmit(evt) {
  if (!newPostForm.checkValidity()) return;
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .createNewCard({
      name: newPostCardCaptionInput.value,
      link: newPostCardImageLinkInput.value,
    })
    .then((card) => {
      const data = {
        name: card.name,
        link: card.link,
      };
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);
      newPostSubmitBtn.classList.add(settings.inactiveBtnClass);
      evt.target.reset();
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

// Avatar open/close modal and handle form submission
editAvatarBtn.addEventListener("click", () => {
  openModal(editAvatarModal);
});

function handleEditAvatarSubmit(evt) {
  if (!editAvatarForm.checkValidity()) return;
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  api
    .editAvatar(editAvatarInput.value)
    .then((data) => {
      profileAvatarEl.src = data.avatar;
      editAvatarSubmitBtn.classList.add(settings.inactiveBtnClass);
      evt.target.reset();
      closeModal(editAvatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

editAvatarForm.addEventListener("submit", handleEditAvatarSubmit);

editAvatarCloseBtn.addEventListener("click", () => {
  closeModal(editAvatarModal);
});

// Confirmation open/close modal and handle form submission

function handleDeleteBtnClick(cardElement, data) {
  selectedCard = cardElement;
  selcetedCardId = data._id;
  openModal(confirmationModal);
}

function handleDeleteCardSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .deleteCard(selcetedCardId)
    .then(() => {
      selectedCard.remove();
      selectedCard = "";
      selcetedCardId = "";
      closeModal(confirmationModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

confirmationtForm.addEventListener("submit", handleDeleteCardSubmit);

confirmationModal.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("modal__close-btn") ||
    evt.target.classList.contains("modale__submit-btn_type_cancel")
  ) {
    selectedCard = "";
    selcetedCardId = "";
    closeModal(confirmationModal);
  }
});

function handleLikeBtnClick(evt, data) {
  //const isLiked = evt.target.classList.contains("card__like-btn_active");
  api
    .toggleLike(data._id, data.isLiked) // isLiked)
    .then((updatedCard) => {
      const index = cardsArray.findIndex((card) => card._id === data._id);

      cardsArray[index] = updatedCard;
      cardsList.innerHTML = "";
      cardsArray.forEach((card) => {
        const cardElement = getCardElement(card);
        cardsList.append(cardElement);
      });
      //evt.target.classList.toggle("card__like-btn_active");
    })
    .catch(console.error);
}
enableValidation(settings);
