!function e(t,a,n){function o(r,c){if(!a[r]){if(!t[r]){var s="function"==typeof require&&require;if(!c&&s)return s(r,!0);if(i)return i(r,!0);throw new Error("Cannot find module '"+r+"'")}var l=a[r]={exports:{}};t[r][0].call(l.exports,function(e){var a=t[r][1][e];return o(a||e)},l,l.exports,e,t,a,n)}return a[r].exports}for(var i="function"==typeof require&&require,r=0;r<n.length;r++)o(n[r]);return o}({1:[function(e,t,a){"use strict";t.exports={DEFAULT_CON_LANGUAGE:"Hindi",AUDIO_DURATION:6,SIXTY:60,HOUR_IN_SECONDS:3600,ALL_LANGUAGES:[{value:"Assamese",id:"as",text:"অসমীয়া",hasLocaleText:!0,data:!0},{value:"Bengali",id:"bn",text:"বাংলা",hasLocaleText:!0,data:!0},{value:"English",id:"en",text:"English",hasLocaleText:!0,data:!1},{value:"Gujarati",id:"gu",text:"ગુજરાતી",hasLocaleText:!0,data:!0},{value:"Hindi",id:"hi",text:"हिंदी",hasLocaleText:!0,data:!0},{value:"Kannada",id:"kn",text:"ಕನ್ನಡ",hasLocaleText:!0,data:!0},{value:"Malayalam",id:"ml",text:"മലയാളം",hasLocaleText:!0,data:!0},{value:"Marathi",id:"mr",text:"मराठी",hasLocaleText:!0,data:!0},{value:"Odia",id:"or",text:"ଓଡିଆ",hasLocaleText:!0,data:!0},{value:"Punjabi",id:"pa",text:"ਪੰਜਾਬੀ",hasLocaleText:!0,data:!0},{value:"Tamil",id:"ta",text:"தமிழ்",hasLocaleText:!0,data:!0},{value:"Telugu",id:"te",text:"తెలుగు",hasLocaleText:!0,data:!0}],TOP_LANGUAGES_BY_HOURS:"topLanguagesByHours",TOP_LANGUAGES_BY_SPEAKERS:"topLanguagesBySpeakers",AGGREGATED_DATA_BY_LANGUAGE:"aggregateDataCountByLanguage",LOCALE_STRINGS:"localeString",CONTRIBUTION_LANGUAGE:"contributionLanguage"}},{}],2:[function(e,t,a){"use strict";var n=e("./utils"),o=n.toggleFooterPosition,i=n.setPageContentHeight;function r(){window.history.back()}function c(){var e=$("#feedback_failure_msg"),t={feedback:$("#feedback_description").val(),subject:$("#feedback_subject").val(),language:localStorage.getItem("contributionLanguage")};fetch("/feedback",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(function(e){return e.json()}).then(function(t){200===t.statusCode?(e.addClass("d-none"),$("#feedback_form").hide(),$("#feedback_thank_you_screen").removeClass("d-none")):e.removeClass("d-none")})}var s=function(){var e=$("#feedback_description").val(),t=$("#feedback_subject").val(),a=$("#submit_btn");t&&t.trim().length>0&&e&&e.trim().length>0?a.attr("disabled",!1):a.attr("disabled",!0)};$(document).ready(function(){o(),i();$("#count_message").html("0 / 1000"),$("#feedback_description").on("keyup",function(){var e=$("#feedback_description").val().length;$("#count_message").html(e+" / 1000"),s()}),$("#submit_btn").on("click",c),$("#back_btn").on("click",r),$("#feedback_subject").on("keyup",function(){s()}),$("#submit_btn").attr("disabled",!0)})},{"./utils":3}],3:[function(e,t,a){"use strict";var n=e("./constants"),o=n.HOUR_IN_SECONDS,i=n.SIXTY,r=n.ALL_LANGUAGES;var c=function(e){return fetch(e).then(function(e){if(e.ok)return Promise.resolve(e.json());throw Error(e.statusText||"HTTP error")})};t.exports={setPageContentHeight:function(){var e=$("footer"),t=$(".navbar"),a=100-(e.outerHeight()+t.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",a+"vh")},toggleFooterPosition:function(){var e=$("footer");e.toggleClass("fixed-bottom"),e.toggleClass("bottom")},fetchLocationInfo:function(){var e=localStorage.getItem("state_region")||"NOT_PRESENT",t=localStorage.getItem("country")||"NOT_PRESENT";return"NOT_PRESENT"!==e&&"NOT_PRESENT"!==t&&e.length>0&&t.length>0?new Promise(function(a){a({regionName:e,country:t})}):fetch("https://www.cloudflare.com/cdn-cgi/trace").then(function(e){return e.text()}).then(function(e){var t=e.split("\n"),a="";for(var n in t)if(t[n].startsWith("ip=")){a=t[n].replace("ip=","");break}return 0!==a.length?fetch("/location-info?ip=".concat(a)):new Promise(function(e,t){t("Ip Address not available")})})},updateLocaleLanguagesDropdown:function(e){var t=$("#localisation_dropdown"),a=r.find(function(t){return t.value===e});"english"===e.toLowerCase()||!1===a.hasLocaleText?t.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>'):t.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>\n        <a id='.concat(a.value,' class="dropdown-item" href="/changeLocale/').concat(a.id,'">').concat(a.text,"</a>"))},calculateTime:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=Math.floor(e/o),n=e%o,r=Math.floor(n/i),c=Math.round(n%i);return t?{hours:a,minutes:r,seconds:c}:{hours:a,minutes:r}},formatTime:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n="";return e>0&&(n+="".concat(e," hrs ")),t>0&&(n+="".concat(t," min ")),0===e&&0===t&&a>0&&(n+="".concat(a," sec ")),n.substr(0,n.length-1)},getLocaleString:function(){c("/get-locale-strings").then(function(e){localStorage.setItem("localeString",JSON.stringify(e))})},performAPIRequest:c,showElement:function(e){e.removeClass("d-none")},hideElement:function(e){e.addClass("d-none")},setFooterPosition:function(){var e=$("#page-content").outerHeight();$("body").outerHeight()<=e+$("nav").outerHeight()+$("footer").outerHeight()&&$("footer").removeClass("fixed-bottom").addClass("bottom")}}},{"./constants":1}]},{},[2]);