// ==UserScript==
// @name           Remove YT Clutter
// @namespace      http://example.org
// @description    Removes youtube unnecessary buttons
// @version        1.0.0
// @author         weyh
// @match          https://www.youtube.com/*
// @match          https://www.youtube.com
// @grant          none
// @run-at         document-end
// ==/UserScript==

(function () {
    'use strict';
    const itemsToHide = ["Shorts", "Library", "Your videos", "Explore"];
    const cssId = "GM_addStyleByweyh";

    const GM_addStyle = (css) => {
        const style = document.getElementById(cssId) || (function () {
            const style = document.createElement('style');
            style.type = 'text/css';
            style.id = cssId;
            document.head.appendChild(style);
            return style;
        })();
        const sheet = style.sheet;
        sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
    }

    const clickFunc = () => {
        setTimeout(() => {
            if (document.querySelector("a[title='Show more']") == null) {
                clickFunc();
            } else {
                document.querySelector("a[title='Show more']").click();
            }
        }, 300);
    }

    for (const item of itemsToHide) {
        GM_addStyle(`ytd-guide-entry-renderer a[title="${item}"] { display: none !important; }`);
        GM_addStyle(`ytd-mini-guide-entry-renderer a[title="${item}"] { display: none !important; }`);
    }

    // open all playlists
    clickFunc();
})();
