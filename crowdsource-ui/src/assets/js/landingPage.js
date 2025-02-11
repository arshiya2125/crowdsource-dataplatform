const { onActiveNavbar, onChangeUser, showUserProfile, onOpenUserDropDown } = require('./header');
const { redirectToLocalisedPage, changeLocale } = require('./locale');
const { setDropdownValues } = require('../../../build/js/common/header');
const { CONTRIBUTION_LANGUAGE, SPEAKER_DETAILS_KEY, DEFAULT_CON_LANGUAGE } = require('./constants');
const { hasUserRegistered } = require('./common');

$(document).ready(function () {
  localStorage.setItem('module', 'home');

  if (!localStorage.getItem("i18n")) {
    localStorage.setItem(CONTRIBUTION_LANGUAGE, DEFAULT_CON_LANGUAGE);
    changeLocale("en");
    return;
  } else {
    redirectToLocalisedPage();
    setDropdownValues();
  }
  onActiveNavbar('home');
  if (hasUserRegistered()) {
    const speakerDetails = localStorage.getItem(SPEAKER_DETAILS_KEY);
    const localSpeakerDataParsed = JSON.parse(speakerDetails);
    showUserProfile(localSpeakerDataParsed.userName);
  }
  onChangeUser('./home.html', 'home');
  onOpenUserDropDown();
});