!function t(e,r,n){function o(i,s){if(!r[i]){if(!e[i]){var c="function"==typeof require&&require;if(!s&&c)return c(i,!0);if(a)return a(i,!0);throw new Error("Cannot find module '"+i+"'")}var u=r[i]={exports:{}};e[i][0].call(u.exports,function(t){var r=e[i][1][t];return o(r||t)},u,u.exports,t,e,r,n)}return r[i].exports}for(var a="function"==typeof require&&require,i=0;i<n.length;i++)o(n[i]);return o}({1:[function(t,e,r){"use strict";var n=Number(localStorage.getItem("currentIndex")),o=localStorage.getItem("speakerDetails"),a=JSON.parse(o),i=$("footer"),s=function(t){var e=$("#user-contribution"),r=Math.floor(t/60),n=t%60,o=(r>0?"".concat(r," minute "):"")+(n>0?"".concat(n," seconds "):r>0?"":"0 second");e.text(o)};function c(){var t=Number(localStorage.getItem("skipCount"));return 6*(Number(localStorage.getItem("count"))+n-t)}if(a&&a.userName)if(n<10)location.href="/#start-record";else{var u=$("#nav-user");u.find("#nav-username").text(a.userName),u.removeClass("d-none");var l=$("#total-progress"),d=$("#graphbar"),f=$("#progress-percent-wrapper"),g=f.find("#progress-percent"),h=$("#hour-value");s(c());!function(t){var e=t/1800*100;g.text(Number(e.toFixed(1)));var r=t/1800*42;d.height(r+"em"),e>=100&&(g.parent().find(".small").addClass("d-none"),f.addClass("mb-3"),$("#do-more").addClass("d-none"))}(c());var m=function(t){var e,r,n,o,a=(o=11,innerWidth<576?(r=70.5-1.333*(e=576-innerWidth)/100,n=75.2-.4*e/100):innerWidth<1200?(r=70.5-.5*(e=1200-innerWidth)/100,n=75.75-.25*e/100):innerWidth<2e3?(r=71.5-.1*(e=2e3-innerWidth)/100,o=12-.1*e/100,n=innerWidth<1500?75.2:75.5-.003*e/100):(r=71.5+.1*(e=innerWidth-2e3)/100,o=12,n=75.8),{totalProgressBarWidth:r,totalProgressBarBulbWidth:o,totalProgressBarBulbLeft:n}),i=t/36e6*100;i>=100?(l.next().css({width:a.totalProgressBarBulbWidth+"%",left:a.totalProgressBarBulbLeft+"%"}),l.width(100*a.totalProgressBarWidth/100+"%"),$("#total-progress").one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){var t=0,e=setInterval(function(){t>=100&&clearInterval(e),l.next().css("background","linear-gradient(to right, #007bff 0%, #007bff ".concat(t,"%, transparent 0%)")),t+=5},30)})):l.width(i*a.totalProgressBarWidth/100+"%")};fetch("/getDetails/".concat(a.language)).then(function(t){if(t.ok)return t.json();throw Error(t.statusText||"HTTP error")}).then(function(t){localStorage.setItem("speakersData",JSON.stringify(t)),function(t){try{var e=6*Number(t.find(function(t){return 1===t.index}).count),r=Math.floor(e/3600),n=e%3600,o=Math.floor(n/60),a=n%60;h.text("".concat(r,"h ").concat(o,"m ").concat(a,"s")),m(e)}catch(t){console.log(t)}}(t)}).catch(function(t){console.log(t)}).then(function(){h.next().addClass("d-none")});var p=function(){var t=i.outerHeight(),e=f.css("bottom");Number(e.substring(0,e.length-2))&&f.css("bottom",t+"px")},v=function(){var t=$("#progress-percent-wrapper"),e=t.prev(),r=$("#graphcontainer");if(function(){var t=(screen.orientation||{}).type||screen.mozOrientation||screen.msOrientation,e=innerWidth,r=innerHeight;if(("landscape-primary"===t||"landscape-secondary"===t)&&r<600&&r<e)return!0;if(void 0===t){var n=(screen.orientation||{}).angle;return 90===n||-90===n}return!1}()||innerWidth<600){t.removeClass("position-fixed text-center").addClass("position-relative text-right").css({right:0,bottom:0}),r.removeClass("mx-auto").addClass("ml-auto mr-3");var n=getComputedStyle(document.documentElement).fontSize;r.next().find("span").not("#progress-percent").css({marginRight:Number(n.substring(0,n.length-2))}),e.removeClass("mb-6")}else p()};try{screen.orientation&&screen.orientation.onchange&&(screen.orientation.onchange=v),v()}catch(t){console.log(t)}}else location.href="/#start-record";e.exports={setUserContribution:s,getTotalSecondsContributed:c}},{}]},{},[1]);