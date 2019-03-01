const core = require('./core.js');
const utils = require('./utils.js')
const weapons = require('./weapons.js');
const tools = require('./tools.js')

const skillProficiencies = ["Athletics","Acrobatics","Sleight Of Hand","Stealth","Arcana","History",
                    "Investigation","Nature","Religion","Animal Handling","Insight","Medicine",
                    "Perception","Survival","Deception","Intimidation","Performance","Persuasion"];

function returnRandomProficiencies(count) {

    var proficiencies = [];

    for (i = 0; i < count; i++) {

        let pickedSkill = utils.returnRandomArrayItem(skillProficiencies);

        if (proficiencies.includes(pickedSkill) === false) {
            proficiencies.push(pickedSkill);
        } else {
            i--;
        };

    };

	return proficiencies;

};

function populateEquipment(chaClass) {

  switch (true) {
    case chaClass === "bard":return this.equipment = "test weapon";

      break;
    default:

  }

}



function createBard() {

    this.name = "bard",
    this.primaryAbility = "cha",
    this.castingAbility = "cha",
    this.hitDie = 8,
    this.savingThrows = ["dex", "cha"],

    this.equipment = [populateEquipment("bard")],
    this.armorProficiencies = ["Light armor"],
    this.weaponProficiencies = ["simple weapons", "hand crossbows", "longswords", "rapiers", "shortswords"],
    this.toolProficiencies = tools.returnRandomInstruments(2);
    this.skillProficiencies = returnRandomProficiencies(3);

};

function createBarbarian() {

    	this.name = "barbarian",
        this.primaryAbility = "str",
        this.hitDie = 12,
        this.savingThrows = ["str", "dex"],

        this.equipment = [],
        this.armorProficiencies = [],
        this.weaponProficiencies = [],
        this.toolProficiencies = [],
        this.skillProficiencies = []

};

function createMonk() {

    	this.name = "monk",
        this.primaryAbility = "dex",
        this.hitDie = 8,
        this.savingThrows = ["str", "con"],

        this.equipment = [],
        this.armorProficiencies = [],
        this.weaponProficiencies = [],
        this.toolProficiencies = [],
        this.skillProficiencies = []

};

function createCleric() {

    	this.name = "cleric",
        this.primaryAbility = "wis",
        this.hitDie = 8,
        this.savingThrows = ["wis", "cha"],

        this.equipment = [],
        this.armorProficiencies = [],
        this.weaponProficiencies = [],
        this.toolProficiencies = [],
        this.skillProficiencies = []

};

function createDruid() {

    	this.name = "druid",
        this.primaryAbility = "wis",
        this.hitDie = 8,
        this.savingThrows = ["int", "wis"],

        this.equipment = [],
        this.armorProficiencies = [],
        this.weaponProficiencies = [],
        this.toolProficiencies = [],
        this.skillProficiencies = []

};

function createFighter() {

    	this.name = "fighter",
        this.primaryAbility = utils.returnRandomArrayItem(["str", "dex"]),
        this.hitDie = 10,
        this.savingThrows = ["str", "con"],

        this.equipment = [],
        this.armorProficiencies = [],
        this.weaponProficiencies = [],
        this.toolProficiencies = [],
        this.skillProficiencies = []

};

function createPaladin() {

    	this.name = "paladin",
        this.primaryAbility = ["str", "cha"],
        this.hitDie = 10,
        this.savingThrows = ["wis", "cha"],

        this.equipment = [],
        this.armorProficiencies = [],
        this.weaponProficiencies = [],
        this.toolProficiencies = [],
        this.skillProficiencies = []

};

function createRanger() {

    	this.name = "ranger",
        this.primaryAbility = "dex",
        this.hitDie = 10,
        this.savingThrows = ["dex", "str"],

        this.equipment = [],
        this.armorProficiencies = [],
        this.weaponProficiencies = [],
        this.toolProficiencies = [],
        this.skillProficiencies = []

};

function createRogue() {

    	this.name = "rogue",
        this.primaryAbility = "dex",
        this.hitDie = 8,
        this.savingThrows = ["dex", "int"],

        this.equipment = [],
        this.armorProficiencies = [],
        this.weaponProficiencies = [],
        this.toolProficiencies = [],
        this.skillProficiencies = []

};

function createSorcerer() {

    	this.name = "sorcerer",
        this.primaryAbility = "cha",
        this.hitDie = 8,
        this.savingThrows = ["con", "cha"],

        this.equipment = [],
        this.armorProficiencies = [],
        this.weaponProficiencies = [],
        this.toolProficiencies = [],
        this.skillProficiencies = []

};

function createWarlock() {

    	this.name = "warlock",
        this.primaryAbility = "cha",
        this.hitDie = 8,
        this.savingThrows = ["wis", "cha"],

        this.equipment = [],
        this.armorProficiencies = [],
        this.weaponProficiencies = [],
        this.toolProficiencies = [],
        this.skillProficiencies = []

};

function createWizard() {

    	this.name = "wizard",
        this.primaryAbility = "int",
        this.hitDie = 6,
        this.savingThrows = ["int", "wis"],

        this.equipment = [],
        this.armorProficiencies = [],
        this.weaponProficiencies = [],
        this.toolProficiencies = [],
        this.skillProficiencies = []

};


// classList = [
//              new createBard(),
//              new createBarbarian(),
//              new createMonk(),
//              new createCleric(),
//              new createDruid(),
//              new createFighter(),
//              new createPaladin(),
//              new createRanger(),
//              new createRogue(),
//              new createSorcerer(),
//              new createWarlock(),
//              new createWizard()
//            ];

           classList = [
                        new createBard(),

                      ];



exports.createBard = createBard;
exports.createBarbarian = createBarbarian;
exports.createMonk = createMonk;
exports.classList = classList;
exports.createCleric = createCleric;
exports.createDruid = createDruid;
exports.createFighter = createFighter;
exports.createPaladin = createPaladin;
exports.createRanger = createRanger;
exports.createRogue = createRogue;
exports.createSorcerer = createSorcerer;
exports.createWarlock = createWarlock;
exports.createWizard = createWizard;
