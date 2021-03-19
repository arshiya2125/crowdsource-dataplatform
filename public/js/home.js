!function e(t,a,r){function o(s,i){if(!a[s]){if(!t[s]){var l="function"==typeof require&&require;if(!i&&l)return l(s,!0);if(n)return n(s,!0);throw new Error("Cannot find module '"+s+"'")}var d=a[s]={exports:{}};t[s][0].call(d.exports,function(e){var a=t[s][1][e];return o(a||e)},d,d.exports,e,t,a,r)}return a[s].exports}for(var n="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(e,t,a){"use strict";t.exports={DEFAULT_CON_LANGUAGE:"Hindi",AUDIO_DURATION:6,SIXTY:60,HOUR_IN_SECONDS:3600,ALL_LANGUAGES:[{value:"Assamese",id:"as",text:"অসমীয়া",hasLocaleText:!0,data:!0},{value:"Bengali",id:"bn",text:"বাংলা",hasLocaleText:!0,data:!0},{value:"English",id:"en",text:"English",hasLocaleText:!0,data:!0},{value:"Gujarati",id:"gu",text:"ગુજરાતી",hasLocaleText:!0,data:!0},{value:"Hindi",id:"hi",text:"हिंदी",hasLocaleText:!0,data:!0},{value:"Kannada",id:"kn",text:"ಕನ್ನಡ",hasLocaleText:!0,data:!0},{value:"Malayalam",id:"ml",text:"മലയാളം",hasLocaleText:!0,data:!0},{value:"Marathi",id:"mr",text:"मराठी",hasLocaleText:!0,data:!0},{value:"Odia",id:"or",text:"ଓଡିଆ",hasLocaleText:!0,data:!0},{value:"Punjabi",id:"pa",text:"ਪੰਜਾਬੀ",hasLocaleText:!0,data:!0},{value:"Tamil",id:"ta",text:"தமிழ்",hasLocaleText:!0,data:!0},{value:"Telugu",id:"te",text:"తెలుగు",hasLocaleText:!0,data:!0}],TOP_LANGUAGES_BY_HOURS:"topLanguagesByHours",TOP_LANGUAGES_BY_SPEAKERS:"topLanguagesBySpeakers",AGGREGATED_DATA_BY_LANGUAGE:"aggregateDataCountByLanguage",LOCALE_STRINGS:"localeString",CONTRIBUTION_LANGUAGE:"contributionLanguage"}},{}],2:[function(e,t,a){"use strict";var r=e("./home-page-charts"),o=r.drawMap,n=r.getStatistics,s=r.showByHoursChart,i=r.showBySpeakersChart,l=e("./utils"),d=l.toggleFooterPosition,c=l.updateLocaleLanguagesDropdown,u=l.getLocaleString,m=l.performAPIRequest,g=e("./speakerDetails"),h=g.setSpeakerDetails,v=g.setStartRecordBtnToolTipContent,p=g.setUserModalOnShown,f=g.setUserNameOnInputFocus,_=g.setGenderRadioButtonOnClick,b=g.setStartRecordingBtnOnClick,N=e("./constants"),C=N.DEFAULT_CON_LANGUAGE,S=N.TOP_LANGUAGES_BY_HOURS,k=N.TOP_LANGUAGES_BY_SPEAKERS,I=N.AGGREGATED_DATA_BY_LANGUAGE,A=N.CONTRIBUTION_LANGUAGE,y=N.LOCALE_STRINGS,L=N.ALL_LANGUAGES,x=function(e,t,a){var r=$("#say-p-3"),o=$("#listen-p-3"),n=JSON.parse(localStorage.getItem(y)),s=n["hrs recorded in"];s=(s=s.replace("%hours",e)).replace("%language",a),r.text(s);var i=n["hrs validated in"];i=(i=i.replace("%hours",t)).replace("%language",a),o.text(i)};function T(e){var t=$("#say-loader"),a=$("#listen-loader");t.removeClass("d-none"),a.removeClass("d-none");var r=JSON.parse(localStorage.getItem(I)),o=r&&r.find(function(t){return t.language===e});o?x(o.total_contributions,o.total_validations,e):x(0,0,e),t.addClass("d-none"),a.addClass("d-none"),c(e)}var E=function(e,t,a){var r=0,o=a.children();return o.each(function(e,t){t.getAttribute("value")===C&&(r=e)}),o.each(function(a,o){o.getAttribute(e)===t&&(r=a)}),o[r]},O=function(e,t,a){var r=a.children(),o=-1;r.each(function(e,a){a.getAttribute("value")===t&&(o=e)}),a.find(".active").removeClass("active");var n=document.getElementById("6th_option"),s=L.find(function(e){return e.value===t});n.innerText=s.text,o<0?(n.classList.remove("d-none"),n.classList.add("active"),n.setAttribute("value",t)):(r[o].classList.add("active"),n.classList.remove("active"),n.classList.add("d-none"))},G=function(){m("/stats/summary").then(function(e){o({data:e.aggregate_data_by_state}),localStorage.setItem(S,JSON.stringify(e.top_languages_by_hours)),s(),localStorage.setItem(k,JSON.stringify(e.top_languages_by_speakers)),localStorage.setItem(I,JSON.stringify(e.aggregate_data_by_language)),function(){var e=localStorage.getItem(A),t=$("#say-listen-language"),a=$("#language-nav-bar");if($("#nav-bar-loader").addClass("d-none"),a.removeClass("d-none"),!e){var r=document.getElementById("home-page").getAttribute("default-lang"),o=E("id",r,t),n=o.getAttribute("value");return localStorage.setItem(A,n),T(n),void O(0,n,a)}E("value",e,t);T(e),O(0,e,a)}(),n(e.aggregate_data_count[0])})};$(document).ready(function(){localStorage.removeItem(S),localStorage.removeItem(k),localStorage.removeItem(I),localStorage.removeItem(y),u();var e=$("#proceed-box").parent(),t=document.getElementById("age"),a=document.getElementById("mother-tongue"),r=$("#username");d();var o=function(){var e=localStorage.getItem(A),t=$("#say-listen-language");if(!e){var a=document.getElementById("home-page").getAttribute("default-lang"),r=E("id",a,t).getAttribute("value");return localStorage.setItem(A,r),r}return e}(),n=$("#language-nav-bar");$("#say-listen-language").on("click",function(e){var t=e.target,a=t.getAttribute("value");o!==a&&(o=a,localStorage.setItem(A,a),document.cookie="i18n=en",window.location.href="/",O(0,a,n),T(a))}),n.on("click",function(e){var t=e.target,a=t.getAttribute("value");if(o!==a){localStorage.setItem(A,a),o=a;var r=$("#6th_option");(n.find(".active")||r).removeClass("active"),r.addClass("d-none"),t.classList.add("active"),T(a),document.cookie="i18n=en",window.location.href="/"}}),$("#start_recording").on("click",function(){o,localStorage.setItem(A,o)}),$('[name="topLanguageChart"]').on("change",function(e){"hours"===e.target.value?s():i()}),h("speakerDetails",t,a,r),_(),v(r.val().trim(),e),f(),b(),p(r);var l=$("#say"),c=$("#listen"),m=$("#listen-p-2"),g=$("#say-p-2"),N=$("#say_container"),C=$("#listen_container");l.hover(function(){l.removeClass("col-lg-5"),c.removeClass("col-lg-5"),l.addClass("col-lg-6"),c.addClass("col-lg-4"),l.removeClass("col-md-5"),c.removeClass("col-md-5"),l.addClass("col-md-6"),c.addClass("col-md-4"),g.removeClass("d-none"),N.addClass("say-active")},function(){l.removeClass("col-lg-6"),c.removeClass("col-lg-4"),l.addClass("col-lg-5"),c.addClass("col-lg-5"),l.removeClass("col-md-6"),c.removeClass("col-md-4"),l.addClass("col-md-5"),c.addClass("col-md-5"),g.addClass("d-none"),N.removeClass("say-active")}),c.hover(function(){l.removeClass("col-lg-5"),c.removeClass("col-lg-5"),c.addClass("col-lg-6"),l.addClass("col-lg-4"),m.removeClass("d-none"),C.addClass("listen-active")},function(){l.removeClass("col-lg-4"),c.removeClass("col-lg-6"),l.addClass("col-lg-5"),c.addClass("col-lg-5"),m.addClass("d-none"),C.removeClass("listen-active")}),$('input[name = "gender"]').on("change",function(){var e=document.querySelector('input[name = "gender"]:checked'),t=$("#transgender_options");"others"===e.value?t.removeClass("d-none"):t.addClass("d-none")}),G()}),t.exports={updateHrsForSayAndListen:T,getDefaultTargetedDiv:E,setLangNavBar:O}},{"./constants":1,"./home-page-charts":3,"./speakerDetails":5,"./utils":6}],3:[function(e,t,a){"use strict";function r(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return o(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}var n="topLanguagesByHours",s="topLanguagesBySpeakers",i=e("./utils"),l=i.calculateTime,d=i.formatTime,c=i.performAPIRequest,u=[{id:"IN-TG",state:"Telangana",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AN",state:"Andaman and Nicobar Islands",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AP",state:"Andhra Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AR",state:"Arunanchal Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-AS",state:"Assam",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-BR",state:"Bihar",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-CT",state:"Chhattisgarh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-GA",state:"Goa",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-GJ",state:"Gujarat",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-HR",state:"Haryana",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-HP",state:"Himachal Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-JK",state:"Jammu & Kashmir",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-JH",state:"Jharkhand",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-KA",state:"Karnataka",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-KL",state:"Kerala",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-LD",state:"Lakshadweep",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MP",state:"Madhya Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MH",state:"Maharashtra",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MN",state:"Manipur",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-CH",state:"Chandigarh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-PY",state:"Puducherry",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-PB",state:"Punjab",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-RJ",state:"Rajasthan",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-SK",state:"Sikkim",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-TN",state:"Tamil Nadu",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-TR",state:"Tripura",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-UP",state:"Uttar Pradesh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-UT",state:"Uttarakhand",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-WB",state:"West Bengal",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-OR",state:"Odisha",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-DNDD",state:"Dadra and Nagar Haveli and Daman and Diu",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-ML",state:"Meghalaya",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-MZ",state:"Mizoram",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-NL",state:"Nagaland",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-DL",state:"National Capital Territory of Delhi",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0},{id:"IN-LK",state:"Ladakh",contributed_time:"0 hrs",validated_time:"0 hrs",total_speakers:0}],m=void 0,g=function(e){var t,a=[].concat(u),r=$("#legendDiv"),o=Math.max.apply(Math,e.data.map(function(e){return Number(e.total_contributions)}));t=o>1?o/4:.25,a.forEach(function(t){var a=e.data.find(function(e){return t.state===e.state});if(a){var r=l(60*Number(a.total_contributions)*60,!0),o=r.hours,n=r.minutes,s=r.seconds,i=l(60*Number(a.total_validations)*60,!0),d=i.hours,c=i.minutes,u=i.seconds;t.contributed_time="".concat(o,"hrs ").concat(n,"mins ").concat(s,"sec"),t.validated_time="".concat(d,"hrs ").concat(c,"mins ").concat(u,"sec"),t.value=Number(a.total_contributions),t.total_speakers=a.total_speakers,t.id=t.id}else t.id=t.id,t.contributed_time="0 hrs",t.validated_time="0 hrs",t.value=0,t.total_speakers=0});var n=am4core.create("indiaMapChart",am4maps.MapChart),s=n.series.indexOf(m);s>-1&&n.series.removeIndex(s),n.geodataSource.url="https://cdn.amcharts.com/lib/4/geodata/json/india2020Low.json",n.projection=new am4maps.projections.Miller,m=new am4maps.MapPolygonSeries,n.seriesContainer.draggable=!1,n.seriesContainer.resizable=!1,n.chartContainer.wheelable=!1,n.maxZoomLevel=1,m.useGeodata=!0,m.data=a;var i=m.mapPolygons.template;i.tooltipHTML='<div style="text-align: left;"><h6>{state}</h6> <div style="text-align: left;">{total_speakers} Speakers  <label style="margin-left: 32px">Contributed: <label style="margin-left: 8px">{contributed_time}</label></label></div> <div style="text-align: left;">Validated:  <label style="margin-left: 8px">{validated_time}</label></div></div>',i.nonScalingStroke=!0,i.strokeWidth=.5,i.stroke=am4core.color("#929292"),i.fill=am4core.color("#fff"),i.states.create("hover").properties.fill=n.colors.getIndex(1).brighten(-.5),m.mapPolygons.template.adapter.add("fill",function(e,a){return a.dataItem?a.dataItem.value>=3*t?am4core.color("#4061BF"):a.dataItem.value>=2*t?am4core.color("#6B85CE"):a.dataItem.value>=t?am4core.color("#92A8E8"):a.dataItem.value>0?am4core.color("#CDD8F6"):am4core.color("#E9E9E9"):e}),n.series.push(m);var c=$("#quarter .legend-val"),g=$("#half .legend-val"),h=$("#threeQuarter .legend-val"),v=$("#full .legend-val"),p=l(60*t*60,!1),f=p.hours,_=p.minutes,b=l(2*t*60*60,!1),N=b.hours,C=b.minutes,S=l(3*t*60*60,!1),k=S.hours,I=S.minutes;c.text("0 - ".concat(d(f,_))),g.text("".concat(d(f,_)," - ").concat(d(N,C))),h.text("".concat(d(N,C)," - ").concat(d(k,I))),v.text("> ".concat(d(k,I))),r.removeClass("d-none").addClass("d-flex")};function h(e,t,a){var o=am4core.create("speakers_hours_chart",am4charts.XYChart);v.chart=o;var n=r(e);n="total_speakers"===t?n.sort(function(e,t){return Number(e.total_speakers)<Number(t.total_speakers)?-1:1}):n.sort(function(e,t){return Number(e.total_contributions)<Number(t.total_contributions)?-1:1}),"total_speakers"!==t&&n.forEach(function(e){var t=l(60*Number(e.total_contributions)*60,!0),a=t.hours,r=t.minutes,o=t.seconds;e.total_contributions_text=d(a,r,o)}),o.data=n;var s=o.yAxes.push(new am4charts.CategoryAxis);s.dataFields.category=a,s.renderer.grid.template.location=0,s.renderer.cellStartLocation=.2,s.renderer.cellEndLocation=.8,s.renderer.grid.template.strokeWidth=0;var i=o.xAxes.push(new am4charts.ValueAxis);i.renderer.grid.template.strokeWidth=0,i.renderer.labels.template.disabled=!0,s.renderer.minGridDistance=25;var c=o.series.push(new am4charts.ColumnSeries);c.dataFields.valueX=t,c.dataFields.categoryY=a;var u=c.bullets.push(new am4charts.LabelBullet);u.label.text="total_speakers"===t?"{total_speakers}":"{total_contributions_text}",u.label.fontSize=14,u.label.horizontalCenter="left",u.label.dx=10,u.label.truncate=!1,u.label.hideOversized=!1;o.events.on("datavalidated",function(e){var t=e.target,a=t.yAxes.getIndex(0),r=35*t.data.length-a.pixelHeight,o=t.pixelHeight+r;t.svgContainer.htmlElement.style.height=o+"px"})}var v={};t.exports={generateIndiaMap:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";c(""!==e?"/aggregate-data-count?byState=true&byLanguage=true":"/aggregate-data-count?byState=true").then(function(t){var a=""!==e?function(e,t){var a={data:[]};return e.data.forEach(function(e){e.language.toLowerCase()===t.toLowerCase()&&""!==e.state&&"anonymous"!==e.state.toLowerCase()&&a.data.push(e)}),a}(t,e):t;g(a)}).catch(function(e){console.log(e)})},showByHoursChart:function(){v.chart&&v.chart.dispose();var e=localStorage.getItem(n);h(JSON.parse(e),"total_contributions","language")},showBySpeakersChart:function(){v.chart&&v.chart.dispose();var e=localStorage.getItem(s);h(JSON.parse(e),"total_speakers","language")},getStatistics:function(e){var t=$("#speaker-data").find("#loader1, #loader2, #loader3"),a=$("#speakers-wrapper"),r=$("#speaker-value"),o=$("#hours-wrapper"),n=$("#hour-value"),s=$("#languages-wrapper"),i=$("#languages-value");t.removeClass("d-none"),o.addClass("d-none"),a.addClass("d-none"),s.addClass("d-none");var d=l(60*Number(e.total_contributions)*60),c=d.hours,u=d.minutes,m=d.seconds;n.text("".concat(c,"h ").concat(u,"m ").concat(m,"s")),r.text(e.total_speakers),i.text(e.total_languages),t.addClass("d-none"),o.removeClass("d-none"),a.removeClass("d-none"),s.removeClass("d-none")},drawMap:g}},{"./utils":6}],4:[function(e,t,a){"use strict";var r=e("./utils").updateLocaleLanguagesDropdown,o=e("./constants").ALL_LANGUAGES,n=function(e){var t=location.href.split("/"),a=t[t.length-1];s("i18n",e,1),location.href="/".concat(e,"/").concat(a)};function s(e,t,a){var r=new Date;r.setTime(r.getTime()+24*a*60*60*1e3);var o="expires="+r.toGMTString();document.cookie=e+"="+t+";"+o+";path=/"}function i(e){for(var t=e+"=",a=decodeURIComponent(document.cookie).split(";"),r=0;r<a.length;r++){for(var o=a[r];" "==o.charAt(0);)o=o.substring(1);if(0==o.indexOf(t))return o.substring(t.length,o.length)}return""}t.exports={checkCookie:function(){return""!=i("i18n")},getCookie:i,setCookie:s,changeLocale:n,showLanguagePopup:function(){document.getElementById("toggle-content-language").click()},redirectToLocalisedPage:function(){var e=i("i18n"),t=location.href.split("/"),a=t[t.length-2];if($("#home-page").attr("default-lang",e),a!=e)n(e);else{var s=o.find(function(t){return t.id===e});s&&r(s.value)}}}},{"./constants":1,"./utils":6}],5:[function(e,t,a){"use strict";var r=e("./constants"),o=r.DEFAULT_CON_LANGUAGE,n=r.CONTRIBUTION_LANGUAGE,s=r.ALL_LANGUAGES;function i(e,t){var a=e.val().trim();d(a)?(e.addClass("is-invalid"),t.removeClass("d-none")):(e.removeClass("is-invalid"),t.addClass("d-none"))}function l(){var e=document.getElementById("age"),t=document.getElementById("mother-tongue"),a=document.getElementById("username"),r=document.querySelector('input[name = "gender"]:checked');r&&(r.checked=!1),e.selectedIndex=0,t.selectedIndex=0,a.value=""}var d=function(e){return/^[6-9]\d{9}$/.test(e)||/^\S+@\S+[\.][0-9a-z]+$/.test(e)};function c(e){e.val().length>11?(e.tooltip("enable"),e.tooltip("show")):(e.tooltip("disable"),e.tooltip("hide"))}t.exports={testUserName:d,validateUserName:i,setSpeakerDetails:function(e,t,a,r){var o=localStorage.getItem(e);if(o){var n=JSON.parse(o),s=document.querySelector('input[name = "gender"][value="'+n.gender+'"]');if(["male","female"].indexOf(n.gender)>-1)s&&(s.checked=!0,s.previous=!0);else{var l=document.querySelector('input[name = "gender"][value="others"]');l&&(l.checked=!0,l.previous=!0);var d=document.querySelector('input[name = "trans_gender"][value="'+n.gender+'"]');d&&($("#transgender_options").removeClass("d-none"),d.checked=!0,d.previous=!0)}t.value=n.age,a.value=n.motherTongue,r.val(n.userName?n.userName.trim().substring(0,12):""),i(r,r.next())}},resetSpeakerDetails:l,setUserNameTooltip:c,setStartRecordBtnToolTipContent:function(e,t){d(e)&&t.attr("data-original-title","Please validate any error message before proceeding")},setUserModalOnShown:function(e){$("#userModal").on("shown.bs.modal",function(){$("#resetBtn").on("click",l),e.tooltip({container:"body",placement:screen.availWidth>500?"right":"auto",trigger:"focus"}),c(e)})},setUserNameOnInputFocus:function(){var e=$("#username"),t=e.next();e.on("input focus",function(){i(e,t),c(e)})},setGenderRadioButtonOnClick:function(){document.querySelectorAll('input[name = "gender"]').forEach(function(e){e.addEventListener("click",function(e){e.target.previous&&(e.target.checked=!1),e.target.previous=e.target.checked})})},setStartRecordingBtnOnClick:function(){var e=$("#proceed-box"),t=document.querySelectorAll('input[name = "gender"]'),a=document.querySelectorAll('input[name = "trans_gender"]'),r=$("#username"),i=document.getElementById("age"),l=document.getElementById("mother-tongue");e.on("click",function(){var e=Array.from(t).filter(function(e){return e.checked}),c=e.length?e[0].value:"";if("others"===c){var u=Array.from(a).filter(function(e){return e.checked});c=u.length?u[0].value:""}var m=r.val().trim().substring(0,12),g=localStorage.getItem(n);if(s.find(function(e){return e.value===g}).data||(g=o),!d(m)){var h={gender:c,age:i.value,motherTongue:l.value,userName:m,language:g};localStorage.setItem("speakerDetails",JSON.stringify(h)),localStorage.setItem(n,g),location.href="/record"}})}}},{"./constants":1}],6:[function(e,t,a){"use strict";var r=e("./constants"),o=r.HOUR_IN_SECONDS,n=r.SIXTY,s=r.ALL_LANGUAGES,i=e("./locale").getCookie;var l=function(e){return fetch(e).then(function(e){if(e.ok)return Promise.resolve(e.json());throw Error(e.statusText||"HTTP error")})};t.exports={setPageContentHeight:function(){var e=$("footer"),t=$(".navbar"),a=100-(e.outerHeight()+t.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",a+"vh")},toggleFooterPosition:function(){var e=$("footer");e.toggleClass("fixed-bottom"),e.toggleClass("bottom")},fetchLocationInfo:function(){var e=localStorage.getItem("state_region")||"NOT_PRESENT",t=localStorage.getItem("country")||"NOT_PRESENT";return"NOT_PRESENT"!==e&&"NOT_PRESENT"!==t&&e.length>0&&t.length>0?new Promise(function(a){a({regionName:e,country:t})}):fetch("https://www.cloudflare.com/cdn-cgi/trace").then(function(e){return e.text()}).then(function(e){var t=e.split("\n"),a="";for(var r in t)if(t[r].startsWith("ip=")){a=t[r].replace("ip=","");break}return 0!==a.length?fetch("/location-info?ip=".concat(a)):new Promise(function(e,t){t("Ip Address not available")})})},updateLocaleLanguagesDropdown:function(e){var t=$("#localisation_dropdown"),a=s.find(function(t){return t.value===e});"english"===e.toLowerCase()||!1===a.hasLocaleText?t.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>'):t.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>\n        <a id='.concat(a.value,' class="dropdown-item" href="/changeLocale/').concat(a.id,'">').concat(a.text,"</a>"))},calculateTime:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=Math.floor(e/o),r=e%o,s=Math.floor(r/n),i=Math.round(r%n);return t?{hours:a,minutes:s,seconds:i}:{hours:a,minutes:s}},formatTime:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r="";return e>0&&(r+="".concat(e," hrs ")),t>0&&(r+="".concat(t," min ")),0===e&&0===t&&a>0&&(r+="".concat(a," sec ")),r.substr(0,r.length-1)},getLocaleString:function(){var e=i("i18n");l("/get-locale-strings/".concat(e)).then(function(e){localStorage.setItem("localeString",JSON.stringify(e))})},performAPIRequest:l,showElement:function(e){e.removeClass("d-none")},hideElement:function(e){e.addClass("d-none")},setFooterPosition:function(){var e=$("#page-content").outerHeight();$("body").outerHeight()<=e+$("nav").outerHeight()+$("footer").outerHeight()&&$("footer").removeClass("fixed-bottom").addClass("bottom")}}},{"./constants":1,"./locale":4}]},{},[2]);