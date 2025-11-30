// ==UserScript==
// @name         Chatgpt Fast Scroll
// @namespace    http://tampermonkey.net/
// @version      2025-11-30
// @description  try to take over the world!
// @author       Monzurul Hasan
// @match        https://chatgpt.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let altPressed = false;
    const fastSpeed = 1500;

    function fastSmoothScroll(element, delta, duration = 120) {
        const start = element.scrollTop;
        const target = start + delta;
        const diff = target - start;
        const startTime = performance.now();

        function step(now) {
            const t = Math.min((now - startTime) / duration, 1);
            element.scrollTop = start + diff * t;
            if (t < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    window.addEventListener('keydown', (e) => {
        if (e.altKey) altPressed = true;
    });

    window.addEventListener('keyup', (e) => {
        if (!e.altKey) altPressed = false;
    });

    window.addEventListener('wheel', (e) => {
        if (altPressed) {
            const el = document.querySelector('[class="flex h-full flex-col overflow-y-auto thread-xl:pt-(--header-height) [scrollbar-gutter:stable_both-edges]"]');
            e.preventDefault();
            const dir = e.deltaY > 0 ? fastSpeed : -fastSpeed;
            fastSmoothScroll(el, dir);
        }
    }, { passive: false });

})();

