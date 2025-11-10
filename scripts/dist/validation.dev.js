"use strict";

var settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitBtnSelector: ".modal__submit-btn",
  inactiveBtnClass: "modal__btn_disabled",
  inputErrorClass: "modal__input_type_error"
};

var showInputError = function showInputError(formElement, inputElement, errorMessage, config) {
  var errorElement = formElement.querySelector(".".concat(inputElement.id, "-error"));
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
};

var hideInputError = function hideInputError(formElement, inputElement, config) {
  var errorElement = formElement.querySelector(".".concat(inputElement.id, "-error"));
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
};

var checkInputValidity = function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

var hasInvalidInput = function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
};

var toggleBtnState = function toggleBtnState(inputList, btnElement, config) {
  if (hasInvalidInput(inputList)) {
    btnElement.classList.add(config.inactiveBtnClass);
    btnElement.disabled = true;
  } else {
    btnElement.classList.remove(config.inactiveBtnClass);
    btnElement.disabled = false;
  }
};

var setEventListeners = function setEventListeners(formElement, config) {
  var inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  var btnElement = formElement.querySelector(config.submitBtnSelector);
  toggleBtnState(inputList, btnElement, config);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleBtnState(inputList, btnElement, config);
    });
  });
};

var enableValidation = function enableValidation(config) {
  var formList = document.querySelectorAll(config.formSelector);
  formList.forEach(function (formElement) {
    setEventListeners(formElement, config);
  });
};

enableValidation(settings);