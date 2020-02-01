function nano(t, e) {
    return t.replace(/\{([\w\.]*)\}/g,
        function (t, E) {
            for (var _ = E.split("."), n = e[_.shift()], o = 0, r = _.length; o < r; o++) n = n[_[o]];
            return void 0 !== n && null !== n ? n : ""
        })
}
var EX = {};
EX.ACTIVE = !0;
var $URL, $PAY_URL, $BACK_URL, ENV = 1,
    APP_NAME = "youtube_comment_bot",
    APP_ID = "apps_data_server",
    PAY_ID = "stripe_server",
    DATA_ID = "",
    IS_PREMIUM = void 0,
    MAX_COMMENT_NUMBER = 10,
    MIN_PLAY_TIME = 30,
    MAX_PLAY_TIME = 60,
    Setting = {
        MAX_COMMENT_NUMBER: MAX_COMMENT_NUMBER,
        MIN_PLAY_TIME: MIN_PLAY_TIME,
        MAX_PLAY_TIME: MAX_PLAY_TIME
    };
var dev = false;
$BACK_URL = dev ? "http://localhost:3000/" : "https://www.automarketr.com/";
EX.Setting = Setting,
    1 == ENV ? ($URL = "https://data.emailcollector.me", $PAY_URL = "https://stripe.emailcollector.me") : ($URL = "http://localhost:3310", $PAY_URL = "http://localhost:3210", $PAY_ID = PAY_ID + "_dev");
var Event = {};
Event.GET_COMMENT = "get_comment",
    Event.COMMENT_SEND_START = "comment_send_start",
    Event.COMMENT_SEND_COMPLETE = "comment_send_complete",
    Event.INTEVAL = 3e3,
    Event.CURRENT_QUERY_WIN = void 0,
    Event.CURRENT_QUERY_TAB = void 0,
    Event.CURRENT_TAB = void 0,
    Event.CREATE_TAB = "craete_tab",
    Event.CLOSE_TAB = "close_tab",
    Event.NEXT = "next",
    window.location.href.startsWith("moz-extension:") ? EX.IS_CHROME = !1 : EX.IS_CHROME = !!window.chrome,
    EX.isChrome = function () {
        return EX.IS_CHROME
    },
    EX.getBrowser = function () {
        return EX.isChrome() ? chrome : browser
    };
var eURL = EX.getBrowser().extension.getURL("pages");