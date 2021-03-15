!function t(e,a,n){function o(i,s){if(!a[i]){if(!e[i]){var l="function"==typeof require&&require;if(!s&&l)return l(i,!0);if(r)return r(i,!0);throw new Error("Cannot find module '"+i+"'")}var c=a[i]={exports:{}};e[i][0].call(c.exports,function(t){var a=e[i][1][t];return o(a||t)},c,c.exports,t,e,a,n)}return a[i].exports}for(var r="function"==typeof require&&require,i=0;i<n.length;i++)o(n[i]);return o}({1:[function(t,e,a){"use strict";e.exports={DEFAULT_CON_LANGUAGE:"Hindi",AUDIO_DURATION:6,SIXTY:60,HOUR_IN_SECONDS:3600,ALL_LANGUAGES:[{value:"Assamese",id:"as",text:"অসমীয়া",hasLocaleText:!0,data:!0},{value:"Bengali",id:"bn",text:"বাংলা",hasLocaleText:!0,data:!0},{value:"English",id:"en",text:"English",hasLocaleText:!0,data:!0},{value:"Gujarati",id:"gu",text:"ગુજરાતી",hasLocaleText:!0,data:!0},{value:"Hindi",id:"hi",text:"हिंदी",hasLocaleText:!0,data:!0},{value:"Kannada",id:"kn",text:"ಕನ್ನಡ",hasLocaleText:!0,data:!0},{value:"Malayalam",id:"ml",text:"മലയാളം",hasLocaleText:!0,data:!0},{value:"Marathi",id:"mr",text:"मराठी",hasLocaleText:!0,data:!0},{value:"Odia",id:"or",text:"ଓଡିଆ",hasLocaleText:!0,data:!0},{value:"Punjabi",id:"pa",text:"ਪੰਜਾਬੀ",hasLocaleText:!0,data:!0},{value:"Tamil",id:"ta",text:"தமிழ்",hasLocaleText:!0,data:!0},{value:"Telugu",id:"te",text:"తెలుగు",hasLocaleText:!0,data:!0},{value:"Dogri",id:"doi",text:"Dogri",hasLocaleText:!1,data:!0},{value:"Maithili",id:"mai",text:"Maithili",hasLocaleText:!1,data:!0},{value:"Urdu",id:"ur",text:"Urdu",hasLocaleText:!1,data:!0},{value:"Konkani Roman",id:"kr",text:"Konkani Roman",hasLocaleText:!1,data:!1},{value:"Konkani DV",id:"kd",text:"Konkani DV",hasLocaleText:!1,data:!1},{value:"Manipuri BN",id:"mnibn",text:"Manipuri BN",hasLocaleText:!1,data:!1},{value:"Manipuri MM",id:"mnimm",text:"Manipuri MM",hasLocaleText:!1,data:!1},{value:"Santali OL",id:"satol",text:"Santali OL",hasLocaleText:!1,data:!1},{value:"Santali DV",id:"satdv",text:"Santali DV",hasLocaleText:!1,data:!1},{value:"Sanskrit",id:"sa",text:"Sanskrit",hasLocaleText:!0,data:!1}],TOP_LANGUAGES_BY_HOURS:"topLanguagesByHours",TOP_LANGUAGES_BY_SPEAKERS:"topLanguagesBySpeakers",AGGREGATED_DATA_BY_LANGUAGE:"aggregateDataCountByLanguage",LOCALE_STRINGS:"localeString",CONTRIBUTION_LANGUAGE:"contributionLanguage"}},{}],2:[function(t,e,a){"use strict";var n=t("./constants"),o=n.AUDIO_DURATION,r=n.SIXTY,i=n.HOUR_IN_SECONDS,s=t("./utils"),l=s.setPageContentHeight,c=s.toggleFooterPosition,u=s.updateLocaleLanguagesDropdown,d="currentIndex",h=Number(localStorage.getItem(d)),g=localStorage.getItem("speakerDetails"),f=JSON.parse(g),x=($("footer"),function(t){$("#user-contribution").html(t)});function v(){var t=Number(localStorage.getItem("skipCount"));return Number(localStorage.getItem("count"))+Number(localStorage.getItem(d))-t}if(f)if(h<5)location.href="/#start-record";else{var m=100*i;$("#nav-user").removeClass("d-none"),$("#nav-login").addClass("d-none"),$("#nav-username").text(f.userName);var L=$("#total-progress"),T=$("#hour-value");l(),x(v());var p=function(t){var e,a,n,o,r=(o=11,innerWidth<576?(a=70.5-1.333*(e=576-innerWidth)/100,n=75.2-.4*e/100):innerWidth<1200?(a=70.5-.5*(e=1200-innerWidth)/100,n=75.75-.25*e/100):innerWidth<2e3?(a=71.5-.1*(e=2e3-innerWidth)/100,o=12-.1*e/100,n=innerWidth<1500?75.2:75.5-.003*e/100):(a=71.5+.1*(e=innerWidth-2e3)/100,o=12,n=75.8),{totalProgressBarWidth:a,totalProgressBarBulbWidth:o,totalProgressBarBulbLeft:n}),i=t/m*100;i>=100?(L.next().css({width:r.totalProgressBarBulbWidth+"%",left:r.totalProgressBarBulbLeft+"%"}),L.width(100*r.totalProgressBarWidth/100+"%"),$("#total-progress").one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){var t=0,e=setInterval(function(){t>=100&&clearInterval(e),L.next().css("background","linear-gradient(to right, #007bff 0%, #007bff ".concat(t,"%, transparent 0%)")),t+=5},30)})):L.width(i*r.totalProgressBarWidth/100+"%")};fetch("/getDetails/".concat(f.language)).then(function(t){if(t.ok)return t.json();throw Error(t.statusText||"HTTP error")}).then(function(t){localStorage.setItem("speakersData",JSON.stringify(t)),function(t){try{var e=Number(t.find(function(t){return 1===t.index}).count)*o,a=Math.floor(e/i),n=e%i,s=Math.floor(n/r),l=n%r;T.text("".concat(a,"h ").concat(s,"m ").concat(l,"s")),p(e)}catch(t){console.log(t)}}(t)}).catch(function(t){console.log(t)}).then(function(){T.next().addClass("d-none")})}else location.href="/#start-record";$(document).ready(function(){c();var t=localStorage.getItem("contributionLanguage");t&&u(t)}),e.exports={setUserContribution:x,getTotalSentencesContributed:v}},{"./constants":1,"./utils":3}],3:[function(t,e,a){"use strict";var n=t("./constants"),o=n.HOUR_IN_SECONDS,r=n.SIXTY,i=n.ALL_LANGUAGES;var s=function(t){return fetch(t).then(function(t){if(t.ok)return Promise.resolve(t.json());throw Error(t.statusText||"HTTP error")})};e.exports={setPageContentHeight:function(){var t=$("footer"),e=$(".navbar"),a=100-(t.outerHeight()+e.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",a+"vh")},toggleFooterPosition:function(){var t=$("footer");t.toggleClass("fixed-bottom"),t.toggleClass("bottom")},fetchLocationInfo:function(){return fetch("https://www.cloudflare.com/cdn-cgi/trace").then(function(t){return t.text()}).then(function(t){var e=t.split("\n"),a="";for(var n in e)if(e[n].startsWith("ip=")){a=e[n].replace("ip=","");break}return 0!==a.length?fetch("/location-info?ip=".concat(a)):new Promise(function(t,e){e("Ip Address not available")})})},updateLocaleLanguagesDropdown:function(t){var e=$("#localisation_dropdown"),a=i.find(function(e){return e.value===t});"english"===t.toLowerCase()||!1===a.hasLocaleText?e.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>'):e.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>\n        <a id='.concat(a.value,' class="dropdown-item" href="/changeLocale/').concat(a.id,'">').concat(a.text,"</a>"))},calculateTime:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=Math.floor(t/o),n=t%o,i=Math.floor(n/r),s=Math.round(n%r);return e?{hours:a,minutes:i,seconds:s}:{hours:a,minutes:i}},formatTime:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n="";return t>0&&(n+="".concat(t," hrs ")),e>0&&(n+="".concat(e," min ")),0===t&&0===e&&a>0&&(n+="".concat(a," sec ")),n.substr(0,n.length-1)},getLocaleString:function(){s("/get-locale-strings").then(function(t){localStorage.setItem("localeString",JSON.stringify(t))})},performAPIRequest:s,showElement:function(t){t.removeClass("d-none")},hideElement:function(t){t.addClass("d-none")}}},{"./constants":1}]},{},[2]);