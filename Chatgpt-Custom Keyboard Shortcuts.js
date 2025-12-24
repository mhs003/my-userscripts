// ==UserScript==
// @name         Custom Keyboard Shortcuts - ChatGPT
// @namespace    http://tampermonkey.net/
// @version      2025-11-25
// @description  try to take over the world!
// @author       mhs003
// @match        https://chatgpt.com/*
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

    // delete current conversation
    handleKey("Ctrl+d", document, (e) => {
        e.preventDefault();
        console.log('deleting conversation...');
        const menuButton = document.querySelector('[data-active] .trailing-pair button');

        if (menuButton) {
            menuButton.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
            menuButton.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true }));

            let deleteItem, confirmButton;

            let x = setInterval(() => {
                deleteItem = document.querySelector('[data-testid="delete-chat-menu-item"]');
                console.log('searching for deleteItem', deleteItem);
                if (deleteItem) {
                    clearInterval(x);
                    deleteItem.click();

                    let y = setInterval(() => {
                        confirmButton = document.querySelector('[data-testid="delete-conversation-confirm-button"]');
                        console.log('searching for confirmButton', confirmButton);
                        if(confirmButton) {
                            clearInterval(y);
                            confirmButton.click();
                        }
                    }, 50);
                }
            }, 50);
        }
    });

})();
