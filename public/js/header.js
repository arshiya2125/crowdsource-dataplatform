!function e(r,n,t){function o(i,s){if(!n[i]){if(!r[i]){var u="function"==typeof require&&require;if(!s&&u)return u(i,!0);if(a)return a(i,!0);throw new Error("Cannot find module '"+i+"'")}var l=n[i]={exports:{}};r[i][0].call(l.exports,function(e){var n=r[i][1][e];return o(n||e)},l,l.exports,e,r,n,t)}return n[i].exports}for(var a="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}({1:[function(e,r,n){"use strict";function t(){var e=document.getElementById("header-script").getAttribute("isSignedIn"),r=localStorage.getItem("currentUser"),n=r&&JSON.parse(r);if(JSON.parse(e)&&n)return $("#nav-login").addClass("d-none"),$("#nav-user").removeClass("d-none"),void(document.getElementById("nav-username").innerText=n);$("#nav-login").removeClass("d-none"),$("#nav-user").addClass("d-none"),document.getElementById("nav-username").innerText=void 0,localStorage.removeItem("currentUser");var t=localStorage.getItem("validatorDetails"),o=t&&JSON.parse(t);if(o){var a=o.findIndex(function(e){return e===n}),i=o.slice(0,a).concat(o.slice(a+1,o.length));localStorage.setItem("validatorDetails",JSON.stringify(i))}}$(document).ready(t),r.exports={setUserProfileName:t}},{}]},{},[1]);