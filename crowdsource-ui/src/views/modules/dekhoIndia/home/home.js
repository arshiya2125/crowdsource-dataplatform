const { onActiveNavbar ,onChangeUser, showUserProfile,onOpenUserDropDown } = require('../common/header');
const {redirectToLocalisedPage, showFucntionalCards, getAvailableLanguages,hasUserRegistered,updateLocaleLanguagesDropdown} = require('../common/common');
const { getLocaleString} = require('../common/utils');
const {
  setUserModalOnShown,
  setUserNameOnInputFocus,
  setStartRecordingBtnOnClick,
  setGenderRadioButtonOnClick
} = require('../common/speakerDetails');

const {addToLanguage} = require('../common/languageNavBar')
const {getStatsSummary} = require('../common/commonHome');

const {
  DEFAULT_CON_LANGUAGE,
  CONTRIBUTION_LANGUAGE,
  CURRENT_MODULE,
  MODULE,
  SPEAKER_DETAILS_KEY,
  ALL_LANGUAGES
} = require('../common/constants');

const { initializeFeedbackModal } = require('../common/feedback');

function initializeBlock() {
  const $userName = $('#username');

  let top_lang = localStorage.getItem(CONTRIBUTION_LANGUAGE);
  if(!top_lang){
    localStorage.setItem(CONTRIBUTION_LANGUAGE, DEFAULT_CON_LANGUAGE);
    top_lang = DEFAULT_CON_LANGUAGE;
  }

  updateLocaleLanguagesDropdown(top_lang)

  addToLanguage('from-language', ALL_LANGUAGES);
  let fromLanguage = localStorage.getItem(CONTRIBUTION_LANGUAGE);

  if (fromLanguage) {
    $(`#from-language option[value=${fromLanguage}]`).attr("selected", "selected");
  }

  $('#from-language').on('change', (e) => {
    fromLanguage = e.target.value;
    top_lang = fromLanguage;
    localStorage.setItem(CONTRIBUTION_LANGUAGE, fromLanguage);
    localStorage.setItem("i18n", "en");
    redirectToLocalisedPage();
    getStatsSummary('/stats/summary/ocr',MODULE.dekho.value, ()=>{});
    showFucntionalCards('ocr', fromLanguage);
  });

  $('#start_recording').on('click', () => {
    localStorage.setItem(CONTRIBUTION_LANGUAGE, top_lang);
    localStorage.setItem("selectedType", "contribute");
    if(!hasUserRegistered()){
      $('#userModal').modal('show');
      setStartRecordingBtnOnClick('./record.html',MODULE.dekho.value);
    } else {
      location.href ='./record.html';
    }
  });

  $('#start_validating').on('click',()=>{
    localStorage.setItem(CONTRIBUTION_LANGUAGE, top_lang);
    localStorage.setItem("selectedType", "validate");
    if(!hasUserRegistered()){
      $('#userModal').modal('show');
      setStartRecordingBtnOnClick('./validator-page.html',MODULE.dekho.value);
    } else {
      location.href ='./validator-page.html';
    }
  })
  const language = localStorage.getItem(CONTRIBUTION_LANGUAGE);
  showFucntionalCards('ocr', language);
  getStatsSummary('/stats/summary/ocr',MODULE.dekho.value, ()=>{});

  const $startRecordBtn = $('#proceed-box');
  const $startRecordBtnTooltip = $startRecordBtn.parent();

  setUserModalOnShown($userName);
  $startRecordBtnTooltip.tooltip('disable');
  setGenderRadioButtonOnClick();
  setUserNameOnInputFocus();
  if(hasUserRegistered()){
    const speakerDetails = localStorage.getItem(SPEAKER_DETAILS_KEY);
    const localSpeakerDataParsed = JSON.parse(speakerDetails);
    showUserProfile(localSpeakerDataParsed.userName);
  }
  onChangeUser('./home.html',MODULE.dekho.value);
  onOpenUserDropDown();
}

$(document).ready(function () {
  localStorage.setItem(CURRENT_MODULE,MODULE.dekho.value);
  initializeFeedbackModal();
  getAvailableLanguages("ocr");
  getLocaleString().then(()=>{
    initializeBlock();
  }).catch(err => {
    initializeBlock();
  });
  onActiveNavbar(MODULE.dekho.value);
});


module.exports = {
  initializeBlock,
};
