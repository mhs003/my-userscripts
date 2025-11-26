// ==UserScript==
// @name         cPanel AC-EDITOR Extras
// @namespace    http://tampermonkey.net/
// @version      2025-07-22
// @description  try to take over the world!
// @author       You
// @match        https://alhadiexpress.com.bd:2083/cpsess*/frontend/jupiter/filemanager/editit.html*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=com.bd
// @require      https://gist.githubusercontent.com/mhs003/b62b57463ce0f67b0c24d11a7e943745/raw/5bdb7e761e251816294e6143cc87f01e45802148/handle_key.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const pathInp = document.querySelector('#path');
    const toolbar = document.querySelector('div[role="toolbar"]');

    pathInp.style = 'flex-grow: 1;';
    pathInp.closest('label').style = `width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
    `;
    toolbar.closest('div.row').style = 'width: 885px;';
    toolbar.closest('tr.show-ace-editor').style = `position: absolute;
        top: 38px;
        left: 550px;`;


    handleKey("Ctrl+s", document, (event, pressedKey) => {
        event.preventDefault();
        // `loadfdata` function provided by cpanel file editor
        loadfdata('sform_submit'); return false;
    });
})();

