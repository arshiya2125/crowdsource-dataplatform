const {CURRENT_MODULE, SPEAKER_DETAILS_KEY} = require('./constants');
const {
  setUserModalOnShown,
  setSpeakerDetails,
  setGenderRadioButtonOnClick,
  setUserNameOnInputFocus,
  setStartRecordingBtnOnClick,
  addlistenerToGenderRadios
} = require('./speakerDetails');
const {isMobileDevice} = require('./common');

function onActiveNavbar(value) {
  const $header = $('#module_name');
  localStorage.setItem(CURRENT_MODULE, value);
  const allDivs = $header.children();
  let targetedDivIndex = -1;
  allDivs.each(function (index, element) {
    if (element.getAttribute('value') === value) {
      targetedDivIndex = index;
    }
  });
  const previousActiveDiv = $header.find('.active');
  previousActiveDiv && previousActiveDiv.removeClass('active');
  allDivs[targetedDivIndex].classList.add('active');
}

const onOpenUserDropDown = ()=>{
  const $userDropDown = $('#userDropDown');
  const $userNavBar = $('#userNavBar');
  $userDropDown.off('show.bs.dropdown').on('show.bs.dropdown',()=>{
      $userNavBar.addClass('active')
    })

  $userDropDown.off('hide.bs.dropdown').on('hide.bs.dropdown',()=>{
    $userNavBar.removeClass('active')
  })
}

const showUserProfile = function (userName) {
  const $navUser = $('#nav-user');
  const $navUserName = $navUser.find('#nav-username');
  const $userProfileName = $('#user_profile_name');
  const $anonymousUser = $('#anonymous_user');
  $navUser.removeClass('d-none');
  if (userName != undefined && userName != null) {
    if(isMobileDevice()){
      if(userName.trim().length == 0){
        $userProfileName.addClass('d-none');
        $anonymousUser.removeClass('d-none');
      } else {
        $userProfileName.removeClass('d-none');
        $userProfileName.text(userName);
        $anonymousUser.addClass('d-none');
      }
    } else {
      if(userName.trim().length == 0){
        $userProfileName.addClass('d-none');
        $anonymousUser.removeClass('d-none');
        $navUserName.text('');
      } else {
        $userProfileName.addClass('d-none');
        $anonymousUser.addClass('d-none');
        $navUserName.text(userName);
      }
    }
  }
}

const onChangeUser = (url, module) => {
  const $userName = $('#username');
  const $startRecordBtn = $('#proceed-box');
  const $startRecordBtnTooltip = $startRecordBtn.parent();
  setUserModalOnShown($userName);
  $startRecordBtnTooltip.tooltip('disable');
  setUserNameOnInputFocus();
  $('#change_user').on('click', () => {
    setStartRecordingBtnOnClick(url, module);
  })
}

module.exports = {onActiveNavbar, showUserProfile, onChangeUser,onOpenUserDropDown};
