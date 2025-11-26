// ==UserScript==
// @name         Custom Keyboard Shortcuts - ChatGPT
// @namespace    http://tampermonkey.net/
// @version      2025-11-25
// @description  try to take over the world!
// @author       You
// @match        https://chatgpt.com
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chatgpt.com
// @require      https://gist.githubusercontent.com/mhs003/b62b57463ce0f67b0c24d11a7e943745/raw/5bdb7e761e251816294e6143cc87f01e45802148/handle_key.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // enable-disable temporary mode
    handleKey("Ctrl+i", document, () => {
        document.querySelector('[aria-label="Turn on temporary chat"]')?.click();
        document.querySelector('[aria-label="Turn off temporary chat"]')?.click();
    });

})();
