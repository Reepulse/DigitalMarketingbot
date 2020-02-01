// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function Popup() {
    this.start_btn = $("#start_btn"),
        this.dis_start_btn = $("#dis_start_btn"),
        this.comment = $("#comment"),
        this.keywords = $("#keywords"),
        this.commentCnt = $("#comment_cnt"),
        this.min_play_time = $("#min_play_time"),
        this.max_play_time = $("#max_play_time"),
        this.Utils = EX.Utils,
        this.currentList = "0",
        this.comments = [];
    var t = this;
    this.comment.keyup(function (e) {
        t.enableClick()
    }),
        this.keywords.keyup(function (e) {
            t.enableClick()
        })
}
function getSearchword(s) {
    var arr = s.split(' ');
    var newword = "";
    arr.forEach(function (i) {
        if (newword == "")
            newword = i;
        else
            newword = newword + "+" + i;
    });
    return newword;
}
Popup.prototype.updateChartsNum = function () {
    var t = this.comment.val().length;
    t = this.maxLength - t;
},
    Popup.prototype.updateStore = function () {
        var ks = this.keywords.val(), c = this.comment.val()
            , cnt = this.commentCnt.val(), min = 2
            , max = 4;
        this.Utils.local().set({
            keywords: ks
        });
        this.Utils.local().set({
            comment: c
        });
        if (min) {
            this.Utils.local().set({
                min: min
            });
        }
        if (max) {
            this.Utils.local().set({
                max: max
            });
        }
        if (cnt) {
            this.Utils.local().set({
                commentCnt: cnt
            });
        }
        var checkedval = $("input:radio[name='commentOption']:checked").val();
        this.Utils.local().set({
            checkedval: checkedval
        });
    },
    Popup.prototype.enableClick = function () {
        var t = this.keywords.val().length,
            e = this.comment.val().length;
        if (e > 0 && t > 0) return this.start_btn.show(), void this.dis_start_btn.hide();
        e > 0 && t > 0 ? (this.start_btn.show(), this.dis_start_btn.hide()) : (this.start_btn.hide(), this.dis_start_btn.show())
    },
    Popup.prototype.init = function () {
        var t = this;
        this.start_btn.click(function (e) {
            t.start()
        }),
            this.Utils.local().get(["keywords", "comment", "commentCnt", "min", "max", "checkedval"],
                function (e) {
                    t.comment.val(e.comment),
                        t.keywords.val(e.keywords),
                        t.enableClick(),
                        t.updateChartsNum();
                    if (e.commentCnt) {
                        t.commentCnt.val(e.commentCnt);
                    }
                    if (e.min) {
                        t.min_play_time.val(e.min);
                    }
                    if (e.max) {
                        t.max_play_time.val(e.max);
                    }
                    e.checkedval == 'r1' ? $("input:radio[value='r1']").attr('checked', 'true') : $("input:radio[value='r2']").attr('checked', 'true');
                }),
            setInterval(function () {
                t.updateStore()
            },
                500);

    },
    Popup.prototype.start = function () {
        debugger;
        console.log('start');
        var baseurl = 'https://www.youtube.com/results?search_query=';
        var t = this,
            e = this.keywords.val().split('\n');
        //isInstant = $("input[name='commentOption']").get(0).checked;
        var isInstant = false;
        var min = $("#min_play_time").val(), max = $("#max_play_time").val(), comment_cnt = $("#comment_cnt").val();
        //console.log(isInstant);
        console.log('min=' + min + " max=" + max);

        var searchurls = [];
        e.forEach(function (i) {
            searchurls.push(baseurl + getSearchword(i));
        });
        var comments = this.comment.val().split('\n');
        EX.Utils.isStandard(function (f) {

            if (true) {
                if (comment_cnt > 30) {

                }
                if (searchurls.length > 3) {
                    searchurls = searchurls.slice(0, 3);
                }
                if (comments.length > 3) {
                    comments = comments.slice(0, 3);
                }
            }
            t.Utils.sendMessage("URL", {
                comment: t.comment.val(),
                comments: comments,
                urls: searchurls,
                isInstant: isInstant,
                min: min,
                max: max,
                comment_cnt: comment_cnt
            },
                function (response) { console.log(response); });

        });



    },
    Popup.prototype.resetSetting = function () {
        Utils.local().set({
            setting: EX.Setting
        })
    },
    Popup.prototype.updateSetting = function (t, e, i) {
        EX.Utils.local().set({
            setting: {
                MAX_COMMENT_NUMBER: t,
                MIN_PLAY_TIME: e,
                MAX_PLAY_TIME: i
            }
        })
    };
var $popup = new Popup;
$popup.init();

