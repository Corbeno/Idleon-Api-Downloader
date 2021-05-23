 var s = document.createElement('script');
 s.src = chrome.extension.getURL('injected.js');
 s.onload = function() {
     this.remove();
 };
 (document.head || document.documentElement).appendChild(s);
 chrome.storage.local.set({"data": null})

window.addEventListener("PassToInject", function(event) {
    var jsonData = event.detail;
    chrome.storage.local.set({"data": jsonData})
}, false);