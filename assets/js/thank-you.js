const {
  SIXTY,
  HOUR_IN_SECONDS,
  LOCALE_STRINGS,
  BADGES,
  CONTRIBUTION_LANGUAGE
} = require("./constants");
const {
  setPageContentHeight,
  toggleFooterPosition,
  updateLocaleLanguagesDropdown,
  getLocaleString,
  performAPIRequest,
} = require("./utils");

const CURRENT_INDEX = "currentIndex";
const SPEAKER_DETAILS = "speakerDetails";
const SKIP_COUNT = "skipCount";
const COUNT = "count";
const SPEAKERS_DATA = "speakersData";
const totalSentence = 5;

function setSentencesContributed() {
  // const skipCountInStorage = Number(localStorage.getItem(SKIP_COUNT));
  // const localCount = Number(localStorage.getItem(COUNT));
  // const currentIndexInStorage = Number(localStorage.getItem(CURRENT_INDEX));
  // return localCount + currentIndexInStorage - skipCountInStorage;
  const contributionLanguage = localStorage.getItem(CONTRIBUTION_LANGUAGE);
  const speakerDetails = localStorage.getItem("speakerDetails");
  let userName = "";
  if (speakerDetails) {
    userName = JSON.parse(speakerDetails).userName;
  }
  performAPIRequest(
    `rewards?language=${contributionLanguage}&category=speak&userName=${userName}`
  ).then((data) => {
    $("#user-contribution").text(data.contributionCount);
    if (data.isNewBadge) {
      $("#spree_text").removeClass("d-none");
      $("#milestone_text").removeClass("d-none");
      $("#current_badge_name").text(data.currentBadgeType);
      $("#current_badge_name_1").text(data.currentBadgeType);
      $("#current_badge_count").text(data.currentMilestone);
      $("#next_badge_count").text(data.nextMilestone);
      $("#next_badge_name_1").text(data.nextBadgeType);
      $("#download_pdf").attr("data-badge", data.currentBadgeType.toLowerCase());
    } else if(data.contributionCount <= 5) {
      $("#champion_text").removeClass("d-none");
      $("#contribution_text").removeClass("d-none");
    } else if ((Number(data.contributionCount) >= Number(data.currentMilestone)) && (Number(data.contributionCount) <= Number(data.nextMilestone))) {
      $("#spree_text").removeClass("d-none");
      $("#before_badge_content").removeClass("d-none");
      $("#sentense_away_count").text(Number(data.nextMilestone) - Number(data.contributionCount));
      $("#next_badge_name").text(data.nextBadgeType);
      const $bronzeBadgeLink = $("#bronze_badge_link img");
      const $silverBadgeLink = $("#silver_badge_link img");
      const $goldBadgeLink = $("#gold_badge_link img");
      const $platinumBadgeLink = $("#platinum_badge_link img");
      if (data.currentBadgeType.toLowerCase() === "bronze") {
        $bronzeBadgeLink.attr("src","./img/badge_enabled.svg");
        $bronzeBadgeLink.parent().attr("disabled", false);
      } else if (data.currentBadgeType.toLowerCase() === "silver") {
        $bronzeBadgeLink.attr("src","./img/badge_enabled.svg");
        $bronzeBadgeLink.parent().attr("disabled", false);
        $silverBadgeLink.attr("src","./img/badge_enabled.svg");
        $silverBadgeLink.parent().attr("disabled", false);
      } else if (data.currentBadgeType.toLowerCase() === "gold") {
        $bronzeBadgeLink.attr("src","./img/badge_enabled.svg");
        $bronzeBadgeLink.parent().attr("disabled", false);
        $silverBadgeLink.attr("src","./img/badge_enabled.svg");
        $silverBadgeLink.parent().attr("disabled", false);
        $goldBadgeLink.attr("src","./img/badge_enabled.svg");
        $goldBadgeLink.parent().attr("disabled", false);
      } else if (data.currentBadgeType.toLowerCase() === "platinum") {
        $bronzeBadgeLink.attr("src","./img/badge_enabled.svg");
        $bronzeBadgeLink.parent().attr("disabled", false);
        $silverBadgeLink.attr("src","./img/badge_enabled.svg");
        $silverBadgeLink.parent().attr("disabled", false);
        $goldBadgeLink.attr("src","./img/badge_enabled.svg");
        $goldBadgeLink.parent().attr("disabled", false);
        $platinumBadgeLink.attr("src","./img/badge_enabled.svg");
        $platinumBadgeLink.parent().attr("disabled", false);
      }
    }
  });
}

const getTotalProgressSize = () => {
  //magic calculation for every screen size
  const breakPointForSmallScreen = 576;
  const breakPointForLargeScreen = 1200;
  const breakPointForExtraLargeScreen = 2000;
  let screenSizeDiff;
  let totalProgressBarWidth;
  let totalProgressBarBulbWidth = 11;
  let totalProgressBarBulbLeft;
  if (innerWidth < breakPointForSmallScreen) {
    screenSizeDiff = breakPointForSmallScreen - innerWidth;
    totalProgressBarWidth = 70.5 - (1.333 * screenSizeDiff) / 100;
    totalProgressBarBulbLeft = 75.2 - (0.4 * screenSizeDiff) / 100;
  } else if (innerWidth < breakPointForLargeScreen) {
    screenSizeDiff = breakPointForLargeScreen - innerWidth;
    totalProgressBarWidth = 70.5 - (0.5 * screenSizeDiff) / 100;
    totalProgressBarBulbLeft = 75.75 - (0.25 * screenSizeDiff) / 100;
  } else if (innerWidth < breakPointForExtraLargeScreen) {
    screenSizeDiff = breakPointForExtraLargeScreen - innerWidth;
    totalProgressBarWidth = 71.5 - (0.1 * screenSizeDiff) / 100;
    totalProgressBarBulbWidth = 12 - (0.1 * screenSizeDiff) / 100;
    totalProgressBarBulbLeft =
      innerWidth < 1500 ? 75.2 : 75.5 - (0.003 * screenSizeDiff) / 100;
  } else {
    screenSizeDiff = innerWidth - breakPointForExtraLargeScreen;
    totalProgressBarWidth = 71.5 + (0.1 * screenSizeDiff) / 100;
    totalProgressBarBulbWidth = 12;
    totalProgressBarBulbLeft = 75.8;
  }
  return {
    totalProgressBarWidth,
    totalProgressBarBulbWidth,
    totalProgressBarBulbLeft,
  };
};

const setTotalProgressBar = (totalSeconds) => {
  const $totalProgress = $("#total-progress");
  const secondsInHundredHours = 100 * HOUR_IN_SECONDS;
  const barWidth = getTotalProgressSize();
  const targetPercentCompleted = (totalSeconds / secondsInHundredHours) * 100;
  if (targetPercentCompleted >= 100) {
    $totalProgress.next().css({
      width: barWidth.totalProgressBarBulbWidth + "%",
      left: barWidth.totalProgressBarBulbLeft + "%",
    });
    $totalProgress.width((100 * barWidth.totalProgressBarWidth) / 100 + "%");
    $("#total-progress").one(
      "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
      () => {
        let progressWidth = 0;
        let timerKey = setInterval(() => {
          if (progressWidth >= 100) {
            clearInterval(timerKey);
          }
          $totalProgress
            .next()
            .css(
              "background",
              `linear-gradient(to right, #007bff 0%, #007bff ${progressWidth}%, transparent 0%)`
            );
          progressWidth = progressWidth + 5;
        }, 30);
      }
    );
  } else {
    $totalProgress.width(
      (targetPercentCompleted * barWidth.totalProgressBarWidth) / 100 + "%"
    );
  }
};

const showSpeakersHoursData = (speakerDetailsValue) => {
  try {
    const $speakersDataHoursValue = $("#hour-value");
    const totalCompleteSentence = Number(
      speakerDetailsValue.find((t) => t.index === 1).duration
    );
    const totalSeconds = totalCompleteSentence;
    const hours = Math.floor(totalSeconds / HOUR_IN_SECONDS);
    const remainingAfterHours = totalSeconds % HOUR_IN_SECONDS;
    const minutes = Math.floor(remainingAfterHours / SIXTY);
    const seconds = Math.ceil(remainingAfterHours % SIXTY);
    $speakersDataHoursValue.text(`${hours}h ${minutes}m ${seconds}s`);
    setTotalProgressBar(totalSeconds);
  } catch (err) {
    console.log(err);
  }
};

const getFormattedTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / HOUR_IN_SECONDS);
  const remainingAfterHours = totalSeconds % HOUR_IN_SECONDS;
  const minutes = Math.floor(remainingAfterHours / SIXTY);
  const seconds = Math.ceil(remainingAfterHours % SIXTY);
  return { hours, minutes, seconds };
};

const updateShareContent = function (language, rank) {
  const localeStrings = JSON.parse(localStorage.getItem(LOCALE_STRINGS));
  let localeText = "";
  if (rank === 0) {
    localeText = localeStrings["social sharing text without rank"];
  } else {
    localeText = localeStrings["social sharing text with rank"];
    localeText = localeText.replace("%language", language);
    localeText = localeText.replace("%rank", rank);
  }
  //const text = `I've contributed towards building open language repository for India on https://boloindia.nplt.in You and I can make a difference by donating our voices that can help machines learn our language and interact with us through great linguistic applications. Our ${language} language ranks ${rank} on BoloIndia. Do your bit and empower the language?`;
  const $whatsappShare = $("#whatsapp_share");
  $whatsappShare.attr(
    "href",
    `https://api.whatsapp.com/send?text=${localeText}`
  );
  const $twitterShare = $("#twitter_share");
  $twitterShare.attr(
    "href",
    `https://twitter.com/intent/tweet?text=${localeText}`
  );
  const $linkedinShare = $("#linkedin_share");
  $linkedinShare.attr(
    "href",
    `https://www.linkedin.com/shareArticle?mini=true&url=https://boloindia.nplt.in&title=I've contributed towards building open language repository for India on https://boloindia.nplt.in&summary=${localeText}`
  );
};

const getLanguageStats = function () {
  fetch("/stats/summary?aggregateDataByLanguage=true")
    .then((res) => res.json())
    .then((response) => {
      if (response.aggregate_data_by_language.length > 0) {
        $("#did_you_know_section").show();
        const data = response.aggregate_data_by_language.sort((a, b) =>
          Number(a.total_contributions) > Number(b.total_contributions) ? -1 : 1
        );
        const { hours, minutes, seconds } = getFormattedTime(
          Number(data[0].total_contributions) * 3600
        );
        const $highestLangTime = $("#highest_language_time");
        $highestLangTime.text(`${hours}hrs ${minutes}min ${seconds}sec`);

        const $highestLanguageProgress = $("#highest_language_progress");
        const hlh = Number(data[0].total_contributions) * 3600;
        const hlp = (hlh / (100 * 3600)) * 100;
        $highestLanguageProgress.css("width", `${hlp}%`);

        const contributionLanguage = localStorage.getItem(
          CONTRIBUTION_LANGUAGE
        );
        const rank = data.findIndex(
          (x) => x.language.toLowerCase() === contributionLanguage.toLowerCase()
        );
        const $contributedLangTime = $("#contribute_language_time");
        const $contributeLanguageProgress = $("#contribute_language_progress");
        if (rank > -1) {
          const tc = data[rank].total_contributions;
          const { hours: hr, minutes: min, seconds: sec } = getFormattedTime(
            Number(tc) * 3600
          );
          $contributedLangTime.text(`${hr}hrs ${min}min ${sec}sec`);
          const rh = Number(tc) * 3600;
          const rhp = (rh / (100 * 3600)) * 100;
          $contributeLanguageProgress.css("width", `${rhp}%`);
        } else {
          $contributedLangTime.text("0 hrs");
          $contributedLangTime.css("right", 0);
          $contributeLanguageProgress.css("width", `0%`);
        }
        const $languageId = $("#languageId");
        $languageId.text(data[0].language);
        const $languageChoiceId = $("#languageChoiceId");
        $languageChoiceId.text(contributionLanguage);
        if (rank > -1) {
          updateShareContent(contributionLanguage, rank + 1);
        } else {
          updateShareContent(contributionLanguage, data.length + 1);
        }
      } else {
        updateShareContent("", 0);
        $("#did_you_know_section").hide();
      }
    });
};

function executeOnLoad() {
  const currentIndexInStorage = Number(localStorage.getItem(CURRENT_INDEX));
  const localSpeakerDataParsed = JSON.parse(
    localStorage.getItem(SPEAKER_DETAILS)
  );

  if (!localSpeakerDataParsed) {
    location.href = "/#start-record";
  } else if (currentIndexInStorage < totalSentence) {
    location.href = "/#start-record";
  } else {
    $("#nav-user").removeClass("d-none");
    $("#nav-login").addClass("d-none");
    $("#nav-username").text(localSpeakerDataParsed.userName);

    const $speakersDataHoursValue = $("#hour-value");
    setPageContentHeight();
    setSentencesContributed();

    fetch(`/getDetails/${localSpeakerDataParsed.language}`)
      .then((data) => {
        if (!data.ok) {
          throw Error(data.statusText || "HTTP error");
        } else {
          return data.json();
        }
      })
      .then((data) => {
        localStorage.setItem(SPEAKERS_DATA, JSON.stringify(data));
        showSpeakersHoursData(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        $speakersDataHoursValue.next().addClass("d-none");
      });
  }

  toggleFooterPosition();
  const contributionLanguage = localStorage.getItem(CONTRIBUTION_LANGUAGE);
  if (contributionLanguage) {
    updateLocaleLanguagesDropdown(contributionLanguage);
  }
  getLanguageStats();
}

function downloadPdf(badgeType) {
  console.log("badge type: ", badgeType);
  const pdf = new jsPDF()
  const img = new Image();
  img.onload = function () {
    pdf.addImage(this, 10, 10);
    pdf.save("test.pdf");
  };

  img.crossOrigin = "Anonymous";
  img.src = BADGES[badgeType].imgSm;
}

$(document).ready(function () {
  $("#download_pdf").on('click', function() {
    downloadPdf()
  });

  $("#bronze_badge_link, #silver_badge_link, #gold_badge_link, #platinum_badge_link").on('click', function() {
    if(!$(this).attr("disabled")) {
      downloadPdf($(this).attr("data-badge"));
    }
  });

  getLocaleString()
    .then((data) => {
      executeOnLoad();
    })
    .catch((err) => {
      executeOnLoad();
    });
});

module.exports = { setSentencesContributed  };
