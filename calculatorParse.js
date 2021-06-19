
function getFamilyCsv(cleanJson){
    return listToString(createFamilyList(cleanJson.account));
}

function getGuildCsv(cleanJson){
    return listToString(createGuildList(cleanJson.account));
}

function getCharacterCsv(cleanJson, index){
    return listToString(createCharacterList(cleanJson.characters[index]));
}

function listToString(list){
    var str = "";
    for(var i = 0; i < list.length; i++){
        str += list[i] + "\n";
    }
    return str;
}

function skip(pushList, numberOfSkips){
    for(var i = 0; i < numberOfSkips; i++){
        pushList.push(" ");
    }
}

function createGuildList(account){
    var list = [];

    //bonuses
    for(var i = 0; i < 18; i++){
        list.push(account.guild.bonuses[i]);
    }

    return list;
}

function createFamilyList(account){
    var list = [];
    
    //levels
    var highestLevels = account.highestClasses;
    list.push(0); //Infinilyte
    list.push(0); //Maestro
    list.push(0); //Virtuoso
    list.push(highestLevels.Journeyman || 0);
    list.push(0); //Filler
    list.push(0); //Filler
    list.push(0); //Filler
    list.push(0); //Filler
    list.push(0); //Blood Berserker
    list.push(0); //Death Bringer
    list.push(0); //Divine Knight
    list.push(0); //Royal Guardian
    list.push(highestLevels.Barbarian || 0);
    list.push(highestLevels.Squire || 0);
    list.push(highestLevels.Warrior || 0);
    list.push(0); //Filler
    list.push(0); //Filler
    list.push(0); //Filler
    list.push(0); //Filler
    list.push(0); //Siege Breaker
    list.push(0); //Mayheim
    list.push(0); //Wind Walker
    list.push(0); //Beast Master
    list.push(highestLevels.Bowman || 0);
    list.push(highestLevels.Hunter || 0);
    list.push(highestLevels.Archer || 0);
    list.push(0); //Filler
    list.push(0); //Filler
    list.push(0); //Filler
    list.push(0); //Filler
    list.push(0); //Arcane Cultist
    list.push(0); //Bubonic Conjuror
    list.push(0); //Spiritual Monk
    list.push(0); //Elemental Sorcerer
    list.push(highestLevels.Wizard || 0);
    list.push(highestLevels.Shaman || 0);
    list.push(highestLevels.Mage || 0);
    list.push(highestLevels.Beginner || 0);
    
    //higest items
    var highestItemCounts = account.highestItemCounts;
    list.push(highestItemCounts["Copper Ore"]);
    list.push(highestItemCounts["Oak Logs"]);
    list.push(highestItemCounts["Grass Leaf"]);

    //highest scores
    var highScores = account.minigameHighscores;
    list.push(highScores.mining);
    list.push(highScores.chopping);
    list.push(highScores.fishing);
    list.push(highScores.catching);

    //bribe "Sleeping on the Job" (most likely to move)
    list.push(account.bribes[3]);
    //W2 AFK Gains Merit
    list.push("0"); //TODO
    
    //cards
    var cards = account.cards;
    var cardList = [
        cards["Green Mushroom"],
        cards["Red Mushroom"], 
        cards["Frog"], 
        cards["Bored Bean"], 
        cards["Slime"], 
        cards["Baby Boa"], 
        cards["Carrotman"], 
        cards["Glublin"], 
        cards["Wode Board"],
        cards["Gigafrog"], 
        cards["Poop"], 
        cards["Rat"], 
        cards["Walking Stick"],
        cards["Nutto"], 
        cards["Crystal Carrot"], 
        cards["Wood Mushroom"], 
        
        cards["Sandy Pot"], 
        cards["Mimic"], 
        cards["Crabcake"], 
        cards["Mafioso"], 
        cards["Sand Castle"], 
        cards["Pincermin"], 
        cards["Mashed Potato"], 
        cards["Tyson"], 
        cards["Moonmoon"], 
        cards["Sand Giant"], 
        cards["Snelbie"], 
        cards["Dig Doug"], 
        cards["Crystal Crabal"], 
        cards["Bandit Bob"],
        "Filler",
        "Filler",
        
        cards["Copper"],
        cards["Iron"],
        cards["Gold"],
        cards["Fire Forge"],
        cards["Oak Tree"],
        cards["Birch Tree"],
        cards["Jungle Tree"],
        cards["Forest Tree"],
        cards["Goldfish"],
        cards["Hermit Can"],
        cards["Jellyfish"],
        cards["Flies"],
        cards["Butterflies"],
        "Filler",
        "Filler",
        "Filler",
        
        cards["Plat"],
        cards["Dementia"],
        cards["Void"],
        cards["Cinder Forge"],
        cards["Palm Tree"],
        cards["Toilet Tree"],
        cards["Stump Tree"],
        cards["Bloach"],
        cards["Sentient Cereal"],
        cards["Fruitflies"],
        cards["Forest Soul"],
        cards["Dune Soul"],
        cards["Froge"],
        cards["Crabbo"],
        cards["Scorpie"],
        "Filler",

        cards["Sheepie"],
        cards["Frost Flake"],
        cards["Sir Stache"],
        cards["Bloque"],
        cards["Mamooth"],
        cards["Snowman"],
        cards["Penguin"],
        cards["Thermister"],
        cards["Quenchie"],
        cards["Cryosnake"],
        cards["Bop Box"],
        cards["Neyeptune"],
        cards["Dedotated Ram"],
        cards["Xylobone"],
        cards["Bloodbone"],
        cards["Crystal Cattle"],

        cards["Wispy Tree"],
        cards["Rooted Soul"],
        cards["Frigid Soul"],
        cards["Squiddy Soul"],
        cards["Mousey"],
        cards["Owlio"],
        cards["Pingy"],
        cards["Bunny"],
        cards["Lustre"],
        cards["Saharan Foal"],
        cards["Mosquisnow"],
        cards["Flycicle"],
        "Filler",
        "Filler",
        "Filler",
        "Filler",
        
        cards["Baba Yaga"],
        cards["Dr Defecaus"],
        cards["Boop"],
        cards["Amarok"],
        cards["Chaotic Amarok"],
        cards["Biggie Hours"],
        cards["King Doot"],
        cards["Efaunt"],
        cards["Chaotic Efaunt"],
        cards["Chizoar"],
        cards["Chaotic Chizoar"],
        "Filler",
        "Filler",
        "Filler",
        "Filler",
        "Filler",

        cards["Giftmas Blobulyte"],
        cards["Ghost"],
        cards["Meaning of Giftmas"],
        cards["Valentslime"],
        cards["Loveulyte"],
        cards["Chocco Box"],
        cards["Floofie"],
        cards["Shell Snake"],
        cards["Egggulyte"],   //AE26
        cards["Egg Capsule"], //AH26
        "Filler", //AK26
        "Filler", //AN26
        "Filler", //QT26
        "Filler", //AT26
        "Filler", //AW26
        "Filler" //E6
    ];

    for(var i = 0; i < cardList.length; i++){
        if(cardList[i] == undefined || cardList[i] == "Filler"){
            list.push("Not Found");
        }else{
            list.push(cardList[i].starLevel);
        }
    }

    //stamps
    var stamps = account.stamps;
    //combat (28)
    for(var i = 0; i < 28; i++){
        list.push(stamps.combat[i]);
    }
    //skills (36)
    for(var i = 0; i < 36; i++){
        list.push(stamps.skills[i]);
    }
    //misc (20)
    for(var i = 0; i < 20; i++){
        list.push(stamps.misc[i]);
    }

    //alchemy
    var alchemy = account.alchemy;
    //power
    for(var i = 0; i < 15; i++){
        list.push(alchemy.bubbleLevels.power[i]);
    }
    //quicc
    for(var i = 0; i < 15; i++){
        list.push(alchemy.bubbleLevels.quick[i]);
    }
    //high-iq
    for(var i = 0; i < 15; i++){
        list.push(alchemy.bubbleLevels.highIq[i]);
    }
    //kazam
    for(var i = 0; i < 15; i++){
        list.push(alchemy.bubbleLevels.kazam[i]);
    }

    //vials (41)
    for(var i = 0; i < 41; i++){
        list.push(alchemy.vialLevels[i]);
    }

    //obols
    var obolOrder = [0,23,4,19,2,1,3,18,22,6,20,21,5,9,8,14,10,7,13,17,11,15,12,16];
    for(var i = 0; i < obolOrder.length; i++){
        list.push(account.obols[obolOrder[i]]);
    }

    return list;
}

//create a list based on a given character that coorsponds to 
//each row in the character column in the spreadsheet
function createCharacterList(character){
    var list = [];

    list.push(character.class);

    var skillLevels = character.skillLevels;
    list.push(skillLevels.character);
    list.push(skillLevels.mining);
    list.push(skillLevels.smithing);
    list.push(skillLevels.chopping);
    list.push(skillLevels.fishing);
    list.push(skillLevels.alchemy);
    list.push(skillLevels.catching);
    list.push(skillLevels.trapping);
    list.push(skillLevels.construction);
    list.push(skillLevels.worship);
    skip(list, 15);

    //talents (non-star)
    //75 total slots
    var skillsKeys = Object.keys(character.talentLevels)
    var j = 0;
    for(; j < skillsKeys.length; j++){
        var talentLevel = character.talentLevels[j];
        if(talentLevel == undefined){
            list.push("0");
        }else{
            list.push(character.talentLevels[j]);
        }
    }
    skip(list, 75 - j); 

    //star talents
    //65 slots
    var starTalents = character.starTalentLevels;
    j = 0;
    for(; j < starTalents.length; j++){
        list.push(starTalents[j]);
    }
    skip(list, 65 - j);

    //next 12 are equipped abilities
    var attackLoadout = character.attackLoadout;
    j = 0;
    for(; j < attackLoadout.length; j++){
        list.push(attackLoadout[j]);
    }
    skip(list, 12 - j);

    //next is the focused ability, so im just picking one that exists on every class
    list.push("Health Booster");

    //equipment
    var equipment = character.equipment;
    var stoneData = [];
    //first 8 are in order
    for(var k = 0; k < 8; k++){
        list.push(equipment[k].name);
        stoneData.push(equipment[k].stoneData);
    }
    //the rest aren't...
    list.push(equipment[8].name);
    stoneData.push(equipment[8].stoneData);
    list.push(equipment[10].name);
    stoneData.push(equipment[10].stoneData);
    list.push(equipment[13].name);
    stoneData.push(equipment[13].stoneData);

    //tools
    var tools = character.tools;
    for(var k = 0; k < 6; k++){
        list.push(tools[k].name);
        stoneData.push(tools[k].stoneData);
    }

    //go through stoneData and create a long list of every stat,
    //filling in 0 for none that exist
    var expandedStoneData = [];
    for(var k = 0; k < stoneData.length; k++){
        var data = stoneData[k];
        var tmp = [];
        tmp.push(data["Power"]);
        tmp.push(data["STR"]);
        tmp.push(data["AGI"]);
        tmp.push(data["WIS"]);
        tmp.push(data["LUK"]);
        tmp.push(data["Defence"]);
        tmp.push(data["UQ1val"]); //unique stat bonus
        tmp.push(undefined); //empty
        for(var l = 0; l < tmp.length; l++){
            if(tmp[l] == undefined || tmp[l] == null){
                tmp[l] = 0;
            }
        }
        expandedStoneData = expandedStoneData.concat(tmp);
    }
    //push that stoneData list to list
    for(var k = 0; k < expandedStoneData.length; k++){
        list.push(expandedStoneData[k]);
    }

    //food
    //name, count, name, count, etc
    for(var k = 0; k < 4; k++){
        var food = character.food[k];
        list.push(food.name);
        list.push(food.count);
    }
    
    //star signs
    var starSigns = character.starSigns;
    list.push(starSigns[0]);
    list.push(starSigns[1]);

    //bait/line
    list.push(character.fishingToolkitEquipped.bait);
    list.push(character.fishingToolkitEquipped.line);

    //cards (player equipped)
    for(var k = 0; k < 8; k++){
        var card = character.cardsEquip[k];
        if(card == "B"){ //nothing equipped
            list.push("None");
        }else{
            list.push(card);
        }
    }

    //card set
    list.push(character.cardSetEquip);

    //statues
    //only do first 15
    var statues = character.statueLevels
    for(var k = 0; k < 15; k++){
        list.push(statues[k].level);
    }

    //obols (21)
    var obols = character.obols;
    // 1,5,0,3,8,4,16,17,20,15,2,14,18,6,13,7,12,19,9,10,11
    list.push(obols[1]);
    list.push(obols[5]);
    list.push(obols[0]);
    list.push(obols[3]);
    list.push(obols[8]);
    list.push(obols[4]);
    list.push(obols[16]);
    list.push(obols[17]);
    list.push(obols[20]);
    list.push(obols[15]);
    list.push(obols[2]);
    list.push(obols[14]);
    list.push(obols[18]);
    list.push(obols[6]);
    list.push(obols[13]);
    list.push(obols[7]);
    list.push(obols[12]);
    list.push(obols[19]);
    list.push(obols[9]);
    list.push(obols[10]);
    list.push(obols[11]);

    //Post Office Boxes
    var boxes = character.POBoxUpgrades;
    for(var k = 0; k < 12; k++){
        list.push(boxes[k]);
    }

    //Target afk locations
    //default to lowest target. Better to fill something then nothing
    list.push("Blunder Hills - Grasslands");
    list.push("Spore Meadows - Green Mushroom");
    list.push("Copper");
    list.push("Oak Tree");
    list.push("Salty Shores - Right");
    list.push("Flies");

    return list;
}