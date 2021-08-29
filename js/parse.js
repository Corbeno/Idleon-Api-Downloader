// parses a raw json string of idleon save data and returns a json object that is much more usable
function parseData(rawJson) {
    var r = {};
    // var jsonData = JSON.parse(data);
    var fields = rawJson.saveData.documentChange.document.fields;

    var charNameData = rawJson.charNameData;

    // create each character based on blank template
    var numChars = Object.keys(charNameData).length;
    var characters = [];
    for (var i = 0; i < numChars; i++) {
        var newCharacter = JSON.parse(JSON.stringify(templateData.characters)); // easy way of cloning
        newCharacter.name = charNameData[i];
        characters.push(newCharacter);
    }
    r.characters = fillCharacterData(characters, numChars, fields);

    // account data
    r.account = fillAccountData(templateData.account, r.characters, fields);

    // currently left out of fillAccountData as it needs rawJson.guildInfo
    r.account.guild = fillGuildData(fields, rawJson.guildInfo);

    return r;
}

function fillGuildData(fields, guildInfo) {
    var r = {};
    r.memberInfo = fillGuildMemberData(guildInfo);
    r.bonuses = JSON.parse(fields.Guild.stringValue)[0];

    return r;
}

function fillGuildMemberData(guildInfo) {
    var keys = Object.keys(guildInfo);
    var cleanMembers = [];
    for (var i = 0; i < keys.length; i++) {
        var member = guildInfo[keys[i]];
        cleanMembers.push({
            "name": member.a,
            "level": member.d,
            "guildPoints": member.e,
            "accountId": keys[i],
            "class": mapLookup(classNumberMap, member.c),
            "rank": member.g,
            "wantedPerk": member.f
        });
    }
    return cleanMembers;
}

function fillAccountData(account, characters, fields) {
    account.chestBank = fields.MoneyBANK.doubleValue;

    // chest
    var chestOrder = fields.ChestOrder.arrayValue.values;
    var chestQuantity = fields.ChestQuantity.arrayValue.values;
    account.chest = condenseTwoRawArrays(chestOrder, chestQuantity, "item", "count", itemMap, null, false, true);

    // obols
    var rawObolNames = fields.ObolEqO1.arrayValue.values;

    var obolNames = condenseRawArray(rawObolNames, obolNameMap);
    var obolBonusMap = JSON.parse(fields.ObolEqMAPz1.stringValue);
    account.obols = formObolData(obolNames, obolBonusMap);

    // TaskZZ0 = Current milestone in uncompleted task
    // TaskZZ1 = Completed Task Count
    // TaskZZ2 = merit shop purchases
    // TaskZZ3 = crafts unlocked
    // TaskZZ4 = total unlock points & unspent merit points
    // TaskZZ5 = current daily tasks
    var taskData = templateData.account.tasks;
    // unlocked
    var ZZ1 = JSON.parse(fields.TaskZZ1.stringValue);
    taskData.unlocked.world1 = ZZ1[0];
    taskData.unlocked.world2 = ZZ1[1];
    taskData.unlocked.world3 = ZZ1[2];
    // milestoneProgress
    var ZZ0 = JSON.parse(fields.TaskZZ0.stringValue);
    taskData.milestoneProgress.world1 = ZZ0[0];
    taskData.milestoneProgress.world2 = ZZ0[1];
    taskData.milestoneProgress.world3 = ZZ0[2];
    // meritsOwned
    var ZZ2 = JSON.parse(fields.TaskZZ2.stringValue);
    taskData.meritsOwned.world1 = ZZ2[0];
    taskData.meritsOwned.world2 = ZZ2[1];
    taskData.meritsOwned.world3 = ZZ2[2];
    // craftsUnlocked
    var ZZ3 = JSON.parse(fields.TaskZZ3.stringValue);
    taskData.craftsUnlocked.world1 = ZZ3[0];
    taskData.craftsUnlocked.world2 = ZZ3[1];
    taskData.craftsUnlocked.world3 = ZZ3[2];
    account.tasks = taskData;

    // stamps
    var stampData = templateData.account.stamps;
    // combat
    var combatRaw = fields.StampLv.arrayValue.values[0].mapValue.fields;
    stampData.combat = condenseRawArray(combatRaw, null, true);
    // skills
    var skillsRaw = fields.StampLv.arrayValue.values[1].mapValue.fields;
    stampData.skills = condenseRawArray(skillsRaw, null, true);
    // misc
    var miscRaw = fields.StampLv.arrayValue.values[2].mapValue.fields;
    stampData.misc = condenseRawArray(miscRaw, null, true);
    account.stamps = stampData;

    // forge
    var forgeLevelRaw = fields.ForgeLV.arrayValue.values;
    account.forge.level = condenseRawArray(forgeLevelRaw, null, true);

    // alchemy
    var alchemyData = fields.CauldronInfo.arrayValue.values;
    account.alchemy.bubbleLevels.power = condenseRawArray(alchemyData[0].mapValue.fields, null, true);
    account.alchemy.bubbleLevels.quick = condenseRawArray(alchemyData[1].mapValue.fields, null, true);
    account.alchemy.bubbleLevels.highIq = condenseRawArray(alchemyData[2].mapValue.fields, null, true);
    account.alchemy.bubbleLevels.kazam = condenseRawArray(alchemyData[3].mapValue.fields, null, true);
    account.alchemy.vialLevels = condenseRawArray(alchemyData[4].mapValue.fields, null, true);

    // highest class data
    account.highestClasses = findHighestOfEachClass(characters);

    // minigame high scores
    var minigameHighscores = fields.FamValMinigameHiscores.arrayValue.values;
    account.minigameHighscores.chopping = parseInt(minigameHighscores[0].integerValue);
    account.minigameHighscores.fishing = parseInt(minigameHighscores[1].integerValue);
    account.minigameHighscores.catching = parseInt(minigameHighscores[2].integerValue);
    account.minigameHighscores.mining = parseInt(minigameHighscores[3].integerValue);

    // highest item counts
    account.highestItemCounts["Copper Ore"] = findHighestInStorage(account.chest, "Copper Ore");
    account.highestItemCounts["Oak Logs"] = findHighestInStorage(account.chest, "Oak Logs");
    account.highestItemCounts["Grass Leaf"] = findHighestInStorage(account.chest, "Grass Leaf");

    // cards
    var rawCardsData = JSON.parse(fields.Cards0.stringValue);
    var cleanCardData = {};
    var cardKeys = Object.keys(rawCardsData);
    for (var i = 0; i < cardKeys.length; i++) {
        var key = cardKeys[i];
        var lookup = mapLookup(mobMap, key);
        var count = parseInt(rawCardsData[key]);
        cleanCardData[lookup] = {
            "collected": count,
            "starLevel": getStarLevelFromCard(key, count)
        };
    }
    account.cards = cleanCardData;

    // bribes
    var bribes = fields.BribeStatus.arrayValue.values;
    account.bribes = condenseRawArray(bribes, null, true);
    // TODO add map for bribe names?

    // refinery
    account.refinery = createRefineryData(fields);

    // quests complete (possibly temporary for use in spreadsheet)
    var quests = {};
    for (var i = 0; i < Object.keys(account).length; i++) {
        var lookup = "QuestComplete_" + String(i);
        quests[lookup] = fields[lookup];
    }
    account.quests = quests;

    // looty mc shooty raw display
    var lootyString = fields.Cards1.stringValue;
    // remove all quotes and []
    lootyString = lootyString.replace(/\"|\[|\]/g, "");
    var lootyList = lootyString.split(",");
    account.looty = lootyList;

    // purchases
    var rawBundles = JSON.parse(fields.BundlesReceived.stringValue);
    account.bundlesPurchased = parseIntMapFields(rawBundles, true);

    return account;
}

function createRefineryData(fields) {
    // 0 =
    // 1 = inventory
    // 2 =
    // 3 = redox salt 
        // 3[0] = refined (unclaimed)
        // 3[1] = rank
        // 3[2] = ???
        // 3[3] = on/off 
        // 3[4] = auto-refine percent
    // 4 = explosive salt
    // 5 = spontaneity salt
    // 6 = dioxide salt
    // 7 = red salt
    // 8 = red salt 2
    var rawRefinery = JSON.parse(fields.Refinery.stringValue);
    var refinery = {};
    refinery.salts = {};
    
    //this is how they are named in the template file
    var salts = ["redox", "explosive", "spontaneity", "dioxide", "red", "red2"];
    salts.forEach((salt, i) => {
        // redox starts at index 3, so it has such an offset
        var rawSalt = rawRefinery[i+3];
        refinery.salts[salt] = {
            "refined": rawSalt[0],
            "rank": rawSalt[1],
            "state": ((rawSalt[3] == 1) ? "on" : "off"),
            "autoPercent": rawSalt[4]
        }

        //TODO add refinery storage
    })

    return refinery;
}

// grabs information from fields and inserts it into characters and returns the filled out characters
// only fills out information based on numChars given
function fillCharacterData(characters, numChars, fields) {
    for (var i = 0; i < numChars; i++) {
        characters[i].class = classIndexMap[parseInt(getAnyFieldValue(fields["CharacterClass_" + i]))];
        characters[i].money = parseInt(fields["Money_" + i].integerValue);
        characters[i].AFKtarget = fields["AFKtarget_" + i].stringValue;
        characters[i].currentMap = parseInt(getAnyFieldValue(fields["CurrentMap_" + i]));
        characters[i].npcDialogue = JSON.parse(fields["NPCdialogue_" + i].stringValue);
        characters[i].timeAway = parseInt(fields["PTimeAway_" + i].doubleValue);

        // basic stats
        var statlist = fields["PVStatList_" + i].arrayValue.values;
        characters[i].strength = parseInt(statlist[0].integerValue);
        characters[i].agility = parseInt(statlist[1].integerValue);
        characters[i].wisdom = parseInt(statlist[2].integerValue);
        characters[i].luck = parseInt(statlist[3].integerValue);
        characters[i].level = parseInt(statlist[4].integerValue);

        // personal PO box data
        characters[i].POBoxUpgrades = JSON.parse(fields["POu_" + i].stringValue);

        // inventory bags used
        var rawInvBagsUsed = JSON.parse(fields["InvBagsUsed_" + i].stringValue);
        var bags = Object.keys(rawInvBagsUsed);
        var invBagsUsed = [];
        for (var j = 0; j < bags.length; j++) {
            invBagsUsed.push({
                id: bags[j],
                name: itemMap['InvBag' + bags[j]]
            })
        }
        characters[i].invBagsUsed = invBagsUsed;

        // inventory
        var inventoryItemNames = fields["InventoryOrder_" + i].arrayValue.values;
        var inventoryItemCounts = fields["ItemQTY_" + i].arrayValue.values;
        characters[i].inventory = condenseTwoRawArrays(inventoryItemNames, inventoryItemCounts, "name", "count", itemMap, null, false, true);

        // equipment (0 = armor, 1 = tools, 2 = food)
        var equipableNames = fields["EquipOrder_" + i].arrayValue.values;
        var equipableCounts = fields["EquipQTY_" + i].arrayValue.values;

        var rawEquipmentNames = equipableNames[0].mapValue.fields;
        var rawEquipmentCounts = equipableCounts[0].mapValue.fields;
        var plainEquipmentData = condenseTwoRawArrays(rawEquipmentNames, rawEquipmentCounts, "name", "count", itemMap, null, false, true);
        // add upgrade stone data
        // IMm_# = players inventory (todo later as it isn't usefull for calculations)
        // EMm0_# = equips
        // EMm1_# = tools
        var equipmentStoneData = JSON.parse(fields["EMm0_" + i].stringValue);
        characters[i].equipment = addUpgradeStoneData(plainEquipmentData, equipmentStoneData);

        var rawToolNames = equipableNames[1].mapValue.fields;
        var rawToolCounts = equipableCounts[1].mapValue.fields;
        var plainToolData = condenseTwoRawArrays(rawToolNames, rawToolCounts, "name", "count", itemMap, null, false, true);
        var toolStoneData = JSON.parse(fields["EMm1_" + i].stringValue);
        characters[i].tools = addUpgradeStoneData(plainToolData, toolStoneData);

        var rawFoodNames = equipableNames[2].mapValue.fields;
        var rawFoodCounts = equipableCounts[2].mapValue.fields;
        characters[i].food = condenseTwoRawArrays(rawFoodNames, rawFoodCounts, "name", "count", itemMap, null, false, true);

        // obols
        var rawObols = fields["ObolEqO0_" + i].arrayValue.values;
        var obolNames = condenseRawArray(rawObols, obolNameMap);
        var obolMap = JSON.parse(fields["ObolEqMAP_" + i].stringValue);
        characters[i].obols = formObolData(obolNames, obolMap);

        // statues
        var statueArray = JSON.parse(fields["StatueLevels_" + i].stringValue);
        var statueItems = [];
        for (var j = 0; j < statueArray.length; j++) {
            statueItems.push({
                "level": parseInt(statueArray[j][0]),
                "progress": statueArray[j][1]
            });
        }
        characters[i].statueLevels = statueItems;

        // cards
        var cardsArray = fields["CardEquip_" + i].arrayValue.values;
        characters[i].cardsEquip = condenseRawArray(cardsArray, cardEquipMap);

        // card set
        var rawCardSet = fields["CSetEq_" + i].stringValue;
        var cardSetName = "None";
        if (rawCardSet != "{}") {
            cardSetName = Object.keys(JSON.parse(rawCardSet))[0];
        }
        characters[i].cardSetEquip = cardSetMap[cardSetName];

        // skill levels
        var rawSkillLevels = fields["Lv0_" + i].arrayValue.values;
        var unmappedSkillLevels = condenseRawArray(rawSkillLevels);
        var mappedSkillLevels = {};
        for (var j = 0; j < unmappedSkillLevels.length; j++) {
            var level = parseInt(unmappedSkillLevels[j]);
            if (level == -1) {
                continue;
            }
            mappedSkillLevels[skillIndexMap[j]] = level;
        }
        characters[i].skillLevels = mappedSkillLevels;

        // star signs
        var rawStarSignData = fields["PVtStarSign_" + i].stringValue;
        var starSignSplit = rawStarSignData.split(",");
        for (var j = 0; j < starSignSplit.length; j++) {
            starSignSplit[j] = starSignSplit[j].replace(/_/, "-1");
            if (starSignSplit[j] == "") {
                starSignSplit[j] = "-1";
            }
        }
        var starSign1 = starSignMap[parseInt(starSignSplit[0])] || "None";
        var starSign2 = starSignMap[parseInt(starSignSplit[1])] || "None";
        var starSignFinal = [starSign1, starSign2];
        characters[i].starSigns = starSignFinal;

        // talents
        var unmappedTalents = JSON.parse(fields["SL_" + i].stringValue);
        var unmappedTalentsKeys = Object.keys(unmappedTalents);
        var mappedTalents = {};
        // change keys to their talent name
        for (var j = 0; j < unmappedTalentsKeys.length; j++) {
            var key = unmappedTalentsKeys[j];
            mappedTalents[talentMap[parseInt(key)]] = unmappedTalents[key];
        }
        // regular talents
        var talentPages = classTalentMap[characters[i].class];
        var orderedClassTalents = [];
        var indexedTalents = {};
        for (var j = 0; j < talentPages.length; j++) {
            var talents = classTalentPageMap[talentPages[j]];
            orderedClassTalents = orderedClassTalents.concat(talents);
        }
        for (var k = 0; k < orderedClassTalents.length; k++) {
            indexedTalents[k] = mappedTalents[orderedClassTalents[k]];
        }
        characters[i].talentLevels = indexedTalents;
        // star talents
        var starTalentList = classTalentPageMap["Star Talents"];
        var starTalentIndexed = [];
        for (var j = 0; j < starTalentList.length; j++) {
            if (starTalentList[j] == "FILLER") {
                starTalentIndexed.push(0);
            } else {
                var toPush = mappedTalents[starTalentList[j]];
                if (toPush == null) {
                    starTalentIndexed.push(0);
                } else {
                    starTalentIndexed.push(toPush);
                }
            }
        }
        characters[i].starTalentLevels = starTalentIndexed;

        // talent attack loadout
        var unmappedLoadoutRaw = JSON.parse(fields["AttackLoadout_" + i].stringValue);
        // merge them all into one array
        var unmappedLoadout = [];
        for (var j = 0; j < unmappedLoadoutRaw.length; j++) {
            unmappedLoadout = unmappedLoadout.concat(unmappedLoadoutRaw[j]);
        }
        // change talent IDs to their in-game names
        var mappedLoadout = [];
        for (var j = 0; j < unmappedLoadout.length; j++) {
            var talentId = unmappedLoadout[j];
            if (talentId == "Null") {
                continue;
            }
            mappedLoadout.push(talentMap[talentId]);
        }
        // change talent names to their readable form
        for (var j = 0; j < mappedLoadout.length; j++) {
            var word = mappedLoadout[j];
            mappedLoadout[j] = word.toLowerCase().split("_").map(capitalize).join(" ");
        }
        characters[i].attackLoadout = mappedLoadout;

        // fishing toolkit
        characters[i].fishingToolkitEquipped.bait = fishingBaitMap[parseInt(fields["PVFishingToolkit_" + i].arrayValue.values[0].integerValue)];
        characters[i].fishingToolkitEquipped.line = fishingLineMap[parseInt(fields["PVFishingToolkit_" + i].arrayValue.values[1].integerValue)];

        // equipped bubbles
        var charEquippedBubbles = JSON.parse(fields.CauldronBubbles.stringValue)[i];
        characters[i].bubblesEquipped = [
            mapLookup(largeBubbleMap, charEquippedBubbles[0]),
            mapLookup(largeBubbleMap, charEquippedBubbles[1])
        ]

        // anvil
        var rawAnvil = fields["AnvilPA_" + i].arrayValue.values;
        // [0-13] of rawAnvil are each anvil product
        // of each product...
        // 0 = amount to be produced (claimed)
        // 1 = amount of xp gained when claimed
        // 2 = current progress? (idk need more proof but also kinda useless)
        // 3 = ???
        var anvilProducts = [];
        for(var j = 0; j < rawAnvil.length; j++){
            var rawProductStats = rawAnvil[j].mapValue.fields;
            anvilProducts.push({
                "produced": parseInt(getAnyFieldValue(rawProductStats[0])),
                "xp": parseInt(getAnyFieldValue(rawProductStats[1]))
            });
        }
        characters[i].anvil.production = anvilProducts;
        // TODO anvil stats (data isn't very clear, might need to ask)

    }
    return characters;
}

function formObolData(nameList, bonusesMap) {
    var r = [];
    // apply all name information
    for (var name in nameList) {
        r.push({ name: nameList[name], bonus: {} });
    }

    // go through each key and add bonuses if needed
    var keys = Object.keys(bonusesMap);
    for (var i = 0; i < keys.length; i++) {
        var index = parseInt(keys[i]);
        r[index].bonus = bonusesMap[keys[i]];
    }

    return r;
}

function getStarLevelFromCard(cardName, cardLevel) {
    var base = cardLevelMap[cardName];
    var level = parseInt(cardLevel);
    var oneStarReq = base;
    var twoStarReq = base * 4;
    var threeStarReq = base * 9;
    if (level == 0) {
        return "Not Found";
    } else if (level >= threeStarReq) {
        return "3 Star";
    } else if (level >= twoStarReq) {
        return "2 Star";
    } else if (level >= oneStarReq) {
        return "1 Star";
    } else {
        return "Acquired";
    }
}

function findHighestInStorage(chestData, itemName) {
    var max = 0;
    for (var i = 0; i < chestData.length; i++) {
        var object = chestData[i];
        if (object.item == itemName && parseInt(object.count) > max) {
            max = parseInt(object.count);
        }
    }
    return max;
}

function findHighestOfEachClass(characters) { // create base map of characters
    var baseCharacters = [];
    for (var i = 0; i < characters.length; i++) {
        var charClass = characters[i].class;
        var charLevel = parseInt(characters[i].level);
        baseCharacters.push({ [charClass]: charLevel });
        var baseChar = charSubclassMap[charClass];
        if (baseChar != null) {
            baseCharacters.push({ [baseChar]: charLevel });
        }
    }

    var map = new Map();
    var uniqueClasses = [];
    for (var i = 0; i < baseCharacters.length; i++) {
        var charClass = Object.keys(baseCharacters[i])[0];
        var charLevel = baseCharacters[i][charClass];
        if (map.has(charClass)) {
            map.get(charClass).push(charLevel);
        } else { // create new
            var arr = [];
            arr.push(charLevel);
            map.set(charClass, arr);
            uniqueClasses.push(charClass);
        }
    }

    // go through the map and pick the highest value, adding it to r
    var indexedHighestClasses = {};
    for (var i = 0; i < uniqueClasses.length; i++) {
        var addClass = uniqueClasses[i];
        var addLevel = Math.max(...map.get(addClass));
        indexedHighestClasses[addClass] = addLevel;
    }
    return indexedHighestClasses;
}

function addUpgradeStoneData(itemList, stoneData) {
    var blankData = {
        "Defence": 0,
        "WIS": 0,
        "STR": 0,
        "LUK": 0,
        "Weapon_Power": 0,
        "AGI": 0,
        "Reach": 0,
        "Upgrade_Slots_Left": 0,
        "Power": 0,
        "Speed": 0,
        "UQ1val": 0
    }

    // add blank data to everything in the list first
    for (var i = 0; i < itemList.length; i++) {
        itemList[i]["stoneData"] = blankData;
    }

    // go through stone data and add any that need to be added
    var keys = Object.keys(stoneData);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        // (hacky fix) some weapon power is stored as "Weapon_Power" instead of "Power"
        // if that happens, just add "Power" with the same value
        if (Object.keys(stoneData[key]).includes("Weapon_Power")) {
            stoneData[key]["Power"] = stoneData[key]["Weapon_Power"];
        }

        itemList[parseInt(key)]["stoneData"] = stoneData[key];
    }
    return itemList;
}

// some lists are stored as maps. This function turns them into actual lists
function turnMapToList(map, toInt = false) {
    var r = [];
    for (var key in Object.keys(map)) {
        if (toInt) {
            r.push(parseInt(key));
        } else {
            r.push(key);
        }
    }
    return r;
}

// forces each field of a map to be an integer or null
function parseIntMapFields(map) {
    var r = {};
    var keys = Object.keys(map);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        r[key] = parseInt(map[key]);
    }
    return r;
}

// take two raw arrays and get the first (and only) mapped object from each element in the array and combine it with
// the second specified array in the same manner, but in a new array of maps with fields specified with field1 and field2
// an optional toInt1 and toInt2 can be specified to ensure field data is an integer
function condenseTwoRawArrays(raw1, raw2, field1, field2, map1 = null, map2 = null, toInt1 = false, toInt2 = false) {
    var r = [];
    var length = raw1.length.integerValue;
    if (length == undefined) {
        length = raw1.length;
    }
    for (var i = 0; i < length; i++) {
        var element1 = raw1[i];
        var element2 = raw2[i];
        var val1 = element1[Object.keys(element1)[0]];
        var val2 = element2[Object.keys(element2)[0]];
        if (map1 != null) {
            val1 = mapLookup(map1, val1);
        }
        if (map2 != null) {
            val2 = mapLookup(map2, val2);
        }
        if (toInt1) {
            val1 = parseInt(val1);
        }
        if (toInt2) {
            val2 = parseInt(val2);
        }
        r.push({ [field1]: val1, [field2]: val2 });
    }
    return r;
}

function condenseRawArray(rawArray, map = null, toInt = false) {
    var r = [];
    var length = rawArray.length.integerValue;
    if (length == undefined) {
        length = rawArray.length;
    }
    for (var i = 0; i < length; i++) {
        var element = rawArray[i];
        var val = element[Object.keys(element)[0]];
        if (map != null) {
            val = mapLookup(map, val);
        }
        if (toInt) {
            val = parseInt(val);
        }
        r.push(val);
    }
    return r;
}

// look up an item in a specified map. Useful to find unmapped items easily
function mapLookup(map, key) {
    var r = map[key];
    if (r == undefined) {
        console.error("Unable to find key: " + key + " in map");
    }
    return r;
}

// gets the first value of a given field
function getAnyFieldValue(field) {
    return String(field[Object.keys(field)[0]]);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
