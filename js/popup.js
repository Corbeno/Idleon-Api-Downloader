updateAllButtons();
chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, {
        oldValue,
        newValue
    }] of Object.entries(changes)) {
        if (newValue != null) { // when save data changes, re-parse clean json with new save data and update buttons
            updateAllButtons();
        }
    }
});

function updateAllButtons() {
    chrome.storage.local.get("data", function (result) {
        if (result.data != null) {
            // Once the raw JSON is obtained, parse all needed data
            // then remove any buttons where the data fails to parse
            const content = document.getElementById('content');
            const loader = document.getElementById('loader');
            content.style.display = 'block';
            loader.style.display = 'none';

            // raw data
            const rawJson = result.data;
            const rawString = JSON.stringify(rawJson);

            // custom clean json
            const cleanJson = parseAnyData(parseData, rawJson);
            // cleanJson = null;
            const cleanString = JSON.stringify(cleanJson);

            //for looty spreadsheet
            const lootyString = rawJson.saveData.documentChange.document.fields.Cards1.stringValue.replace(/\"/g, "\\");

            // for quests spreadsheet
            var questsString = null;
            if (cleanJson != null) {
                questsString = JSON.stringify(cleanJson.account.quests);
            }

            // for idleon calculator spreadsheet
            const familyCsv = parseAnyData(getFamilyCsv, cleanJson);
            const guildCsv = parseAnyData(getGuildCsv, cleanJson);

            // for guild spreadsheet
            const guildExportCsvString = parseAnyData(guildExportCsv, cleanJson);

            // companion import data (coming soon! tm)
            const companionJson = companionParseData(cleanJson);
            const companionString = JSON.stringify(companionJson);

            const buttons = [
                { id: 'rawCopyLink', data: rawString },
                { id: 'cleanJsonCopyLink', data: cleanString },
                { id: 'lootyCopyLink', data: lootyString },
                { id: 'questsCopyLink', data: questsString },
                { id: 'familyCopyLink', data: familyCsv },
                { id: 'guildCopyLink', data: guildCsv },
                { id: 'companionCopyLink', data: companionString },
                { id: 'guildExportCsvCopyLink', data: guildExportCsvString },
            ];

            // add each character button to buttons
            for (let i = 0; i < 9; i++) {
                const charData = getCharacterCsv(cleanJson, i);
                const characters = document.querySelectorAll('.characters > li > a');
                buttons.push({ id: characters[i].id, data: charData })
            }

            // only show buttons with non-empty data
            buttons.forEach((buttonElement) => {
                const button = document.getElementById(buttonElement.id);
                const data = buttonElement.data;
                if (data === null || data === undefined || data === "null") {
                    console.info("Unable to display " + buttonElement.id + " probably due to a parsing error.");
                    const img = document.createElement('img');
                    img.src = 'assets/error.svg';
                    img.alt = 'parsing error';
                    button.appendChild(img);
                    return;
                }
                button.addEventListener("click", function (e) {
                    showTooltip(e, 'Copied!');
                    copyTextToClipboard(buttonElement.data);
                });
            });
            
            // TODO: RE-WRITE THIS FUNCTION
            allowDownloadButton("rawDownloadLink", rawString, "rawData.json")
            allowDownloadButton("cleanJsonDownloadLink", cleanString, "cleanData.json");
        }
    });
}

function parseAnyData(func, data) {
    try {
        return func(data);
    } catch (e) {
        console.error("Unable to parse function. Error was: " + e);
        return null;
    }
}

function copyTextToClipboard(text) {
    const el = document.createElement('textarea');
    el.value = text;
    // fix the stutter in the page when adding the new element to the page.
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

//TODO: RE-WRITE
function allowDownloadButton(elementId, dataString, fileName) {
    const downloadButton = document.getElementById(elementId);
    const data = "text/json;charset=utf-8," + encodeURIComponent(dataString);
    downloadButton.setAttribute('download', fileName);
    downloadButton.setAttribute('href', 'data:' + data);
    downloadButton.addEventListener('click', function (e) {
        showTooltip(e, 'Downloaded!');
    });
}

function showTooltip(e, text) {
    const tooltip = document.getElementById('tooltip');
    tooltip.innerText = text;
    if (e.clientX + 80 > window.innerWidth) {
        tooltip.style.top = e.clientY + 20 + 'px';
        tooltip.style.left = e.clientX - 60 + 'px';
    } else if (e.clientY + 50 > window.innerHeight) {
        tooltip.style.top = e.clientY - 50 + 'px';
        tooltip.style.left = e.clientX + 20 + 'px';
    } else {
        tooltip.style.top = e.clientY + 20 + 'px';
        tooltip.style.left = e.clientX + 20 + 'px';
    }
    tooltip.style.display = 'block';
    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 1000)
}
