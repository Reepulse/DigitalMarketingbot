function onCommented(message) {
  chrome.storage.local.get('watchurls', function (result_urls) {
    var urls = result_urls.watchurls;
    if (urls.length == 1) {
      return;
    }
    urls.splice(0, 1);
    chrome.storage.local.set({ 'watchurls': urls });
    chrome.storage.local.get('tabid', function (result_tabid) {
      chrome.tabs.update(result_tabid.tabid, { url: 'https://www.youtube.com' + urls[0] }
        , function (tab) {
          console.log("updated tab = " + tab.id);
        });
    });
  });
}
function onGeturl(message) {
  chrome.storage.local.get('watchurls', function (result_watchurls) {
    var mergedurls = result_watchurls.watchurls.concat(message.urls);
    console.log(mergedurls);
    chrome.storage.local.set({ 'watchurls': mergedurls });
  });
  chrome.storage.local.get('searchurls', function (result_urls) {
    var urls = result_urls.searchurls;
    if (urls.length == 1) {
      //start watching vedios
      chrome.storage.local.set({ 'status': 'working' });
      chrome.storage.local.get('tabid', function (result_tabid) {
        chrome.storage.local.get('watchurls', function (result_searchurls) {
          chrome.tabs.update(result_tabid.tabid, { url: 'https://www.youtube.com' + result_searchurls.watchurls[0] }
            , function (tab) {
            });
        });
      });
      return;
    }
    urls.splice(0, 1);
    chrome.storage.local.set({ 'searchurls': urls });
    chrome.storage.local.get('tabid', function (result_tabid) {
      chrome.tabs.update(result_tabid.tabid, { url: urls[0] }
        , function (tab) {
          console.log("updated tab = " + tab.id);
        });
    });
  });
}

function storeCommentInfo(message) {
  chrome.storage.local.set({ 'searchurls': message.data.urls });
  chrome.storage.local.set({ 'watchurls': [] });
  chrome.storage.local.set({ 'comment': message.data.comment });
  chrome.storage.local.set({ 'comments': message.data.comments });
  chrome.storage.local.set({ 'isInstant': message.data.isInstant });
  chrome.storage.local.set({ 'min': message.data.min });
  chrome.storage.local.set({ 'max': message.data.max });
  chrome.storage.local.set({ 'comment_cnt': message.data.comment_cnt });
  console.log(message);
}

function createNewWindow(message) {
  chrome.storage.local.set({ 'status': 'retriveurls' });
  storeCommentInfo(message);
  chrome.windows.create({ url: "", state: "maximized" }, function (window) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.storage.local.set({ 'tabid': tabs[0].id });
      chrome.tabs.update(tabs[0].id, { url: message.data.urls[0] }
        , function (tab) {
          console.log("created new tab = " + tab.id);
        });
    });
  });
}

chrome.runtime.onMessage.addListener(function (message, sender) {
  if (message.commented) {
    console.log('one commente done.');
  }
  else if (message.type) {
    if (message.type == 'commented') {
      onCommented(message);
    } else if (message.type == 'geturl') {
      onGeturl(message);
    }
  } else if (message.data) {
    createNewWindow(message);
  }
});

chrome.windows.onCreated.addListener(function (window) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, 'start to get urls.');
  });
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    chrome.storage.local.get('tabid', function (result) {
      if (result.tabid == tabId) {
        chrome.storage.local.get('status', function (result_status) {
          console.log(result_status.status);
          if (result_status.status == 'working') {
            chrome.tabs.sendMessage(tabId, 'start to comment.');
          } else if (result_status.status == 'retriveurls') {
            chrome.tabs.sendMessage(tabId, 'start to get urls.');
          }
        });
      }
    });
  }
});
