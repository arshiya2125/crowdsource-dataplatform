!function e(t,n,a){function o(i,c){if(!n[i]){if(!t[i]){var l="function"==typeof require&&require;if(!c&&l)return l(i,!0);if(r)return r(i,!0);throw new Error("Cannot find module '"+i+"'")}var s=n[i]={exports:{}};t[i][0].call(s.exports,function(e){var n=t[i][1][e];return o(n||e)},s,s.exports,e,t,n,a)}return n[i].exports}for(var r="function"==typeof require&&require,i=0;i<a.length;i++)o(a[i]);return o}({1:[function(e,t,n){"use strict";t.exports={DEFAULT_CON_LANGUAGE:"Hindi",AUDIO_DURATION:6,SIXTY:60,HOUR_IN_SECONDS:3600}},{}],2:[function(e,t,n){"use strict";var a=e("./constants"),o=a.HOUR_IN_SECONDS,r=a.SIXTY,i=[{value:"Assamese",id:"as",text:"অসমীয়া",hasLocaleText:!0},{value:"Bengali",id:"bn",text:"বাংলা",hasLocaleText:!0},{value:"English",id:"en",text:"English",hasLocaleText:!0},{value:"Gujarati",id:"gu",text:"ગુજરાતી",hasLocaleText:!0},{value:"Hindi",id:"hi",text:"हिंदी",hasLocaleText:!0},{value:"Kannada",id:"kn",text:"ಕನ್ನಡ",hasLocaleText:!0},{value:"Malayalam",id:"ml",text:"മലയാളം",hasLocaleText:!0},{value:"Marathi",id:"mr",text:"मराठी",hasLocaleText:!0},{value:"Odia",id:"or",text:"ଓଡିଆ",hasLocaleText:!0},{value:"Punjabi",id:"pa",text:"ਪੰਜਾਬੀ",hasLocaleText:!0},{value:"Tamil",id:"ta",text:"தமிழ்",hasLocaleText:!0},{value:"Telugu",id:"te",text:"తెలుగు",hasLocaleText:!0}];var c=function(e){return fetch(e).then(function(e){if(e.ok)return Promise.resolve(e.json());throw Error(e.statusText||"HTTP error")})};t.exports={setPageContentHeight:function(){var e=$("footer"),t=$(".navbar"),n=100-(e.outerHeight()+t.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",n+"vh")},toggleFooterPosition:function(){var e=$("footer");e.toggleClass("fixed-bottom"),e.toggleClass("bottom")},fetchLocationInfo:function(){return fetch("https://www.cloudflare.com/cdn-cgi/trace").then(function(e){return e.text()}).then(function(e){var t=e.split("\n"),n="";for(var a in t)if(t[a].startsWith("ip=")){n=t[a].replace("ip=","");break}return 0!==n.length?fetch("/location-info?ip=".concat(n)):new Promise(function(e,t){t("Ip Address not available")})})},updateLocaleLanguagesDropdown:function(e){var t=$("#localisation_dropdown"),n=i.find(function(t){return t.value===e});"english"===e.toLowerCase()||!1===n.hasLocaleText?t.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>'):t.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>\n        <a id='.concat(n.value,' class="dropdown-item" href="/changeLocale/').concat(n.id,'">').concat(n.text,"</a>"))},calculateTime:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=Math.floor(e/o),a=e%o,i=Math.floor(a/r),c=Math.round(a%r);return t?{hours:n,minutes:i,seconds:c}:{hours:n,minutes:i}},formatTime:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a="";return e>0&&(a+="".concat(e," hrs ")),t>0&&(a+="".concat(t," min ")),0===e&&0===t&&n>0&&(a+="".concat(n," sec ")),a.substr(0,a.length-1)},getLocaleString:function(){c("/get-locale-strings").then(function(e){localStorage.setItem("localeString",JSON.stringify(e))})},performAPIRequest:c}},{"./constants":1}]},{},[2]);