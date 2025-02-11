const {LOCALE_STRINGS,AGGREGATED_DATA_BY_LANGUAGE}=require('./constants');

const $left = $('#left');
const $right = $('#right');
const $right_p_2 = $('#right-p-2');
const $left_p_2 = $('#left-p-2');
const $left_container = $('#left_container');
const $right_container = $('#right_container');


const updateLocaleText = function (total_contributions, total_validations, language) {
  const $left_p_3 = $("#left-p-3");
  const $right_p_3 = $("#right-p-3");
  const localeStrings = JSON.parse(localStorage.getItem(LOCALE_STRINGS));
  let hrsRecordedIn = localeStrings['hrs recorded in'];
  hrsRecordedIn = hrsRecordedIn.replace("<x>", total_contributions);
  hrsRecordedIn = hrsRecordedIn.replace("<y>", language);
  $left_p_3.text(hrsRecordedIn);

  let hrsValidatedIn = localeStrings['hrs validated in'];
  hrsValidatedIn = hrsValidatedIn.replace("<x>", total_validations);
  hrsValidatedIn = hrsValidatedIn.replace("<y>", language);
  $right_p_3.text(hrsValidatedIn);
}

function updateHrsForCards(language) {
  const $leftLoader = $('#left-loader');
  const $rightLoader = $('#right-loader');
  $leftLoader.removeClass('d-none');
  $rightLoader.removeClass('d-none');
  const aggregateDetails = JSON.parse(localStorage.getItem(AGGREGATED_DATA_BY_LANGUAGE));
  const totalInfo = aggregateDetails && aggregateDetails.find((element) => element.language === language);
  if (totalInfo) {
    updateLocaleText(totalInfo.total_contributions, totalInfo.total_validations, language);
  } else {
    updateLocaleText(0, 0, language);
  }
  $leftLoader.addClass('d-none');
  $rightLoader.addClass('d-none');
}

$left.hover(() => {
  $(".card1").css("box-shadow","0 8px 0 #43c0d7,0 0 32px #43c0d7")
  $left_p_2.removeClass('d-none');
  $left_container.addClass('left-active');
}, () => {
  $(".card1").css("box-shadow","0 8px 0 #43c0d7, 0px 0px 32px rgb(0 0 0 / 10%)")
  $left_p_2.addClass('d-none');
  $left_container.removeClass('left-active');
});

$right.hover(() => {
  $(".card2").css("box-shadow","0 8px 0 #43c0d7,0 0 32px #43c0d7")
  $right_p_2.removeClass('d-none');
  $right_container.addClass('right-active');
}, () => {
  $(".card2").css("box-shadow","0 8px 0 #43c0d7, 0px 0px 32px rgb(0 0 0 / 10%)")
  $right_p_2.addClass('d-none');
  $right_container.removeClass('right-active');
});

module.exports = {updateHrsForCards}
