showRawJSONDownloadButton();

chrome.storage.onChanged.addListener(function(changes, namespace){
    console.log("changes detected: "  + changes.stringify);
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if(newValue != null){
            showRawJSONDownloadButton();
        }
    }
});

function showRawJSONDownloadButton() {
    chrome.storage.local.get("data", function(result){
        if(result.data != null){
            var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result));

            var a = document.createElement('a');
            a.href = 'data:' + data;
            a.download = 'data.json';
            a.innerHTML = 'download raw JSON';

            var container = document.getElementById('container');
            while (container.hasChildNodes()) {
                container.removeChild(container.lastChild);
            }
            container.appendChild(a);
        }
    });
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