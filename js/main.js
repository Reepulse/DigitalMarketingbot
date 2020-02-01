$(function() {
    var t = $("#content"),
    bt = $(".bottomtitle"),
    kwl = $("#keywordsLabel"),
    sbb = $(".subtitle"),
    b = $('#beta'),
    //e = $("#setting"),
    i = $("#profile"),
    //n = $("#setting_btn"),
    //s = $("#faq_btn"),
    o = $("#profile_btn"),
    l = $("#close_btn"),
    a = $(".upgrade_link"),
    _ = null,
    r = $("#UUID"),
    c = EX.Utils.local(),
    u = $("#update_token_btn"),
    m = $("#create_btn"),
    h = ($("#cancel_sub_btn"), $("#update_setting_btn")),
    d = $("#reset_setting_btn");
    c.get("setting",
    function(t) {
        // var e = t.setting;
        // console.log(e),
        // $("#max_comment_num").val(e.MAX_COMMENT_NUMBER),
        // $("#min_play_time").val(e.MIN_PLAY_TIME),
        // $("#max_play_time").val(e.MAX_PLAY_TIME)
    }),
    $(".upgrade").fadeTo("fast", 0),
    m.click(function(t) {
        var e = "chrome-extension://" + EX.getBrowser().runtime.id + "/pages/option.html";
        EX.isChrome() || (e = EX.getBrowser().extension.getURL("pages") + "/option.html"),
        EX.Utils.createTab({
            url: e
        })
    }),
    o.click(function(a) {
        i.show(),
        l.show(),
        $(this).hide(),
        o.hide(),
        t.hide()
    }),
    l.click(function(l) {
        t.show(),
        o.show(),
        i.hide(),
        $(this).hide()
    }),
    EX.Utils.getUUID(function(t, e) {
        _ = e,
        EX.Utils.UUID = e;
        var i = e.substr(0, 8) + "*****" + e.substr(e.length - 8, 8);
        r.text(i);
        EX.getBrowser().runtime.id;
        a.attr("href", $BACK_URL + "payment/" + _);
        $("#comment_cnt").attr("min","1");
        EX.Utils.isStandard(function(r){
            var rj = JSON.parse(r);
            if(rj.standard){
                b.text('Standard');
                bt.hide();
                // $(sbb[1]).hide();
                // $(sbb[2]).hide();
                //kwl.text("Keywords");
            }
            else{
                b.text('Free');
                $("#comment_cnt").attr("max","30");
            }
        });
    }),
    u.click(function() {
        var t = $("#newuuid").val();
        if ($("#uuidErr").hide(), t.length < 48) $("#uuidErr").show();
        else {
            c.set({
                uuid: t
            }),
            _ = t;
            var e = t.substr(0, 8) + "*****" + t.substr(t.length - 8, 8);
            r.text(e),
            r.attr("value", t),
            $("#newuuid").val("")
        }
    }),
    h.click(function() {
        var t = $("#max_comment_num").val(),
        e = $("#min_play_time").val(),
        i = $("#max_play_time").val();
        t < 0 && (t = 0),
        e < 0 && (e = 0),
        i < 0 && (i = 0),
        $popup.updateSetting(t, e, i)
    }),
    d.click(function() {
        $("#max_comment_num").val(Setting.MAX_COMMENT_NUMBER),
        $("#min_play_time").val(Setting.MIN_PLAY_TIME),
        $("#max_play_time").val(Setting.MAX_PLAY_TIME),
        $popup.resetSetting()
    });
    $("#ver").text("Ver " + EX.Utils.getMaifest().version)
});
