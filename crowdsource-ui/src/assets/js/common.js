const {
    CONTRIBUTION_LANGUAGE,TOP_LANGUAGES_BY_HOURS,TO_LANGUAGE,ALL_LANGUAGES,CURRENT_MODULE
  } = require('./constants');

const getContributedAndTopLanguage = (topLanguagesData, type) => {
  topLanguagesData = type == "speakers" ?  topLanguagesData.sort((a, b) => Number(a.total_speakers) > Number(b.total_speakers) ? -1 : 1) : topLanguagesData.sort((a, b) => Number(a.total_contributions) > Number(b.total_contributions) ? -1 : 1);
  const topLanguagesResult = [...topLanguagesData];
  const contributedLanguage = localStorage.getItem(CONTRIBUTION_LANGUAGE);
  const topLanguageArray = [];
  let topLanguages = [];
  const contributedLanguageHours = topLanguagesData.find(item => item.language == contributedLanguage);
  if (contributedLanguageHours && contributedLanguageHours.language != topLanguagesData[0].language) {
    contributedLanguageHours ? topLanguageArray.push(contributedLanguageHours) : topLanguageArray.push({ language: contributedLanguage, total_contributions: "0.000" });
    let remainingLanguage = topLanguagesData.filter(item => item.language !== contributedLanguage);
    remainingLanguage = type == "speakers" ?  remainingLanguage.sort((a, b) => Number(a.total_speakers) > Number(b.total_speakers) ? -1 : 1) : remainingLanguage.sort((a, b) => Number(a.total_contributions) > Number(b.total_contributions) ? -1 : 1);
    topLanguages = remainingLanguage.slice(0, 3);
  } else {
    topLanguages =type == "speakers" ?  topLanguagesResult.sort((a, b) => Number(a.total_speakers) > Number(b.total_speakers) ? -1 : 1).slice(0, 3) : topLanguagesResult.sort((a, b) => Number(a.total_contributions) > Number(b.total_contributions) ? -1 : 1).slice(0, 3);
  }
  return topLanguageArray.concat(topLanguages);
}

  module.exports =  {getContributedAndTopLanguage};