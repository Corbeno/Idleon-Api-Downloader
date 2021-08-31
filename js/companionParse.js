// parses clean json into data suited for Idleon Companion
function companionParseData(cleanData) {
    var r = {};
    r.alchemy = parseCompanionAlchemy(cleanData);

    r.cards = parseCompanionCards(cleanData);

    r.chars = [];
    r.checklist = {};
    r.starSigns = {};
    r.tasks = {};
    r.version = "0.2.3"; // unsure if this should be hardcoded
    return r;
}

function parseCompanionCards(clean) {
    var r = {};
    var rawCards = clean.account.cards;
    for (var cardName in rawCards) {
        // TODO this should probably be changed to use underscores in clean parse,
        // but I'm too lazy right now to do so..
        var newKey = cardName.replace(" ", "_");
        r[newKey] = parseInt(rawCards[cardName].collected);
    }

    return r;
}

function parseCompanionAlchemy(clean) {
    var r = {
        "alchemy":{
            "upgrades":{
                "Orange":[],
                "Green":[],
                "Purple":[]
            },
            "vials":[]
            },
    };
}
