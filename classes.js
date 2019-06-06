const core = require('./core.js');
const utils = require('./utils.js')
const weaponsAndShields = require('./weapons.js');
const toolsAndEquipment = require('./tools.js');
const armors = require('./armor');

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

function addItemXTimes(item, ammount){
  for(x = ammount; x > 0; x--){
    equipment.tools.push(weapons.simpleWeapons.javelin);
  };
}


function populateEquipment(chaClass) {

    let equipment = {
        weapons: [],
        tools: [],
        armor: []
    };



    switch (true) {
        case chaClass === "bard":
            equipment.armor = armors.lightArmor.leather;
            equipment.tools = utils.returnRandomArrayItem([toolsAndEquipment.equipmentPacks.diplomatsPack, toolsAndEquipment.equipmentPacks.entertainersPack]);
            equipment.weapons[0] = weaponsAndShields.simpleWeapons.dagger;
            equipment.weapons[1] = utils.returnRandomArrayItem([weaponsAndShields.martialMeleeWeapons.rapier, weaponsAndShields.martialMeleeWeapons.longsword]);

            break;


        case chaClass === "barbarian":
            equipment.armors = armors.lightArmor.no_armor;
            equipment.tools.push(toolsAndEquipment.equipmentPacks.explorersPack);
            for(x = 4; x > 0; x--){equipment.tools.push(weaponsAndShields.simpleWeapons.javelin);};

            if(utils.returnRandomNumberInRange(0,1) === 0){
              for(x = 2; x > 0; x--){equipment.weapons.push(weaponsAndShields.simpleWeapons.handaxe);};
            }
            else{

              let max = Object.values(weaponsAndShields.simpleWeapons).length;
              let randomSimpleWeapon = Object.values(weaponsAndShields.simpleWeapons)[utils.returnRandomNumberInRange(0, max)];

              equipment.weapons.push(randomSimpleWeapon);

            };

            if(utils.returnRandomNumberInRange(0,1) === 0){
              equipment.weapons.push(weaponsAndShields.martialMeleeWeapons.greataxe);
            }
            else{
              let max = Object.values(weaponsAndShields.martialMeleeWeapons).length;
              let randomMartialWeapon = Object.values(weaponsAndShields.martialMeleeWeapons)[utils.returnRandomNumberInRange(0, max)];

              equipment.weapons.push(randomMartialWeapon);
            }

              break;

              default:equipment.errmsg = "opps something  went wrong in the bard quipment switch statement, better fix that!"


            };

                return equipment;

    };







function createBard() {

    this.name = "bard",

    this.primaryAbility = "cha",
    this.castingAbility = "cha",
    this.hitDie = 8,
    this.savingThrows = ["dex", "cha"],

    this.equipment = populateEquipment(this.name),
    this.armorProficiencies = ["Light armor"],
    this.weaponProficiencies = ["simple weapons", "hand crossbows", "longswords", "rapiers", "shortswords"],
    this.toolProficiencies = toolsAndEquipment.returnRandomInstruments(2);
    this.skillProficiencies = returnRandomProficiencies(3);

};

function createBarbarian() {

    	this.name = "barbarian",
        this.primaryAbility = "str",
        this.hitDie = 12,
        this.savingThrows = ["str", "dex"],

        this.equipment = populateEquipment(this.name),
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
                        new createBard()
                        // new createBarbarian()

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
