const fetch = require('./fetch');
const { BOLOPAGE, DEKHOPAGE, LIKHOPAGE, SUNOPAGE , CONTRIBUTION_LANGUAGE} = require('./constants');
const {
  updateLocaleLanguagesDropdown
} = require('./utils');

const getWidgetWithBadge = (imgPath, badgeType, initiativeType, type) => {
  setPopover(badgeType, type, initiativeType);
  return `
  <div class="badge-widget text-center" rel="popover" id="${badgeType}_${type}_badge">
  <img src=${imgPath} class="my-badge-image" height="74" width="60">
  <h6 class="mt-2 font-family-Rowdies">${badgeType}</h6>
</div>`
}

const getWidgetWithoutBadge = (badgeType, type) => {
  return ` <div class="badge-widget-placeholder m-auto text-center" id="${badgeType}_${type}_placeholder">
                 <p>${badgeType}</p>
 </div>`
}

const getCard = function (badgeName, source, initiativeType) {
  console.log("popover", badgeName);
  const badge = initiativeType == 'text' ? BOLOPAGE[badgeName.toLowerCase()] : initiativeType == 'ocr' ? DEKHOPAGE[badgeName.toLowerCase()] : initiativeType == 'asr' ? SUNOPAGE[badgeName.toLowerCase()] : LIKHOPAGE[badgeName.toLowerCase()];
  return `<div class="text-center">
                <div class="py-2">
                    <img src=${source == "contribution" ? badge.imgLg : badge.imgSm} alt="${badgeName.toLowerCase()}_badge" class="img-fluid">
                </div>
            </div>`
}

const setPopover = (badgeType, type, initiativeType) => {
  $(`#${badgeType}_${type}_badge`).popover({
    html: true,
    trigger: 'hover',
    placement: 'left',
    content: function () {
      return getCard(badgeType, type, initiativeType);
    }
  })
}

const getBadgeRow = (result, id, type) => {
  let $tableRows = $(`#${id}`);
  if (result && result.language && result.language.length > 0) {
    result.language.forEach(item => {
      const row = ` <div class="col-12 p-0">
              <div class="row m-0">
                <div class="col-lg-2 col-md-3 col-12 m-auto">
                  <h4 class="font-family-Rowdies my-4 my-lg-0 my-md-0">${item.name}</h4> 
                 </div>
                 ${item.contribute && item.contribute.length ? ` <div class="col-lg-5 col-md-5 col-12">
                 <div class="row mx-0 mb-2 d-lg-none">
                   <h6 class="text-custom-muted font-weight-normal font-family-Rowdies"> Contribution </h6>
                   </div>
                 <div class="row m-0">
                   <div class="col-3 pl-0">
                   ${item.contribute[0] && item.contribute[0].grade == 'Bronze' ? getWidgetWithBadge(`/img/${type}_bronze_medal.svg`, 'Bronze', type, 'contribution') : getWidgetWithoutBadge('Bronze', 'contribution')}
                   </div>
                   <div class="col-3 pl-0">
                     ${item.contribute[1] && item.contribute[1].grade == 'Silver' ? getWidgetWithBadge(`/img/${type}_silver_medal.svg`, 'Silver', type, 'contribution') : getWidgetWithoutBadge('Silver', 'contribution')}
                   </div>
                   <div class="col-3 pl-0">
                     ${item.contribute[2] && item.contribute[2].grade == 'Gold' ? getWidgetWithBadge(`/img/${type}_gold_medal.svg`, 'Gold', type, 'contribution') : getWidgetWithoutBadge('Gold', 'contribution')}
                   </div>
                   <div class="col-3 pl-0">
                   ${item.contribute[3] && item.contribute[3].grade == 'Platinum' ? getWidgetWithBadge(`/img/${type}_platinum_medal.svg`, 'Platinum', type, 'contribution') : getWidgetWithoutBadge('Platinum', 'contribution')}
                   </div>
                 </div>
               </div>`: `<div class="col-5"></div>`}
               ${item.validate && item.validate.length ? `  <div class="col-lg-5 col-md-5 col-12 mt-3 mt-lg-0 mt-md-0">
               <div class="row mx-0 mb-2 d-lg-none">
               <h6 class="text-custom-muted font-weight-normal font-family-Rowdies"> Validation </h6>
               </div>
               <div class="row m-0">
                 <div class="col-3 pl-0">
                 ${item.contribute[0] && item.contribute[0].grade == 'Bronze' ? getWidgetWithBadge(`/img/${type}_bronze_val.svg`, 'Bronze', type, 'validation') : getWidgetWithoutBadge('Bronze', 'validation')}
                 </div>
                 <div class="col-3 pl-0">
                     ${item.contribute[1] && item.contribute[1].grade == 'Silver' ? getWidgetWithBadge(`/img/${type}_silver_medal_val.svg`, 'Silver', type, 'validation') : getWidgetWithoutBadge('Silver', 'validation')}
                   </div>
                   <div class="col-3 pl-0">
                     ${item.contribute[2] && item.contribute[2].grade == 'Gold' ? getWidgetWithBadge(`/img/${type}_gold_medal_val.svg`, 'Gold', type, 'validation') : getWidgetWithoutBadge('Gold', 'validation')}
                   </div>
                   <div class="col-3 pl-0">
                   ${item.contribute[3] && item.contribute[3].grade == 'Platinum' ? getWidgetWithBadge(`/img/${type}_platinum_medal_val.svg`, 'Platinum', type, 'validation') : getWidgetWithoutBadge('Platinum', 'validation')}
                   </div>
               </div>
             </div>` : ` <div class="col-5"></div>`}
              </div>
            </div>`;
      $tableRows.append(row);
    });
  } else {
    const row = ` <div class="col-12 p-0">
    <div class="row m-0 text-center">
      <h4 class="text-custom-muted w-100"> No badge earned for ${type} india</h4>
    </div>
    </div>
    `
    $tableRows.append(row);
  }

}

const groupBy = (result, column) => {
  return result.reduce((r, a) => {
    r[a[column]] = [...r[a[column]] || [], a];
    return r;
  }, {});
}

const bindData = (initiativekey, langaugeArray, mappedData) => {
  let initiativeData = {
    initiativeType: initiativekey,
    language: langaugeArray
  }
  mappedData.push(initiativeData);
}

const getBadgesForUser = () => {
  return new Promise((resolve, reject) => {
    const details = localStorage.getItem("speakerDetails");
    const username = details.userName ?? '';
    fetch(`/user-rewards/${username}`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    })
      .then((res) => res.json())
      .then((result) => {
        let mappedData = [];
        let initiativekeys = ['text', 'ocr', 'parallel', 'asr'];
        if (result && result.length) {
          let groupByInitiative = groupBy(result, 'type');
          initiativekeys.forEach(initiativekey => {
            if (groupByInitiative && groupByInitiative[initiativekey]) {
              let initiativeByData = groupByInitiative[initiativekey];
              let groupByLanguage = groupBy(initiativeByData, 'language');
              let langaugeKeys = Object.keys(groupByLanguage);
              let langaugeArray = [];
              langaugeKeys.forEach(elem => {
                let result = groupByLanguage[elem];
                const contribution = result.filter(initiativekey => initiativekey.category == 'contribute');
                const validate = result.filter(initiativekey => initiativekey.category == 'validate');
                let languageObj = {
                  name: elem,
                  contribute: contribution,
                  validate: validate
                }
                langaugeArray.push(languageObj);
              });
              bindData(initiativekey, langaugeArray, mappedData)
            } else {
              bindData(initiativekey, [], mappedData)
            }
          });
        }  else {
          initiativekeys.forEach(initiativekey => {
              bindData(initiativekey, [], mappedData);
          });
        }
          mappedData.forEach(element => {
            const id = element.initiativeType == 'text' ? 'bolo-badge' : element.initiativeType == 'ocr' ? 'dekho-badge' : element.initiativeType == 'asr' ? 'suno-badge' : 'likho-badge';
            const type = element.initiativeType == 'text' ? 'bolo' : element.initiativeType == 'ocr' ? 'dekho' : element.initiativeType == 'asr' ? 'suno' : 'likho'
            getBadgeRow(element, id, type);
          });
          resolve(result);
      });
  })
}

$(document).ready(() => {
  const language = localStorage.getItem(CONTRIBUTION_LANGUAGE) || 'english';
  updateLocaleLanguagesDropdown(language);
  getBadgesForUser();
});

module.exports = {getBadgesForUser};