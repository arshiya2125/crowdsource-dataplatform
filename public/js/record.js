!function e(n,o,t){function a(s,d){if(!o[s]){if(!n[s]){var i="function"==typeof require&&require;if(!d&&i)return i(s,!0);if(r)return r(s,!0);throw new Error("Cannot find module '"+s+"'")}var c=o[s]={exports:{}};n[s][0].call(c.exports,function(e){var o=n[s][1][e];return a(o||e)},c,c.exports,e,n,o,t)}return o[s].exports}for(var r="function"==typeof require&&require,s=0;s<t.length;s++)a(t[s]);return a}({1:[function(e,n,o){"use strict";var t=e("./utils"),a=t.setPageContentHeight,r=t.toggleFooterPosition,s=t.fetchLocationInfo,d="speakerDetails",i="currentIndex",c="skipCount";function l(e,n){return e<0?0:e>n?n:e}function u(e){return l(Number(localStorage.getItem(i)),e)}function g(e){return l(Number(localStorage.getItem(c)),e)}var m=function(e){document.getElementById("currentSentenceLbl").innerText=e},f=function(e){document.getElementById("totalSentencesLbl").innerText=e},p=function(){var e=crowdSource.sentences,n=$("#startRecord"),o=$("#startRecordRow"),t=$("#stopRecord"),a=$("#reRecord"),s=$("#visualizer"),l=$("#player"),p=$("#nextBtn"),h=p.parent(),v=$("#get-started"),C=$("#skipBtn"),S=$("#recording-row"),w=$("#recording-sign"),y=$(".progress-bar"),b=$("#page-content"),x=$("#audio-small-error"),I=e.length,N=u(I-1),k=g(I-1),T=$("footer"),B=["Let’s get started","We know you can do more! ","You are halfway there. Keep going!","Just few more steps to go!","Four dead, one more to go!","Yay! Done & Dusted!"];h.tooltip({container:"body",placement:screen.availWidth>900?"right":"bottom"});var O,R,L,A,D,P=function(e,n,o){e.addClass("animated ".concat(n)),e.on("animationend",function(){e.removeClass("animated ".concat(n)),e.off("animationend"),"function"==typeof o&&o()})},H=function(e){y.width(20*e+"%"),y.prop("aria-valuenow",e)},J=function(n){var o=$("#sentenceLbl");o[0].innerText=e[n].sentence,P(o,"lightSpeedIn"),N&&H(N)},j=function(e){var n=$("#graphbar"),o=$("#time-value"),t=6*(crowdSource.count+e-k),a=t>=1800,r=a?t:1800-t,s=Math.floor(r/60),d=r%60;o.text("".concat(s,"m ").concat(d,"s")),a&&o.siblings("p").text("We are loving it!");var i=42/1800*t;n.height(i+"em")},q=new Notyf({position:{x:"center",y:"top"},types:[{type:"success",className:"fnt-1-5"},{type:"error",duration:3500,className:"fnt-1-5"}]});!function(e){var n=$("#time-progress"),o=e.outerHeight(),t=n.css("bottom");Number(t.substring(0,t.length-2))&&n.css("bottom",o+"px")}(T),J(N),m(N+1),f(I),j(N),n.add(a).on("click",function(){navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then(function(e){v.hide(),o.addClass("d-none"),t.removeClass("d-none"),S.removeClass("d-none"),w.removeClass("d-none"),a.addClass("d-none"),p.addClass("d-none"),l.addClass("d-none"),l.trigger("pause"),s.removeClass("d-none"),h.tooltip("disable"),x.addClass("d-none"),O=e;var n=window.AudioContext||window.webkitAudioContext;D&&D.close();var r=(D=new n).createAnalyser();(L=D.createMediaStreamSource(e)).connect(r),function(e,n){var o=e.getContext("2d"),t=n.frequencyBinCount,a=new Uint8Array(t),r=e.width,s=e.height;!function d(){requestAnimationFrame(d);n.getByteTimeDomainData(a);o.fillStyle="rgb(255, 255, 255, 0.8)";o.fillRect(0,0,r,s);o.lineWidth=2;o.strokeStyle="rgb(0,123,255)";o.beginPath();var i=1*r/t;var c=0;for(var l=0;l<t;l++){var u=a[l]/128,g=u*s/2;0===l?o.moveTo(c,g):o.lineTo(c,g),c+=i}o.lineTo(e.width,e.height/2);o.stroke()}()}(visualizer,r),(R=new Recorder(L,{numChannels:2})).record(),A=setTimeout(function(){t.click()},3e4)}).catch(function(e){console.log(e),q.error("Sorry !!! We could not get access to your audio input device. Make sure you have given microphone access permission"),o.removeClass("d-none"),t.addClass("d-none"),p.addClass("d-none"),a.addClass("d-none"),w.addClass("d-none"),S.addClass("d-none"),l.addClass("d-none"),l.trigger("pause"),s.addClass("d-none"),x.addClass("d-none")})}),t.on("click",function(){clearTimeout(A),o.addClass("d-none"),t.addClass("d-none"),p.removeClass("d-none"),a.removeClass("d-none"),w.addClass("d-none"),S.addClass("d-none"),o.addClass("d-none"),l.removeClass("d-none"),s.addClass("d-none"),R.stop(),O.getAudioTracks()[0].stop(),R.exportWAV(function(e){var n=(window.URL||window.webkitURL).createObjectURL(e);crowdSource.audioBlob=e,l.prop("src",n),l.on("loadedmetadata",function(){var e=l[0].duration;e<2?(h.tooltip("enable"),p.prop("disabled",!0).addClass("point-none"),x.removeClass("d-none")):(h.tooltip("disable"),p.removeAttr("disabled").removeClass("point-none"),x.addClass("d-none"))})}),N===I-1&&v.text(B[I]).show()});var M=function(){location.href="/thank-you"};function W(e){var n=new FormData,o=JSON.parse(localStorage.getItem(d)),t=JSON.stringify({userName:o.userName,language:o.language});n.append("audio_data",crowdSource.audioBlob),n.append("speakerDetails",t),n.append("sentenceId",crowdSource.sentences[N].sentenceId),n.append("state",localStorage.getItem("state_region")||""),n.append("country",localStorage.getItem("country")||""),fetch("/upload",{method:"POST",body:n}).then(function(e){return e.json()}).then(function(e){}).catch(function(e){console.log(e)}).then(function(n){e&&"function"==typeof e&&e()})}p.add(C).on("click",function(e){"nextBtn"===e.target.id&&N<I-1?(W(),j(N+1)):"skipBtn"===e.target.id&&(k++,localStorage.setItem(c,k),C.addClass("d-none")),N===I-1?("nextBtn"===e.target.id?W(M):setTimeout(M,2500),C.addClass("d-none"),r(),N++,P(b,"zoomOut",function(){return b.addClass("d-none")}),H(N),localStorage.removeItem("sentences"),localStorage.setItem(i,N),q.success("Congratulations!!! You have completed this batch of sentences"),$("#loader").show()):N<I-1&&(J(++N),m(N+1),v.text(B[N]),localStorage.setItem(i,N),C.removeClass("d-none")),l.addClass("d-none"),l.trigger("pause"),p.addClass("d-none"),a.addClass("d-none"),o.removeClass("d-none")})};$(document).ready(function(){window.crowdSource={};var e=$("#instructionsModal"),n=$("#errorModal"),o=$("#loader"),t=$("#page-content"),l=$("#nav-user"),u=l.find("#nav-username");s().then(function(e){return e.json()}).then(function(e){localStorage.setItem("state_region",e.regionName),localStorage.setItem("country",e.country)}).catch(console.log);try{var g=localStorage.getItem(d),m=JSON.parse(g),f=localStorage.getItem("sentences"),h=JSON.parse(f),v=Number(localStorage.getItem("count"));if(a(),e.on("hidden.bs.modal",function(){t.removeClass("d-none"),r()}),n.on("show.bs.modal",function(){e.modal("hide")}),n.on("hidden.bs.modal",function(){location.href="/#speaker-details"}),!m)return void(location.href="/#speaker-details");l.removeClass("d-none"),$("#nav-login").addClass("d-none"),u.text(m.userName),h&&h.userName===m.userName&&h.language===m.language?(crowdSource.sentences=h.sentences,crowdSource.count=v,o.hide(),t.removeClass("d-none"),p()):(localStorage.removeItem(i),localStorage.removeItem(c),fetch("/sentences",{method:"POST",body:JSON.stringify({userName:m.userName,age:m.age,language:m.language,motherTongue:m.motherTongue,gender:m.gender}),headers:{"Content-Type":"application/json"}}).then(function(e){if(e.ok)return e.json();throw Error(e.statusText||"HTTP error")}).then(function(n){e.modal("show"),crowdSource.sentences=n.data,crowdSource.count=Number(n.count),o.hide(),p(),localStorage.setItem("sentences",JSON.stringify({userName:m.userName,sentences:n.data})),localStorage.setItem("count",n.count)}).catch(function(e){console.log(e),n.modal("show")}).then(function(){o.hide()}))}catch(e){console.log(e),n.modal("show")}}),n.exports={getCurrentIndex:u,getSkipCount:g,getValue:l,setCurrentSentenceIndex:m,setTotalSentenceIndex:f}},{"./utils":2}],2:[function(e,n,o){"use strict";n.exports={setPageContentHeight:function(){var e=$("footer"),n=$(".navbar"),o=100-(e.outerHeight()+n.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",o+"vh")},toggleFooterPosition:function(){var e=$("footer");e.toggleClass("fixed-bottom"),e.toggleClass("bottom")},fetchLocationInfo:function(){return fetch("http://ip-api.com/json/?fields=country,regionName")}}},{}]},{},[1]);