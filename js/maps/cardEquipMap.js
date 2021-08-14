var cardEquipMap = {
    "B": "None",

    "mushG": "Green Mushroom (+ Base HP)",
    "mushR": "Red Mushroom (+ Base LUK)",
    "frogG": "Frog (+ Base MP)",
    "beanG": "Bored Bean (+ Base Damage)",
    "slimeG": "Slime (+ Base WIS)",
    "snakeG": "Baby Boa (+ Move Spd)",
    "carrotO": "Carrotman (+ Base AGI)",
    "goblinG": "Glublin (+% Total HP)",
    "plank": "Wode Board (+ Base STR)",
    "frogBIG": "Gigafrog (+% Card Drop Chance)",
    "poopSmall": "Poop (+% Crystal Mob Spawn Chance)",
    "ratB": "Rat (+% Critical Chance)",
    "branch": "Walking Stick (+ Base WIS)",
    "acorn": "Nutto (+% Money from Monsters)",
    "Crystal0": "Crystal Carrot (+% Total Drop Rate)",
    "mushW": "Wood Mushroom (+% Total Accuracy)",
    "jarSand": "Sandy Pot (+% EXP Conversion from Talent)",
    "mimicA": "Mimic (+% Total Drop Rate)",
    "crabcake": "Crabcake (+% To not consume Food)",
    "coconut": "Mafioso (+ Base AGI)",
    "sandcastle": "Sand Castle (+% Total Accuracy)",
    "pincermin": "Pincermin (+ Weapon Power)",
    "potato": "Mashed Potato (+% Critical Damage)",
    "steak": "Tyson (+ Base STR)",
    "moonman": "Moonmoon (+% Monster EXP While Active)",
    "sandgiant": "Sand Giant (+% Minimum Damage)",
    "snailZ": "Snelbie (+% Card Drop Chance)",
    "shovelR": "Dig Doug (+ Base LUK)",
    "Crystal1": "Crystal Crabal (+% EXP from monsters)",
    "Bandit_Bob": "Bandit Bob (+% Money from Monsters)",
    "Copper": "Copper (+ Base accuracy)",
    "Iron": "Iron (+% Total Mining Efficiency)",
    "Gold": "Gold (+% Mining EXP)",
    "ForgeA": "Fire Forge (+% Smithing EXP)",
    "OakTree": "Oak Tree (+ Base Defence)",
    "BirchTree": "Birch Tree (+% Total Choppin Efficiency)",
    "JungleTree": "Jungle Tree (+% Choppin EXP)",
    "ForestTree": "Forest Tree (+% EXP Conversion from Talent)",
    "Fish1": "Goldfish (+% Total MP)",
    "Fish2": "Hermit Can (+% Total Fishing Efficiency)",
    "Fish3": "Jellyfish (+% Fishing EXP)",
    "Bug1": "Flies (+% Monster EXP While Active)",
    "Bug2": "Butterflies (+% Total Catching Efficiency)",
    "Plat": "Plat (+% Mining Away Gains)",
    "Dementia": "Dementia (+% Mining Speed)",
    "Void": "Void (+% Card Drop Chance)",
    "ForgeB": "Cinder Forge (+% Smithing EXP)",
    "PalmTree": "Palm Tree (+% Choppin Away Gains)",
    "ToiletTree": "Toilet Tree (+% Choppin Speed)",
    "StumpTree": "Stump Tree (+% Total Accuracy)",
    "Fish4": "Bloach (+% Fishing Away Gains)",
    "Bug3": "Sentient Cereal (+% Catching EXP)",
    "Bug4": "Fruitflies (+% Catching Away Gains)",
    "SoulCard1": "Forest Soul (+% Defence from Equipment)",
    "SoulCard2": "Dune Soul (+% Max Charge)",
    "CritterCard1": "Froge (+% Shiny Critter Chance)",
    "CritterCard2": "Crabbo (+% Trapping Efficiency)",
    "CritterCard3": "Scorpie (+% Trapping EXP)",
    "sheep": "Sheepie (+% Defence from Equipment)",
    "flake": "Frost Flake (+ Base STR)",
    "stache": "Sir Stache (+% Card Drop Chance)",
    "bloque": "Bloque (+ Base AGI)",
    "mamoth": "mamooth (+% Total HP)",
    "snowball": "Snowman (+% Total Damage)",
    "penguin": "Penguin (+ Base WIS)",
    "thermostat": "Thermister (+% Critical Damage)",
    "glass": "Quenchie (+ Base LUK)",
    "snakeB": "Cryosnake (+% MP regen rate)",
    "speaker": "Bop Box (+% Total Drop Rate)",
    "eye": "Neyeptune (+% Total Accuracy)",
    "ram": "Dedotated Ram (+ Weapon Power)",
    "skele": "Xylobone (+% Critical Chance)",
    "skele2": "Bloodbone (+% Total Damage)",
    "Crystal2": "Crystal Cattle (+% EXP from monsters)",
    "Tree7": "Wispy Tree (+% Choppin Speed)",
    "SoulCard3": "Rooted Soul (+ Starting Pts in Worship)",
    "SoulCard4": "Frigid Soul (+% Max Charge)",
    "SoulCard5": "Squiddy Soul (+% Charge Rate)",
    "CritterCard4": "Mousey (+% Shiny Critter Chance)",
    "CritterCard5": "Owlio (+% EXP from monsters)",
    "CritterCard6": "Pingy (+% Shiny Critter Chance)",
    "CritterCard7": "Bunny (+% Skill AFK gain rate)",
    "Lustre": "Lustre (+ Base LUK)",
    "SaharanFoal": "Saharan Foal (+% Choppin Away Gains)",
    "Bug5": "Mosquisnow (+% Total Catching Efficiency)",
    "Bug6": "Flycicle (+% Catching Away Gains)",
    "babayaga": "Baba Yaga (+% Money from Monsters)",
    "poopBig": "Dr Defecaus (+% Total Damage)",
    "poopD": "Boop (+% Fighting AFK gain rate)",
    "wolfA": "Amarok (+% Skill AFK gain rate)",
    "wolfB": "Chaotic Amarok (+% Fighting AFK gain rate)",
    "babaHour": "Biggie Hours (+% Double AFK claim chance)",
    "babaMummy": "King Doot (+% Total Drop Rate)",
    "Boss2A": "Efaunt (+% EXP from monsters)",
    "Boss2B": "Chaotic Efaunt (+% Skill EXP)",
    "Boss3A": "Chizoar (+% Cog Build Spd (Passive))",
    "Boss3B": "Chaotic Chizoar (+% Shrine Effects)",
    "ghost": "Ghost (+% Monster EXP While Active)",
    "xmasEvent": "Giftmas Blobulyte (+% Total Drop Rate)",
    "xmasEvent2": "Meaning of Giftmas (+% Money from Monsters)",
    "slimeR": "Valentslime (+% Defence from Equipment)",
    "loveEvent": "Loveulyte (+% Total HP)",
    "loveEvent2": "Chocco Box (+% Boost Food Effect)",
    "sheepB": "Floofie (+% MP regen rate)",
    "snakeY": "Shell Snake (+ Base LUK)",
    "EasterEvent1": "Egggulyte (+% Card Drop Chance)",
    "EasterEvent2": "Egg Capsule (+% Critical Damage)",
    "SummerEvent1": "Coastiolyte TODO",
    "SummerEvent2": "Summer Spirit TODO",
    "shovelY": "Plasti Doug TODO",
    "crabcakeB": "Mr Blueberry TODO"
};
