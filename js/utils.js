function Utils() {
    this.cloudURL = $URL + "/parse/functions",
    this.headers = {
        "X-Parse-Application-Id": 0 == ENV ? APP_ID + "_dev": APP_ID + "_prod"
    },
    this.pay_headers = {
        "X-Parse-Application-Id": 0 == ENV ? PAY_ID + "_dev": PAY_ID + "_prod"
    },
    this.UUID = null,
    this.init()
}
Utils.prototype.init = function() {},
Utils.prototype.getBG = function(t) {
    EX.getBrowser().runtime.getBackgroundPage(function(e) {
        t && t(e)
    })
},
Utils.prototype.local = function() {
    return {
        set: function(t, e) {
            e || (e = function() {}),
            EX.getBrowser().storage.local.set(t, e)
        },
        get: function(t, e) {
            e || (e = function() {}),
            EX.getBrowser().storage.local.get(t, e)
        },
        remove: function(t) {
            EX.getBrowser().storage.local.remove(t,
            function() {
                var t = EX.getBrowser().runtime.lastError;
                t && console.error(t)
            })
        },
        clear: function() {
            EX.getBrowser().storage.local.clear()
        }
    }
},
Utils.prototype.Tab = function() {
    return EX.getBrowser().tab
},
Utils.prototype.getCurrentActiveTab = function(t) {
    EX.getBrowser().tabs.query({
        active: !0,
        currentWindow: !0
    },
    function(e) {
        t(null, e[0])
    })
},
Utils.prototype.getCurrentTab = function(t) {
    EX.getBrowser().tabs.getCurrent(function(e) {
        t(null, e)
    })
},
Utils.prototype.createTab = function(t, e) {
    console.log("createTab"),
    EX.getBrowser().tabs.create(t, e)
},
Utils.prototype.closeTab = function(t, e) {
    EX.getBrowser().tabs.remove(t, e)
},
Utils.prototype.createWin = function(t, e, o) {
    EX.getBrowser().windows.create(t,
    function(t) {
        t.tabs[0];
        e && EX.getBrowser().windows.update(t.id, {
            state: "minimized"
        },
        function() {}),
        o && o(null, t)
    })
},
Utils.prototype.sendMessage = function(t, e, o) {
    console.log("sendmessage");
    //chrome.windows.create({url:e.data},function(window) {console.log(window);});
    //chrome.tabs.update({url:e.data});
    EX.getBrowser().runtime.sendMessage({
        event: t,
        data: e
    })
},
Utils.prototype.sendTabMessage = function(t, e, o) {
    console.log('sendTabMessage');
    EX.getBrowser().tabs.sendMessage(t, e, o)
},
Utils.prototype.exportToFile = function(t, e, o) {
    window.blob = new Blob([t], {
        type: "application/octet-binary"
    }),
    window.url = URL.createObjectURL(blob);
    var r = document.createElement("a");
    r.setAttribute("href", url),
    r.setAttribute("download", e + o),
    r.click()
},
Utils.prototype.getUrlVars = function(t) {
    for (var e, o = [], r = t || window.location.href, n = r.slice(r.indexOf("?") + 1).split("&"), i = 0; i < n.length; i++) e = n[i].split("="),
    o.push(e[0]),
    o[e[0]] = e[1];
    return o
},
Utils.prototype.ajax = function(t, e, o, r) {
    var n = r ? this.pay_headers: this.headers,
    i = e.method ? e.method: "POST";
    return e.method = void 0,
    $.ajax({
        url: t,
        headers: n,
        method: i,
        data: e,
        success: function(t) {
            o && o(null, t)
        },
        error: function(t) {
            o && o(t)
        }
    })
},
Utils.prototype.openUpgradeURL = function() {
    var t = $URL + "/extension/customer/" + this.UUID;
    window.open(t)
},
Utils.prototype.generateUID = function() {
    var t = new Uint32Array(8);
    return window.crypto.getRandomValues(t),
    [].map.call(t,
    function(t) {
        return t.toString(16)
    }).join("")
},
Utils.prototype.getUUID = function(t) {
    var e = this;
    EX.getBrowser().storage.local.get("uuid",
    function(o) {
        var r = o.uuid;
        if (r) t(null, r),
        e.UUID = r;
        else {
            var n = e.generateUID();
            EX.getBrowser().storage.local.set({
                uuid: n
            },
            function(t) {}),
            t(null, o.uuid),
            e.UUID = n
        }
    })
},
Utils.prototype.updateUUID = function(t, e) {
    EX.getBrowser().storage.local.set({
        uuid: t
    },
    e),
    this.UUID = t
},
Utils.prototype.isPremium = function(t) {
    var e = $PAY_URL + "/parse/functions/ispremium";
    this.ajax(e, {
        uuid: this.UUID
    },
    function(e, o) {
        if (e) t(e);
        else if (o) {
            var r = o.result.result;
            t && t(null, r)
        } else t && t(null, !1)
    },
    !0)
},
Utils.prototype.isStandard = function(f){
    var e = $BACK_URL + "validatetoken/isStandard/" + this.UUID;
    $.ajax({
        url: e,
        headers: {
            "Accept": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin" : "*"
        },
        method: 'GET',
        success: function(t) {
            f(t);
        },
        error: function(t) {
            f(t);
        }
    });
    
},
Utils.prototype.injectUUID = function(t, e) {
    this.getUUID(function(o, r) {
        t.UUID = r,
        e && e(r)
    })
},
Utils.prototype.getMaifest = function() {
    return EX.getBrowser().runtime.getManifest()
},
EX.Utils = new Utils;