//Beginner
//Journeyman
//warrior
//barbarian
//squire
//archer
//bowman
//hunter
//mage
//shaman
//wizard

//maps a class with its talent page(s)
var classTalentMap = {
    "Beginner" : [
        "Beginner"
    ],

    "Journeyman" : [
        "Beginner",
        "Journeyman"
    ],

    "Warrior" : [
        "Rage Basics",
        "Warrior"
    ],
    
    "Barbarian" : [
        "Rage Basics",
        "Warrior",
        "Barbarian"
    ],

    "Squire" : [
        "Rage Basics",
        "Warrior",
        "Squire"
    ],

    "Archer" : [
        "Calm Basics",
        "Archer"
    ],
    
    "Bowman" : [
        "Calm Basics",
        "Archer",
        "Bowman"
    ],

    "Hunter" : [
        "Calm Basics",
        "Archer",
        "Hunter"
    ],

    "Mage" : [
        "Savvy Basics",
        "Mage"
    ],

    "Shaman" : [
        "Savvy Basics",
        "Mage",
        "Shaman"
    ], 

    "Wizard" : [
        "Savy Basics",
        "Mage",
        "Wizard"
    ]
}

//maps a talent page with its coorsponding talents 
var classTalentPageMap = {
"Beginner" : 
    [
    "HEALTH_BOOSTER",
    "MANA_BOOSTER",
    "STAR_PLAYER",
    "BUCKLERED_UP",
    "SHARPENED_AXE",
    "FIST_OF_RAGE",
    "QUICKNESS_BOOTS",
    "BOOK_OF_THE_WISE",
    "LUCKY_CLOVER",
    "GILDED_SWORD",
    "HAPPY_DUDE",
    "KNUCKLEBUSTER",
    "FEATHER_FLIGHT",
    "EXTRA_BAGS",
    "SLEEPIN'_ON_THE_JOB",
    ],

"Journeyman" : 
    [
    "INDIANA_ATTACK",
    "BREAKIN'_THE_BANK",
    "SUPERNOVA_PLAYER",
    "TWO_PUNCH_MAN",
    "GIMME_GIMME",
    "LUCKY_HIT",
    "F'LUK'EY_FABRICS",
    "CHACHING!",
    "LUCKY_HORSESHOE",
    "CURSE_OF_MR_LOOTY_BOOTY",
    "ITS_YOUR_BIRTHDAY!",
    "CMON_OUT_CRYSTALS",
    "REROLL_PLS",
    "CARDS_GALORE",
    "RARES_EVERYWHERE!",
    ],

"Maestro" : 
    [
    "COIN_TOSS",
    "_",
    "_",
    "_",
    "_",
    "TRIPLE_JAB",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    ],

"Virtuoso" : 
    [
    "_",
    "_",
    "_",
    "_",
    "_",
    "QUAD_JAB",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    ],

"Infinilyte" : 
    [
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    ],

"Rage Basics" : 
    [
    "HEALTH_BOOSTER",
    "MANA_BOOSTER",
    "STAR_PLAYER",
    "BUCKLERED_UP",
    "SHARPENED_AXE",
    "FIST_OF_RAGE",
    "QUICKNESS_BOOTS",
    "BOOK_OF_THE_WISE",
    "LUCKY_CLOVER",
    "GILDED_SWORD",
    "BRUTE_EFFICIENCY",
    "MEAT_SHANK",
    "CRITIKILL",
    "IDLE_BRAWLING",
    "IDLE_SKILLING",
    ],

"Warrior" : 
    [
    "POWER_STRIKE",
    "WHIRL",
    "HEALTH_OVERDRIVE",
    "Double_Strike",
    "FIRMLY_GRASP_IT",
    "STRENGTH_IN_NUMBERS",
    "'STR'ESS_TESTED_GARB",
    "CARRY_A_BIG_STICK",
    "ABSOLUTE_UNIT",
    "HAUNGRY_FOR_GOLD",
    "BIG_PICK",
    "COPPER_COLLECTOR",
    "MOTHERLODE_MINER",
    "TOOL_PROFICIENCY",
    "TEMPESTUOUS_EMOTIONS",
    ],

"Barbarian" : 
    [
    "BEAR_SWIPE",
    "AXE_HURL",
    "MOCKING_SHOUT",
    "NO_PAIN_NO_GAIN",
    "MONSTER_DECIMATOR",
    "APOCALYPSE_ZOW",
    "FISTFUL_OF_OBOL",
    "STRONGEST_STATUES",
    "STR_SUMMORE",
    "BEEFY_BOTTLES",
    "WORMING_UNDERCOVER",
    "BOBBIN'_BOBBERS",
    "ALL_FISH_DIET",
    "CATCHING_SOME_ZZZ'S",
    "BACK_TO_BASICS",
    ],

"Squire" : 
    [
    "SHOCKWAVE_SLASH",
    "DAGGERANG",
    "BRICKY_SKIN",
    "MASTERY_UP",
    "BALANCED_SPIRIT",
    "PRECISION_POWER",
    "FISTFUL_OF_OBOL",
    "SHIELDIEST_STATUES",
    "STR_SUMMORE",
    "BLOCKY_BOTTLES",
    "REFINERY_THROTTLE",
    "REDOX_RATES",
    "SHARPER_SAWS",
    "SUPER_SAMPLES",
    "BACK_TO_BASICS",
    ],

"Blood Berserker" : 
    [
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    ],

"Death Bringer" : 
    [
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    ],

"Diving Knight" : 
    [
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    ],

"Royal Guardian" : 
    [
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    ],

"Calm Basics" : 
    [
    "HEALTH_BOOSTER",
    "MANA_BOOSTER",
    "STAR_PLAYER",
    "BUCKLERED_UP",
    "SHARPENED_AXE",
    "FIST_OF_RAGE",
    "QUICKNESS_BOOTS",
    "BOOK_OF_THE_WISE",
    "LUCKY_CLOVER",
    "GILDED_SWORD",
    "ELUSIVE_EFFICIENCY",
    "FEATHERWEIGHT",
    "I_SEE_YOU",
    "IDLE_SHOOTING",
    "BROKEN_TIME",
    ],

"Archer" : 
    [
    "PIERCING_ARROW",
    "KUNG_FU_KICK",
    "HEMA_OVERDRIVE",
    "STRAFE",
    "HAVE_ANOTHER!",
    "VEINS_OF_THE_INFERNAL",
    "GARB_OF_UN'AGI'NG_QUALITY",
    "HIGH_POLYMER_LIMBS",
    "SANIC_SPEED",
    "ROBBINGHOOD",
    "SMELTIN'_ERRYDAY",
    "ACME_ANVIL",
    "YEA_I_ALREADY_KNOW",
    "GODLY_CREATION",
    "FOCUSED_SOUL",
    ],

"Bowman" : 
    [
    "HOMING_ARROWS",
    "MAGIC_SHORTBOW",
    "FLAX_INSTASTRING",
    "EXTENDO_RANGEO",
    "WOAH,_THAT_WAS_FAST!",
    "SPEEDNA",
    "SHOEFUL_OF_OBOL",
    "SHWIFTY_STATUES",
    "AGI_AGAIN",
    "VELOCITY_VESSELS",
    "TELEKI'NET'IC_LOGS",
    "BRIAR_PATCH_RUNNER",
    "BUG_ENTHUSIAST",
    "SUNSET_ON_THE_HIVES",
    "PREVIOUS_POINTS",
    ],

"Hunter" : 
    [
    "360_NOSCOPE",
    "BEAR_TRAP",
    "UWU_RAWRRR",
    "STOP_RIGHT_THERE",
    "HAVE_ANOTHER..._AGAIN!",
    "LOOTY_MC_SHOOTY",
    "SHOEFUL_OF_OBOL",
    "STRAIGHTSHOT_STATUES",
    "AGI_AGAIN",
    "VISIBILITY_VESSELS",
    "EAGLE_EYE",
    "INVASIVE_SPECIES",
    "SHROOM_BAIT",
    "REFLECTIVE_EYESIGHT",
    "PREVIOUS_POINTS",
    ],

"Siege Breaker" : 
    [
    "BALLISTA",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    ],

"Mayheim" : 
    [
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    ],

"Wind Walker" : 
    [
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    ],

"Beast Master" : 
    [
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    ],

"Savvy Basics" : 
    [
    "HEALTH_BOOSTER",
    "MANA_BOOSTER",
    "STAR_PLAYER",
    "BUCKLERED_UP",
    "SHARPENED_AXE",
    "FIST_OF_RAGE",
    "QUICKNESS_BOOTS",
    "BOOK_OF_THE_WISE",
    "LUCKY_CLOVER",
    "GILDED_SWORD",
    "SMART_EFFICIENCY",
    "OVERCLOCKED_ENERGY",
    "FARSIGHT",
    "IDLE_CASTING",
    "ACTIVE_AFK'ER",
    ],

"Mage" : 
    [
    "ENERGY_BOLT",
    "MINI_FIREBALL",
    "MANA_OVERDRIVE",
    "TELEPORT",
    "YOU'RE_NEXT",
    "KNOWLEDGE_IS_POWER",
    "UNT'WIS'TED_ROBES",
    "POWER_OVERWHELMING",
    "FREE_MEAL",
    "INDIVIDUAL_INSIGHT",
    "LOG_ON_LOGS",
    "LEAF_THIEF",
    "DEFORESTING_ALL_DOUBT",
    "INNER_PEACE",
    "CHOPPIN_IT_UP_EZ",
    ],

"Wizard" : 
    [
    "ICE_SHARDS",
    "FLOOR_IS_LAVA",
    "TORNADO",
    "SPEEDY_BOOK",
    "MANA_IS_LIFE",
    "PAPERWORK,_GREAT...",
    "OCCULT_OBOLS",
    "STARING_STATUES",
    "WIS_WUMBO",
    "FUSCIA_FLASKS",
    "CHARGE_SYPHON",
    "SOOOULS",
    "BLESS_UP",
    "NEARBY_OUTLET",
    "EARLIER_EDUCATION",
    ],

"Shaman" : 
    [
    "CRAZY_CONCOCTIONS",
    "AUSPICIOUS_AURA",
    "SIZZLING_SKULL",
    "TENTEYECLE",
    "INSTANT_INVINCIBILITY",
    "VIRILE_VIALS",
    "OCCULT_OBOLS",
    "STUPENDOUS_STATUES",
    "WIS_WUMBO",
    "FANTASIA_FLASKS",
    "CRANIUM_COOKING",
    "BUSY_BREWIN'",
    "BUBBLE_BREAKTHROUGH",
    "SHARING_SOME_SMARTS",
    "EARLIER_EDUCATION",
    ],

"Elemental Sorcerer" : 
    [
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    ],

"Spiritual Monk" : 
    [
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    ],

"Bubonic Conjuror" : 
    [
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    ],

"Arcane Cultist" : 
    [
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    "_",
    ],

    "Star Talents" : [
        "FILLER",
        "BEGINNER_BEST_CLASS",
        "FILLER",
        "QUEST_CHUNGUS",
        "CRYSTALS_4_DAYYS",
        "WILL_OF_THE_ELDEST",
        "TICK_TOCK",
        "FILLER",
        "ROLL_DA_DICE",
        "ATTACKS_ON_SIMMER",
        "TOILET_PAPER_POSTAGE",
        "EXP_CONVERTER",
        "GOBLET_OF_HEMOGLOBIN",
        "JUST_EXP",
        "FROTHY_MALK",
        "CONVERT_BETTER,_DARNIT!",
        "FILLER",
        "CARDIOVASCULAR!",
        "FILLER",
        "TELEKINETIC_STORAGE",
        "PRINTER_SAMPLING",
        "FILLER",
        "FILLER",
        "FILLER",
        "SHRINE_ARCHITECT",
        "FILLER"
    ]
//idk what this is but it was datamined...
// "Mining" : 
//     [
//     "BORED_TO_DEATH",
//     "BEGINNER_BEST_CLASS",
//     "STUDIOUS_QUESTER",
//     "QUEST_CHUNGUS",
//     "CRYSTALS_4_DAYYS",
//     "WILL_OF_THE_ELDEST",
//     "TICK_TOCK",
//     "STONKS!",
//     "ROLL_DA_DICE",
//     "ATTACKS_ON_SIMMER",
//     "TOILET_PAPER_POSTAGE",
//     "EXP_CONVERTER",
//     "GOBLET_OF_HEMOGLOBIN",
//     "JUST_EXP",
//     "FROTHY_MALK",
//     ]
};