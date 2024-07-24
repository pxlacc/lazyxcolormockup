// ==UserScript==
// @name         X.com Yellow to White Converter with Icon Color Change
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Changes all rgb(255, 212, 0) elements to white with black text on x.com, darkens on hover, and changes icon colors
// @match        https://x.com/*
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const ORIGINAL_COLOR = 'rgb(255, 212, 0)';
    const NEW_COLOR = 'rgb(255, 255, 255)';
    const HOVER_COLOR = 'rgb(230, 230, 230)';
    const TEXT_COLOR = 'rgb(0, 0, 0)';
    const ICON_COLOR = 'rgb(255, 255, 255)';

    function applyStyles(el) {
        el.style.backgroundColor = NEW_COLOR;
        el.style.color = TEXT_COLOR;

        // Change text color of all child elements to black
        const childElements = el.querySelectorAll('*');
        childElements.forEach(child => {
            child.style.color = TEXT_COLOR;
        });

        // Add hover effect
        el.addEventListener('mouseenter', () => {
            el.style.backgroundColor = HOVER_COLOR;
        });
        el.addEventListener('mouseleave', () => {
            el.style.backgroundColor = NEW_COLOR;
        });
    }

    function changeIconColors() {
        const icons = document.querySelectorAll('svg[color="rgba(255,212,0,1)"]');
        icons.forEach(icon => {
            icon.setAttribute('color', ICON_COLOR);
        });
    }

    function changeColors() {
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            const style = window.getComputedStyle(el);
            if (style.backgroundColor === ORIGINAL_COLOR) {
                applyStyles(el);
            }
        });
        changeIconColors();
    }

    // Run on page load
    changeColors();

    // Create a MutationObserver to handle dynamically loaded content
    const observer = new MutationObserver(mutations => {
        changeColors();
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();