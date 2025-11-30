// ==UserScript==
// @name         Manager.io server | Reminder remover
// @namespace    http://tampermonkey.net/
// @version      2025-4-10
// @description  try to take over the world!
// @author       Monzurul hasan
// @match        http://mysite.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.localhost
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.querySelector('a[href="/product-key-form"]').closest('div').remove();

})();
