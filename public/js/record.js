!function e(t,n,o){function a(s,i){if(!n[s]){if(!t[s]){var c="function"==typeof require&&require;if(!i&&c)return c(s,!0);if(r)return r(s,!0);throw new Error("Cannot find module '"+s+"'")}var d=n[s]={exports:{}};t[s][0].call(d.exports,function(e){var n=t[s][1][e];return a(n||e)},d,d.exports,e,t,n,o)}return n[s].exports}for(var r="function"==typeof require&&require,s=0;s<o.length;s++)a(o[s]);return a}({1:[function(e,t,n){"use strict";t.exports={DEFAULT_CON_LANGUAGE:"Hindi",AUDIO_DURATION:6,SIXTY:60,HOUR_IN_SECONDS:3600,ALL_LANGUAGES:[{value:"Assamese",id:"as",text:"অসমীয়া",hasLocaleText:!0,data:!0},{value:"Bengali",id:"bn",text:"বাংলা",hasLocaleText:!0,data:!0},{value:"English",id:"en",text:"English",hasLocaleText:!0,data:!0},{value:"Gujarati",id:"gu",text:"ગુજરાતી",hasLocaleText:!0,data:!0},{value:"Hindi",id:"hi",text:"हिंदी",hasLocaleText:!0,data:!0},{value:"Kannada",id:"kn",text:"ಕನ್ನಡ",hasLocaleText:!0,data:!0},{value:"Malayalam",id:"ml",text:"മലയാളം",hasLocaleText:!0,data:!0},{value:"Marathi",id:"mr",text:"मराठी",hasLocaleText:!0,data:!0},{value:"Odia",id:"or",text:"ଓଡିଆ",hasLocaleText:!0,data:!0},{value:"Punjabi",id:"pa",text:"ਪੰਜਾਬੀ",hasLocaleText:!0,data:!0},{value:"Tamil",id:"ta",text:"தமிழ்",hasLocaleText:!0,data:!0},{value:"Telugu",id:"te",text:"తెలుగు",hasLocaleText:!0,data:!0}],TOP_LANGUAGES_BY_HOURS:"topLanguagesByHours",TOP_LANGUAGES_BY_SPEAKERS:"topLanguagesBySpeakers",AGGREGATED_DATA_BY_LANGUAGE:"aggregateDataCountByLanguage",LOCALE_STRINGS:"localeString",CONTRIBUTION_LANGUAGE:"contributionLanguage"}},{}],2:[function(t,n,o){"use strict";var a,r,s=t("./utils"),i=s.setPageContentHeight,c=s.toggleFooterPosition,d=s.fetchLocationInfo,l=s.updateLocaleLanguagesDropdown,u=s.setFooterPosition,g="speakerDetails",m="currentIndex",f="skipCount",h=$("#test-mic-button"),v=$("#play-speaker");function p(e,t){return e<0?0:e>t?t:e}function w(e){return p(Number(localStorage.getItem(m)),e)}function C(e){return p(Number(localStorage.getItem(f)),e)}var S=function(e){document.getElementById("currentSentenceLbl").innerText=e},y=function(e){document.getElementById("totalSentencesLbl").innerText=e};function x(e,t,n){for(var o=0;o<n.length;o++)e.setUint8(t+o,n.charCodeAt(o))}var T,L,b,I,N,A,k,E,R=function(){var e=$("#test-mic-text");T&&(T.close(),T=void 0),e.text("Test Mic"),$("#mic-svg").removeClass("d-none"),h.attr("data-value","test-mic"),r.clearRect(0,0,a.width,a.height)},U=[],D=0,O=function(){var t=null,n=null,o=44100,s=0,i=0;return{start:function(){navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then(function(e){var c=window.AudioContext||window.webkitAudioContext;T=new c,o=T.sampleRate,t=T.createMediaStreamSource(e),n=T.createScriptProcessor(1024,1,1),t.connect(n),n.connect(T.destination),n.onaudioprocess=function(e){var t=e.inputBuffer.getChannelData(0);D+=1024,U.push(new Float32Array(t));for(var n=0,o=0,c=0;c<t.length;++c)o+=t[c]*t[c];n=Math.sqrt(o/t.length),s=Math.max(s,n),n=Math.max(n,i-.008),i=n,r.clearRect(0,0,a.width,a.height),r.fillStyle="#83E561",r.fillRect(0,0,a.width*(n/s),a.height)}}).catch(function(t){console.log(e)})},stop:function(){null!==t&&t.disconnect(),null!==n&&n.disconnect();var e=function(e,t){var n=new ArrayBuffer(44+2*e.length),o=new DataView(n);x(o,0,"RIFF"),o.setUint32(4,44+2*e.length,!0),x(o,8,"WAVE"),x(o,12,"fmt "),o.setUint32(16,16,!0),o.setUint16(20,1,!0),o.setUint16(22,1,!0),o.setUint32(24,t,!0),o.setUint32(28,2*t,!0),o.setUint16(32,4,!0),o.setUint16(34,16,!0),x(o,36,"data"),o.setUint32(40,2*e.length,!0);for(var a=44,r=0;r<e.length;r++)o.setInt16(a,32767*e[r],!0),a+=2;return new Blob([o],{type:"audio/wav"})}(function(e,t){for(var n=new Float32Array(t),o=0,a=0;a<e.length;a++){var r=e[a];n.set(r,o),o+=r.length}return n}(U,D),o);if(null!==e){var a=URL.createObjectURL(e);return(L=new Audio(a)).onloadedmetadata=function(){var e=Math.ceil(1e3*L.duration);setTimeout(function(){R()},e)},{audioBlob:e,audioUrl:a,play:function(){L.play()}}}return console.log("No blob present"),null}}},_=function(){var e=crowdSource.sentences,t=$("#startRecord"),n=$("#startRecordRow"),o=$("#stopRecord"),a=$("#reRecord"),r=$("#visualizer"),s=$("#player"),i=$("#nextBtn"),c=i.parent(),d=$("#get-started"),l=$("#skipBtn"),u=$("#recording-row"),p=$("#recording-sign"),x=$(".progress-bar"),T=$("#page-content"),_=$("#audio-small-error"),M=document.getElementById("count-down"),G=$("#test-mic-speakers"),H=$("#test-mic-speakers-button"),F=$("#test-mic-speakers-details"),J=$("#test-mic-close"),Y=e.length,q=w(Y-1),j=C(Y-1);$("footer");H.on("click",function(e){G.addClass("d-none"),F.removeClass("d-none")}),J.on("click",function(e){G.removeClass("d-none"),F.addClass("d-none"),U=[],D=0,L&&(L.pause(),L.currentTime=0),A&&(A.pause(),A.currentTime=0),R(),B()}),h.on("click",function(e){!function(e){var t=$("#mic-svg"),n=$("#test-mic-text"),o=O();"test-mic"===e?(U=[],D=0,t.addClass("d-none"),h.attr("data-value","recording"),n.text("Recording"),o.start()):"recording"===e&&(o.stop().play(),h.attr("data-value","playing"),n.text("Playing"))}($("#test-mic-button").attr("data-value"))}),v.on("click",function(e){v.attr("data-value","playing"),$("#test-speaker-text").text("Playing"),$("#speaker-svg").addClass("d-none"),function(){if((A=document.getElementById("test-speaker-hidden")).play(),!b){var e=window.AudioContext||window.webkitAudioContext;b=new e,N=b.createMediaElementSource(A),I=b.createAnalyser(),N.connect(I),I.connect(b.destination),I.fftSize=256}k=document.getElementById("speaker-canvas"),E=k.getContext("2d");var t=I.frequencyBinCount,n=50,o=new Uint8Array(t);(function e(){P=requestAnimationFrame(e);I.getByteFrequencyData(o);var t=0;var a=0;for(var r=0;r<o.length;++r)a+=o[r]*o[r];t=Math.sqrt(a/o.length);n=Math.max(n,t);E.clearRect(0,0,k.width,k.height);E.fillStyle="#83E561";E.fillRect(0,0,k.width*(t/n),k.height)})(),A.onended=function(){B()}}()});var W=["Let’s get started","We know you can do more! ","You are halfway there. Keep going!","Just few more steps to go!","Four dead, one more to go!","Yay! Done & Dusted!"];4==e.length?W=["Let’s get started","We know you can do more! ","You are halfway there. Keep going!","Just few more steps to go!","Yay! Done & Dusted!"]:3==e.length?W=["Let’s get started","We know you can do more! ","Just few more steps to go!","Yay! Done & Dusted!"]:2==e.length?W=["Let’s get started","Just few more steps to go!","Yay! Done & Dusted!"]:1==e.length&&(W=["Let’s get started","Yay! Done & Dusted!"]),c.tooltip({container:"body",placement:screen.availWidth>900?"right":"bottom"});var z,K,V,X,Q,Z,ee=function(e,t,n){e.addClass("animated ".concat(t)),e.on("animationend",function(){e.removeClass("animated ".concat(t)),e.off("animationend"),"function"==typeof n&&n()})},te=function(e){x.width(20*e+"%"),x.prop("aria-valuenow",e)},ne=function(t){var n=$("#sentenceLbl");n[0].innerText=e[t].sentence,ee(n,"lightSpeedIn"),q&&te(q)},oe=new Notyf({position:{x:"center",y:"top"},types:[{type:"success",className:"fnt-1-5"},{type:"error",duration:3500,className:"fnt-1-5"}]});ne(q),S(q+1),y(Y),t.add(a).on("click",function(){navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then(function(e){d.hide(),t.addClass("d-none"),l.prop("disabled",!0),n.removeClass("d-none"),o.removeClass("d-none"),u.removeClass("d-none"),p.removeClass("d-none"),a.addClass("d-none"),i.addClass("d-none"),s.addClass("d-none"),s.trigger("pause"),r.removeClass("d-none"),c.tooltip("disable"),_.addClass("d-none"),z=e;var g=window.AudioContext||window.webkitAudioContext;Z&&Z.close();var m=(Z=new g).createAnalyser();(V=Z.createMediaStreamSource(e)).connect(m),function(e,t){var n=e.getContext("2d"),o=t.frequencyBinCount,a=new Uint8Array(o),r=e.width,s=e.height;!function i(){requestAnimationFrame(i);t.getByteTimeDomainData(a);n.fillStyle="rgb(255, 255, 255, 0.8)";n.fillRect(0,0,r,s);n.lineWidth=2;n.strokeStyle="rgb(0,123,255)";n.beginPath();var c=1*r/o;var d=0;for(var l=0;l<o;l++){var u=a[l]/128,g=u*s/2;0===l?n.moveTo(d,g):n.lineTo(d,g),d+=c}n.lineTo(e.width,e.height/2);n.stroke()}()}(visualizer,m),(K=new Recorder(V,{numChannels:2})).record(),Q=setTimeout(function(){M.classList.remove("d-none"),function(e,t){var n=document.getElementById("counter");n.innerHTML="0".concat(e),t.classList.remove("d-none");var o=setInterval(function(){n.innerText="0".concat(e),--e<0&&(clearInterval(o),t.classList.add("d-none"))},1e3)}(5,M)},15e3),X=setTimeout(function(){o.click()},21e3)}).catch(function(e){console.log(e),oe.error("Sorry !!! We could not get access to your audio input device. Make sure you have given microphone access permission"),o.addClass("d-none"),i.addClass("d-none"),a.addClass("d-none"),p.addClass("d-none"),u.addClass("d-none"),s.addClass("d-none"),s.trigger("pause"),r.addClass("d-none"),_.addClass("d-none")})}),o.on("click",function(){var e=$("#startRecordRow");clearTimeout(X),clearTimeout(Q),M.classList.add("d-none"),e.addClass("d-none"),o.addClass("d-none"),i.removeClass("d-none"),l.prop("disabled",!1),a.removeClass("d-none"),p.addClass("d-none"),u.addClass("d-none"),s.removeClass("d-none"),r.addClass("d-none"),K.stop(),z.getAudioTracks()[0].stop(),K.exportWAV(function(e){var t=(window.URL||window.webkitURL).createObjectURL(e);crowdSource.audioBlob=e,s.prop("src",t),s.on("loadedmetadata",function(){var e=s[0].duration;(function(e){return e<2?(c.tooltip("enable"),i.prop("disabled",!0).addClass("point-none"),_.removeClass("d-none"),!1):(c.tooltip("disable"),i.removeAttr("disabled").removeClass("point-none"),_.addClass("d-none"),!0)})(e)&&(crowdSource.audioDuration=e)})}),q===Y-1&&d.text(W[Y]).show()});var ae=function(){location.href="/thank-you"};function re(e){var t=new FormData,n=JSON.parse(localStorage.getItem(g)),o=JSON.stringify({userName:n.userName,language:n.language});t.append("audio_data",crowdSource.audioBlob),t.append("speakerDetails",o),t.append("sentenceId",crowdSource.sentences[q].sentenceId),t.append("state",localStorage.getItem("state_region")||""),t.append("country",localStorage.getItem("country")||""),t.append("audioDuration",crowdSource.audioDuration),fetch("/upload",{method:"POST",body:t}).then(function(e){return e.json()}).then(function(e){}).catch(function(e){console.log(e)}).then(function(t){e&&"function"==typeof e&&e()})}i.add(l).on("click",function(e){if("nextBtn"===e.target.id&&q<Y-1?re():"skipBtn"===e.target.id&&(j++,localStorage.setItem(f,j),l.addClass("d-none")),q===Y-1){"nextBtn"===e.target.id?re(ae):setTimeout(ae,2500),l.addClass("d-none"),q++,ee(T,"zoomOut",function(){return T.addClass("d-none")}),te(q);var o=JSON.parse(localStorage.getItem("sentences"));Object.assign(o,{sentences:[]}),localStorage.setItem("sentences",JSON.stringify(o)),localStorage.setItem(m,q),oe.success("Congratulations!!! You have completed this batch of sentences"),$("#loader").show()}else q<Y-1&&(ne(++q),S(q+1),d.text(W[q]),localStorage.setItem(m,q),l.removeClass("d-none"));s.addClass("d-none"),s.trigger("pause"),i.addClass("d-none"),a.addClass("d-none"),n.removeClass("d-none"),t.removeClass("d-none")})},B=function(){cancelAnimationFrame(P),E&&E.clearRect(0,0,k.width,k.height),v.attr("data-value","test-speaker"),$("#test-speaker-text").text("Test Speakers"),$("#speaker-svg").removeClass("d-none")},P=null;$(document).ready(function(){c(),i(),window.crowdSource={};var e=$("#validation-instruction-modal"),t=$("#errorModal"),n=$("#loader"),o=$("#page-content"),s=$("#nav-user"),u=s.find("#nav-username"),h=localStorage.getItem("contributionLanguage");a=document.getElementById("mic-canvas"),r=a.getContext("2d"),h&&l(h),d().then(function(e){return e.json()}).then(function(e){localStorage.setItem("state_region",e.regionName),localStorage.setItem("country",e.country)}).catch(console.log);try{var v=localStorage.getItem(g),p=JSON.parse(v),w=localStorage.getItem("sentences"),C=JSON.parse(w),S=Number(localStorage.getItem("count"));if(i(),$("#instructions_close_btn").on("click",function(){e.addClass("d-none")}),t.on("show.bs.modal",function(){e.addClass("d-none")}),t.on("hidden.bs.modal",function(){location.href="/#speaker-details"}),!p)return void(location.href="/#speaker-details");s.removeClass("d-none"),$("#nav-login").addClass("d-none"),u.text(p.userName);var y=C&&C.userName===p.userName&&C.language===p.language;y&&0!=C.sentences.length?(crowdSource.sentences=C.sentences,crowdSource.count=S,n.hide(),o.removeClass("d-none"),_()):(localStorage.removeItem(m),localStorage.removeItem(f),fetch("/sentences",{method:"POST",body:JSON.stringify({userName:p.userName,age:p.age,language:p.language,motherTongue:p.motherTongue,gender:p.gender}),headers:{"Content-Type":"application/json"}}).then(function(e){if(e.ok)return e.json();throw Error(e.statusText||"HTTP error")}).then(function(t){y||e.removeClass("d-none"),o.removeClass("d-none"),crowdSource.sentences=t.data,crowdSource.count=Number(t.count),n.hide(),localStorage.setItem("sentences",JSON.stringify({userName:p.userName,sentences:t.data,language:p.language})),localStorage.setItem("count",t.count),_()}).catch(function(e){console.log(e),t.modal("show")}).then(function(){n.hide()}))}catch(e){console.log(e),t.modal("show")}}),$(window).resize(function(){u()}),n.exports={getCurrentIndex:w,getSkipCount:C,getValue:p,setCurrentSentenceIndex:S,setTotalSentenceIndex:y}},{"./utils":3}],3:[function(e,t,n){"use strict";var o=e("./constants"),a=o.HOUR_IN_SECONDS,r=o.SIXTY,s=o.ALL_LANGUAGES;var i=function(e){return fetch(e).then(function(e){if(e.ok)return Promise.resolve(e.json());throw Error(e.statusText||"HTTP error")})};t.exports={setPageContentHeight:function(){var e=$("footer"),t=$(".navbar"),n=100-(e.outerHeight()+t.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",n+"vh")},toggleFooterPosition:function(){var e=$("footer");e.toggleClass("fixed-bottom"),e.toggleClass("bottom")},fetchLocationInfo:function(){var e=localStorage.getItem("state_region")||"NOT_PRESENT",t=localStorage.getItem("country")||"NOT_PRESENT";return"NOT_PRESENT"!==e&&"NOT_PRESENT"!==t&&e.length>0&&t.length>0?new Promise(function(n){n({regionName:e,country:t})}):fetch("https://www.cloudflare.com/cdn-cgi/trace").then(function(e){return e.text()}).then(function(e){var t=e.split("\n"),n="";for(var o in t)if(t[o].startsWith("ip=")){n=t[o].replace("ip=","");break}return 0!==n.length?fetch("/location-info?ip=".concat(n)):new Promise(function(e,t){t("Ip Address not available")})})},updateLocaleLanguagesDropdown:function(e){var t=$("#localisation_dropdown"),n=s.find(function(t){return t.value===e});"english"===e.toLowerCase()||!1===n.hasLocaleText?t.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>'):t.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>\n        <a id='.concat(n.value,' class="dropdown-item" href="/changeLocale/').concat(n.id,'">').concat(n.text,"</a>"))},calculateTime:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=Math.floor(e/a),o=e%a,s=Math.floor(o/r),i=Math.round(o%r);return t?{hours:n,minutes:s,seconds:i}:{hours:n,minutes:s}},formatTime:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o="";return e>0&&(o+="".concat(e," hrs ")),t>0&&(o+="".concat(t," min ")),0===e&&0===t&&n>0&&(o+="".concat(n," sec ")),o.substr(0,o.length-1)},getLocaleString:function(){i("/get-locale-strings").then(function(e){localStorage.setItem("localeString",JSON.stringify(e))})},performAPIRequest:i,showElement:function(e){e.removeClass("d-none")},hideElement:function(e){e.addClass("d-none")},setFooterPosition:function(){var e=$("#page-content").outerHeight();$("body").outerHeight()<=e+$("nav").outerHeight()+$("footer").outerHeight()&&$("footer").removeClass("fixed-bottom").addClass("bottom")}}},{"./constants":1}]},{},[2]);