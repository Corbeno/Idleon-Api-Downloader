console.log("guildparse");

// parses clean json and returns a csv string to be pasted into a spreadsheet
function guildExportCsv(cleanJson) {
    var memberInfo = cleanJson.account.guild.memberInfo;
    var separator = "\t";
    var r = "";
    for(var i = 0; i < memberInfo.length; i++){
        member = memberInfo[i];
        //TODO clean this mess up... it works tho
        r += member.accountId + separator + member.rank + separator + member.name + separator + member.class + separator + member.level + separator + member.wantedPerk + separator + member.guildPoints + "\n";
    }
    return r;
}