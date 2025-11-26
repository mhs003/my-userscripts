// ==UserScript==
// @name         cPanel File Manager Extras
// @namespace    http://tampermonkey.net/
// @version      2025-07-22
// @description  try to take over the world!
// @author       You
// @match        https://domain.com:2083/cpsess*/frontend/jupiter/filemanager/index.html
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      https://gist.githubusercontent.com/mhs003/b62b57463ce0f67b0c24d11a7e943745/raw/5bdb7e761e251816294e6143cc87f01e45802148/handle_key.js
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    const pathDiv = document.querySelector("#subleft .path");
    const topDiv = document.getElementById("top");
    pathDiv.style = `margin: 5px 5px 0 5px;`

    if (pathDiv && topDiv) {
        topDiv.insertAdjacentElement("afterend", pathDiv);
        document.getElementById('filesarea').children[2].style.paddingBottom = '40px';
    }

    handleKey("Enter", '#location', (event, pressedKey) => {
        // `dirnav` function provided by cpanel file manager
        dirnav();
    });

    handleKey("/", document, function(e) {
        if(document.activeElement !== document.querySelector('#location')) {
            e.preventDefault();
            document.querySelector('#location').focus();
        }
    });
})();

