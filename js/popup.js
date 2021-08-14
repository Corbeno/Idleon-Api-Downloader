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
        if (result.data != null) { // save data
            const rawJson = result.data;
            const rawString = JSON.stringify(rawJson);
            // TODO: RE-WRITE THIS FUNCTION
            allowDownloadButton("rawDownloadLink", rawString, "rawData.json")

            const cleanJson = parseData(rawJson);
            const cleanString = JSON.stringify(cleanJson);
            const lootyString = rawJson.saveData.documentChange.document.fields.Cards1.stringValue.replace(/\"/g, "\\");
            const questsString = JSON.stringify(cleanJson.account.quests);
            // Calculators
            const familyCsv = getFamilyCsv(cleanJson);
            const guildCsv = getGuildCsv(cleanJson);
            const guildExportCsvString = guildExportCsv(cleanJson);

            // Enable copy for everything
            const elementsArr = [
                { id: 'rawCopyLink', data: rawString },
                { id: 'cleanJsonCopyLink', data: cleanString },
                { id: 'lootyCopyLink', data: lootyString },
                { id: 'questsCopyLink', data: questsString },
                { id: 'familyCopyLink', data: familyCsv },
                { id: 'guildCopyLink', data: guildCsv },
                { id: 'guildExportCsvCopyLink', data: guildExportCsvString },
            ];
            allowCopyClick(elementsArr);
            allowCharactersCopy(cleanJson);

            // TODO: RE-WRITE THIS FUNCTION
            allowDownloadButton("cleanJsonDownloadLink", cleanString, "cleanData.json");

            // // companion import data (coming soon! tm)
            // const companionJson = companionParseData(cleanJson);
            // const companionString = JSON.stringify(companionJson);
            // showCopyButton("companionCopyLink", companionString);

            // Display a loader until the data is ready
            const content = document.getElementById('content');
            const loader = document.getElementById('loader');
            content.style.display = 'block';
            loader.style.display = 'none';
        }
    });
}

function allowCopyClick(elementsIds) {
    elementsIds.forEach((element) => {
        const button = document.getElementById(element.id);
        button.addEventListener("click", function (e) {
            showTooltip(e, 'Copied!');
            copyTextToClipboard(element.data);
        });
    })
}
function allowCharactersCopy(dataString) {
    const numChars = dataString.characters.length;
    for (let i = 0; i < numChars; i++) {
        const charData = getCharacterCsv(dataString, i);
        const characters = document.querySelectorAll('.characters > li > a');
        characters[i].addEventListener('click', function (e) {
            showTooltip(e, 'Copied!');
            copyTextToClipboard(charData);
        });
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