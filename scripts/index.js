const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];
//import { initialCards } from "./data.js";

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const profileTitleEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostCardImageLinkInput =
  newPostModal.querySelector("#card-image-input");
const newPostCardCaptionInput = newPostModal.querySelector(
  "#card-caption-input"
);

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImagetCloseBtn =
  previewImageModal.querySelector(".modal__close-btn");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewImageCaption = previewImageModal.querySelector(".modal__caption");

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
  cardLikeBtn.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-btn_active");
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
    /* other ways:
       cardDeleteBtn.closest(".card").remove();
       cardElement = null; */
  });

  cardImageLink.addEventListener("click", () => {
    previewImageCaption.textContent = data.name;
    previewImage.src = data.link;
    previewImage.alt = data.name;
    openModal(previewImageModal);
  });

  return cardElement;
}
previewImagetCloseBtn.addEventListener("click", () => {
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
  const data = {
    name: newPostCardCaptionInput.value,
    link: newPostCardImageLinkInput.value,
  };
  const cardElement = getCardElement(data);
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

initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  cardsList.append(cardElement);
});
