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
                modal: true
            }, o);
        } else {
            $.error('First argument to jqUI.alert not string or object');
        }
        o.buttons = {};
        o.buttons[o.buttonLabel] = function () {
            $(this).dialog('close').dialog('destroy').remove()
        };
        if (typeof c === 'function') {
            o.close = c;
        }
        var d = $('<div>' + o.text + '</div>').dialog(o);
        d.keypress(function () {
            var k = e.which;
            if (k === 32) {
                $(this).dialog('destroy').remove()
            }
        }).dialog('widget').find('button:last').focus();
        return d;
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
                modal: true
            }, o);
        } else {
            $.error('First argument to jqUI.confirm not string or object');
        }
        o.buttons = {};
        o.buttons[o.buttonLabel[0]] = function () {
            r = true;
            $(this).dialog('close').dialog('destroy').remove()
        };
        o.buttons[o.buttonLabel[1]] = function () {
            r = false;
            $(this).dialog('close').dialog('destroy').remove()
        };
        if (typeof c === 'function') {
            o.close = function (e) {
                c(r,e)
            };
        }
        var d = $('<div>' + o.text + '</div>').dialog(o);
        d.keypress(function () {
            var k = e.which;
            if (k === 32) {
                $(this).dialog('destroy').remove()
            }
        }).dialog('widget').find('button:last').focus();
        return d;
    },
    prompt: function () {
        var a = arguments,
            o = a[0],
            r = null,
            c;
        if (typeof o === 'string') {
            o = {
                text: o
            };
        }
        if (typeof o === 'object') {
            o = $.extend({
                title: 'Prompt',
                buttonLabel: ['OK', 'Cancel'],
                modal: true,
                value: ''
            }, o);
            if (typeof o.buttonLabel === 'string') {
                o.buttonLabel = [o.buttonLabel, 'Cancel'];
            }
        } else {
            $.error('First argument to jqUI.prompt not string or object');
        }
        o.buttons = {};
        o.buttons[o.buttonLabel[0]] = function () {
            r = $(this).find('input:last').val();
            $(this).dialog('close').dialog('destroy').remove()
        };
        o.buttons[o.buttonLabel[1]] = function () {
            r = null;
            $(this).dialog('close').dialog('destroy').remove()
        };
        if (typeof a[arguments.length - 1] === 'function') {
            c = a[arguments.length - 1];
            o.close = function (e) {
                c(r,e)
            };
        }
        if (typeof a[1] === 'string') {
            o.value = a[1];
        }
        o.create = function () {
            $(this).find('input:last').select()
        };
        var d = $('<div>' + o.text + '<input type="text" value="' + o.value + '" /></div>').dialog(o);
        d.keypress(function () {
            var k = e.which;
            if (k === 32) {
                $(this).dialog('destroy').remove()
            }
        }).dialog('widget').find('button:last').focus();
        return d;
    }
};
