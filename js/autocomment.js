function clicksubmit() {
    $('#submit-button').trigger('click');
}
function auto_comment() {
    triggerClick();
}
function triggerClick() {
    $("#simplebox-placeholder").trigger('click');
    chrome.storage.local.get(['comment', 'comments'], function (result_comment) {
        //var comments = result_comment.comment.split('\n');
        console.log(result_comment);
        var comments = result_comment.comments;
        var one_comment = comments[Math.ceil(Math.random() * comments.length) - 1];
        $('#contenteditable-root').text(one_comment);
    });
    $('#submit-button').removeAttr("disabled");
    setTimeout("triggerSubmit()", 500);
}
function triggerSubmit() {
    clicksubmit();
    setTimeout("sendDoneMessage()", 1500);
}

function sendDoneMessage() {
    chrome.runtime.sendMessage({ type: "commented" });
}
function checkCanComment() {
    var node = document.getElementById("simplebox-placeholder");
    if (node == null) {
        chrome.runtime.sendMessage({ type: "commented" });
    }
}
function scrollAndComment() {
    $('body,html').animate({ scrollTop: 450 }, 1000);
    setTimeout("checkCanComment()", 10000);
    $('body').bind("DOMNodeInserted", function (e) {
        if (e.target.id == 'simplebox-placeholder') {
            chrome.storage.local.get(["isInstant", "min", "max"], function (result) {
                console.log(result);
                if (result.isInstant == true) {
                    setTimeout("auto_comment()", 0);
                } else {
                    var min = parseInt(result.min), max = parseInt(result.max);
                    var dist = max - min;
                    var randomNum1 = Math.ceil(Math.random() * dist);
                    var mid = min + randomNum1;
                    console.log(mid);
                    setTimeout("auto_comment()", mid * 1000);
                }
            });

        }
    });
}

chrome.runtime.onMessage.addListener(function (message, sender) {
    console.log('onMessage = ' + message);
    setTimeout("scrollAndComment()", 1000);
});