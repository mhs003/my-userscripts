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

    handleKey('Escape', document, () => {
        document.querySelector('[aria-label="Close"]')?.click();
        document.querySelector('[class="text-token-text-secondary hover:text-token-text-primary p-3"]')?.click();
        document.querySelector('[aria-label="Dismiss upgrade reminder"]')?.click();
    });

    // delete current conversation
    handleKey("Ctrl+d", document, (e) => {
        e.preventDefault();
        deleteCurrentConversation();
    });

    // open new chat in new tab
    handleKey("Ctrl+o", document, (e) => {
        e.preventDefault();
        window.open(location.origin, '_blank');
    });

	async function deleteCurrentConversation(after = null) {
		const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

        let last_skip_group = 0;

		async function waitFor(selector, timeout = 2000, group=1) {
			const start = Date.now();
			while (Date.now() - start < timeout) {
                if(last_skip_group === group) {
                    break;
                }
                //console.log('Searching for selector', selector);
				const el = document.querySelector(selector);
				if (el) {
                    //console.log('found>', el);
                    last_skip_group = group;
                    return el;
                }
				await sleep(50);
			}
			return null;
		}

		const menuButton = document.querySelector('#conversation-header-actions button[data-testid="conversation-options-button"]');
		if (!menuButton) return;

		menuButton.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
		menuButton.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));

		const [deleteBtn, groupDeleteBtn] = await Promise.all([
            waitFor('[data-testid="delete-chat-menu-item"]', 2000, 1),
            waitFor('[data-testid="delete-conversation-confirm-button"]', 2000, 1)
        ]);

        const targetDeleteBtn = deleteBtn || groupDeleteBtn;
        if (!targetDeleteBtn) return;

		targetDeleteBtn.click();

		const [confirmBtn, groupConfirmBtn] = await Promise.all([
            waitFor('[data-testid="delete-conversation-confirm-button"]', 2000, 2),
            waitFor('[data-testid="delete-group-chat-confirm-button"]', 2000, 2)
        ]);

        const targetConfirmBtn = confirmBtn || groupConfirmBtn;
        if (!targetConfirmBtn) return;

        targetConfirmBtn.click();

		if (typeof after === "function") after();
	}

})();
