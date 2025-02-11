const fetch = require('../common/fetch')
const {
  setPageContentHeight,
  toggleFooterPosition,
  setFooterPosition,
  updateLocaleLanguagesDropdown,
  getLocaleString,
  showElement,
  hideElement,
  fetchLocationInfo,
  reportSentenceOrRecording,
  getDeviceInfo,
  getBrowserInfo
} = require('../common/utils');
const { onChangeUser,onOpenUserDropDown, showUserProfile } = require('../common/header');
const { cdn_url } = require('../common/env-api');
const {CONTRIBUTION_LANGUAGE, LOCALE_STRINGS, CURRENT_MODULE, MODULE} = require('../common/constants');
const {showKeyboard,setInput} = require('../common/virtualKeyboard');
const { setCurrentSentenceIndex, setTotalSentenceIndex ,updateProgressBar} = require('../common/progressBar');
const {isKeyboardExtensionPresent,enableCancelButton,disableCancelButton, isMobileDevice,showOrHideExtensionCloseBtn} = require('../common/common');
const speakerDetailsKey = 'speakerDetails';
const { initializeFeedbackModal } = require('../common/feedback');
const { setDataSource } = require('../common/sourceInfo');
const sunoCountKey = 'sunoCount';
const currentIndexKey = 'sunoCurrentIndex';
const sentencesKey = 'sunoSentencesKey';
let localeStrings;
window.sunoIndia = {};

let playStr = "";
let pauseStr = "";
let replayStr = "";
let resumeStr = "";
let audioPlayerBtn = "";

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

function uploadToServer(cb) {
  const fd = new FormData();
  const localSpeakerDataParsed = JSON.parse(localStorage.getItem(speakerDetailsKey));
  const speakerDetails = JSON.stringify({
    userName: localSpeakerDataParsed.userName,
  });
  fd.append('userInput', sunoIndia.editedText);
  fd.append('speakerDetails', speakerDetails);
  fd.append('language',localStorage.getItem(CONTRIBUTION_LANGUAGE));
  fd.append('sentenceId', sunoIndia.sentences[currentIndex].dataset_row_id);
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

function enableButton(element) {
  element.children().removeAttr("opacity")
  element.removeAttr("disabled")
}

const setAudioPlayer = function () {
  const myAudio = document.getElementById('my-audio');
  const play = $(playStr);
  const pause = $(pauseStr);
  const replay = $(replayStr);
  const resume = $(resumeStr);
  const textPlay = $('#audioplayer-text_play');
  const textReplay = $('#audioplayer-text_replay');
  const textPause = $('#audioplayer-text_pause');
  const textResume = $('#audioplayer-text_resume');
  const cancelButton = $("#cancel-edit-button");
  const $submitButton = $('#submit-edit-button');


  myAudio.addEventListener("ended", () => {
    hideElement(pause)
    hideElement(resume)
    showElement(replay)
    hideElement(textPause);
    hideElement(textResume);
    showElement(textReplay);
    localStorage.setItem("contribution_audioPlayed",true);
    const previousActiveError = $("#edit-error-text .error-active");
    if($("#edit").val() && !previousActiveError[0]){
      $submitButton.removeAttr("disabled");
    }
    cancelButton.removeAttr("disabled");
    $("#edit").removeAttr("disabled");
  });

  play.on('click', () => {
    hideElement($('#default_line'))
    playAudio();
    $("#edit").removeAttr("disabled");
    $("#virtualKeyBoardBtn").removeAttr("disabled");
    $("#edit-text-suno").addClass("edit-text");
  });

  pause.on('click', pauseAudio);

  replay.on('click', () => {
    replayAudio();
    $("#edit").removeAttr("disabled");
    $("#edit-text-suno").addClass("edit-text");
  });

  resume.on('click', () => {
    resumeAudio();
  });

  function playAudio() {
    myAudio.load();
    hideElement(play)
    hideElement(resume)
    showElement(pause)
    hideElement(textPlay);
    hideElement(textResume);
    showElement(textPause);
    myAudio.play();
  }

  function pauseAudio() {
    hideElement(pause)
    showElement(resume)
    hideElement(textPause)
    showElement(textResume)
    myAudio.pause();
  }

  function resumeAudio() {
    showElement(pause)
    hideElement(resume)
    showElement(textPause)
    hideElement(textResume)
    myAudio.play();
  }

  function replayAudio() {
    hideElement(replay)
    showElement(pause)
    hideElement(textReplay);
    showElement(textPause);
    myAudio.play();
  }

}

let currentIndex = localStorage.getItem(currentIndexKey) || 0;
let progressCount = currentIndex, validationCount = 0;

function getNextSentence() {
  if (currentIndex < sunoIndia.sentences.length - 1) {
    currentIndex++;
    updateProgressBar(currentIndex + 1, sunoIndia.sentences.length);
    const encodedUrl = encodeURIComponent(sunoIndia.sentences[currentIndex].media_data);
    localStorage.setItem("contribution_audioPlayed",false);
    loadAudio(`${cdn_url}/${encodedUrl}`);
    setDataSource(sunoIndia.sentences[currentIndex].source_info);
    resetValidation();
    localStorage.setItem(currentIndexKey, currentIndex);
    enableButton($('#skip_button'))
  } else {
    const sentencesObj = JSON.parse(localStorage.getItem(sentencesKey));
    Object.assign(sentencesObj, {sentences: []});
    localStorage.setItem(sentencesKey, JSON.stringify(sentencesObj));
    localStorage.setItem(currentIndexKey, currentIndex);
    resetValidation();
    // showThankYou();
    disableSkipButton();
    setTimeout(showThankYou, 1000);
  }
}

function disableButton(button) {
  button.children().attr("opacity", "50%");
  button.attr("disabled", "disabled");
}

function resetValidation() {
  const textPlay = $('#audioplayer-text_play');
  const textReplay = $('#audioplayer-text_replay');
  const textPause = $('#audioplayer-text_pause');
  const textResume = $('#audioplayer-text_resume');
  hideElement(textPause);
  hideElement(textReplay);
  hideElement(textResume);
  showElement(textPlay);

  hideElement($(replayStr))
  hideElement($(pauseStr))
  hideElement($(resumeStr))
  showElement($(playStr))
  showElement($('#default_line'))
}

const closeEditor = function () {
  hideElement($('#keyboardBox'));
}

const contributionLanguage = localStorage.getItem(CONTRIBUTION_LANGUAGE);
showKeyboard(contributionLanguage.toLowerCase(),enableCancelButton,disableCancelButton,'contribution_audioPlayed');

function markContributionSkipped() {
  const contributionLanguage = localStorage.getItem(CONTRIBUTION_LANGUAGE);
  const speakerDetails = JSON.parse(localStorage.getItem(speakerDetailsKey));
  const state_region = localStorage.getItem('state_region') || "";
  const country = localStorage.getItem('country') || "";
  const reqObj = {
    sentenceId: sunoIndia.sentences[currentIndex].dataset_row_id,
    userName: speakerDetails.userName,
    language:contributionLanguage,
    device: getDeviceInfo(),
    browser: getBrowserInfo(),
    state_region: state_region,
    country: country
  };
  fetch('/skip', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqObj),
  })
    .then((res) => res.json())
    .then((result) => {
    })
    .catch((err) => {})
}

function addListeners() {

  const $skipButton =  $('#skip_button');
  const $submitButton = $('#submit-edit-button');
  const cancelButton = $('#cancel-edit-button');

  $("#edit").focus(function () {
    const isPhysicalKeyboardOn = localStorage.getItem("physicalKeyboard");

    if(!isKeyboardExtensionPresent() && isPhysicalKeyboardOn === 'false' && !isMobileDevice()){
      showElement($('#keyboardBox'));
    }
  });

  cancelButton.on('click', () => {
    $("#edit").val("");
    setInput("");
    showElement($('#progress-row'))
    const $cancelEditButton = cancelButton;
    $cancelEditButton.attr('disabled', true);
    const $submitEditButton =  $('#submit-edit-button');
    $submitEditButton.attr('disabled', true);
    hideElement($('#edit-error-row'))
    const previousActiveError = $("#edit-error-text .error-active");
    previousActiveError && previousActiveError.removeClass('error-active').addClass('d-none');
    $("#edit-text-suno").removeClass('edit-error-area').addClass('edit-text');
    closeEditor();
  })

  $submitButton.on('click', () => {
    setInput("");
    $("#edit").attr("disabled", true);
    $("#edit-text-suno").removeClass("edit-text");
    hideElement($('#keyboardBox'));
    hideElement(cancelButton);
    hideElement($submitButton)
    hideElement($(audioPlayerBtn))
    hideElement($skipButton)
    showElement($('#thankyou-text'));
    sunoIndia.editedText = $("#edit").val();
    $("#edit").css('pointer-events', 'none');
    $(cancelButton).attr("disabled", true);
    const $submitEditButton = $('#submit-edit-button');
    $submitEditButton.attr('disabled', true);
    showElement($('#progress-row'))
    $("#virtualKeyBoardBtn").attr("disabled",true);
    try {
      uploadToServer();
      setTimeout(() => {
        hideElement($('#thankyou-text'));
        showElement(cancelButton);
        showElement($submitButton);
        showElement($(audioPlayerBtn))
        showElement($skipButton)
        $("#edit").css('pointer-events', 'unset');
        $("#edit").val("");
        closeEditor();
        getNextSentence();
      }, 2000)
    } catch (e) {}
  })

  $skipButton.on('click', () => {
    disableSkipButton();
    $("#edit").attr("disabled", true);
    $("#edit-text-suno").removeClass("edit-text");
    if ($('#pause').hasClass('d-none')) {
      $('#pause').trigger('click');
    }
    $(resumeStr).addClass('d-none')
    const textResume = $('#audioplayer-text_resume');
    textResume.addClass('d-none');
    $('#edit').val("");
    setInput("");
    $('#submit-edit-button').attr('disabled', true);
    markContributionSkipped();
    getNextSentence();
    $("#virtualKeyBoardBtn").attr("disabled",true);
    showElement($('#sentences-row'));
    showElement($('#progress-row'));
    hideElement($('#edit-error-row'))
    const previousActiveError = $("#edit-error-text .error-active");
    previousActiveError && previousActiveError.removeClass('error-active').addClass('d-none');
    $("#edit-text-suno").removeClass('edit-error-area').addClass('edit-text');
    cancelButton.attr("disabled", true);
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


const loadAudio = function (audioLink) {
  $('#my-audio').attr('src', audioLink)
};

function disableSkipButton() {
  const $skipButton = $('#skip_button');
  $skipButton.removeAttr('style');
  disableButton($skipButton)
}

const getAudioClip = function (contributionId) {
  hideAudioRow();
  disableSkipButton();
  const source = 'contribute';
  fetch(`/media-object/${source}/${contributionId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((stream) => {
    stream.arrayBuffer().then((buffer) => {
      const blob = new Blob([buffer], {type: "audio/wav"});
      // loadAudio(URL.createObjectURL(blob))
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        loadAudio(e.target.result);
        showAudioRow();
        enableButton($('#skip_button'));
      }
      fileReader.readAsDataURL(blob);
    });
  }).catch((err) => {
    showAudioRow();
  });
}

function hideAudioRow() {
  showElement($('#loader-audio-row'));
  hideElement($('#audio-row'))
  showElement($('#loader-play-btn'));
  hideElement($(audioPlayerBtn))
}

function showAudioRow() {
  hideElement($('#loader-audio-row'));
  showElement($('#audio-row'));
  hideElement($('#loader-play-btn'));
  showElement($(audioPlayerBtn))
}

function showThankYou() {
  window.location.href = './thank-you.html';
}

function showNoSentencesMessage() {
  $('#spn-validation-language').html(localStorage.getItem(CONTRIBUTION_LANGUAGE));
  hideElement($('#extension-bar'));
  hideElement($('#sentences-row'));
  hideElement($('#audio-row'))
  hideElement($('#virtualKeyBoardBtn'));
  hideElement($('#validation-button-row'))
  hideElement($('#progress-row'))
  showElement($('#no-sentences-row'))
  hideElement($('#skip_btn_row'));
  hideElement($('#mic-report-row'))
  hideElement($('#validation-container'));
  hideElement($('#report_btn'));
  hideElement($("#test-mic-speakers"));
  hideElement($('#instructive-msg'));
  hideElement($('#editor-row'));
  hideElement($('#thankyou-text'));
  hideElement($('#keyboardBox'));
  $("#validation-container").removeClass("validation-container");
}

const handleSubmitFeedback = function () {
  const contributionLanguage = localStorage.getItem(CONTRIBUTION_LANGUAGE);
  const otherText = $("#other_text").val();
  const speakerDetails = JSON.parse(localStorage.getItem(speakerDetailsKey));
  const $skipButton =  $('#skip_button');

  const reqObj = {
    sentenceId: sunoIndia.sentences[currentIndex].dataset_row_id,
    reportText: (otherText !== "" && otherText !== undefined) ? `${selectedReportVal} - ${otherText}` : selectedReportVal,
    language: contributionLanguage,
    userName: speakerDetails ? speakerDetails.userName : '',
    source: "contribution"
  };
  reportSentenceOrRecording(reqObj).then(function (resp) {
    if (resp.statusCode === 200) {
      $skipButton.click();
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

let selectedReportVal = '';
const initialize = function () {
  const totalItems = sunoIndia.sentences.length;
  currentIndex = getCurrentIndex(totalItems - 1);
  const language = localStorage.getItem(CONTRIBUTION_LANGUAGE);
  const localeStrings = JSON.parse(localStorage.getItem(LOCALE_STRINGS));
  const localeLanguage = localeStrings[language];
  $('#edit-language').text(localeLanguage);
  $('#keyboardLayoutName').text(localeLanguage);

  if (language) {
    updateLocaleLanguagesDropdown(language);
  }

  $("#start_contributing_id").on('click', function () {
    const data = localStorage.getItem("speakerDetails");
    if (data !== null) {
      const speakerDetails = JSON.parse(data);
      speakerDetails.language = language;
      localStorage.setItem("speakerDetails", JSON.stringify(speakerDetails));
    }
    location.href = './home.html';
  });

  const $reportModal = $("#report_sentence_modal");

  $("#report_submit_id").on('click', handleSubmitFeedback);

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

  const audio = sunoIndia.sentences[currentIndex];
  addListeners();

  if (audio) {
    const encodedUrl = encodeURIComponent(audio.media_data);
    loadAudio(`${cdn_url}/${encodedUrl}`);
    setDataSource(audio.source_info);
    resetValidation();
    setCurrentSentenceIndex(currentIndex + 1);
    setTotalSentenceIndex(totalItems);
    setAudioPlayer();
    updateProgressBar(currentIndex + 1,sunoIndia.sentences.length)
  }
};

function executeOnLoad() {
  hideElement($('#keyboardBox'));
  $("#virtualKeyBoardBtn").attr("disabled",true);
  // toggleFooterPosition();
  setPageContentHeight();
  setFooterPosition();
  // const $validationInstructionModal = $("#validation-instruction-modal");
  const $errorModal = $('#errorModal');
  const $loader = $('#loader');
  const $pageContent = $('#page-content');
  const contributionLanguage = localStorage.getItem(CONTRIBUTION_LANGUAGE);
  localeStrings = JSON.parse(localStorage.getItem(LOCALE_STRINGS));
  const localeLanguage = localeStrings[contributionLanguage];
  $('#keyboardLayoutName').text(localeLanguage);

  if (contributionLanguage) {
    updateLocaleLanguagesDropdown(contributionLanguage);
  }

  fetchLocationInfo().then(res => {
    return res.json()
  }).then(response => {
    localStorage.setItem("state_region", response.regionName);
    localStorage.setItem("country", response.country);
  }).catch((err) => {});
  try {
    const localSpeakerData = localStorage.getItem(speakerDetailsKey);
    const localSpeakerDataParsed = JSON.parse(localSpeakerData);
    const localSentences = localStorage.getItem(sentencesKey);
    const localSentencesParsed = JSON.parse(localSentences);

    setPageContentHeight();
    // $("#instructions_close_btn").on("click", function () {
    //   $validationInstructionModal.addClass("d-none");
    //   setFooterPosition();
    // })

    $errorModal.on('show.bs.modal', function () {
      // $validationInstructionModal.addClass("d-none");
      setFooterPosition();

    });
    $errorModal.on('hidden.bs.modal', function () {
      location.href = './home.html';
    });

    if (!localSpeakerDataParsed) {
      location.href = './home.html';
      return;
    }
    showUserProfile(localSpeakerDataParsed.userName)
    onChangeUser('./record.html',MODULE.suno.value);
    onOpenUserDropDown();
    const isExistingUser = localSentencesParsed &&
      localSentencesParsed.userName === localSpeakerDataParsed.userName
      &&
      localSentencesParsed.language === localSpeakerDataParsed.language;

    if (isExistingUser && localSentencesParsed.sentences.length != 0 && localSentencesParsed.language === contributionLanguage) {
      $loader.hide();
      $pageContent.removeClass('d-none');
      setFooterPosition();
      sunoIndia.sentences = localSentencesParsed.sentences;
      initialize();
    } else {
      localStorage.setItem("contribution_audioPlayed",false);
      localStorage.removeItem(currentIndexKey);
      const type = 'asr';
      fetch(`/media/${type}`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          userName: localSpeakerDataParsed.userName,
          language: contributionLanguage,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((data) => {
          if (!data.ok) {
            throw Error(data.statusText || 'HTTP error');
          } else {
            return data.json();
          }
        })
        .then((sentenceData) => {
          sunoIndia.sentences = sentenceData.data ? sentenceData.data : [];
          localStorage.setItem(sunoCountKey, sunoIndia.sentences.length);
          $loader.hide();
          localStorage.setItem(
            sentencesKey,
            JSON.stringify({
              userName: localSpeakerDataParsed.userName,
              sentences: sunoIndia.sentences,
              language: localSpeakerDataParsed.language,
            })
          );
          if (sunoIndia.sentences.length === 0) {
            showNoSentencesMessage();
            return;
          }
          if (!isExistingUser) {
            //$instructionModal.modal('show');
            // $validationInstructionModal.removeClass("d-none");
            setFooterPosition();
            // toggleFooterPosition();
          }
          $pageContent.removeClass('d-none');

          setFooterPosition();
          initialize();
        })
        .catch((err) => {
          console.log(err);
          $errorModal.modal('show');
        })
        .then(() => {
          $loader.hide();
        });
    }
  } catch (err) {
    console.log(err);
    $errorModal.modal('show');
  }
}

const detectDevice = () => {
    // false for not mobile device
    playStr = "#play";
    replayStr = "#replay";
    pauseStr = "#pause";
  resumeStr = "#resume";
    audioPlayerBtn = "#audio-player-btn";
}

$(document).ready(() => {
  const browser = getBrowserInfo();
  const isNotChrome = !browser.includes('Chrome');
  if(isMobileDevice() || isNotChrome){
    hideElement($('#extension-bar'));
    hideElement($('#virtualKeyBoardBtn'));
  } else {
    showOrHideExtensionCloseBtn();
  }
  localStorage.setItem(CURRENT_MODULE, MODULE.suno.value);
  hideElement($('#keyboardBox'));
  initializeFeedbackModal();
  getLocaleString().then(() => {
    executeOnLoad();
  }).catch(() => {
    executeOnLoad();
  });
  detectDevice();
  
});

module.exports = {
  setAudioPlayer,
  addListeners,
};

