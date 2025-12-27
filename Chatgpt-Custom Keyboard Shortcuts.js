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

	async function deleteCurrentConversation(after = null) {
		const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

		async function waitFor(selector, timeout = 2000) {
			const start = Date.now();
			while (Date.now() - start < timeout) {
				const el = document.querySelector(selector);
				if (el) return el;
				await sleep(50);
			}
			return null;
		}

		const menuButton = document.querySelector("[data-active] .trailing-pair button");
		if (!menuButton) return;

		menuButton.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
		menuButton.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));

		const deleteBtn = (await waitFor('[data-testid="delete-chat-menu-item"]')) || (await waitFor('[data-color="danger"]'));

		if (!deleteBtn) return;
		deleteBtn.click();

		const confirmBtn = (await waitFor('[data-testid="delete-conversation-confirm-button"]')) || (await waitFor('[data-testid="delete-group-chat-confirm-button"]'));

		if (!confirmBtn) return;
		confirmBtn.click();

		if (typeof after === "function") after();
	}

})();
