updateAllButtons();
chrome.storage.onChanged.addListener(function(changes, namespace){
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if(newValue != null){
            //when save data changes, re-parse clean json with new save data and update buttons
            updateAllButtons();
        }
    }
});

function updateAllButtons(){
    chrome.storage.local.get("data", function(result){
        if(result.data != null){
            //save data
            var rawJson = result.data;
            var rawString = JSON.stringify(rawJson);
            var cleanJson =  parseData(rawJson);
            var cleanString = JSON.stringify(cleanJson);
            var lootyString = rawJson.saveData.documentChange.document.fields.Cards1.stringValue.replace(/\"/g, "\\");
            var questsString = JSON.stringify(cleanJson.account.quests);
            showCopyButton("rawCopyLink", rawString);
            showDownloadButton("rawDownloadLink", rawString, "rawData.json")
            showCopyButton("cleanJsonCopyLink", cleanString);
            showDownloadButton("cleanJsonDownloadLink", cleanString, "cleanData.json");
            showCopyButton("lootyCopyLink", lootyString);
            showCopyButton("questsCopyLink", questsString);
        
            //companion data
            var familyCsv = getFamilyCsv(cleanJson);
            var guildCsv = getGuildCsv(cleanJson);
            showCopyButton("familyCopyLink", familyCsv);
            showCopyButton("guildCopyLink", guildCsv);
            showCharacterCopyButtons(cleanJson);
        }
    });
}

function showCharacterCopyButtons(cleanJson){
    var numChars = cleanJson.characters.length;
            for(var i = 0; i < numChars; i++){
                var charData = getCharacterCsv(cleanJson, i);
                
                var container = document.getElementById("char" + i + "CopyLink");
                var a = document.createElement("a");
                a.innerHTML = "char" + (i+1);
                (function (_charData) {
                    a.addEventListener("click", function(){
                        copyTextToClipboard(_charData);
                    });
                })(charData);
                a.addEventListener("click", function(charData){
                    return function(){
                        copyTextToClipboard(charData);
                    }
                }(a));
                while (container.hasChildNodes()) {
                    container.removeChild(container.lastChild);
                }
                container.appendChild(a);

            }
}

function showCopyButton(elementId, dataString){
    var container = document.getElementById(elementId);
    var a = document.createElement("a");
    a.innerHTML = "copy";
    a.addEventListener("click", function(){
        copyTextToClipboard(dataString);
    });
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    container.appendChild(a);
}

function showDownloadButton(elementId, dataString, fileName){
    var data = "text/json;charset=utf-8," + encodeURIComponent(dataString);
    var a = document.createElement("a");
    a.href = "data:" + data;
    a.download = fileName;
    a.innerHTML = "download";
    var container = document.getElementById(elementId);
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    container.appendChild(a);
}

function showGuildCopyButton(){
    chrome.storage.local.get("data", function(result){
        if(result.data != null){
            var cleanJson = parseData(JSON.stringify(result));
            var familyData = getGuildCsv(cleanJson);
            var container = document.getElementById("guildCopyLink");
            var a = document.createElement("a");
            a.innerHTML = "copy";
            a.addEventListener("click", function(){
                copyTextToClipboard(familyData);
            });
            while (container.hasChildNodes()) {
                container.removeChild(container.lastChild);
            }
            container.appendChild(a);
        }
    });
}

function copyTextToClipboard(text) {
    var copyFrom = document.createElement("textarea");
    copyFrom.textContent = text;
    document.body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.blur();
    document.body.removeChild(copyFrom);
  }

