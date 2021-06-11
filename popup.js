showRawJSONDownloadButton();
showLootyCopyButton();
showCleanJsonDownloadButtion();

chrome.storage.onChanged.addListener(function(changes, namespace){
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if(newValue != null){
            showRawJSONDownloadButton();
            showLootyCopyButton();
            showCleanJsonDownloadButtion();
        }
    }
});

function showRawJSONDownloadButton() {
    chrome.storage.local.get("data", function(result){
        if(result.data != null){
            var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result));

            var a = document.createElement("a");
            a.href = "data:" + data;
            a.download = "rawData.json";
            a.innerHTML = "download raw JSON";

            var container = document.getElementById("rawDownloadLink");
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
            a.href = "javascript:;";
            a.innerHTML = "copy looty string";
            a.addEventListener("click", function(){
                copyTextToClipboard(lootyString.replace(/\"/g, "\\"));
                a.innerHTML = "copied to clipboard!";
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
            a.innerHTML = "download clean JSON (incomplete)";

            var container = document.getElementById("cleanJsonDownloadLink");
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

//parses the raw json from the game into something more managable for easy modification and addition
//This is a work in progress and is not intended to work yet
function parseRawJSON(jsonData) {
    var fields = jsonData.documentChange.document.fields;
    var id = jsonData.documentChange.document.name.replace("projects/idlemmo/databases/(default)/documents/_data/","");
    var r = {"account": {"id" : id}};
    
    //chest
    var chestOrder = fields.ChestOrder.arrayValue.values
    var chestQuantity = fields.ChestQuantity.arrayValue.values;
    r.chest = {"numSlots" : chestQuantity.length}
    for(let i = 0; i < chestQuantity.length; i++){
        r.chest[i.toString()] = {};
        r.chest[i.toString()].item = chestOrder[i];
        r.chest[i.toString()].quantity = chestQuantity[i];
    }

    return r;
}

