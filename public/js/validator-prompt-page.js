!function t(e,n,o){function a(r,c){if(!n[r]){if(!e[r]){var l="function"==typeof require&&require;if(!c&&l)return l(r,!0);if(i)return i(r,!0);throw new Error("Cannot find module '"+r+"'")}var u=n[r]={exports:{}};e[r][0].call(u.exports,function(t){var n=e[r][1][t];return a(n||t)},u,u.exports,t,e,n,o)}return n[r].exports}for(var i="function"==typeof require&&require,r=0;r<o.length;r++)a(o[r]);return a}({1:[function(t,e,n){"use strict";e.exports={DEFAULT_CON_LANGUAGE:"Hindi",AUDIO_DURATION:6,SIXTY:60,HOUR_IN_SECONDS:3600,ALL_LANGUAGES:[{value:"Assamese",id:"as",text:"অসমীয়া",hasLocaleText:!0,data:!0},{value:"Bengali",id:"bn",text:"বাংলা",hasLocaleText:!0,data:!0},{value:"English",id:"en",text:"English",hasLocaleText:!0,data:!0},{value:"Gujarati",id:"gu",text:"ગુજરાતી",hasLocaleText:!0,data:!0},{value:"Hindi",id:"hi",text:"हिंदी",hasLocaleText:!0,data:!0},{value:"Kannada",id:"kn",text:"ಕನ್ನಡ",hasLocaleText:!0,data:!0},{value:"Malayalam",id:"ml",text:"മലയാളം",hasLocaleText:!0,data:!0},{value:"Marathi",id:"mr",text:"मराठी",hasLocaleText:!0,data:!0},{value:"Odia",id:"or",text:"ଓଡିଆ",hasLocaleText:!0,data:!0},{value:"Punjabi",id:"pa",text:"ਪੰਜਾਬੀ",hasLocaleText:!0,data:!0},{value:"Tamil",id:"ta",text:"தமிழ்",hasLocaleText:!0,data:!0},{value:"Telugu",id:"te",text:"తెలుగు",hasLocaleText:!0,data:!0}],TOP_LANGUAGES_BY_HOURS:"topLanguagesByHours",TOP_LANGUAGES_BY_SPEAKERS:"topLanguagesBySpeakers",AGGREGATED_DATA_BY_LANGUAGE:"aggregateDataCountByLanguage",LOCALE_STRINGS:"localeString",CONTRIBUTION_LANGUAGE:"contributionLanguage"}},{}],2:[function(t,e,n){"use strict";var o,a,i=t("./validator-instructions").showInstructions,r=t("./visualizer"),c=t("./utils"),l=c.setPageContentHeight,u=c.toggleFooterPosition,s=c.updateLocaleLanguagesDropdown,d=c.showElement,g=c.hideElement,f=c.fetchLocationInfo,h=new r,v="accept",m="reject",p="skip",y=function(){g($("#validator-page-content")),u(),i()},w=window.AudioContext||window.webkitAudioContext;function b(){var t=document.getElementById("myCanvas"),e=document.querySelector("audio");o=o||new w,a=a||o.createMediaElementSource(e);var n=o.createAnalyser();a.connect(n),n.connect(o.destination),h.visualize(t,n)}function L(t){t.children().removeAttr("opacity"),t.removeAttr("disabled")}var x=function(){var t=document.getElementById("my-audio"),e=$("#play"),n=$("#pause"),o=$("#replay"),a=$("#audioplayer-text_play"),i=$("#audioplayer-text_replay"),r=$("#audioplayer-text_pause");function c(){var t=$("#like_button"),e=$("#dislike_button");L(t),L(e)}t.addEventListener("ended",function(){c(),g(n),d(o),g(r),d(i)}),e.on("click",function(){g($("#default_line")),t.load(),g(e),d(n),g(a),d(r),t.play(),b()}),n.on("click",function(){g(n),d(o),g(r),d(i),c(),t.pause()}),o.on("click",function(){t.load(),g(o),d(n),g(i),d(r),D(),t.play(),b()})},T=0,_=0,S=0,k=function(t,e,n){t.addClass("animated ".concat(e)),t.on("animationend",function(){t.removeClass("animated ".concat(e)),t.off("animationend"),"function"==typeof n&&n()})};function A(t){var e=$("#sentenceLabel");e[0].innerText=G[t].sentence,k(e,"lightSpeedIn")}function C(){T<G.length-1?(H(G[++T].contribution_id),O(),A(T)):(O(),function(){g($("#instructions-row")),g($("#sentences-row")),g($("#audio-row")),g($("#validation-button-row")),d($("#thank-you-row")),g($("#progress-row")),g($("#skip_btn_row")),g($("#validation-container")),$("#validation-container").removeClass("validation-container");var t=localStorage.getItem("contributionLanguage"),e=localStorage.getItem("aggregateDataCountByLanguage"),n=JSON.parse(e).find(function(e){return e.language===t});n?($("#spn-total-hr-contributed").html(n.total_contributions),$("#spn-total-hr-validated").html(n.total_validations)):($("#spn-total-hr-contributed").html(0),$("#spn-total-hr-validated").html(0));$("#spn-validation-count").html(S)}())}var E=function(t,e){var n=t.children().children();n[0].setAttribute("fill",e[0]),n[1].setAttribute("fill",e[1]),n[2].setAttribute("fill",e[2])},I=function(){document.getElementById("currentSentenceLbl").innerText=_,document.getElementById("totalSentencesLbl").innerText=G.length},N=function(){var t=$("#get-started"),e=["Let’s get started","We know you can do more! ","You are halfway there. Keep going!","Just few more steps to go!","Four dead, one more to go!","Yay! Done & Dusted!"];4==G.length?e=["Let’s get started","We know you can do more! ","You are halfway there. Keep going!","Just few more steps to go!","Yay! Done & Dusted!"]:3==G.length?e=["Let’s get started","We know you can do more! ","Just few more steps to go!","Yay! Done & Dusted!"]:2==G.length?e=["Let’s get started","Just few more steps to go!","Yay! Done & Dusted!"]:1==G.length&&(e=["Let’s get started","Yay! Done & Dusted!"]);var n=$("#progress_bar");_++,t.text(e[_]).show();var o=10/G.length*10;n.width(_*o+"%"),n.prop("aria-valuenow",_),I()};function B(t){t.children().attr("opacity","50%"),t.attr("disabled","disabled")}function D(){var t=$("#dislike_button"),e=$("#like_button");E(t,["white","#007BFF","#343A40"]),E(e,["white","#007BFF","#343A40"]),B(e),B(t)}function O(){D();var t=$("#audioplayer-text_play"),e=$("#audioplayer-text_replay"),n=$("#audioplayer-text_pause");g(n),g(e),d(t),g($("#replay")),g($("#pause")),d($("#play")),d($("#default_line"))}function F(t){t!==m&&t!==v||S++;var e=G[T].sentenceId,n=G[T].contribution_id;fetch("/validation/action",{method:"POST",body:JSON.stringify({sentenceId:e,action:t,contributionId:n,state:localStorage.getItem("state_region")||"",country:localStorage.getItem("country")||""}),headers:{"Content-Type":"application/json"}}).then(function(t){if(!t.ok)throw Error(t.statusText||"HTTP error")})}function P(){$("#instructions-link").on("click",function(){y()}),$("#validator-instructions-modal").on("hidden.bs.modal",function(){d($("#validator-page-content")),u()});var t=$("#like_button"),e=$("#dislike_button"),n=$("#skip_button");t.hover(function(){E(t,["#bfddf5","#007BFF","#007BFF"])},function(){E(t,["white","#007BFF","#343A40"])}),e.hover(function(){E(e,["#bfddf5","#007BFF","#007BFF"])},function(){E(e,["white","#007BFF","#343A40"])}),e.mousedown(function(){E(e,["#007BFF","white","white"])}),t.mousedown(function(){E(t,["#007BFF","white","white"])}),e.on("click",function(){F(m),N(),C()}),t.on("click",function(){F(v),N(),C()}),n.on("click",function(){$("#pause").trigger("click"),F(p),N(),C()}),n.hover(function(){n.css("border-color","#bfddf5")},function(){n.removeAttr("style")}),n.mousedown(function(){n.css("background-color","#bfddf5")})}var G=[{sentence:""}];var H=function(t){var e;d($("#loader-audio-row")),g($("#audio-row")),d($("#loader-play-btn")),g($("#audio-player-btn")),(e=$("#skip_button")).removeAttr("style"),B(e),fetch("/audioClip",{method:"POST",body:JSON.stringify({contributionId:t}),headers:{"Content-Type":"application/json"}}).then(function(t){t.arrayBuffer().then(function(t){var e=new Blob([t],{type:"audio/wav"}),n=new FileReader;n.onload=function(t){var e;e=t.target.result,$("#my-audio").attr("src",e),U(),L($("#skip_button"))},n.readAsDataURL(e)})}).catch(function(t){console.log(t),U()})};function U(){g($("#loader-audio-row")),d($("#audio-row")),g($("#loader-play-btn")),d($("#audio-player-btn"))}$(document).ready(function(){u(),l();var t=localStorage.getItem("contributionLanguage");t&&s(t),$("#start_contributing_id").on("click",function(){var e=localStorage.getItem("speakerDetails");if(null!==e){var n=JSON.parse(e);n.language=t,localStorage.setItem("speakerDetails",JSON.stringify(n))}location.href="/record"}),f().then(function(t){return t.json()}).then(function(t){localStorage.setItem("state_region",t.regionName),localStorage.setItem("country",t.country)}).catch(console.log),fetch("/validation/sentences/".concat(t)).then(function(t){if(t.ok)return t.json();throw Error(t.statusText||"HTTP error")}).then(function(t){if(0===t.data.length)return $("#spn-validation-language").html(localStorage.getItem("contributionLanguage")),g($("#instructions-row")),g($("#sentences-row")),g($("#audio-row")),g($("#validation-button-row")),g($("#progress-row")),d($("#no-sentences-row")),g($("#skip_btn_row")),g($("#validation-container")),$("#validation-container").removeClass("validation-container"),void $("#start-validation-language").html(localStorage.getItem("contributionLanguage"));var e=(G=t.data)[T];if(e){H(e.contribution_id),A(T),I(),O(),P(),x();var n=document.getElementById("myCanvas");h.drawCanvasLine(n)}}).catch(function(t){console.log(t)})}),e.exports={setSentenceLabel:A,setAudioPlayer:x,addListeners:P}},{"./utils":4,"./validator-instructions":5,"./visualizer":6}],3:[function(t,e,n){"use strict";var o=t("./utils").updateLocaleLanguagesDropdown,a=t("./constants").ALL_LANGUAGES,i=function(t){var e=location.href.split("/"),n=e[e.length-1];r("i18n",t,1),location.href="/".concat(t,"/").concat(n)};function r(t,e,n){var o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3);var a="expires="+o.toGMTString();document.cookie=t+"="+e+";"+a+";path=/"}function c(t){for(var e=t+"=",n=decodeURIComponent(document.cookie).split(";"),o=0;o<n.length;o++){for(var a=n[o];" "==a.charAt(0);)a=a.substring(1);if(0==a.indexOf(e))return a.substring(e.length,a.length)}return""}e.exports={checkCookie:function(){return""!=c("i18n")},getCookie:c,setCookie:r,changeLocale:i,showLanguagePopup:function(){document.getElementById("toggle-content-language").click()},redirectToLocalisedPage:function(){var t=c("i18n"),e=location.href.split("/"),n=e[e.length-2];if($("#home-page").attr("default-lang",t),n!=t)i(t);else{var r=a.find(function(e){return e.id===t});r&&o(r.value)}}}},{"./constants":1,"./utils":4}],4:[function(t,e,n){"use strict";var o=t("./constants"),a=o.HOUR_IN_SECONDS,i=o.SIXTY,r=o.ALL_LANGUAGES,c=t("./locale").getCookie;var l=function(t){return fetch(t).then(function(t){if(t.ok)return Promise.resolve(t.json());throw Error(t.statusText||"HTTP error")})};e.exports={setPageContentHeight:function(){var t=$("footer"),e=$(".navbar"),n=100-(t.outerHeight()+e.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",n+"vh")},toggleFooterPosition:function(){var t=$("footer");t.toggleClass("fixed-bottom"),t.toggleClass("bottom")},fetchLocationInfo:function(){var t=localStorage.getItem("state_region")||"NOT_PRESENT",e=localStorage.getItem("country")||"NOT_PRESENT";return"NOT_PRESENT"!==t&&"NOT_PRESENT"!==e&&t.length>0&&e.length>0?new Promise(function(n){n({regionName:t,country:e})}):fetch("https://www.cloudflare.com/cdn-cgi/trace").then(function(t){return t.text()}).then(function(t){var e=t.split("\n"),n="";for(var o in e)if(e[o].startsWith("ip=")){n=e[o].replace("ip=","");break}return 0!==n.length?fetch("/location-info?ip=".concat(n)):new Promise(function(t,e){e("Ip Address not available")})})},updateLocaleLanguagesDropdown:function(t){var e=$("#localisation_dropdown"),n=r.find(function(e){return e.value===t});"english"===t.toLowerCase()||!1===n.hasLocaleText?e.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>'):e.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>\n        <a id='.concat(n.value,' class="dropdown-item" href="/changeLocale/').concat(n.id,'">').concat(n.text,"</a>"))},calculateTime:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=Math.floor(t/a),o=t%a,r=Math.floor(o/i),c=Math.round(o%i);return e?{hours:n,minutes:r,seconds:c}:{hours:n,minutes:r}},formatTime:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o="";return t>0&&(o+="".concat(t," hrs ")),e>0&&(o+="".concat(e," min ")),0===t&&0===e&&n>0&&(o+="".concat(n," sec ")),o.substr(0,o.length-1)},getLocaleString:function(){var t=c("i18n");l("/get-locale-strings/".concat(t)).then(function(t){localStorage.setItem("localeString",JSON.stringify(t))})},performAPIRequest:l,showElement:function(t){t.removeClass("d-none")},hideElement:function(t){t.addClass("d-none")},setFooterPosition:function(){var t=$("#page-content").outerHeight();$("body").outerHeight()<=t+$("nav").outerHeight()+$("footer").outerHeight()&&$("footer").removeClass("fixed-bottom").addClass("bottom")}}},{"./constants":1,"./locale":3}],5:[function(t,e,n){"use strict";e.exports={showInstructions:function(){(arguments.length>0&&void 0!==arguments[0]?arguments[0]:$("#validator-instructions-modal")).modal("show")}}},{}],6:[function(t,e,n){"use strict";function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var a=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n,a;return e=t,(n=[{key:"setCanvasCtx",value:function(t){var e=t.getContext("2d"),n=t.width,o=t.height;return e.fillStyle="rgb(255, 255, 255, 0.8)",e.fillRect(0,0,n,o),e.lineWidth=2,e.strokeStyle="rgb(0,123,255)",{canvasCtx:e,canvasWidth:n,canvasHeight:o}}},{key:"visualize",value:function(t,e){var n=e.frequencyBinCount,o=new Uint8Array(n),a=this.setCanvasCtx;!function i(){requestAnimationFrame(i),e.getByteTimeDomainData(o);var r=a(t),c=r.canvasCtx,l=r.canvasWidth,u=r.canvasHeight;c.beginPath();for(var s=1*l/n,d=0,g=0;g<n;g++){var f=o[g]/128*u/2;0===g?c.moveTo(d,f):c.lineTo(d,f),d+=s}var h=u/2;c.lineTo(l,h),c.stroke()}()}},{key:"drawCanvasLine",value:function(t){var e=this.setCanvasCtx(t),n=e.canvasCtx,o=e.canvasWidth,a=e.canvasHeight/2;n.moveTo(0,a),n.lineTo(o,a),n.stroke()}}])&&o(e.prototype,n),a&&o(e,a),t}();e.exports=a},{}]},{},[2]);