showRawJSONCopyButton();
showRawJSONDownloadButton();
showLootyCopyButton();
showCleanJsonCopyButton();
showCleanJsonDownloadButtion();
showFamilyCopyButton();
showGuildCopyButton();
showCharacterCopyButtons();

chrome.storage.onChanged.addListener(function(changes, namespace){
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if(newValue != null){
            showRawJSONCopyButton();
            showRawJSONDownloadButton();
            showLootyCopyButton();
            showCleanJsonCopyButton();
            showCleanJsonDownloadButtion();
            showFamilyCopyButton();
            showGuildCopyButton();
            showCharacterCopyButtons()
        }
    }
});


function showRawJSONCopyButton(){
    chrome.storage.local.get("data", function(result){
        if(result.data != null){
            var container = document.getElementById("rawCopyLink");
            var a = document.createElement("a");
            a.innerHTML = "copy";
            a.addEventListener("click", function(){
                copyTextToClipboard(JSON.stringify(result.data));
            });
            while (container.hasChildNodes()) {
                container.removeChild(container.lastChild);
            }
            container.appendChild(a);
        }
    });
}

function showRawJSONDownloadButton() {
    chrome.storage.local.get("data", function(result){
        if(result.data != null){
            var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result));

            var a = document.createElement("a");
            a.href = "data:" + data;
            a.download = "rawData.json";
            a.innerHTML = "download";

            var container = document.getElementById("rawDownloadLink");
            while (container.hasChildNodes()) {
                container.removeChild(container.lastChild);
            }
            container.appendChild(a);
        }
    });
}

function showCleanJsonCopyButton(){
    chrome.storage.local.get("data", function(result){
        if(result.data != null){
            var cleanJson = parseData(JSON.stringify(result));
            var container = document.getElementById("cleanJsonCopyLink");
            var a = document.createElement("a");
            a.innerHTML = "copy";
            a.addEventListener("click", function(){
                copyTextToClipboard(JSON.stringify(cleanJson));
            });
            while (container.hasChildNodes()) {
                container.removeChild(container.lastChild);
            }
            container.appendChild(a);
        }
    });
}

function showCleanJsonDownloadButtion() {
    chrome.storage.local.get("data", function(result){
        if(result.data != null){
            // var cleanJson = parser.parseData(JSON.stringify(result));
            var cleanJson = parseData(JSON.stringify(result));
            var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cleanJson));

            var a = document.createElement("a");
            a.href = "data:" + data;
            a.download = "cleanData.json";
            a.innerHTML = "download";

            var container = document.getElementById("cleanJsonDownloadLink");
            while (container.hasChildNodes()) {
                container.removeChild(container.lastChild);
            }
            container.appendChild(a);
        }
    });
}

function showLootyCopyButton() {
    chrome.storage.local.get("data", function(result){
        if(result.data != null){
            var lootyString = result.data.saveData.documentChange.document.fields.Cards1.stringValue;
            var container = document.getElementById("lootyCopyLink");
            var a = document.createElement("a");
            a.innerHTML = "copy";
            a.addEventListener("click", function(){
                copyTextToClipboard(lootyString.replace(/\"/g, "\\"));
            });
            while (container.hasChildNodes()) {
                container.removeChild(container.lastChild);
            }
            container.appendChild(a);
        }
    });
}

function showFamilyCopyButton(){
    chrome.storage.local.get("data", function(result){
        if(result.data != null){
            var cleanJson = parseData(JSON.stringify(result));
            var familyData = getFamilyCsv(cleanJson);
            var container = document.getElementById("familyCopyLink");
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

function showCharacterCopyButtons(){
    chrome.storage.local.get("data", function(result){
        if(result.data != null){
            var cleanJson = parseData(JSON.stringify(result));
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
                console.log(i);
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

