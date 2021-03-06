/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var Lib = require('../../lib');
var Color = require('../color');

// defaults common to 'annotations' and 'annotations3d'
module.exports = function handleAnnotationCommonDefaults(annIn, annOut, fullLayout, coerce) {
    coerce('opacity');
    var bgColor = coerce('bgcolor');

    var borderColor = coerce('bordercolor');
    var borderOpacity = Color.opacity(borderColor);

    coerce('borderpad');

    var borderWidth = coerce('borderwidth');
    var showArrow = coerce('showarrow');

    coerce('text', showArrow ? ' ' : 'new text');
    coerce('textangle');
    Lib.coerceFont(coerce, 'font', fullLayout.font);

    coerce('width');
    coerce('align');

    var h = coerce('height');
    if(h) coerce('valign');

    if(showArrow) {
        coerce('arrowcolor', borderOpacity ? annOut.bordercolor : Color.defaultLine);
        coerce('arrowhead');
        coerce('arrowsize');
        coerce('arrowwidth', ((borderOpacity && borderWidth) || 1) * 2);
        coerce('standoff');

    }

    var hoverText = coerce('hovertext');
    var globalHoverLabel = fullLayout.hoverlabel || {};

    if(hoverText) {
        var hoverBG = coerce('hoverlabel.bgcolor', globalHoverLabel.bgcolor ||
            (Color.opacity(bgColor) ? Color.rgb(bgColor) : Color.defaultLine)
        );

        var hoverBorder = coerce('hoverlabel.bordercolor', globalHoverLabel.bordercolor ||
            Color.contrast(hoverBG)
        );

        Lib.coerceFont(coerce, 'hoverlabel.font', {
            family: globalHoverLabel.font.family,
            size: globalHoverLabel.font.size,
            color: globalHoverLabel.font.color || hoverBorder
        });
    }

    coerce('captureevents', !!hoverText);
};
