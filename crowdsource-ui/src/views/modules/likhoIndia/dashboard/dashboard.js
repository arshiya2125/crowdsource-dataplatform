const { updateLineGraph } = require('../common/lineGraph');
const { generateIndiaMap } = require('../common/map');
const { testUserName, setStartRecordingBtnOnClick, setSpeakerDetails, setUserNameOnInputFocus, setUserModalOnShown } = require('../common/userDetails');
const { toggleFooterPosition, getLocaleString } = require('../common/utils');
const { DEFAULT_CON_LANGUAGE, ALL_LANGUAGES, CURRENT_MODULE, MODULE,TO_LANGUAGE } = require('../common/constants');
const fetch = require('../common/fetch');

const {setSpeakerData} = require('../common/contributionStats');
const LOCALE_STRINGS = 'localeString';
let timer;
let languageToRecord = '';

const fetchDetail = (language) => {
    const url = language ? '/aggregate-data-count/parallel?byLanguage=true' : '/aggregate-data-count/parallel'
    return fetch(url).then((data) => {
        if (!data.ok) {
            throw Error(data.statusText || 'HTTP error');
        } else {
            return Promise.resolve(data.json());
        }
    });
};

function isLanguageAvailable(data, lang) {
    let langaugeExists = false;
    if (!lang) return true;
    data.forEach(item => {
        if(item.language) {
            if (item.language.toLowerCase() === lang.toLowerCase()) {
                langaugeExists = true;
            }
        }
    });
    return langaugeExists;
}

const updateLocaleLanguagesDropdown = (language, toLanguage) => {
    const dropDown = $('#localisation_dropdown');
    const localeLang = ALL_LANGUAGES.find(ele => ele.value === language);
    const toLang = ALL_LANGUAGES.find(ele => ele.value === toLanguage);
    const invalidToLang = toLanguage.toLowerCase() === "english" || toLanguage.hasLocaleText === false;
    const invalidFromLang = language.toLowerCase() === "english" || localeLang.hasLocaleText === false;
    if (invalidToLang && invalidFromLang) {
        dropDown.html(`<a id="english" class="dropdown-item" href="#" locale="en">English</a>`);
    } else if (invalidFromLang) {
        dropDown.html(`<a id="english" class="dropdown-item" href="#" locale="en">English</a>
      <a id=${toLang.value} class="dropdown-item" href="#" locale="${toLang.id}">${toLang.text}</a>`);
    } else if (invalidToLang) {
        dropDown.html(`<a id="english" class="dropdown-item" href="#" locale="en">English</a>
        <a id=${localeLang.value} class="dropdown-item" href="#" locale="${localeLang.id}">${localeLang.text}</a>`);
    } else if (toLanguage.toLowerCase() === language.toLowerCase()){
        dropDown.html(`<a id="english" class="dropdown-item" href="#" locale="en">English</a>
        <a id=${localeLang.value} class="dropdown-item" href="#" locale="${localeLang.id}">${localeLang.text}</a>`);
    }else {
        dropDown.html(`<a id="english" class="dropdown-item" href="#" locale="en">English</a>
        <a id=${localeLang.value} class="dropdown-item" href="#" locale="${localeLang.id}">${localeLang.text}</a>
        <a id=${toLang.value} class="dropdown-item" href="#" locale="${toLang.id}">${toLang.text}</a>`);
    }
}


function updateLanguage(language) {
    const $speakersData = $('#speaker-data');
    const $speakersDataLoader = $speakersData.find('#loader1');
    const $speakerDataDetails = $speakersData.find('#contribution-details');
    const $speakerDataLanguagesWrapper = $('#languages-wrapper');
    const activeDurationText = $('#duration').find('.active')[0].dataset.value;

    fetchDetail(language)
      .then((data) => {
          try {
              const langaugeExists = isLanguageAvailable(data.data, language);
              if (data.last_updated_at) {
                  $('#data-updated').text(` ${data.last_updated_at}`);
                  $('#data-updated').removeClass('d-none');
              } else {
                  $('#data-updated').addClass('d-none');
              }
              if (langaugeExists) {
                  $speakersDataLoader.removeClass('d-none');
                  $speakerDataLanguagesWrapper.addClass('d-none');
                  $speakerDataDetails.addClass('d-none');
                  generateIndiaMap(language, 'parallel');
                  updateLineGraph(language, activeDurationText, 'parallel');
                  setSpeakerData(data.data, language, 'likho');
                  $speakersDataLoader.addClass('d-none');
                  $speakerDataDetails.removeClass('d-none');
              } else {
                  const previousLanguage = localStorage.getItem('previousLanguage');
                  languageToRecord = language;
                  $("#language").val(previousLanguage);
                  $("#languageSelected").text(` ${language}, `);
                  $("#no-data-found").removeClass('d-none');
                  timer = setTimeout(() => {
                      $('#no-data-found').addClass('d-none');
                  }, 5000);
              }
          } catch (error) {
              console.log(error);
          }
      })
      .catch((err) => {
          console.log(err);
      });
}

$(document).ready(function () {
    localStorage.setItem(CURRENT_MODULE, MODULE.likho.value);
    localStorage.removeItem('previousLanguage');
    const speakerDetailsKey = 'speakerDetails';
    if (!localStorage.getItem(LOCALE_STRINGS)) getLocaleString();
    const $startRecordBtn = $('#proceed-box');
    const $startRecordBtnTooltip = $startRecordBtn.parent();
    // const $tncCheckbox = $('#tnc');
    let sentenceLanguage = DEFAULT_CON_LANGUAGE;
    const genderRadios = document.querySelectorAll('input[name = "gender"]');
    const $userName = $('#username');
    const motherTongue = document.getElementById('mother-tongue');
    const age = document.getElementById('age');
    updateLanguage('');
    const contributionLanguage = localStorage.getItem('contributionLanguage');
    const contributionLanguage2 = localStorage.getItem(TO_LANGUAGE);
    if (contributionLanguage) {
        updateLocaleLanguagesDropdown(contributionLanguage,contributionLanguage2);
    }

    $('#duration').on('click', (e) => {
        const $durationLiInactive = $('#duration').find('li.inactive');
        const $durationLiActive = $('#duration').find('li.active');
        $durationLiInactive.removeClass('inactive').addClass('active');
        $durationLiActive.removeClass('active').addClass('inactive');
        const selectedDuration = e.target.dataset.value;
        const selectedLanguage = $('#language option:selected').val();
        updateLineGraph(selectedLanguage, selectedDuration, 'parallel');
    });

    $("#no-data-found").on('mouseenter', (e) => {
        clearTimeout(timer);
    });
    $("#no-data-found").on('mouseleave', (e) => {
        timer = setTimeout(() => {
            $('#no-data-found').addClass('d-none');
        }, 5000);
    });

    const noDataFoundEl = document.getElementById('no-data-found');
    noDataFoundEl.addEventListener('touchstart', function () {
        clearTimeout(timer);
    }, {passive: true});
    noDataFoundEl.addEventListener('touchend', function () {
        timer = setTimeout(() => {
            $('#no-data-found').addClass('d-none');
        }, 5000);
    }, {passive: true});

    $("#contribute-now").on('click', (e) => {
        localStorage.setItem("i18n", "en");
        sentenceLanguage = languageToRecord;
        setStartRecordingBtnOnClick("./record.html");
    });

    let fromLanguage = $('#from-dash-language option:first-child').val();
    let toLanguage = $('#to-dash-language option:first-child').val();
    $('#from-dash-language').on('change', (e) => {
      fromLanguage = e.target.value === "" ? "" : e.target.value;
    });

    $('#to-dash-language').on('change', (e) => {
      toLanguage = e.target.value === "" ? "" : e.target.value;
      if(toLanguage !== "") {
        updateLanguage(fromLanguage + '-' +toLanguage);
      } else {
        updateLanguage("");
      }
    });

    setSpeakerDetails(speakerDetailsKey, $userName);
    $startRecordBtnTooltip.tooltip('disable');
    setUserNameOnInputFocus();
    setUserModalOnShown($userName);

    // $startRecordBtn.on('click', () => {
    //     const checkedGender = Array.from(genderRadios).filter((el) => el.checked);
    //     let genderValue = checkedGender.length ? checkedGender[0].value : '';
    //     const userNameValue = $userName.val().trim().substring(0, 12);
    //     const selectedLanguage = ALL_LANGUAGES.find(e => e.value === sentenceLanguage);
    //     if (!selectedLanguage.data) sentenceLanguage = DEFAULT_CON_LANGUAGE;
    //     if (testUserName(userNameValue)) {
    //         return;
    //     }
    //     const transGenderRadios = document.querySelectorAll('input[name = "trans_gender"]');
    //     if (genderValue === "others") {
    //         const transGender = Array.from(transGenderRadios).filter((el) => el.checked);
    //         genderValue = transGender.length ? transGender[0].value : '';
    //     }

    //     const speakerDetails = {
    //         gender: genderValue,
    //         age: age.value,
    //         motherTongue: motherTongue.value,
    //         userName: userNameValue,
    //         language: sentenceLanguage || localStorage.getItem('contributionLanguage'),
    //     };
    //     localStorage.setItem(speakerDetailsKey, JSON.stringify(speakerDetails));
    //     localStorage.setItem("contributionLanguage", sentenceLanguage);
    //     // document.cookie = `i18n=en`;
    //     location.href = './record.html';
    // });

    $('input[name = "gender"]').on('change', function () {
        const selectedGender = document.querySelector(
          'input[name = "gender"]:checked'
        );
        const options = $("#transgender_options");
        if (selectedGender.value === "others") {
            console.log(options);
            options.removeClass("d-none");
        } else {
            console.log(options);
            options.addClass("d-none");
        }
    });

    toggleFooterPosition();

});

module.exports = {fetchDetail, isLanguageAvailable, updateLanguage}