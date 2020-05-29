$(document).ready(function () {
    const $startRecordBtn = $("#start-record");
    const $startRecordBtnTooltip = $startRecordBtn.parent();
    const genderRadios = document.querySelectorAll('input[name = "gender"]');
    const age = document.getElementById("age");
    const motherTongue = document.getElementById("mother-tongue");
    const $userName = $("#username");
    const $userNameError = $userName.next();
    const $tncCheckbox = $("#tnc");
    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^\S+@\S+[\.][0-9a-z]+$/
    const $speakersData = $("#speaker-data");
    const $speakersDataLoader = $speakersData.find("#loader");
    const $speakersDataSpeakerWrapper = $speakersData.find("#speakers-wrapper");
    const $speakersDataSpeakerValue = $speakersData.find("#speaker-value");
    const $speakersDataHoursWrapper = $speakersData.find("#hours-wrapper");
    const $speakersDataHoursValue = $speakersData.find("#hour-value");
    const speakersDataKey = "speakersData";

    const testUserName = (val) => mobileRegex.test(val) || emailRegex.test(val);
    const setUserNameTooltip = () => {
        if ($userName.val().length > 11) {
            $userName.tooltip('enable');
            $userName.tooltip('show');
        }
        else {
            $userName.tooltip('disable');
            $userName.tooltip('hide');
        }
    }
    const validateUserName = () => {
        const userNameValue = $userName.val().trim();
        if (testUserName(userNameValue)) {
            $userName.addClass("is-invalid");
            $userNameError.removeClass('d-none')
        }
        else {
            $userName.removeClass("is-invalid");
            $userNameError.addClass('d-none')
        }
        $tncCheckbox.trigger('change');
        setUserNameTooltip();
    }
    $userName.tooltip({
        container: 'body',
        placement: screen.availWidth > 500 ? 'right' : 'auto',
        trigger: 'focus'
    })
    setUserNameTooltip();
    $tncCheckbox.prop('checked', false);
    $startRecordBtnTooltip.tooltip({
        container: 'body',
        placement: screen.availWidth > 500 ? 'right' : 'auto',
    });
    const speakerDetailsKey = "speakerDetails";
    const speakerDetailsValue = localStorage.getItem(speakerDetailsKey);
    if (speakerDetailsValue) {
        const parsedSpeakerDetails = JSON.parse(speakerDetailsValue);
        const genderRadio = document.querySelector('input[name = "gender"][value=\"' + parsedSpeakerDetails.gender + '\"]');
        if (genderRadio) {
            genderRadio.checked = true;
            genderRadio.previous = true;
        }
        age.value = parsedSpeakerDetails.age;
        motherTongue.value = parsedSpeakerDetails.motherTongue;
        $userName.val(parsedSpeakerDetails.userName ? parsedSpeakerDetails.userName.trim().substring(0, 12) : "");
        validateUserName();
    }

    genderRadios.forEach(element => {
        element.addEventListener('click', e => {
            if (e.target.previous) {
                e.target.checked = false;
            }
            e.target.previous = e.target.checked;
        })
    });
    $tncCheckbox.change(function () {
        const userNameValue = $userName.val().trim();
        if (this.checked && !testUserName(userNameValue)) {
            $startRecordBtn.removeAttr('disabled').removeClass('point-none');
            $startRecordBtnTooltip.tooltip('disable');

        }
        else {
            $startRecordBtn.prop("disabled", "true").addClass('point-none');
            $startRecordBtnTooltip.tooltip('enable');
        }
    });

    $userName.on('input focus', validateUserName);

    $startRecordBtn.on('click', (event) => {
        if ($tncCheckbox.prop('checked')) {
            const checkedGender = Array.from(genderRadios).filter(el => el.checked)
            const genderValue = checkedGender.length ? checkedGender[0].value : ""
            const userNameValue = $userName.val().trim().substring(0, 12);
            if (testUserName(userNameValue)) {
                return;
            }
            const speakerDetails = {
                gender: genderValue,
                age: age.value,
                motherTongue: motherTongue.value,
                userName: userNameValue,
            }
            localStorage.setItem(speakerDetailsKey, JSON.stringify(speakerDetails));
            location.href = "/record"
        }
    })


    fetch('/getDetails')
        .then(data => {
            if (!data.ok) {
                throw Error(data.statusText || 'HTTP error');
            }
            else {
                return data.json();
            }
        })
        .then(data => {
            try {
                $speakersDataLoader.addClass('d-none');
                const totalSentence = data[0].count;
                const totalSeconds = totalSentence * 6;
                const hours = Math.floor(totalSeconds / 3600);
                const remainingAfterHours = totalSeconds % 3600;
                const minutes = Math.floor(remainingAfterHours / 60);
                const seconds = remainingAfterHours % 60;

                $speakersDataHoursValue.text(`${hours}h ${minutes}m ${seconds}s`);
                $speakersDataSpeakerValue.text(data[1].count);
                $speakersDataHoursWrapper.removeClass('d-none');
                $speakersDataSpeakerWrapper.removeClass('d-none');
                localStorage.setItem(speakersDataKey, JSON.stringify(data));
            } catch (error) {
                console.log(error);
            }
        })
        .catch(err => {
            console.log(err);
        })

    //lazy load other css libs
    setTimeout(() => {
        fetch("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");
        fetch("https://fonts.googleapis.com/icon?family=Material+Icons");
        fetch("css/notyf.min.css");
        fetch("css/record.css");
    }, 2000);
});


