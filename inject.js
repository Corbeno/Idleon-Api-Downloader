 console.log("injet ran");
 
 var s = document.createElement('script');
 s.src = chrome.extension.getURL('injected.js');
 s.onload = function() {
     this.remove();
 };
 (document.head || document.documentElement).appendChild(s);
 chrome.storage.local.set({"data": null})

window.addEventListener("PassSaveToInject", function(event) {
    var jsonData = event.detail;
    chrome.storage.local.set({"saveData": jsonData})
    checkTempData();
}, false);


window.addEventListener("PassCharNameToInject", function(event) {
    var jsonData = event.detail;
    chrome.storage.local.set({"charNameData": jsonData});
    checkTempData();
}, false);

function checkTempData(){
    chrome.storage.local.get("saveData", function(result){
        var saveData = result.saveData;
        chrome.storage.local.get("charNameData", function(secondResult){
            var charNameData = secondResult.charNameData;
            if(saveData != null && charNameData != null){
                //send combined data to actual storage for popup.js to use
                var combined = {
                    "saveData" : saveData,
                    "charNameData" : charNameData
                }
                chrome.storage.local.set({"data": combined})
                
                //remove temp data
                chrome.storage.local.set({"saveData": null});
                chrome.storage.local.set({"charNameData": null});
            }
        });
    });
}