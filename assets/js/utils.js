const { HOUR_IN_SECONDS, SIXTY, ALL_LANGUAGES } = require("./constants");


function showElement(element) {
    element.removeClass('d-none');
}

function hideElement(element) {
    element.addClass('d-none');
}

function convertPXToVH(px) {
    return px * (100 / document.documentElement.clientHeight);
}

function setPageContentHeight() {
    const $footer = $('footer');
    const $nav = $('.navbar');
    const edgeHeightInPixel = $footer.outerHeight() + $nav.outerHeight()
    const contentHeightInVH = 100 - convertPXToVH(edgeHeightInPixel)
    $('#content-wrapper').css('min-height', contentHeightInVH + 'vh');
}

function toggleFooterPosition() {
    const $footer = $('footer');
    $footer.toggleClass('fixed-bottom')
    $footer.toggleClass('bottom')
}

function fetchLocationInfo() {
    //https://api.ipify.org/?format=json
    return fetch('https://www.cloudflare.com/cdn-cgi/trace').then(res => res.text()).then(ipAddressText => {
        const dataArray = ipAddressText.split('\n');
        let ipAddress = "";
        for (let ind in dataArray) {
            if (dataArray[ind].startsWith("ip=")) {
                ipAddress = dataArray[ind].replace('ip=', '');
                break;
            }
        }
        if (ipAddress.length !== 0) {
            return fetch(`/location-info?ip=${ipAddress}`);
        } else {
            return new Promise((resolve, reject) => {
                reject("Ip Address not available")
            })
        }
    });
}

const performAPIRequest = (url) => {
    return fetch(url).then((data) => {
        if(!data.ok) {
            throw Error(data.statusText || 'HTTP error');
        } else {
            return Promise.resolve(data.json());
        }
    });
}

const getLocaleString = function() {
    performAPIRequest('/get-locale-strings')
        .then((response) => {
            localStorage.setItem('localeString', JSON.stringify(response));
        });
}

const updateLocaleLanguagesDropdown = (language) => {
    const dropDown = $('#localisation_dropdown');
    const localeLang = ALL_LANGUAGES.find(ele => ele.value === language);
    if (language.toLowerCase() === "english" || localeLang.hasLocaleText === false) {
        dropDown.html('<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>');
    } else {
        dropDown.html(`<a id="english" class="dropdown-item" href="/changeLocale/en">English</a>
        <a id=${localeLang.value} class="dropdown-item" href="/changeLocale/${localeLang.id}">${localeLang.text}</a>`);
    }
}

const calculateTime = function (totalSeconds, isSeconds = true) {
    const hours = Math.floor(totalSeconds / HOUR_IN_SECONDS);
    const remainingAfterHours = totalSeconds % HOUR_IN_SECONDS;
    const minutes = Math.floor(remainingAfterHours / SIXTY);
    const seconds = Math.round(remainingAfterHours % SIXTY);
    if (isSeconds) {
        return { hours, minutes, seconds };
    } else {
        return { hours, minutes };
    }
};

const formatTime = function (hours, minutes = 0, seconds = 0) {
    let result = "";
    if (hours > 0) {
        result += `${hours} hrs `;
    }
    if (minutes > 0) {
        result += `${minutes} min `;
    }
    if (hours === 0 && minutes === 0 && seconds > 0) {
        result += `${seconds} sec `;
    }
    return result.substr(0, result.length - 1);
};

module.exports = { setPageContentHeight, toggleFooterPosition, fetchLocationInfo, updateLocaleLanguagesDropdown ,calculateTime, formatTime, getLocaleString, performAPIRequest,showElement,hideElement}
