//for parsing the "clean" json to a csv format that idleon calculator can use
//this one is going to change a lot...

function parseToCsv(cleanJson){ 
    var charCsvList = [];
    var characters = cleanJson.characters;
    //for each character, create a list of strings to turn into a csv
    for(var i = 0; i < characters.length; i++){
        var list = [];
        
        list.push(characters[i].class);
        /*class
        mining
        smithing
        chopping
        fishing
        alchemy
        bug catch
        traping
        construction
        worship */
        var skillLevels = characters[i].skillLevels;
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
        var skillsKeys = Object.keys(characters[i].talentLevels)
        var j = 0;
        for(; j < skillsKeys.length; j++){
            var talentLevel = characters[i].talentLevels[j];
            if(talentLevel == undefined){
                list.push("0");
            }else{
                list.push(characters[i].talentLevels[j]);
            }
        }
        skip(list, 75 - j); //TODO make 75 a constant somewhere?

        //star talents
        //65 slots
        var starTalents = characters[i].starTalentLevels;
        j = 0;
        for(; j < starTalents.length; j++){
            list.push(starTalents[j]);
        }
        skip(list, 65 - j);

        //next 12 are equipped abilities
        var attackLoadout = characters[i].attackLoadout;
        j = 0;
        for(; j < attackLoadout.length; j++){
            list.push(attackLoadout[j]);
        }
        skip(list, 12 - j);

        //next is the focused ability, so im just picking one that exists on every class
        list.push("Health Booster");

        //equipment
        var equipment = characters[i].equipment;
        var stoneData = [];
        //first 8 are in order
        for(var k = 0; k < 8; k++){
            list.push(equipment[k].name);
            stoneData.push(equipment[k].stoneData);
        }
        list.push(equipment[8].name);
        stoneData.push(equipment[8].stoneData);
        list.push(equipment[10].name);
        stoneData.push(equipment[10].stoneData);
        list.push(equipment[13].name);
        stoneData.push(equipment[13].stoneData);

        //tools
        var tools = characters[i].tools;
        for(var k = 0; k < 6; k++){
            list.push(tools[k].name);
            stoneData.push(tools[k].stoneData);
        }
        console.log("stoneData: " + JSON.stringify(stoneData));
        /**
        Power		
        STR		
        AGI		
        WIS		
        LUK		
        Defence		
        Bonus from equip
        empty (0)		
         */

        //go through stoneData and create a long list of every stat,
        //filling in 0 for none that exist
        var expandedStoneData = [];
        for(var k = 0; k < stoneData.length; k++){
            var data = stoneData[k];
            var tmp = [];
            if(data == null){
                console.log(characters[i].name);
            }
            tmp.push(data["Power"]);
            tmp.push(data["AGI"]);
            tmp.push(data["WIS"]);
            tmp.push(data["LUK"]);
            tmp.push(data["Defence"]);
            tmp.push(undefined); //bonus from equip
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

        list.push("END");

        charCsvList.push(list);
    }

    // console.log(charCsvList);
    var csv = "";
    //take each list and form the csv
    for(var i = 0; i < charCsvList[0].length; i++){
        csv += "=SPLIT(\"";
        for(var j = 0; j < charCsvList.length; j++){
            csv += charCsvList[j][i];
            if(j < charCsvList.length-1){
                csv += ",";
            }
        }
        csv += "\", \",\")\n";
    }
    // console.log(csv);
    return csv;
}   

function skip(pushList, numberOfSkips){
    for(var i = 0; i < numberOfSkips; i++){
        pushList.push(" ");
    }
}