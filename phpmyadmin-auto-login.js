// ==UserScript==
// @name         phpMyAdmin auto login
// @namespace    http://tampermonkey.net/
// @version      2025-11-26
// @description  try to take over the world!
// @author       You
// @match        http://localhost:8089/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.localhost
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function SC(scl) {
        return document.querySelector(scl);
    }

    let count = 0;
    let loginInterval = null;

    loginInterval = setInterval(() => {
        SC('[name="pma_username"]')?.value = 'root';

        SC('[name="pma_password"]')?.value = '1234';

        if(SC('[value="Log in"]')) {
            SC('[value="Log in"]').click();
            clearInterval(loginInterval);
            return;
        }
        count++;
    }, 100);

    setTimeout(() => {
        clearInterval(loginInterval);
    }, 1000);

})();
