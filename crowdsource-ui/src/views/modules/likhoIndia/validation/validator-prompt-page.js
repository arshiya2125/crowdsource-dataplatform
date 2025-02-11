const fetch = require('../common/fetch')
const {
  setPageContentHeight,
  toggleFooterPosition,
  setFooterPosition,
  showElement,
  hideElement,
  fetchLocationInfo,
  reportSentenceOrRecording,
  getDeviceInfo,
  getBrowserInfo,
  getLocaleString
} = require('../common/utils');
const {CONTRIBUTION_LANGUAGE, CURRENT_MODULE, MODULE, LIKHO_TO_LANGUAGE, ALL_LANGUAGES,LOCALE_STRINGS} = require('../common/constants');
const {showKeyboard, setInput} = require('../common/virtualKeyboard');
const {isKeyboardExtensionPresent,showOrHideExtensionCloseBtn,isMobileDevice, updateLikhoLocaleLanguagesDropdown} = require('../common/common');
const {setCurrentSentenceIndex, setTotalSentenceIndex, updateProgressBar} = require('../common/progressBar');
const {showUserProfile, onChangeUser,onOpenUserDropDown} = require('../common/header');
const { setDataSource } = require('../common/sourceInfo');

const speakerDetailsKey = 'speakerDetails';
const ACCEPT_ACTION = 'accept';
const REJECT_ACTION = 'reject';
const SKIP_ACTION = 'skip';
const {initializeFeedbackModal} = require('../common/feedback');

const currentIndexKey = 'likhoValidatorCurrentIndex';
const sentencesKey = 'likhoValidatorSentencesKey';
const likhoValidatorCountKey = 'likhoValidatorCount';

function getValue(number, maxValue) {
  return number < 0
    ? 0
    : number > maxValue
      ? maxValue
      : number;
}

function getCurrentIndex(lastIndex) {
  const currentIndexInStorage = Number(localStorage.getItem(currentIndexKey));
  return getValue(currentIndexInStorage, lastIndex);
}

function showNoSentencesMessage() {
  $('#spn-validation-language').html(localStorage.getItem(CONTRIBUTION_LANGUAGE));
  hideElement($('#extension-bar'));
  hideElement($('#sentences-row'));
  hideElement($('#translation-row'));
  hideElement($('#virtualKeyBoardBtn'));
  hideElement($('#audio-row'))
  hideElement($('#validation-button-row'))
  hideElement($('#progress-row'))
  hideElement($('#mic-report-row'));
  showElement($('#no-sentences-row'))
  hideElement($('#skip_btn_row'));
  hideElement($('#validation-container'));
  hideElement($('#report_btn'));
  hideElement($("#test-mic-speakers"));
  hideElement($('#instructive-msg'));
  hideElement($('#editor-row'));
  hideElement($('#thank-you-row'));
  hideElement($('#keyboardBox'));
  $("#validation-container").removeClass("validation-container");
}

window.likhoIndiaValidator = {};

function uploadToServer(cb) {
  const fd = new FormData();
  const localSpeakerDataParsed = JSON.parse(localStorage.getItem(speakerDetailsKey));
  const speakerDetails = JSON.stringify({
    userName: localSpeakerDataParsed.userName,
  });
  fd.append('userInput', likhoIndiaValidator.editedText);
  fd.append('speakerDetails', speakerDetails);
  fd.append('language', localStorage.getItem(LIKHO_TO_LANGUAGE));
  fd.append('sentenceId', likhoIndiaValidator.sentences[currentIndex].dataset_row_id);
  fd.append('state', localStorage.getItem('state_region') || "");
  fd.append('country', localStorage.getItem('country') || "");
  fd.append('device', getDeviceInfo());
  fd.append('browser', getBrowserInfo());
  fetch('/store', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    body: fd,
  })
    .then((res) => res.json())
    .then((result) => {
    })
    .catch((err) => {})
    .then((finalRes) => {
      if (cb && typeof cb === 'function') {
        cb();
      }
    });
}

let currentIndex;
let validationCount = 0;

function setCapturedText(index) {
  const capturedText = likhoIndiaValidator.sentences[index].contribution;
  $('#edit').text(capturedText);
}

function enableButton(element) {
  element.children().removeAttr("opacity")
  element.removeAttr("disabled")
}

function getNextSentence() {
  if (currentIndex < likhoIndiaValidator.sentences.length - 1) {
    currentIndex++;
    updateProgressBar(currentIndex + 1, likhoIndiaValidator.sentences.length)
    setSentence(likhoIndiaValidator.sentences[currentIndex].sentence);
    setDataSource(likhoIndiaValidator.sentences[currentIndex].source_info);
    setTranslation(likhoIndiaValidator.sentences[currentIndex].contribution);
    setCapturedText(currentIndex);
    localStorage.setItem(currentIndexKey, currentIndex);
    enableButton($('#skip_button'))
  } else {
    const sentencesObj = JSON.parse(localStorage.getItem(sentencesKey));
    Object.assign(sentencesObj, {sentences: []});
    localStorage.setItem(sentencesKey, JSON.stringify(sentencesObj));
    localStorage.setItem(currentIndexKey, currentIndex);
    // showThankYou();
    disableSkipButton();
    setTimeout(showThankYou, 1000);
  }
}

function disableButton(button) {
  button.children().attr("opacity", "50%");
  button.attr("disabled", "disabled");
}

function disableSkipButton() {
  const $skipButton = $('#skip_button');
  $skipButton.removeAttr('style');
  disableButton($skipButton)
}

function skipValidation(action) {
  if (action === REJECT_ACTION || action === ACCEPT_ACTION) {
    validationCount++;
  }
  const sentenceId = likhoIndiaValidator.sentences[currentIndex].dataset_row_id
  const contribution_id = likhoIndiaValidator.sentences[currentIndex].contribution_id
  const speakerDetails = JSON.parse(localStorage.getItem(speakerDetailsKey));
  fetch(`/validate/${contribution_id}/${action}`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify({
      sentenceId: sentenceId,
      state: localStorage.getItem('state_region') || "",
      country: localStorage.getItem('country') || "",
      userName: speakerDetails && speakerDetails.userName,
      device: getDeviceInfo(),
      browser: getBrowserInfo()
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(
      (data) => {
        if (!data.ok) {
          throw Error(data.statusText || 'HTTP error');
        }
      });
}

const openEditor = function () {
  const $editorRow = $('#editor-row');
  $editorRow.removeClass('d-none')
  hideElement($("#need_change"));
  hideElement($("#like_button"));
  showElement($('#cancel-edit-button'))
  showElement($('#submit-edit-button'))
}

const closeEditor = function () {
  const $editorRow = $('#editor-row');
  hideElement($editorRow);
  showElement($("#need_change"));
  showElement($("#skip_button"));
  showElement($("#like_button"));
  hideElement($('#cancel-edit-button'))
  hideElement($('#submit-edit-button'))
  hideElement($('#keyboardBox'));
}

function addListeners() {
  const likeButton = $("#like_button");
  const needChangeButton = $("#need_change");
  const $skipButton = $('#skip_button');

  needChangeButton.on('click', () => {
    if(!isMobileDevice()) {
      showElement($('#virtualKeyBoardBtn'));
    }
    showElement($('#editor-row'));
    openEditor();
    const originalText = likhoIndiaValidator.sentences[currentIndex].contribution;
    $('#captured-text').text(originalText);
    $('#edit').val('');
    $('#edit').val(originalText);
    setInput(originalText);
  })

  $("#edit").focus(function () {
    const isPhysicalKeyboardOn = localStorage.getItem("physicalKeyboard");

    if (!isKeyboardExtensionPresent() && isPhysicalKeyboardOn === 'false' && !isMobileDevice()) {
      showElement($('#keyboardBox'));
    }
  });

  $('#cancel-edit-button').on('click', () => {
    hideElement($('#virtualKeyBoardBtn'));
    const $submitEditButton = $("#submit-edit-button");
    $submitEditButton.attr('disabled', true);
    showElement($('#textarea-row'));
    showElement($('#progress-row'));
    hideElement($('#edit-error-row'))
    $("#edit-text").removeClass('edit-error-area').addClass('edit-text');
    setInput("");
    closeEditor();
  })

  $('#submit-edit-button').on('click', () => {
    hideElement($('#virtualKeyBoardBtn'));
    skipValidation(REJECT_ACTION);
    setInput("");
    hideElement($('#keyboardBox'));
    hideElement($('#cancel-edit-button'));
    hideElement($('#submit-edit-button'))
    hideElement($('#skip_button'))
    showElement($('#thank-you-row'));
    showElement($('#progress-row'))
    likhoIndiaValidator.editedText = $("#edit").val();
    uploadToServer();
    $("#edit").css('pointer-events', 'none');
    setTimeout(() => {
      closeEditor();
      showElement($('#progress-row'))
      showElement($('#textarea-row'));
      hideElement($('#thank-you-row'));
      getNextSentence();
      $("#edit").css('pointer-events', 'unset');
    }, 2000)
  })

  likeButton.on('click', () => {
    hideElement($('#virtualKeyBoardBtn'));
    skipValidation(ACCEPT_ACTION)
    getNextSentence();
  })

  $skipButton.on('click', () => {
    hideElement($('#virtualKeyBoardBtn'));
    disableSkipButton();
    $('#pause').trigger('click');
    skipValidation(SKIP_ACTION)
    showElement($('#textarea-row'));
    showElement($('#progress-row'));
    hideElement($('#edit-error-row'))
    $("#edit-text").removeClass('edit-error-area').addClass('edit-text');
    getNextSentence();
    closeEditor();
  })

  $skipButton.hover(() => {
    $skipButton.css('border-color', '#bfddf5');
  }, () => {
    $skipButton.removeAttr('style');
  })

  $skipButton.mousedown(() => {
    $skipButton.css('background-color', '#bfddf5')
  })
}

function showThankYou() {
  window.location.href = "./validator-thank-you.html"
}

const handleSubmitFeedback = function () {
  const contributionLanguage = localStorage.getItem(CONTRIBUTION_LANGUAGE);
  const otherText = $("#other_text").val();
  const speakerDetails = JSON.parse(localStorage.getItem(speakerDetailsKey));

  const reqObj = {
    sentenceId: likhoIndiaValidator.sentences[currentIndex].contribution_id,
    reportText: (otherText !== "" && otherText !== undefined) ? `${selectedReportVal} - ${otherText}` : selectedReportVal,
    language: contributionLanguage,
    userName: speakerDetails ? speakerDetails.userName : '',
    source: "validation"
  };
  reportSentenceOrRecording(reqObj).then(function (resp) {
    if (resp.statusCode === 200) {
      $('#skip_button').click();
      $("#report_sentence_modal").modal('hide');
      $("#report_sentence_thanks_modal").modal('show');
      $("#report_submit_id").attr("disabled", true);
      $("input[type=radio][name=reportRadio]").each(function () {
        $(this).prop("checked", false);
      });
      $("#other_text").val("");
    }
  });
}

const setSentence = function (sentence) {
  $('#original-text').text(sentence);
}

const setTranslation = function (translatedText) {
  $('#translate-text').text(translatedText);
}


const initializeComponent = () => {
  showOrHideExtensionCloseBtn();
  hideElement($('#virtualKeyBoardBtn'));
  const totalItems = likhoIndiaValidator.sentences.length;
  currentIndex = getCurrentIndex(totalItems - 1);
  const validationData = likhoIndiaValidator.sentences[currentIndex];
  const toLanguage = localStorage.getItem(LIKHO_TO_LANGUAGE);
  const fromLanguage = localStorage.getItem(CONTRIBUTION_LANGUAGE);
  const localeStrings = JSON.parse(localStorage.getItem(LOCALE_STRINGS));

  const localeToLanguage = localeStrings[toLanguage];
  const localeFromLanguage = localeStrings[fromLanguage];

  $('#keyboardLayoutName').text(localeToLanguage);
  $('#from-label').text(localeFromLanguage);
  $('#to-label').text(localeToLanguage);
  $('#edit-language').text(localeToLanguage);

  addListeners();

  if (validationData) {
    setSentence(validationData.sentence);
    setDataSource(validationData.source_info);
    setTranslation(validationData.contribution);
    setCapturedText(currentIndex);
    setCurrentSentenceIndex(currentIndex + 1);
    setTotalSentenceIndex(totalItems);
    updateProgressBar(currentIndex + 1, likhoIndiaValidator.sentences.length)
  }
}

const getLocationInfo = () => {
  fetchLocationInfo().then(res => {
    return res.json()
  }).then(response => {
    localStorage.setItem("state_region", response.regionName);
    localStorage.setItem("country", response.country);
  }).catch((err) => {});
}

let selectedReportVal = '';
const executeOnLoad = function () {
  const browser = getBrowserInfo();
  const isNotChrome = !browser.includes('Chrome');
  if(isMobileDevice() || isNotChrome){
    hideElement($('#extension-bar'));
    hideElement($('#virtualKeyBoardBtn'));
  } else {
    showOrHideExtensionCloseBtn();
  }
  localStorage.setItem(CURRENT_MODULE, MODULE.likho.value);
  const fromLanguage = localStorage.getItem(CONTRIBUTION_LANGUAGE);
  const toLanguage = localStorage.getItem(LIKHO_TO_LANGUAGE);
  initializeFeedbackModal();
  setFooterPosition();
  showKeyboard(toLanguage.toLowerCase());
  hideElement($('#keyboardBox'));
  // toggleFooterPosition();
  setPageContentHeight();
  const localeStrings = JSON.parse(localStorage.getItem(LOCALE_STRINGS));
  const localeToLanguage = localeStrings[toLanguage];
  const localeFromLanguage = localeStrings[fromLanguage];
  $('#keyboardLayoutName').text(localeToLanguage);
  $('#from-label').text(localeFromLanguage);
  $('#to-label').text(localeToLanguage);

  if (fromLanguage && toLanguage) {
    updateLikhoLocaleLanguagesDropdown(fromLanguage, toLanguage);
  }

  $("#start_contributing_id").on('click', function () {
    const data = localStorage.getItem("speakerDetails");
    if (data !== null) {
      const speakerDetails = JSON.parse(data);
      speakerDetails.language = fromLanguage;
      localStorage.setItem("speakerDetails", JSON.stringify(speakerDetails));
    }
    location.href = './record.html';
  });

  const $reportModal = $("#report_sentence_modal");

  $("#report_submit_id").on('click', handleSubmitFeedback);

  $("#report_btn").on('click', function () {
    $reportModal.modal('show');
  });

  $("#report_close_btn").on("click", function () {
    $reportModal.modal('hide');
  });

  $("#report_sentence_thanks_close_id").on("click", function () {
    $("#report_sentence_thanks_modal").modal('hide');
  });

  $("input[type=radio][name=reportRadio]").on("change", function () {
    selectedReportVal = this.value;
    $("#report_submit_id").attr("disabled", false);
  });

  getLocationInfo();
  const localSpeakerData = localStorage.getItem(speakerDetailsKey);
  const localSpeakerDataParsed = JSON.parse(localSpeakerData);
  const localSentences = localStorage.getItem(sentencesKey);
  const localSentencesParsed = JSON.parse(localSentences);
  setPageContentHeight();

  const $errorModal = $('#errorModal');

  $errorModal.on('show.bs.modal', function () {

  });
  $errorModal.on('hidden.bs.modal', function () {
    location.href = './home.html';
  });

  if (!localSpeakerDataParsed) {
    location.href = './home.html';
    return;
  }
  showUserProfile(localSpeakerDataParsed.userName)
  onChangeUser('./validator-page.html',MODULE.likho.value);
  onOpenUserDropDown();
  const isExistingUser = localSentencesParsed &&
    localSentencesParsed.userName === localSpeakerDataParsed.userName
    &&
    localSentencesParsed.language === localSpeakerDataParsed.language;

  if (isExistingUser && localSentencesParsed.sentences.length != 0 && localSentencesParsed.language === fromLanguage && localSentencesParsed.toLanguage === toLanguage) {
    setFooterPosition();
    likhoIndiaValidator.sentences = localSentencesParsed.sentences;
    initializeComponent();
  } else {
    localStorage.removeItem(currentIndexKey);
    const type = 'parallel';
    fetch(`/contributions/${type}?from=${fromLanguage}&to=${toLanguage}&username=${localSpeakerDataParsed.userName}`, {
      credentials: 'include',
      mode: 'cors'
    })
      .then((data) => {
        if (!data.ok) {
          throw Error(data.statusText || 'HTTP error');
        } else {
          return data.json();
        }
      }).then(result => {
      likhoIndiaValidator.sentences = result.data ? result.data : [];
      localStorage.setItem(likhoValidatorCountKey, likhoIndiaValidator.sentences.length);
      localStorage.setItem(
        sentencesKey,
        JSON.stringify({
          userName: localSpeakerDataParsed.userName,
          sentences: likhoIndiaValidator.sentences,
          language: fromLanguage,
          toLanguage: toLanguage
        })
      );
      if (likhoIndiaValidator.sentences.length == 0) {
        showNoSentencesMessage();
        return;
      }
      setFooterPosition();

      initializeComponent();
    }).catch((err) => {
      console.log(err);
      $errorModal.modal('show');
    })
  }
};

$(document).ready(() => {
  getLocaleString().then(() => {
    executeOnLoad();
  }).catch(() => {
    executeOnLoad();
  });
})

module.exports = {
  setCapturedText,
  addListeners,
};
