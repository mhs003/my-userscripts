// ==UserScript==
// @name         phpMyAdmin Query Refresh
// @namespace    http://tampermonkey.net/
// @version      2026-04-15
// @description  try to take over the world!
// @author       mhs003
// @match        http://localhost:8089/*
// @require      https://gist.githubusercontent.com/mhs003/b62b57463ce0f67b0c24d11a7e943745/raw/5bdb7e761e251816294e6143cc87f01e45802148/handle_key.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.localhost
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    handleKey("Ctrl+r", document, (e) => {
        const nodes = document.querySelector('.tools.d-print-none').childNodes;
        if(nodes[nodes.length-2]?.textContent === 'Refresh') {
            e.preventDefault();
            nodes[nodes.length-2].click();
        }
    });

})();
