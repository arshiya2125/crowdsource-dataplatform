!function t(e,o,n){function a(i,c){if(!o[i]){if(!e[i]){var l="function"==typeof require&&require;if(!c&&l)return l(i,!0);if(r)return r(i,!0);throw new Error("Cannot find module '"+i+"'")}var s=o[i]={exports:{}};e[i][0].call(s.exports,function(t){var o=e[i][1][t];return a(o||t)},s,s.exports,t,e,o,n)}return o[i].exports}for(var r="function"==typeof require&&require,i=0;i<n.length;i++)a(n[i]);return a}({1:[function(t,e,o){"use strict";e.exports={DEFAULT_CON_LANGUAGE:"Hindi",AUDIO_DURATION:6,SIXTY:60,HOUR_IN_SECONDS:3600,ALL_LANGUAGES:[{value:"Assamese",id:"as",text:"অসমীয়া",hasLocaleText:!1,data:!0},{value:"Bengali",id:"bn",text:"বাংলা",hasLocaleText:!1,data:!0},{value:"English",id:"en",text:"English",hasLocaleText:!0,data:!0},{value:"Gujarati",id:"gu",text:"ગુજરાતી",hasLocaleText:!1,data:!0},{value:"Hindi",id:"hi",text:"हिंदी",hasLocaleText:!0,data:!0},{value:"Kannada",id:"kn",text:"ಕನ್ನಡ",hasLocaleText:!1,data:!0},{value:"Malayalam",id:"ml",text:"മലയാളം",hasLocaleText:!1,data:!0},{value:"Marathi",id:"mr",text:"मराठी",hasLocaleText:!1,data:!0},{value:"Odia",id:"or",text:"ଓଡିଆ",hasLocaleText:!1,data:!0},{value:"Punjabi",id:"pa",text:"ਪੰਜਾਬੀ",hasLocaleText:!1,data:!0},{value:"Tamil",id:"ta",text:"தமிழ்",hasLocaleText:!0,data:!0},{value:"Telugu",id:"te",text:"తెలుగు",hasLocaleText:!1,data:!0}],TOP_LANGUAGES_BY_HOURS:"topLanguagesByHours",TOP_LANGUAGES_BY_SPEAKERS:"topLanguagesBySpeakers",AGGREGATED_DATA_BY_LANGUAGE:"aggregateDataCountByLanguage",LOCALE_STRINGS:"localeString",CONTRIBUTION_LANGUAGE:"contributionLanguage"}},{}],2:[function(t,e,o){"use strict";var n=t("./constants"),a=n.HOUR_IN_SECONDS,r=n.SIXTY,i=n.ALL_LANGUAGES,c=t("./locale").getCookie;var l=function(t){return fetch(t).then(function(t){if(t.ok)return Promise.resolve(t.json());throw Error(t.statusText||"HTTP error")})};e.exports={setPageContentHeight:function(){var t=$("footer"),e=$(".navbar"),o=100-(t.outerHeight()+e.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",o+"vh")},toggleFooterPosition:function(){var t=$("footer");t.toggleClass("fixed-bottom"),t.toggleClass("bottom")},fetchLocationInfo:function(){var t=localStorage.getItem("state_region")||"NOT_PRESENT",e=localStorage.getItem("country")||"NOT_PRESENT";return"NOT_PRESENT"!==t&&"NOT_PRESENT"!==e&&t.length>0&&e.length>0?new Promise(function(o){o({regionName:t,country:e})}):fetch("https://www.cloudflare.com/cdn-cgi/trace").then(function(t){return t.text()}).then(function(t){var e=t.split("\n"),o="";for(var n in e)if(e[n].startsWith("ip=")){o=e[n].replace("ip=","");break}return 0!==o.length?fetch("/location-info?ip=".concat(o)):new Promise(function(t,e){e("Ip Address not available")})})},updateLocaleLanguagesDropdown:function(t){var e=$("#localisation_dropdown"),o=i.find(function(e){return e.value===t});"english"===t.toLowerCase()||!1===o.hasLocaleText?e.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>'):e.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>\n        <a id='.concat(o.value,' class="dropdown-item" href="/changeLocale/').concat(o.id,'">').concat(o.text,"</a>"))},calculateTime:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],o=Math.floor(t/a),n=t%a,i=Math.floor(n/r),c=Math.round(n%r);return e?{hours:o,minutes:i,seconds:c}:{hours:o,minutes:i}},formatTime:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n="";return t>0&&(n+="".concat(t," hrs ")),e>0&&(n+="".concat(e," min ")),0===t&&0===e&&o>0&&(n+="".concat(o," sec ")),n.substr(0,n.length-1)},getLocaleString:function(){return new Promise(function(t,e){var o=c("i18n");l("/get-locale-strings/".concat(o)).then(function(e){localStorage.setItem("localeString",JSON.stringify(e)),t(e)})})},performAPIRequest:l,showElement:function(t){t.removeClass("d-none")},hideElement:function(t){t.addClass("d-none")},setFooterPosition:function(){var t=$("#page-content").outerHeight();$("body").outerHeight()<=t+$("nav").outerHeight()+$("footer").outerHeight()&&$("footer").removeClass("fixed-bottom").addClass("bottom")}}},{"./constants":1,"./locale":3}],3:[function(t,e,o){"use strict";var n=t("./utils").updateLocaleLanguagesDropdown,a=t("./constants").ALL_LANGUAGES,r=function(t){var e=location.href.split("/"),o=e[e.length-1];i("i18n",t,1),location.href="/".concat(t,"/").concat(o)};function i(t,e,o){var n=new Date;n.setTime(n.getTime()+24*o*60*60*1e3);var a="expires="+n.toGMTString();document.cookie=t+"="+e+";"+a+";path=/"}function c(t){for(var e=t+"=",o=decodeURIComponent(document.cookie).split(";"),n=0;n<o.length;n++){for(var a=o[n];" "==a.charAt(0);)a=a.substring(1);if(0==a.indexOf(e))return a.substring(e.length,a.length)}return""}e.exports={checkCookie:function(){return""!=c("i18n")},getCookie:c,setCookie:i,changeLocale:r,showLanguagePopup:function(){document.getElementById("toggle-content-language").click()},redirectToLocalisedPage:function(){var t=c("i18n"),e=location.href.split("/"),o=e[e.length-2];if($("#home-page").attr("default-lang",t),o!=t)r(t);else{var i=a.find(function(e){return e.id===t});i&&n(i.value)}}}},{"./constants":1,"./utils":4}],4:[function(t,e,o){"use strict";var n=t("./constants"),a=n.HOUR_IN_SECONDS,r=n.SIXTY,i=n.ALL_LANGUAGES,c=t("./locale").getCookie;var l=function(t){return fetch(t).then(function(t){if(t.ok)return Promise.resolve(t.json());throw Error(t.statusText||"HTTP error")})};e.exports={setPageContentHeight:function(){var t=$("footer"),e=$(".navbar"),o=100-(t.outerHeight()+e.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",o+"vh")},toggleFooterPosition:function(){var t=$("footer");t.toggleClass("fixed-bottom"),t.toggleClass("bottom")},fetchLocationInfo:function(){var t=localStorage.getItem("state_region")||"NOT_PRESENT",e=localStorage.getItem("country")||"NOT_PRESENT";return"NOT_PRESENT"!==t&&"NOT_PRESENT"!==e&&t.length>0&&e.length>0?new Promise(function(o){o({regionName:t,country:e})}):fetch("https://www.cloudflare.com/cdn-cgi/trace").then(function(t){return t.text()}).then(function(t){var e=t.split("\n"),o="";for(var n in e)if(e[n].startsWith("ip=")){o=e[n].replace("ip=","");break}return 0!==o.length?fetch("/location-info?ip=".concat(o)):new Promise(function(t,e){e("Ip Address not available")})})},updateLocaleLanguagesDropdown:function(t){var e=$("#localisation_dropdown"),o=i.find(function(e){return e.value===t});"english"===t.toLowerCase()||!1===o.hasLocaleText?e.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>'):e.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>\n        <a id='.concat(o.value,' class="dropdown-item" href="/changeLocale/').concat(o.id,'">').concat(o.text,"</a>"))},calculateTime:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],o=Math.floor(t/a),n=t%a,i=Math.floor(n/r),c=Math.round(n%r);return e?{hours:o,minutes:i,seconds:c}:{hours:o,minutes:i}},formatTime:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n="";return t>0&&(n+="".concat(t," hrs ")),e>0&&(n+="".concat(e," min ")),0===t&&0===e&&o>0&&(n+="".concat(o," sec ")),n.substr(0,n.length-1)},getLocaleString:function(){return new Promise(function(t,e){var o=c("i18n");l("/get-locale-strings/".concat(o)).then(function(e){localStorage.setItem("localeString",JSON.stringify(e)),t(e)})})},performAPIRequest:l,showElement:function(t){t.removeClass("d-none")},hideElement:function(t){t.addClass("d-none")},setFooterPosition:function(){var t=$("#page-content").outerHeight();$("body").outerHeight()<=t+$("nav").outerHeight()+$("footer").outerHeight()&&$("footer").removeClass("fixed-bottom").addClass("bottom")}}},{"./constants":1,"./locale":3}]},{},[2]);