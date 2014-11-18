/* OneAll | Base | Compiled Tue, 11 Nov 2014 11:36:57 +0100 | Version 5.2]*/
(function() {
    var a = !1,
        b = /xyz/.test(function() {
            xyz
        }) ? /\b_super\b/ : /.*/;
    this.oa_class = function() {};
    oa_class.extend = function(c) {
        function d() {
            !a && this.init && this.init.apply(this, arguments)
        }
        var e, f, g;
        e = this.prototype;
        a = !0;
        f = new this;
        a = !1;
        for (g in c) c.hasOwnProperty(g) && (f[g] = "function" === typeof c[g] && "function" === typeof e[g] && b.test(c[g]) ? function(a, b) {
            return function() {
                var c, d;
                c = this._super;
                this._super = e[a];
                d = b.apply(this, arguments);
                this._super = c;
                return d
            }
        }(g, c[g]) : c[g]);
        d.prototype = f;
        d.prototype.constructor =
            d;
        d.extend = arguments.callee;
        return d
    }
})();
Array.prototype.indexOf || (Array.prototype.indexOf = function(a) {
    var b;
    for (b = 0; b < this.length; b += 1)
        if (this[b] === a) return b;
    return -1
});
var oneall = {
    cfg: {
        base_domain: null,
        is_valid_base_domain: !1,
        included_files: [],
        can_trigger_cancel: !1
    }
};
oneall.cfg.app = {
    protocol: "https",
    language: "en",
    domain: "cityzen.api.oneall.com",
    whitelisted_domains: ["cityzenapp.us", "*.cityzenapp.us", "southerngatewaystudy.com", "*.southerngatewaystudy.com", "localhost", "*.ionicframework.com", "ionicframework.com", "*.example.com", "example.com"],
    is_suspended: !1,
    has_plan_ajs: !0,
    has_plan_sso: !0
};
oneall.cfg.get_uri = function(a) {
    var b = this.app.protocol + "://" + this.app.domain;
    switch (a) {
        case "provider_connect":
            return b + "/socialize/connect.html";
        case "provider_connect_raw":
            return b + "/socialize/connect/raw/";
        case "provider_login_data_frame":
            return b + "/socialize/login/data/frame/";
        case "provider_login_frame":
            return b + "/socialize/login/frame/";
        case "provider_login_modal":
            return b + "/socialize/login/modal/";
        case "provider_link_frame":
            return b +
                "/socialize/link/frame/";
        case "provider_link_idm_modal":
            return b + "/socialize/link/idm/modal/";
        case "provider_redirect":
            return b + "/socialize/redirect.html";
        case "sharing_library":
            return b + "/socialize/sharing/library.js";
        case "sharing_bookmark":
            return b + "/socialize/sharing/bookmark/";
        case "sharing_counters":
            return b + "/socialize/sharing/counters.js";
        case "sso_library":
            return b + "/socialize/sso/library.js";
        case "sso_connect":
            return b +
                "/socialize/sso/connect/"
    }
    return b
};
(function() {
    var a, b, c, d, e;
    a = oneall.cfg.app.whitelisted_domains;
    c = document.domain;
    a.push(oneall.cfg.app.domain);
    for (e = 0; !0 !== d && e < a.length;) b = a[e], b == c ? d = !0 : (b = b.split("?").join(""), b = b.split("$").join(""), b = b.split(".").join("\\."), b = b.split("*").join("(.*)"), b = new RegExp("^" + b, "i"), c.match(b) && (d = !0)), e += 1;
    !0 === d && (oneall.cfg.is_valid_base_domain = !0, oneall.cfg.base_domain = c)
})();
oneall.loader = {};
oneall.loader.add_event = function(a) {
    var b = window.onload;
    window.onload = "function" !== typeof b ? function() {
        a()
    } : function() {
        b();
        a()
    }
};
oneall.browser = function(a) {
    var b = a.userAgent.toLowerCase();
    a = a.appVersion ? a.appVersion.toLowerCase() : "";
    var c = {
        is_mobile: false
    };
    c.is_back_compat = "BackCompat" === document.compatMode;
    c.is_win = -1 !== a.indexOf("win");
    c.is_ie = -1 !== a.indexOf("msie");
    c.is_ie_quirks = c.is_back_compat && c.is_ie;
    c.is_ie6 = -1 !== a.indexOf("msie 6.");
    c.is_ie7 = -1 !== a.indexOf("msie 7.");
    c.is_ie8 = -1 !== a.indexOf("msie 8.");
    c.is_ie9 = -1 !== a.indexOf("msie 9.");
    c.is_ie10 = -1 !== a.indexOf("msie 10.");
    c.is_chrome = -1 !== b.indexOf("chrome");
    c.is_firefox = -1 !== b.indexOf("firefox");
    c.is_steam = -1 !== b.indexOf("valve steam");
    c.is_opera = -1 !== b.indexOf("opera");
    c.is_safari = -1 !== a.indexOf("safari") && -1 === a.indexOf("chrome");
    c.is_mac = -1 !== a.indexOf("mac") ? !0 : !1;
    return c
}(navigator);
oneall.console = {};
oneall.console.log = function() {
    0 < arguments.length && "undefined" !== typeof console && console.log("[OneAll] ", arguments)
};
oneall.xd = {
    cache_bust: 1,
    interval_id: null,
    last_hash: ""
};
oneall.xd.postMessage = function(a, b, c) {
    b && (c = c || parent, window.postMessage ? c.postMessage(a, b.replace(/([^:]+:\/\/[^\/]+).*/, "$1")) : b && (c.location = b.replace(/#.*$/, "") + "#" + +new Date + this.cache_bust++ +"&" + a))
};
oneall.xd.receiveMessage = function(a, b) {
    if (window.postMessage) {
        var c;
        a && (c = function(c) {
            if ("string" === typeof b && c.origin !== b || "[object Function]" === Object.prototype.toString.call(b) && !1 === b(c.origin)) return !1;
            a(c)
        });
        if (window.addEventListener) window[a ? "addEventListener" : "removeEventListener"]("message", c, !1);
        else window[a ? "attachEvent" : "detachEvent"]("onmessage", c)
    } else this.interval_id && clearInterval(this.interval_id), this.interval_id = null, a && (this.interval_id = setInterval(function() {
        var b = document.location.hash,
            c = /^#?\d+&/;
        b !== this.last_hash && c.test(b) && (this.last_hash = b, a({
            data: b.replace(c, "")
        }))
    }, 100))
};
oneall.tools = {};
oneall.tools.oak = {};
oneall.tools.oak.encrypt = function(a, b) {
    var c, d, e, f, g, l;
    a = "oak" + a;
    g = [];
    for (c = 0; 256 > c; c += 1) g[c] = c;
    for (c = d = 0; 256 > c; c += 1) d = (d + g[c] + a.charCodeAt(c % a.length)) % 256, e = g[c], g[c] = g[d], g[d] = e;
    d = c = 0;
    l = "";
    for (f = 0; f < b.length; f += 1) c = (c + 1) % 256, d = (d + g[c]) % 256, e = g[c], g[c] = g[d], g[d] = e, l += String.fromCharCode(b.charCodeAt(f) ^ g[(g[c] + g[d]) % 256]);
    e = [];
    for (c = 0; 256 > c; c += 1) e[c] = "0123456789abcdef".charAt(c >> 4) + "0123456789abcdef".charAt(c & 15);
    d = [];
    for (c = 0; c < l.length; c += 1) d[c] = e[l.charCodeAt(c)];
    return d.join("")
};
var JSON = JSON || {};
oneall.tools.json_parse = JSON.parse || function(a) {
    return (new Function("return " + a))()
};
oneall.tools.json_escape_string = function(a) {
    var b, c, d = [
        [/\\/g, "\\\\"],
        [/\t/g, "\\t"],
        [/\n/g, "\\n"],
        [/\f/g, "\\f"],
        [/\r/g, "\\r"],
        [/\"/g, '\\"'],
        [/\x08/g, "\\b"],
        [/\x09/g, "\\t"],
        [/\x0a/g, "\\n"],
        [/\x0c/g, "\\f"],
        [/\x0d/g, "\\r"]
    ];
    for (c = 0; c < d.length; c += 1) b = d[c], a = a.replace(b[0], b[1]);
    return a = a.replace(/[\x00-\x07\x0b\x0e-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, function(a) {
        return "\\u" + ("0000" + (+a.charCodeAt(0)).toString(16)).slice(-4)
    })
};
oneall.tools.json_stringify = function(a) {
    var b, c, d, e;
    if (null === a || "object" !== typeof a) return "string" === typeof a && (a = '"' + this.json_escape_string(a) + '"'), String(a);
    d = [];
    e = a && a.constructor === Array;
    for (b in a)
        if (a.hasOwnProperty(b)) {
            c = a[b];
            if ("string" === typeof c || "object" === typeof c && null !== c) c = this.json_stringify(c);
            d.push((e ? "" : '"' + this.json_escape_string(b) + '":') + String(c))
        }
    return (e ? "[" : "{") + String(d) + (e ? "]" : "}")
};
oneall.tools.get_elements_by_class_name = function(a, b) {
    var c, d, e, f, g;
    "undefined" === typeof b && (b = document.getElementsByTagName("body")[0]);
    f = [];
    e = new RegExp("\\b" + a + "\\b");
    g = b.getElementsByTagName("*");
    d = g.length;
    for (c = 0; c < d; c += 1) e.test(g[c].className) && f.push(g[c]);
    return f
};
oneall.tools.is_obj = function(a) {
    return null !== a && "object" === typeof a
};
oneall.tools.str_replace = function(a, b, c) {
    return a.split(b).join(c)
};
oneall.tools.remove_element_by_id = function(a) {
    (a = document.getElementById(a)) && a.parentNode.removeChild(a)
};
oneall.tools.hide_element_by_id = function(a) {
    if (a = document.getElementById(a)) a.style.display = "none"
};
oneall.tools.show_element_by_id = function(a) {
    if (a = document.getElementById(a)) oneall.browser && oneall.browser.is_ie6 ? "td" === a.tagName.toLowerCase() ? a.style.display = "table-cell" : "tr" === a.tagName.toLowerCase() || "table" === a.tagName.toLowerCase() ? a.style.display = "" : a.style.display = "block" : a.style.display = "block"
};
oneall.tools.remove_element_class = function(a, b) {
    var c;
    this.has_element_class(a, b) && (c = new RegExp("(\\s|^)" + b + "(\\s|$)"), a.className = a.className.replace(c, " "))
};
oneall.tools.add_element_class = function(a, b) {
    var c;
    b = b.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
    0 < b.length && !this.has_element_class(a, b) && (c = a.className, c = c.replace(/^\s\s*/, "").replace(/\s\s*$/, ""), 0 < c.length && (b = c + " " + b), a.className = b)
};
oneall.tools.has_element_class = function(a, b) {
    return a.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"))
};
oneall.tools.include_file = function(a, b, c, d) {
    var e, f;
    e = !1;
    c = "undefined" === typeof c || !0 === c;
    if ("js" == b || "css" == b) !0 === c ? -1 == oneall.cfg.included_files.indexOf("[" + a + "]") && (e = !0) : e = !0;
    !0 === e && ("js" == b ? (f = document.createElement("script"), f.setAttribute("type", "text/javascript"), f.setAttribute("src", a)) : "css" == b && (f = document.createElement("link"), f.setAttribute("rel", "stylesheet"), f.setAttribute("type", "text/css"), f.setAttribute("href", a)), "undefined" !== typeof d && f.appendChild(document.createTextNode(d)),
        document.getElementsByTagName("head")[0].appendChild(f), oneall.cfg.included_files.push("[" + a + "]"));
    return e
};
oneall.tools.create_iframe = function(a, b) {
    var c, d, e, f, g, l, k, n, m, h;
    d = "undefined" !== typeof b.name ? b.name : "oa_frame_" + Math.floor(1E3 * Math.random() + 1);
    e = "undefined" !== typeof b.id ? b.id : "oa_frame_" + Math.floor(1E3 * Math.random() + 1);
    f = "undefined" !== typeof b.border ? b.border : "0px";
    m = "undefined" !== typeof b.background_color ? b.background_color : "transparent";
    g = "undefined" !== typeof b.width ? b.width : "100%";
    l = "undefined" !== typeof b.height ? b.height : "100px";
    k = "undefined" !== typeof b.src ? b.src : "about:blank";
    n = "undefined" !==
        typeof b.async ? b.async : !1;
    k = k + "&lang=" + oneall.cfg.app.language;
    try {
        h = document.createElement("iframe"), h.setAttribute("id", e), h.setAttribute("frameBorder", "0"), h.setAttribute("scrolling", "no"), h.setAttribute("allowTransparency", "true"), h.setAttribute("data-processed", "false"), h = a.appendChild(h), h.name = d, h.style.border = f, h.style.width = g, h.style.height = l, h.style.backgroundColor = m, !0 === n ? (h.src = "about:blank", c = h.contentWindow.document, c.open().write("<body onload=\"var f=function(a){window.location.replace(a);};f('" +
            k + "');\">"), c.close()) : h.src = k
    } catch (s) {
        a.innerHTML += '<iframe frameBorder="0" scrolling="no" allowTransparency="true" id="' + e + '" style="background-color:' + m + ";border:" + f + ";width:" + g + ";height:" + l + ";</iframe>", c = void 0, c = {
            location: {}
        }, c.location.iframe = document.getElementById(e), c.location.replace = function(a) {
            this.iframe.src = a
        }
    }
    return h
};
oneall.tools.get_window_center_position = function(a, b) {
    var c, d, e;
    oneall.browser.is_ie ? (c = window.screenLeft, d = "undefined" !== typeof screen.availWidth ? screen.availWidth : screen.width, e = "undefined" !== typeof screen.availHeight ? screen.availHeight : screen.height) : (c = "undefined" !== typeof window.screenX ? window.screenX : window.screenLeft, d = "undefined" !== typeof window.outerWidth ? window.outerWidth : document.documentElement.clientWidth, e = "undefined" !== typeof window.outerHeight ? window.outerHeight : document.documentElement.clientHeight -
        22);
    c = parseInt(c + d / 2 - a / 2, 10);
    e = parseInt(0 + (e - b) / 2.5, 10);
    return "left=" + c + ",top=" + e
};
oneall.tools.open_window = function(a, b, c) {
    var d, e;
    "undefined" === typeof c && (c = "menubar=0,toolbar=0,resizable=1,width=960,height=680");
    d = c.split("width=")[1].split(",")[0];
    e = c.split("height=")[1].split(",")[0];
    c = c + "," + this.get_window_center_position(d, e);
    if ((a = window.open(a, b, c)) && a.focus) return a.focus(), a
};
oneall.tools.cookie = {};
oneall.tools.cookie.read = function(a) {
    var b, c, d, e;
    if (!oneall.cfg.cookies) {
        c = document.cookie.split("; ");
        e = {};
        for (b = c.length - 1; 0 <= b; b--) d = c[b].split("="), e[d[0]] = d[1];
        oneall.cfg.cookies = e
    }
    return oneall.cfg.cookies[a]
};
oneall.api = {};
oneall.api.providers = {};
oneall.api.providers.get_provider_by_key = function(a, b) {
    var c;
    "undefined" === typeof b && (b = oneall.api.providers.list);
    for (c = 0; c < b.length; c += 1)
        if (b[c].key.toLowerCase() === a.toLowerCase()) return b[c];
    return !1
};
oneall.api.providers.get_providers_by_keys = function(a, b) {
    var c, d, e, f;
    e = [];
    for (c = d = 0; c < a.length; c += 1)
        if (f = oneall.api.providers.get_provider_by_key(a[c])) e[d] = f, d += 1;
    return e
};
oneall.api.providers.get_sanitized_providerids = function(a, b) {
    var c, d, e, f;
    e = [];
    if (0 < a.length && (f = oneall.api.providers.get_providers_by_ids(a), 0 < f.length))
        for (c = d = 0; c < f.length; c += 1) e[d] = f[c].id, d += 1;
    return e
};
oneall.api.providers.get_providerids_by_keys = function(a, b) {
    var c, d, e, f;
    "undefined" === typeof b && (b = oneall.api.providers.list);
    e = this.get_providers_by_keys(a, b);
    f = [];
    if (0 < e.length)
        for (c = d = 0; c < e.length; c += 1) f[d] = e[c].id, d += 1;
    return f
};
oneall.api.providers.get_provider_by_id = function(a, b) {
    var c;
    a = parseInt(a, 10);
    "undefined" === typeof b && (b = oneall.api.providers.list);
    for (c = 0; c < b.length; c += 1)
        if (b[c].id === a) return b[c];
    return !1
};
oneall.api.providers.get_providers_by_ids = function(a, b) {
    var c, d, e, f;
    e = [];
    if (0 < a.length)
        for (c = d = 0; c < a.length; c += 1)
            if (f = oneall.api.providers.get_provider_by_id(a[c])) e[d] = f, d += 1;
    return e
};
oneall.api.providers.get_all_providers = function() {
    return oneall.api.providers.list.concat()
};
oneall.api.providers.provider = function(a, b, c, d, e, f, g) {
    this.id = a;
    this.key = d;
    this.name = b;
    this.name_short = c;
    this.is_login_data_required = "1" == e ? !0 : !1;
    this.popup_width = f;
    this.popup_height = g;
    this.popup_options = "menubar=0,toolbar=0,resizable=1,scrollbars=1,width=" + f + ",height=" + g;
    this.toString = function() {
        return this.name
    }
};
oneall.api.providers.list = [new oneall.api.providers.provider(58, "Amazon", "Amazon", "amazon", "0", 710, 600), new oneall.api.providers.provider(18, "Blogger", "Blogger", "blogger", "1", 760, 400), new oneall.api.providers.provider(40, "Disqus", "Disqus", "disqus", "0", 648, 573), new oneall.api.providers.provider(1, "Facebook", "Facebook", "facebook", "0", 580, 400), new oneall.api.providers.provider(30, "Foursquare", "Foursquare", "foursquare", "0", 975, 600), new oneall.api.providers.provider(38, "Github.com", "Github", "github", "0", 980, 580), new oneall.api.providers.provider(2, "Google", "Google", "google", "0", 540, 470), new oneall.api.providers.provider(60, "Instagram", "Instagram", "instagram", "0", 710, 600), new oneall.api.providers.provider(10, "LinkedIn", "LinkedIn", "linkedin", "0", 520, 660), new oneall.api.providers.provider(22, "LiveJournal", "LiveJournal", "livejournal", "1", 860, 500), new oneall.api.providers.provider(34, "Mail.ru", "Mail.ru", "mailru", "1", 980, 560), new oneall.api.providers.provider(44, "Odnoklassniki", "Odnoklassniki", "odnoklassniki", "0", 674, 792), new oneall.api.providers.provider(6, "OpenID", "OpenID", "openid", "1", 730, 590), new oneall.api.providers.provider(4, "PayPal", "PayPal", "paypal", "0", 640, 580), new oneall.api.providers.provider(54, "Reddit", "reddit", "reddit", "0", 980, 640), new oneall.api.providers.provider(36, "Skyrock.com", "Skyrock", "skyrock", "0", 996, 470), new oneall.api.providers.provider(32, "StackExchange", "StackExchange", "stackexchange", "0", 965, 545), new oneall.api.providers.provider(14, "Steam", "Steam", "steam", "0", 985, 820), new oneall.api.providers.provider(52, "Twitch.tv", "Twitch", "twitch", "0", 500, 700), new oneall.api.providers.provider(3, "Twitter", "Twitter", "twitter", "0", 674, 792), new oneall.api.providers.provider(56, "Vimeo", "vimeo", "vimeo", "0", 975, 600), new oneall.api.providers.provider(31, "VKontakte", "VKontakte", "vkontakte", "0", 674, 792), new oneall.api.providers.provider(7, "Windows Live", "Live", "windowslive", "0", 800, 550), new oneall.api.providers.provider(12, "WordPress.com", "WordPress", "wordpress", "1", 790, 570), new oneall.api.providers.provider(5, "Yahoo", "Yahoo", "yahoo", "0", 500, 560), new oneall.api.providers.provider(42, "YouTube", "YouTube", "youtube", "0", 674, 792)];
oneall.api.plugins = {};
var oa_social_abstract = oa_class.extend({
        init: function(a, b) {
            b = "undefined" !== typeof b ? b : {};
            this.parent_uri = "undefined" !== typeof b.parent_uri ? b.parent_uri : document.location.href;
            this.callback_uri = "undefined" !== typeof b.callback_uri ? b.callback_uri : "";
            this.css_theme_uri = "undefined" !== typeof b.css_theme_uri ? b.css_theme_uri : "";
            this.demo = "undefined" !== typeof b.demo && !0 === b.demo ? !0 : !1;
            this.force_reauth = "undefined" !== typeof b.force_reauth && !0 === b.force_reauth ? !0 : !1;
            this.disable_popups = "undefined" !== typeof b.same_window ?
                b.same_window : null;
            this.use_modal_dialog = "undefined" !== typeof b.modal && !0 === b.modal ? !0 : !1;
            this.disable_popups = "undefined" !== typeof b.disable_popups ? b.disable_popups : this.disable_popups;
            this.use_modal_dialog = "undefined" !== typeof b.use_modal_dialog && !0 === b.use_modal_dialog ? !0 : this.use_modal_dialog;
            this.grid_size_x = "undefined" === typeof b.grid_size_x || isNaN(parseInt(b.grid_size_x, 10)) ? 99 : parseInt(b.grid_size_x, 10);
            this.grid_size_y = "undefined" === typeof b.grid_size_y || isNaN(parseInt(b.grid_size_y, 10)) ?
                99 : parseInt(b.grid_size_y, 10);
            this.id = "undefined" !== typeof b.id ? b.id : 1E4 + Math.floor(99999 * Math.random() + 1);
            this.providers = "object" === typeof b.providers && b.providers.length ? b.providers : oneall.api.providers.get_all_providers();
            this.providers_scope = "object" === typeof b.providers_scope ? b.providers_scope : {};
            this.linked_providers = "object" === typeof b.provider_application_identities ? b.provider_application_identities : [];
            this.events = "object" === typeof b.events ? b.events : {};
            this.pluginkey = a;
            this.location = "";
            this.args =
                "object" === typeof this.args ? this.args : {};
            this.args.id = this.id;
            this.args.parent_uri = this.parent_uri;
            this.args.callback_uri = this.callback_uri;
            this.args.css_theme_uri = this.css_theme_uri;
            this.args.use_modal_dialog = this.use_modal_dialog;
            this.args.force_reauth = this.force_reauth;
            this.args.disable_popups = this.disable_popups;
            this.args.demo = this.demo;
            this.args.pluginkey = this.pluginkey;
            this.args.linked_providers = this.linked_providers;
            this.args.grid_size_x = this.grid_size_x;
            this.args.grid_size_y = this.grid_size_y;
            this.args.providers = this.providers;
            this.args.providers_scope = this.providers_scope
        },
        open_modal: function() {
            var a = this;
            a.open_login_modal_dialog();
            oneall.xd.receiveMessage(function(b) {
                a.xd_listener(b)
            }, oneall.cfg.get_uri("application"))
        },
        build: function(a, b) {
            var c, d, e, f, g, l, k;
            g = this.args;
            g.parent_uri = encodeURIComponent(g.parent_uri);
            g.callback_uri = encodeURIComponent(g.callback_uri);
            g = oneall.tools.json_stringify(g);
            f = document.getElementById(b);
            f = null !== f && "object" === typeof f ? [f] : oneall.tools.get_elements_by_class_name(b);
            if (null !== f && "object" === typeof f) {
                if (!0 === oneall.cfg.app.is_suspended || !1 === oneall.cfg.is_valid_base_domain) {
                    !0 === oneall.cfg.app.is_suspended ? (c = "The application <strong>" + oneall.cfg.app.domain + '</strong> has been suspended. Please <a style="color:#333!important;text-decoration: underline;" target="_blank" href="https://app.oneall.com/applications/application/?applicationid=214902">open your application settings</a> to discover how to fix this issue.', g = "This application has been suspended and is currently not available. Please check your OneAll site settings.") :
                        (c = 'To enforce the security of our services we require each domain to be whitelisted. Please <a style="color:#333;text-decoration: underline;" target="_blank" href="https://app.oneall.com/applications/application/settings/security/?applicationid=214902">click here to open your security settings</a> and whitelist the domain <strong>' + document.domain + "</strong>. Reload this page afterwards.", g = "The domain " + document.domain + " is not allowed to include this script. Please check your OneAll site security settings.");
                    for (d = 0; d < f.length; d += 1) e = f[d], e.style.cssText = "visibility: visible;background-color:#efdfdf;color:#B80C14;padding:10px;line-height:16px;font-size:11px;border: 1px dashed #B80C14;display:block", e.innerHTML = "<strong>[OneAll]</strong> " + c;
                    throw Error('"[OneAll Social API] ' + g);
                }
                for (d = 0; d < f.length; d += 1) {
                    e = f[d];
                    !0 !== this.use_modal_dialog ? (c = oneall.tools.oak.encrypt(this.id, g), e.innerHTML = "", oneall.tools.create_iframe(e, {
                        id: "oa_" + this.pluginkey + "_frame_" + this.id,
                        name: "OneAll Social Login",
                        width: "100%",
                        height: "0",
                        async: !1,
                        src: a + "?oakk=" + this.id + "&oakv=" + c
                    })) : (e.style.cursor = "pointer", k = function(a) {
                        return function() {
                            a.open_login_modal_dialog()
                        }
                    }(this), l = e.onclick, e.onclick = "function" !== typeof l ? function() {
                        k();
                        return !1
                    } : function() {
                        l();
                        k();
                        return !1
                    });
                    var n = this;
                    oneall.xd.receiveMessage(function(a) {
                        n.xd_listener(a)
                    }, oneall.cfg.get_uri("application"))
                }
            } else throw Error("[OneAll] No plugin container with the id/class [" + f + "] has been found");
        },
        show_providers_in_container: function(a) {
            var b, c, d, e, f, g, l,
                k, n, m, h, s, p, q, r, t;
            t = oneall.api.providers.get_providers_by_keys(this.providers);
            if (r = document.getElementById(a)) {
                e = this.grid_size_x * this.grid_size_y;
                f = 0;
                l = this.grid_size_x;
                k = 0;
                c = 1;
                d = document.createElement("div");
                d.className = "providers_group";
                d.setAttribute("id", "providers_group_" + c);
                n = document.createElement("div");
                n.className = "providers_block";
                g = document.createElement("div");
                g.className = "providers_row";
                for (a = 0; a < t.length; a += 1) m = t[a], b = function(a, b) {
                    return function() {
                        var c = this.parentNode.getAttribute("data-click"),
                            d = (new Date).getTime(),
                            e = !0;
                        "undefined" !== typeof c && d >= c && 2E3 > d - c && (e = !1);
                        return e ? (this.parentNode.setAttribute("data-click", d), a.do_provider_login(b), !0) : !1
                    }
                }(this, m.id), h = document.createElement("div"), h.className = "object" === typeof this.linked_providers[m.key] ? "provider provider_linked" : "provider", h.setAttribute("id", "provider_" + m.key), p = document.createElement("a"), p.className = "button", p.setAttribute("id", "button_" + m.key), p.setAttribute("href", "#"), p.setAttribute("rel", "nofollow"), p.onclick = b, p.setAttribute("title",
                    "Login with " + m.name), p.setAttribute("alt", "Login with " + m.name), s = document.createElement("span"), s.className = "tick", q = document.createElement("div"), q.className = "name", q.setAttribute("id", "name_" + m.key), q.onclick = b, q.appendChild(document.createTextNode(m.name_short)), p.appendChild(s), h.appendChild(p), h.appendChild(q), g.appendChild(h), f += 1, k += 1, n.appendChild(g), k === l && (g = document.createElement("div"), g.className = "providers_row", k = 0), f === e ? (d.appendChild(n), n = document.createElement("div"),
                    n.className = "providers_block", a + 1 < t.length && (f = document.createElement("div"), f.className = "scroll scroll_right", f.onclick = function(a, b, c) {
                        return function() {
                            a.paginate_provider_group(b, c)
                        }
                    }(this, c, "right"), b = document.createElement("div"), f.appendChild(b), d.appendChild(f), r.appendChild(d), c += 1, d = document.createElement("div"), d.className = "providers_group hidden", d.setAttribute("id", "providers_group_" + c), f = document.createElement("div"), f.className = "scroll scroll_left", f.onclick = function(a, b, c) {
                        return function() {
                            a.paginate_provider_group(b,
                                c)
                        }
                    }(this, c, "left"), b = document.createElement("div"), f.appendChild(b), d.appendChild(f), k = f = 0)) : r.appendChild(d);
                if (0 < k || 0 < f) d.appendChild(n), r.appendChild(d);
                1 === c && (r.className = "providers_unpaginated")
            } else throw Error("[OneAll] The provider container with the id [" + r + "] has not been found");
        },
        paginate_provider_group: function(a, b) {
            oneall.tools.hide_element_by_id("providers_group_" + a);
            oneall.tools.show_element_by_id("providers_group_" + (a + ("right" === b ? 1 : -1)))
        },
        show_message: function(a, b, c) {
            var d = document.getElementById("message");
            d && ("error" === b ? (oneall.tools.remove_element_class(d, "notice"), oneall.tools.add_element_class(d, "error")) : (oneall.tools.remove_element_class(d, "error"), oneall.tools.add_element_class(d, "notice")), "undefined" !== typeof c ? d.setAttribute("data-key", c) : d.removeAttribute("data-key"), d.innerHTML = "", d.appendChild(document.createTextNode(a)), oneall.tools.hide_element_by_id("branding"), oneall.tools.show_element_by_id("message"))
        },
        hide_message: function(a) {
            var b = document.getElementById("message");
            !b || "undefined" !==
                typeof a && a !== b.getAttribute("data-key") || (oneall.tools.hide_element_by_id("message"), oneall.tools.show_element_by_id("branding"))
        },
        open_dialog: function(a, b) {
            var c;
            c = document.createElement("div");
            c.setAttribute("id", "oa_" + this.pluginkey + "_" + a + "_overlay_" + this.id);
            c.style.position = "fixed";
            c.style.left = "0";
            c.style.top = "0";
            c.style.width = "100%";
            c.style.height = "100%";
            c.style.textAlign = "center";
            c.style.overflow = "auto";
            c.style.zIndex = "2147483640";
            c.style.backgroundImage = "url('https://secure.oneallcdn.com/img/api/socialize/gui/overlay.png')";
            c.style.backgroundRepeat = "repeat";
            c.style.backgroundPosition = "0 0";
            c.style.backgroundColor = "transparent";
            document.body.appendChild(c);
            c = document.createElement("div");
            c.setAttribute("id", "oa_" + this.pluginkey + "_" + a + "_dialog_" + this.id);
            c.style.marginLeft = "-240px";
            c.style.position = "fixed";
            c.style.left = "50%";
            c.style.top = "15%";
            c.style.width = "480px";
            c.style.textAlign = "left";
            c.style.zIndex = "2147483641";
            oneall.tools.create_iframe(c, {
                id: "oa_" + this.pluginkey + "_" + a + "_dialog_" + this.id,
                name: "SocialLogin",
                width: "480px",
                height: "480px",
                src: b
            });
            document.body.appendChild(c)
        },
        close_dialog: function(a) {
            oneall.tools.remove_element_by_id("oa_" + this.pluginkey + "_" + a + "_dialog_" + this.id);
            oneall.tools.remove_element_by_id("oa_" + this.pluginkey + "_" + a + "_overlay_" + this.id)
        },
        hide_dialog: function(a) {
            oneall.tools.hide_element_by_id("oa_" + this.pluginkey + "_" + a + "_dialog_" + this.id);
            oneall.tools.hide_element_by_id("oa_" + this.pluginkey + "_" + a + "_overlay_" + this.id)
        },
        show_dialog: function(a) {
            oneall.tools.show_element_by_id("oa_" + this.pluginkey +
                "_" + a + "_dialog_" + this.id);
            oneall.tools.show_element_by_id("oa_" + this.pluginkey + "_" + a + "_overlay_" + this.id)
        },
        setup_login_frame: function(a) {
            var b, c;
            this.show_providers_in_container(a);
            b = document.body;
            c = document.documentElement;
            a = Math.max(b.scrollHeight, c.scrollHeight, b.offsetHeight, c.offsetHeight, c.clientHeight);
            b = Math.max(b.scrollWidth, c.scrollWidth, b.offsetWidth, c.offsetWidth, c.clientWidth);
            this.xd_poster("resize_frame|" + a + "-" + b)
        },
        trigger_event: function(a, b) {
            var c, d;
            if (!0 === oneall.cfg.app.has_plan_ajs) {
                if (null !==
                    this.events && "object" === typeof this.events && ("function" !== typeof this.events[a] && (d = a.toLowerCase().replace(/_(.)/g, function(a, b) {
                        return b.toUpperCase()
                    }), "function" === typeof this.events[d] && (this.events[a] = this.events[d], delete this.events[d])), "function" === typeof this.events[a])) switch (a) {
                    case "on_widget_loaded":
                    case "on_login_begin":
                    case "on_login_end":
                    case "on_login_end_success":
                    case "on_login_end_error":
                    case "on_login_redirect":
                        if (c = document.getElementById("oa_" + this.pluginkey + "_frame_" + this.id)) {
                            d = {};
                            d.event = a;
                            d.service = this.pluginkey;
                            d.widget = c;
                            if ("on_login_begin" == a) {
                                if (c = oneall.api.providers.get_provider_by_id(b)) d.provider = {}, d.provider.name = c.name, d.provider.key = c.key
                            } else "on_login_redirect" == a && (d.callback_uri = this.callback_uri), "object" === typeof b && "connection" in b && (d.connection = {}, d.connection.status = b.connection.status, "data" in b.connection && ("connection" in b.connection.data && (d.connection.connection_token = b.connection.data.connection.connection_token), "user" in b.connection.data &&
                                (d.connection.user_token = b.connection.data.user.user_token), "source" in b.connection.data && "key" in b.connection.data.source && (c = oneall.api.providers.get_provider_by_key(b.connection.data.source.key), !1 !== c && (d.provider = {}, d.provider.name = c.name, d.provider.key = c.key))));
                            return this.events[a](d)
                        }
                        break;
                    default:
                        return this.events[a](b)
                }
            } else oneall.console.log("Triggers are not available. Please enable the advanced JavasScript API to enable triggers.");
            return null
        },
        handle_callback: function(a) {
            var b;
            a =
                oneall.tools.json_parse(a);
            this.trigger_event("on_login_end", a);
            oneall.cfg.can_trigger_cancel = !1;
            "object" === typeof a && "undefined" !== a.connection.status && ("success" === a.connection.status ? this.trigger_event("on_login_end_success", a) : (this.trigger_event("on_login_end_error", a), "user_has_cancelled" == a.connection.status && this.trigger_event("on_login_end_cancelled", a)));
            !1 !== this.trigger_event("on_login_redirect", a) && (b = oneall.cfg.get_uri("provider_redirect"), b += "?provider_connection_token=" + a.connection.token,
                "undefined" !== typeof a.identity_vault_key && (b += "&identity_vault_key=" + a.identity_vault_key), window.location.href = b)
        },
        open_login_modal_dialog: function() {
            var a;
            a = this.args;
            a.grid_size_x = 2;
            a.grid_size_y = 2;
            a = oneall.tools.json_stringify(a);
            a = oneall.tools.oak.encrypt(this.id, a);
            a = oneall.cfg.get_uri("provider_login_modal") + "?oakk=" + this.id + "&oakv=" + a;
            this.open_dialog("login_modal", a)
        },
        close_login_modal_dialog: function() {
            this.close_dialog("login_modal")
        },
        setup_login_modal_dialog: function(a) {
            var b;
            if (b = document.getElementById("close_login_modal_dialog")) b.onclick =
                function(a) {
                    return function() {
                        a.xd_poster("close_login_modal_dialog")
                    }
                }(this);
            this.show_providers_in_container(a)
        },
        open_login_data_dialog: function(a) {
            var b;
            if (b = oneall.api.providers.get_provider_by_id(a)) a = this.args, a.providerid = b.id, a.pluginkey = this.pluginkey, a = oneall.tools.json_stringify(a), a = oneall.tools.oak.encrypt(b.id, a), !0 === this.args.use_modal_dialog && this.hide_dialog("login_modal"), this.open_dialog("login_data", oneall.cfg.get_uri("provider_login_data_frame") + "?oakk=" + b.id + "&oakv=" + a);
            else throw Error("[OneAll] Invalid provider id [" +
                a + "] specified");
        },
        close_login_data_dialog: function() {
            this.close_dialog("login_data");
            !0 === this.args.use_modal_dialog && this.show_dialog("login_modal")
        },
        setup_login_data_dialog: function(a) {
            var b, c;
            if (b = document.getElementById("close_login_data_dialog")) b.onclick = function(a) {
                return function() {
                    a.xd_poster("close_login_data_dialog")
                }
            }(this);
            if (b = document.getElementById("login_data_dialog_form")) b.onsubmit = function(a, b) {
                return function() {
                    (c = document.getElementById("login_data_dialog_value")) && c.value.length &&
                        a.do_provider_login(b, {
                            login_data: c.value
                        });
                    return !1
                }
            }(this, a)
        },
        xd_poster: function(a) {
            oneall.xd.postMessage(this.id + "::" + a, this.parent_uri, window.parent)
        },
        xd_parser: function(a) {
            var b;
            if ("undefined" !== typeof a.data && (a = a.data.split("::"), 2 === a.length && (b = parseInt(a[0], 10), b === this.id))) return a = a[1], a = a.split("|")
        },
        xd_listener: function(a) {
            var b, c;
            a = this.xd_parser(a);
            if ("undefined" !== typeof a) switch (a[0]) {
                case "open_login_data_dialog":
                    2 === a.length && this.open_login_data_dialog(a[1]);
                    break;
                case "trigger_event_login_begin":
                    2 ===
                        a.length && (oneall.cfg.can_trigger_cancel = !0, this.trigger_event("on_login_begin", a[1]));
                    break;
                case "trigger_event_login_window_closed":
                    !0 === oneall.cfg.can_trigger_cancel && this.trigger_event("on_login_end_cancelled", a[1]);
                    break;
                case "close_login_data_dialog":
                    this.trigger_event("on_close_login_data_dialog");
                    this.close_login_data_dialog();
                    break;
                case "close_login_modal_dialog":
                    this.trigger_event("on_close_popup_ui");
                    this.close_login_modal_dialog();
                    break;
                case "handle_callback":
                    2 === a.length && this.handle_callback(a[1]);
                    break;
                case "redirect":
                    2 === a.length && (window.location.href = a[1]);
                    break;
                case "resize_frame":
                    2 === a.length && (b = a[1].split("-"), 2 === b.length && (a = document.getElementById("oa_" + this.pluginkey + "_frame_" + this.id))) && (c = parseInt(b[1], 10), b = parseInt(b[0], 10), a.style.cssText = "visibility: visible;background-color:transparent;border:0 none; " + (0 === b ? "" : "height:" + b + "px !important;") + (0 === c ? "width:100%;" : "width:" + c + "px;"), a.setAttribute("data-processed", "true")), this.trigger_event("on_widget_loaded")
            }
        },
        do_provider_login_raw: function(a,
            b) {
            var c, d;
            if (c = oneall.api.providers.get_provider_by_key(a)) {
                b = "undefined" !== typeof b ? b : {};
                if (c.is_login_data_required && (!b.login_data || !b.login_data.length)) throw Error("[OneAll] A username is required to login with this provider");
                d = oneall.tools.is_obj(this.providers_scope) && "undefined" !== typeof this.providers_scope[c.key] ? this.providers_scope[c.key] : "";
                window.location.href = oneall.cfg.get_uri("provider_connect_raw") + c.key + "/?scope=" + encodeURIComponent(d) + "&force_reauth=" + this.force_reauth + "&plugin=" +
                    this.pluginkey + "&callback_uri=" + encodeURIComponent(this.callback_uri) + "&args=" + encodeURIComponent(oneall.tools.json_stringify(b))
            } else throw Error("[OneAll] Invalid provider key [" + a + "] specified");
        },
        do_provider_login: function(a, b) {
            var c, d, e, f, g;
            if (!0 === this.demo) return alert("This feature is not available in the preview box."), !1;
            if (c = oneall.api.providers.get_provider_by_id(a)) b = "undefined" !== typeof b ? b : {}, !c.is_login_data_required || b.login_data && b.login_data.length ? (d = oneall.tools.is_obj(this.providers_scope) &&
                "undefined" !== typeof this.providers_scope[c.key] ? this.providers_scope[c.key] : "", this.show_message("Connecting...", "success", "connection_message"), this.xd_poster("trigger_event_login_begin|" + a), d = oneall.cfg.get_uri("provider_connect") + "?force_reauth=" + this.force_reauth + "&xdframeid=" + this.id + "&providerid=" + a + "&scope=" + encodeURIComponent(d) + "&plugin=" + this.pluginkey + "&callback_uri=" + encodeURIComponent(this.callback_uri) + "&args=" + encodeURIComponent(oneall.tools.json_stringify(b)), !0 === this.disable_popups ||
                !0 === oneall.browser.is_steam || null === this.disable_popups && !0 === oneall.browser.is_mobile ? this.xd_poster("redirect|" + d + "&same_window=1") : (g = oneall.tools.open_window(d, "Connect", c.popup_options), "object" === typeof g && (f = this, e = setInterval(function() {
                    try {
                        g.opener = window
                    } catch (a) {}
                    g.closed && (clearInterval(e), f.hide_message("connection_message"), f.xd_poster("trigger_event_login_window_closed"))
                }, 500)))) : this.xd_poster("open_login_data_dialog|" + a);
            else throw Error("[OneAll] Invalid provider id [" + a + "] specified");
        }
    }),
    oa_social_login = oa_social_abstract.extend({
        init: function(a) {
            this._super("social_login", a)
        },
        build: function(a) {
            this._super(oneall.cfg.get_uri("provider_login_frame"), a)
        },
        handle_callback_result: function(a) {
            if ("object" === typeof a && "undefined" !== a.connection.status)
                if ("success" === a.connection.status) this.xd_poster("handle_callback|" + oneall.tools.json_stringify(a));
                else switch (a.connection.flag) {
                    case "invalid_openid_endpoint":
                        this.show_message("The specified url is not a valid OpenID endpoint",
                            "error", "error_message");
                        break;
                    case "user_has_cancelled":
                        return !0;
                    default:
                        this.show_message("An error occurred. Please try again later!", "error", "error_message")
                }
        }
    }),
    oa_social_link = oa_social_abstract.extend({
        init: function(a) {
            this._super("social_link", a);
            a = "undefined" !== typeof a ? a : {};
            a.user_token = "undefined" !== typeof a.user_token ? a.user_token : "";
            this.user_token = this.args.user_token = a.user_token
        },
        build: function(a) {
            this._super(oneall.cfg.get_uri("provider_link_frame"), a)
        },
        handle_callback_result: function(a) {
            if ("object" ===
                typeof a && "undefined" !== a.connection.status) {
                switch (a.connection.status) {
                    case "error":
                        switch (a.connection.operation) {
                            case "nothing_to_do":
                                switch (a.connection.reason) {
                                    case "invalid_openid_endpoint":
                                        return this.show_message("The specified url is not a valid OpenID endpoint", "error"), !0;
                                    case "identity_is_linked_to_another_user":
                                        return this.show_message("The social profile is linked to another user", "error"), !0;
                                    case "identity_is_last_one":
                                        return this.show_message("At least one profile must remain linked to allow you to sign in",
                                            "error"), !0;
                                    case "user_cancelled_operation":
                                        return !0
                                }
                        }
                        break;
                    case "success":
                        switch (a.connection.operation) {
                            case "nothing_to_do":
                                switch (a.connection.reason) {
                                    case "identity_was_already_linked":
                                        return this.show_message("The social profile is already linked", "error"), !0;
                                    case "identity_does_not_exist":
                                        return !0
                                }
                        }
                }
                this.xd_poster("redirect|" + oneall.cfg.get_uri("provider_redirect") + "?provider_connection_token=" + a.connection.token)
            }
        },
        xd_listener: function(a) {
            var b;
            b = this.xd_parser(a);
            if ("undefined" !== typeof b) switch (b[0]) {
                case "open_idm":
                    2 ===
                        b.length && this.open_idm(b[1]);
                    break;
                case "close_idm":
                    this.close_idm();
                    break;
                default:
                    this._super(a)
            }
        },
        setup_idm_dialog: function(a) {
            var b, c, d, e;
            e = this;
            this.providerid = "undefined" !== typeof a ? a : null;
            b = oneall.tools.get_elements_by_class_name("close_dialog");
            if (null !== b && "object" === typeof b)
                for (c = 0; c < b.length; c += 1) b[c].onclick = function(a) {
                    return function() {
                        a.xd_poster("close_idm")
                    }
                }(this);
            b = oneall.tools.get_elements_by_class_name("unlink_account");
            if (null !== b && "object" === typeof b)
                for (c = 0; c < b.length; c +=
                    1) d = b[c].getAttribute("data-identity"), b[c].onclick = function(a, b, c) {
                    return function() {
                        a.do_provider_login(b, {
                            link_identity: !1,
                            identity: c
                        })
                    }
                }(this, a, d);
            b = oneall.tools.get_elements_by_class_name("link_account");
            if (null !== b && "object" === typeof b)
                for (c = 0; c < b.length; c += 1) b[c].onclick = function(a, b) {
                    return function() {
                        a.do_provider_login(b, {
                            link_identity: !0
                        })
                    }
                }(this, a);
            oneall.xd.receiveMessage(function(a) {
                e.xd_listener(a)
            }, oneall.cfg.get_uri("application"))
        },
        close_idm: function() {
            this.close_dialog("idm")
        },
        open_idm: function(a) {
            var b;
            if (oneall.api.providers.get_provider_by_id(a)) b = this.args, b.providerid = a, b = oneall.tools.json_stringify(b), a = oneall.tools.oak.encrypt(this.id, b), a = oneall.cfg.get_uri("provider_link_idm_modal") + "?oakk=" + this.id + "&oakv=" + a, this.open_dialog("idm", a);
            else throw Error("[OneAll] Invalid provider id [" + a + "] specified");
        },
        setup_login_data_dialog: function(a) {
            var b, c;
            if (b = document.getElementById("close_login_data_dialog")) b.onclick = function(a) {
                return function() {
                    a.xd_poster("close_login_data_dialog")
                }
            }(this);
            if (b = document.getElementById("login_data_dialog_form")) b.onsubmit = function(a, b) {
                return function() {
                    (c = document.getElementById("login_data_dialog_value")) && c.value.length && a.do_provider_login(b, {
                        link_identity: !0,
                        login_data: c.value
                    });
                    return !1
                }
            }(this, a)
        },
        open_login_data_dialog: function(a) {
            this.hide_dialog("idm");
            this._super(a)
        },
        close_login_data_dialog: function() {
            this.show_dialog("idm");
            this._super()
        },
        do_provider_login: function(a, b) {
            var c;
            b = "undefined" !== typeof b ? b : {};
            if (c = oneall.api.providers.get_provider_by_id(a)) "object" ===
                typeof this.linked_providers[c.key] ? this.xd_poster("open_idm|" + c.id) : (b.user_token = this.user_token, this._super(a, b))
        }
    }),
    oa_social_sharing = function() {
        this.include_library = function() {
            oneall.tools.include_file(oneall.cfg.get_uri("sharing_library"), "js", !0)
        };
        this.conditional_setup = function() {
            var a = oneall.tools.get_elements_by_class_name("oas_box");
            "object" === typeof a && 0 < a.length && this.include_library()
        }
    };
oneall.api.plugins.social_login = {};
oneall.api.plugins.social_login.build = function(a, b) {
    (new oa_social_login(b)).build(a)
};
oneall.api.plugins.social_login.modal = {};
oneall.api.plugins.social_login.modal.attach = function(a, b) {
    b = "object" === typeof b ? b : {};
    b.use_modal_dialog = !0;
    oneall.api.plugins.social_login.build(a, b)
};
oneall.api.plugins.social_link = {};
oneall.api.plugins.social_link.build = function(a, b) {
    (new oa_social_link(b)).build(a)
};
oneall.api.plugins.social_link.setup_frame = function(a, b) {
    (new oa_social_link(b)).setup_login_frame(a)
};
oneall.api.plugins.social_sharing = {};
oneall.api.plugins.social_sharing.build = function() {
    "undefined" == typeof oneall.api.plugins.social_sharing.build.plugin && (oneall.api.plugins.social_sharing.build.plugin = new oa_social_sharing);
    oneall.api.plugins.social_sharing.build.plugin.include_library()
};
if ("undefined" === typeof _oa_asq) {
    var _oa_asq = {
        v: {
            "*": {
                grid_size_x: 99,
                grid_size_y: 99,
                force_re_authentication: !1,
                popup_usage: null,
                user_token: null
            },
            comments: {},
            social_login: {},
            social_link: {},
            social_sharing: {},
            single_sign_on: {
                top_realm: null,
                sub_realm: null,
                sso_session_token: null
            }
        },
        get_args: function(a, b) {
            var c;
            a = this.gs(a);
            switch (this.gv(a, "popup_usage")) {
                case "always":
                    c = !1;
                    break;
                case "never":
                    c = !0;
                    break;
                default:
                    c = null
            }
            c = {
                disable_popups: c,
                providers: this.gv(a, "providers"),
                providers_scope: this.gv(a, "providers_scope"),
                css_theme_uri: this.gv(a, "custom_css_uri"),
                callback_uri: this.gv(a, "callback_uri"),
                grid_size_x: this.gv(a, "grid_size_x"),
                grid_size_y: this.gv(a, "grid_size_y"),
                events: this.gv(a, "events")
            };
            "social_link" == a ? c.user_token = this.gv(a, "user_token") : c.use_modal_dialog = !0 === b ? !0 : !1;
            return c
        },
        gs: function(a, b) {
            if (a in this.v) return a;
            if (!0 !== b) return "*"
        },
        gv: function(a, b) {
            a = this.gs(a);
            return b in this.v[a] ? this.v[a][b] : b in this.v["*"] ? this.v["*"][b] : null
        },
        sv: function(a, b, c) {
            a = this.gs(a, !0);
            this.v[a][b] = c;
            if ("*" ==
                a)
                for (a in this.v) "*" != a && delete this.v[a][b]
        },
        do_build_plugin: function(a, b, c) {
            a = this.gs(a, !0);
            c = this.get_args(a, c);
            ("social_link" == a ? new oa_social_link(c) : new oa_social_login(c)).build(b)
        },
        set_callback_uri: function(a, b) {
            this.sv(a, "callback_uri", b)
        },
        set_logout_uri: function(a, b) {
            this.sv(a, "logout_uri", b)
        },
        set_custom_css_uri: function(a, b) {
            this.sv(a, "custom_css_uri", b)
        },
        set_providers: function(a, b) {
            b = "object" === typeof b ? b : b.split(",");
            this.sv(a, "providers", b)
        },
        set_provider_scope: function(a, b, c) {
            var d;
            a = this.gs(a);
            oneall.api.providers.get_provider_by_key(b) && (d = "undefined" === typeof this.v[a].providers_scope ? {} : this.v[a].providers_scope, c && 0 !== c.length ? d[b] = c : delete d[b], this.sv(a, "providers_scope", d))
        },
        set_force_re_authentication: function(a, b) {
            this.sv(a, "force_re_authentication", !0 === b ? !0 : !1)
        },
        set_enable_single_sign_on: function(a, b) {
            this.sv(a, "enable_single_sign_on", !0 === b ? !0 : !1)
        },
        set_popup_usage: function(a, b) {
            0 <= ["autodetect", "always", "never"].indexOf(b) && this.sv(a, "popup_usage", b)
        },
        set_grid_size: function(a,
            b, c) {
            c = parseFloat(c, 10);
            isNaN(c) || !isFinite(c) || "x" !== b && "y" !== b || this.sv(a, "grid_size_" + b, c)
        },
        set_grid_sizes: function(a, b) {
            b = "object" === typeof b ? b : b.split(",");
            2 === b.length && (0 < b[0].toString().length && this.set_grid_size(a, "x", b[0]), 0 < b[1].toString().length && this.set_grid_size(a, "y", b[1]))
        },
        set_event: function(a, b, c) {
            "function" == typeof c && (a = this.gs(a), "object" !== typeof this.v[a].events && (this.v[a].events = {}), this.v[a].events[b] = c)
        },
        set_user_token: function(a, b) {
            this.sv(a, "user_token", b)
        },
        attach_onclick_popup_ui: function(a,
            b) {
            this.do_build_plugin(a, b, !0)
        },
        do_render_ui: function(a, b) {
            this.do_build_plugin(a, b)
        },
        do_popup_ui: function(a) {
            a = this.get_args(a);
            (new oa_social_login(a)).open_modal()
        },
        do_login: function(a, b, c) {
            a = this.get_args(a);
            c = "undefined" === typeof c ? "" : c;
            (new oa_social_login(a)).do_provider_login_raw(b, {
                login_data: c
            })
        },
        do_include_library: function(a, b) {
            var c;
            "social_sharing" == a && (!0 === b ? (c = oneall.tools.get_elements_by_class_name("oas_box"), c = "object" === typeof c && 0 < c.length) : c = !0, !0 === c && oneall.tools.include_file(oneall.cfg.get_uri("sharing_library"),
                "js", !0))
        },
        set_realm: function(a, b, c) {
            this.sv(a, "top_realm", b);
            this.sv(a, "sub_realm", "undefined" !== c ? c : null)
        },
        set_sso_session_token: function(a, b) {
            this.sv(a, "sso_session_token", b)
        },
        do_start_session: function(a, b) {
            if ("single_sign_on" == a && !0 === oneall.cfg.app.has_plan_sso) {
                var c = this.gv(a, "sso_session_token");
                null !== c && (uri = uri + "?sso_session_token=" + c);
                oneall.tools.include_file(uri, "js", !0);
                window._oneall_sso = window._oneall_sso || [];
                window._oneall_sso.push(["set_callback_uri", this.gv(a, "callback_uri")]);
                window._oneall_sso.push(["set_realm", this.gv(a, "top_realm"), this.gv(a, "sub_realm")]);
                window._oneall_sso.push(["do_start_session"])
            }
        },
        push: function() {
            var a, b, c, d;
            for (a = 0; a < arguments.length; a += 1) try {
                if (d = arguments[a].shift(), "undefined" !== typeof this.gs(d, !0))
                    if (c = arguments[a].shift(), "function" === typeof this[c]) arguments[a].unshift(d), this[c].apply(this, arguments[a]);
                    else if ("[object Array]" === Object.prototype.toString.call(c))
                    for (b = 0; b < c.length; b += 1) c[b].unshift(d), this.push(c[b]);
                else oneall.console.log("Invalid function: [" +
                    d + "::" + c + "]");
                else oneall.console.log("Invalid scope: [" + d + "]")
            } catch (e) {
                oneall.console.log(e)
            }
        }
    };
    (function() {
        var a = window._oneall || [];
        window._oneall = _oa_asq;
        window._oneall.push.apply(window._oneall, a)
    })()
}
oneall.loader.add_event(function() {
    (_oneall || []).push(["social_sharing", "do_include_library", !0])
});