// ==UserScript==
// @name         phpMyAdmin custom key bindings
// @namespace    http://tampermonkey.net/
// @version      2026-04-19
// @description  try to take over the world!
// @author       mhs003
// @match        http://localhost:8089/*
// @require      https://gist.githubusercontent.com/mhs003/b62b57463ce0f67b0c24d11a7e943745/raw/5bdb7e761e251816294e6143cc87f01e45802148/handle_key.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.localhost
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    handleKey("Ctrl+r", document, (e) => {
        const nodes = document.querySelector('.tools.d-print-none')?.childNodes;
        const activeMenu = document.querySelector('#topmenu')?.getElementsByClassName('active')[0]?.firstElementChild;
        if(nodes && nodes[nodes.length-2]?.textContent === 'Refresh') {
            e.preventDefault();
            nodes[nodes.length-2].click();
        } else if (activeMenu) {
            e.preventDefault();
            activeMenu.classList.remove('disableAjax');
            activeMenu.click();
        }
    });

    handleKey("Alt+t", document, (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    });
    handleKey("Alt+b", document, (e) => {
        e.preventDefault();
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            left: document.documentElement.scrollWidth,
            behavior: 'smooth'
        });
    });

    handleKey("Ctrl+Alt+ArrowLeft", document, () => {
       window.scrollTo({
           left: 0,
           behavior: 'smooth'
       });
    });
    handleKey("Ctrl+Alt+ArrowRight", document, () => {
       window.scrollTo({
           left: document.documentElement.scrollWidth,
           behavior: 'smooth'
       });
    });
    handleKey("Ctrl+Alt+ArrowUp", document, () => {
       window.scrollTo({
           top: 0,
           behavior: 'smooth'
       });
    });
    handleKey("Ctrl+Alt+ArrowDown", document, () => {
       window.scrollTo({
           top: document.documentElement.scrollHeight,
           behavior: 'smooth'
       });
    });

    handleKey("Ctrl+/", document, (e) => {
        e.preventDefault();
        const filterText = document.querySelector('#filterText');
        const sclause2 = document.querySelector('[name="searchClause2"]');
        const tsearchi = document.querySelector('[placeholder="Search this table"]');
        const currentFocused = document.activeElement;

        if(filterText && currentFocused != filterText) {
            filterText.focus();
        } else if(sclause2 && currentFocused != sclause2) {
            sclause2.focus();
        } else if(tsearchi && currentFocused != tsearchi) {
            tsearchi.focus();
        }
    });


    handleKey('Ctrl+e', document, (e) => {
        const el = document.querySelector('.inline_edit_sql');
        if(el){
            e.preventDefault();
            el.click();
        }
    })

    handleKey('Ctrl+j', document, (e) => {
        const consoleToggleBtn = document.querySelector('.switch_button.console_switch');
        if(consoleToggleBtn) {
            e.preventDefault();
            consoleToggleBtn.click();
        }
    });


    handleKey('Alt+p', document, (e) => {
        const profilingCheckbox = document.querySelector('#profilingCheckbox');
        if(!profilingCheckbox) return;
        e.preventDefault();
        profilingCheckbox.closest('form').classList.remove('disableAjax');
        profilingCheckbox.click();
    });


    handleKey('Ctrl+a', document, async (e) => {
        if(['INPUT'].includes(document.activeElement.tagName)) {
            if(document.activeElement.attributes.class.value === 'multi_checkbox checkall') {
                e.preventDefault();
                let allChecked = true;
                document.querySelectorAll('.multi_checkbox.checkall').forEach(function(X) {
                    if(!X.checked) {
                        allChecked = false;
                        X.click();
                    }
                });
                if(allChecked) {
                    document.querySelector('.checkall_box').click();
                }
            }
        }
    });

    handleKey('Ctrl+Alt+a', document, async (e) => {
        const elm = document.querySelector('.showAllRows');
        if(!elm) return;
        e.preventDefault();
        elm.click();
        await sleep(10);
        document.querySelector('.submitOK')?.click();
    });

})();
