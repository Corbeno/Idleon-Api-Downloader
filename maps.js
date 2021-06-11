/*
Beginner = 1
Journeyman = 2

Warrior = 7
Barbarian = 8
Squire = 9

Archer = 19
Bowman = 20
Hunter = 21

Mage = 31
Wizard = 32
Shaman = 33
*/
var charSubclassMap = {
    2 : 1,
    8 : 7,
    9 : 7,
    20: 19,
    21 : 19,
    33 : 31,
    32 : 31
};

var obolNameMap = {
    "ObolAmarokA" : "Granite Obol of Amarok's Stare",
    "ObolBronze0" : "Bronze STR Obol",
    "ObolBronze1" : "Bronze AGI Obol",
    "ObolBronze2" : "Bronze WIS Obol",
    "ObolBronze3" : "Bronze LUK Obol",
    "ObolBronzeCatching" : "Bronze Obol of Few Flies",
    "ObolBronzeChoppin" : "Bronze Obol of Chippin Chops",
    "ObolBronzeDamage" : "Bronze Obol of Puny Damage",
    "ObolBronzeFishing" : "Bronze Obol of Finite Fish",
    "ObolBronzeMining" : "Bronze Obol of Small Swings",
    "ObolBronzePop" : "Bronze Obol of Pop",
    "ObolEfauntA" : "Skeletal Obol of Efaunt's Gaze",
    "ObolGold0" : "Gold STR Obol",
    "ObolGold1" : "Gold AGI Obol",
    "ObolGold2" : "Gold WIS Obol",
    "ObolGold3" : "Gold LUK Obol",
    "ObolGoldCatching" : "Golden Obol of Insane Insects",
    "ObolGoldChoppin" : "Golden Obol of Huge Hackin",
    "ObolGoldDamage" : "Golden Obol of Big Boy Damage",
    "ObolGoldFishing" : "Golden Obol of Crazy Carp",
    "ObolGoldMining" : "Golden Obol of Diligent Digging",
    "ObolGoldMoney" : "Golden Obol of Plentiful Riches",
    "ObolPinkCatching" : "Dementia Obol of Idk Yet",
    "ObolPinkChoppin" : "Dementia Obol of WOWOWOWWO",
    "ObolPinkDamage" : "Dementia Obol of Infinite Damage",
    "ObolPinkFishing" : "Dementia Obol of Monument Marlins",
    "ObolPinkLuck" : "Dementia Obol of Never Ending Luck",
    "ObolPinkMining" : "Dementia Obol of Magisterial Metals",
    "ObolPlatinumCatching" : "Platinum Obol of Idk Yet",
    "ObolPlatinumChoppin" : "Platinum Obol of Lumby Loggo",
    "ObolPlatinumDamage" : "Platinum Obol of Lethal Damage",
    "ObolPlatinumFishing" : "Platinum Obol of Tremendous Trout",
    "ObolPlatinumMining" : "Platinum Obol of Dwarven Delving",
    "ObolPlatinumSpeed" : "Platinum Obol of Blinding Speed",
    "ObolSilver0" : "Silver STR Obol",
    "ObolSilver1" : "Silver AGI Obol",
    "ObolSilver2" : "Silver WIS Obol",
    "ObolSilver3" : "Silver LUK Obol",
    "ObolSilverCatching" : "Silver Obol of Big Bugs",
    "ObolSilverChoppin" : "Silver Obol of Big Bark",
    "ObolSilverDamage" : "Silver Obol of Little Damage",
    "ObolSilverFishing" : "Silver Obol of Puny Pikes",
    "ObolSilverLuck" : "Silver Obol of Double Sixes",
    "ObolSilverMining" : "Silver Obol of Moderate Mining",
    "ObolSilverMoney" : "Silver Obol of Pocket Change",
    "NOT_FOUND" : "None"
};