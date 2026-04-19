function setCookie(name, value, days = 365) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    return null;
}

function showCookieConsent() {
    const consentPopup = document.getElementById('cookieConsent');
    if (consentPopup) {
        consentPopup.classList.add('show');
    }
}

function hideCookieConsent() {
    const consentPopup = document.getElementById('cookieConsent');
    if (consentPopup) {
        consentPopup.classList.remove('show');
    }
}

function showCookieWarning() {
    const warningPopup = document.getElementById('cookieWarning');
    if (warningPopup) {
        warningPopup.classList.add('show');
    }
}

function hideCookieWarning() {
    const warningPopup = document.getElementById('cookieWarning');
    if (warningPopup) {
        warningPopup.classList.remove('show');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    showCookieConsent();

    const acceptButton = document.getElementById('acceptCookies');
    const rejectButton = document.getElementById('rejectCookies');
    const acceptAnywayButton = document.getElementById('acceptAnyway');
    const dismissWarningButton = document.getElementById('dismissWarning');

    if (acceptButton) {
        acceptButton.addEventListener('click', function () {
            setCookie('codifyCookieConsent', 'accepted', 365);
            hideCookieConsent();
            hideCookieWarning();
        });
    }

    if (rejectButton) {
        rejectButton.addEventListener('click', function () {
            hideCookieConsent();
            showCookieWarning();
        });
    }

    if (acceptAnywayButton) {
        acceptAnywayButton.addEventListener('click', function () {
            setCookie('codifyCookieConsent', 'accepted', 365);
            hideCookieWarning();
        });
    }

    if (dismissWarningButton) {
        dismissWarningButton.addEventListener('click', function () {
            hideCookieWarning();
        });
    }
});
