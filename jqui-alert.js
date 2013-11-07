/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Scimonster
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *
 * This is the full uncompressed development version of jqUI alert. For production,
 * it is recommended to use jqui-alert.min.js from this repo. It was compressed
 * with http://javascript-minifier.com/
*/
var jqUI = {
    alert: function (o, c) {
        if (typeof o === 'string') {
            o = {
                text: o
            };
        }
        if (typeof o === 'object') {
            o = $.extend({
                title: 'Alert Message',
                buttonLabel: 'OK',
                modal: true,
                dialogClass: ''
            }, o);
        } else {
            $.error('First argument to jqUI.alert not string or object');
        }
        o.dialogClass += ' jqui-alert';
        o.buttons = {};
        o.buttons[o.buttonLabel] = function () {
            $(d).dialog('close').dialog('destroy').remove();
        };
        if (typeof c === 'function') {
            o.close = c;
        }
        var d = $('<div' + (o.id?' id="'+o.id+'"':'') + '>' + o.text + '</div>').dialog(o);
        d.keypress(function(e){
            if (e.which === 10) {
                o.buttons[o.buttonLabel]();
            }
        }).dialog('widget').find('button:last').focus();
        return {dialog: d, buttons: [{name: o.buttonLabel, click: o.buttons[o.buttonLabel]}], close: o.buttons[o.buttonLabel]};
    },
    confirm: function (o, c) {
        var r = false;
        if (typeof o === 'string') {
            o = {
                text: o
            };
        }
        if (typeof o === 'object') {
            o = $.extend({
                title: 'Confirm',
                buttonLabel: ['OK', 'Cancel'],
                modal: true,
                dialogClass: ''
            }, o);
        } else {
            $.error('First argument to jqUI.confirm not string or object');
        }
        o.dialogClass += ' jqui-confirm';
        o.buttons = {};
        o.buttons[o.buttonLabel[0]] = function () {
            r = true;
            $(d).dialog('close').dialog('destroy').remove();
        };
        o.buttons[o.buttonLabel[1]] = function () {
            r = false;
            $(d).dialog('close').dialog('destroy').remove();
        };
        if (typeof c === 'function') {
            o.close = function (e) {
                c(r,e)
            };
        }
        var d = $('<div' + (o.id?' id="'+o.id+'"':'') + '>' + o.text + '</div>').dialog(o);
        d.keypress(function(e){
            if (e.which === 10) {
                o.buttons[o.buttonLabel[0]]();
            }
        }).dialog('widget').find('button:last').focus();
        return {dialog: d, buttons: [{name: o.buttonLabel[0], click: o.buttons[o.buttonLabel[0]]}, {name: o.buttonLabel[1], click: o.buttons[o.buttonLabel[1]]}], close: o.buttons[o.buttonLabel[1]]};
    },
    prompt: function () {
        var a = arguments,
            o = a[0],
            r = null;
        a.length = arguments.length;
        if (typeof o === 'string') {
            o = {text: o};
        }
        if (typeof o === 'object') {
            o = $.extend({
                title: 'Prompt',
                buttonLabel: ['OK', 'Cancel'],
                modal: true,
                value: '',
                dialogClass: ''
            }, o);
            if (typeof o.buttonLabel === 'string') {
                o.buttonLabel = [o.buttonLabel, 'Cancel'];
            }
        } else {
            $.error('First argument to jqUI.prompt not string or object');
        }
        o.dialogClass += ' jqui-prompt';
        o.buttons = {};
        o.buttons[o.buttonLabel[0]] = function () {
            r = $(d).find('input:last').val();
            $(d).dialog('close').dialog('destroy').remove();
        };
        o.buttons[o.buttonLabel[1]] = function () {
            $(d).dialog('close').dialog('destroy').remove();
        };
        if (typeof a[a.length - 1] === 'function') {
            o.close = function (e) {
                a[a.length - 1](r,e);
            };
        }
        if (a[1] && typeof a[1] !== 'function') {
            o.value = a[1].toString();
        }
        o.create = function () {
            $(d).find('input:last').select();
        };
        var d = $('<div' + (o.id?' id="'+o.id+'"':'') + '>' + o.text + '<input type="text" value="' + o.value + '" style="width:100%" /></div>').dialog(o);
        d.keypress(function(e){
            if (e.which === 10) {
                $(d).dialog('destroy').remove();
            }
        }).dialog('widget').find('button:last').focus();
        return {dialog: d, buttons: [{name: o.buttonLabel[0], click: o.buttons[o.buttonLabel[0]]}, {name: o.buttonLabel[1], click: o.buttons[o.buttonLabel[1]]}], close: o.buttons[o.buttonLabel[1]], val: function(newtext){
        	if (typeof newtext==="string") {d.find('input').val(newtext)}
        	else if (typeof newtext==="function") {d.find('input').val(newtext(d.find('input').val()))}
        	else {$.error('Argument to jqUI.prompt().val() not string or function')}
        }};
    }
};
