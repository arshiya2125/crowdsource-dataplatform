!function t(e,o,r){function n(u,f){if(!o[u]){if(!e[u]){var c="function"==typeof require&&require;if(!f&&c)return c(u,!0);if(i)return i(u,!0);throw new Error("Cannot find module '"+u+"'")}var a=o[u]={exports:{}};e[u][0].call(a.exports,function(t){var o=e[u][1][t];return n(o||t)},a,a.exports,t,e,o,r)}return o[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)n(r[u]);return n}({1:[function(t,e,o){"use strict";e.exports={setPageContentHeight:function(){var t=$("footer"),e=$(".navbar"),o=100-(t.outerHeight()+e.outerHeight())*(100/document.documentElement.clientHeight);$("#content-wrapper").css("min-height",o+"vh")},toggleFooterPosition:function(){var t=$("footer");t.toggleClass("fixed-bottom"),t.toggleClass("bottom")},fetchLocationInfo:function(){return fetch("http://ip-api.com/json/?fields=country,regionName")}}},{}]},{},[1]);