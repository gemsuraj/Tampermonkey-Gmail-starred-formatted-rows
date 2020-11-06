// ==UserScript==
// @name         Gmail starred formatted rows
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Gmail starred formatted rows
// @author       Suraj Sharma
// @Company      CodeBlock.in
// ==/UserScript==

(function () {
    'use strict';
    setTimeout(function () {
        console.log('running Gmail starred formatted rows ...');

        function init() {
            var script = document.createElement('script');
            script.src = "https://code.jquery.com/jquery-3.3.1.min.js"
            document.body.append(script);

            var css = document.createElement('style');
            css.type = 'text/css';

            /*
            .yO for read mail row
            .zE for unread mail row
            */

            var styles = `
            .gsf-row {
                -webkit-transition: background-color .5s ease;
                -ms-transition: background-color .5s ease;
                transition: background-color .5s ease;
            }
            .gsf-row.green-check:hover {opacity:1;}
            .green-check.yO {background-color', 'rgba(50, 223, 52, .3); opacity: 0.5}
            .green-check td {background-color', 'rgba(50, 223, 52, .05)}
            .blue-star {background-color: rgba(119, 167, 244, .3)}
            .blue-star td {background-color: rgba(119, 167, 244, .05)}
            .purple-question {background-color: rgba(214, 126, 255, .3)}
            .purple-question td {background-color: rgba(214, 126, 255, .05)}
            .red-bang {background-color: rgba(251, 143, 145, .3)}
            .red-bang td {background-color: rgba(251, 143, 145, .05)}
            .no-star {background-color: rgba(224, 199, 54, .3)}
            .no-star td {background-color: rgba(224, 199, 54, .05)}
            `;

            if (css.styleSheet) css.styleSheet.cssText = styles;
            else css.appendChild(document.createTextNode(styles));
            document.body.append(css);

            setInterval(function () {
                runStarRowFormatting();
            }, 2000)
        }


        function runStarRowFormatting() {
            //console.log('running formatter...')
            var table = $('.Cp').find('table.F,.cf,.zt');
            if(!table.is(':visible')) return;

            table.find('tr').each(function (i, row) {
                var starField = $(row).find('.apU.xY > span');
                var stars = {
                    "green-check": ".xd",
                    "red-bang": ".xg",
                    "blue-star": ".xj",
                    "purple-question": ".xf"
                }

                if (!$(row).hasClass('gsf-row')) $(row).addClass('gsf-row');

                //apply stars
                var starsApplied = false;
                for (var star in stars) {
                    //note: 'aqw' class is present when user has hover on the star for action
                    if (starField.is(stars[star]) && !starField.is('aqw')) {
                        if (!$(row).hasClass(star)) {
                            //reset color
                            $(row).removeClass('green-check blue-star purple-question purple-question');
                            $(row).addClass(star);
                        }
                        starsApplied = true;
                    }
                }
                if (!starsApplied && !starField.is('aqw')) $(row).addClass('no-star');
            });

            return true;
        }

        init();
    }, 5000)
})();
