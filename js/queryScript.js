
intervalflag = "";
function scrolltobottom(){
    $('body,html').animate({scrollTop: $(document).height()}, 1000); 
}
function sendURLs(urls){
    chrome.runtime.sendMessage({urls: urls,type : "geturl"}, function(response) {
        console.log(response.farewell);
    });
    console.log("send urls " + urls.length);
}
function getURLs(){
    var l = $(".yt-simple-endpoint.style-scope.ytd-video-renderer");
    var urls = [];
    l.each(function( key, value ) {
        var href = $(value).attr('href');
        if(href) 
            urls.push(href);
    });
    return urls;
}
function getVideos(){
    chrome.storage.local.get('comment_cnt',function(result){
        var cnt = parseInt(result.comment_cnt);
        console.log("commentcnt = " + cnt);
        $('#primary').bind("DOMNodeInserted",function(e){
            if(e.target.className == 'style-scope ytd-item-section-renderer'){
                var urls = getURLs();
                if(urls.length > cnt){
                    $('#primary').unbind("DOMNodeInserted");
                    clearInterval(intervalflag);
                    sendURLs(urls.slice(0,cnt));
                }
            }
        });
        intervalflag = setInterval("scrolltobottom()", 2000);
    });
    
}
// var t1 = window.setTimeout(getVideos,2000); 
// chrome.runtime.sendMessage({type: "injected"}, function(response) {
//     console.log(response.farewell);
// });

chrome.runtime.onMessage.addListener(function(message, sender) {
    console.log(message);
    window.setTimeout(getVideos,1000);
});

console.log("contentScript ended.");