const classes = require('./classes.js');
const utils = require('./utils.js');
const racial_traits =require('./racial_traits.js');




// TODO: refactor, must be a cleaner way to do this
//Takes a string representing a dice roll, such as "2d4" and returns a value in inches
function returnHeightAndWeight(height, weight) {

  let rollAmountHeight = height.substring(0, height.indexOf('d'));
  let diceTypeHeight   = height.substring(height.indexOf('d') +1);


  let rollAmountWeight = weight.substring(0, weight.indexOf('d'));
  let diceTypeWeight   = weight.substring(weight.indexOf('d') +1);


  let sumOfRolls = null;
  let heightWeight =[];

  for (i = 1; i <= rollAmountHeight; i++){
    sumOfRolls +=  utils.returnRandomNumberInRange(1,diceTypeHeight);
  };

  //conversion from feet to inches, had to do some ugly stuff to stop super long floats
  heightPrep = parseFloat((sumOfRolls / 12).toFixed(1))
  heightPrep = heightPrep.toString().substring(0,2);
  heightPrep = parseFloat(heightPrep)
  heightWeight.push(heightPrep);


  sumOfRolls = null; //reset sumOfRolls

  for (j = 1; j <= rollAmountWeight; j++){
    sumOfRolls +=  utils.returnRandomNumberInRange(1,diceTypeWeight);

  };

  heightWeight.push(heightWeight[0] * sumOfRolls);

  return heightWeight;

}

//returns a random alignment // TODO: make the assigned alignments fall in line with the player hand book guide
function returnRandomAlignment() {
    return utils.returnRandomArrayItem([
        "Lawful Good",
        "Neutral Good",
        "Chaotic Good",
        "Lawful Neutral",
        "True Neutral",
        "Chaotic Neutral",
        "Lawful Evil",
        "Neutral Evil",
        "Chaotic Evil"
    ]);
};



function returnCharacterAge(){

  switch (true) {
    case character.race === "Dragonborn": character.age = utils.returnRandomNumberInRange(15,80);break;
    case character.race === "Dwarf": character.age = utils.returnRandomNumberInRange(50,350);break;
    case character.race === "Elf": character.age = utils.returnRandomNumberInRange(100,750);break;
    case character.race === "Gnome": character.age = utils.returnRandomNumberInRange(40,450);break;
    case character.race === "Half Elf": character.age = utils.returnRandomNumberInRange(20,180);break;
    case character.race === "Half Orc": character.age = utils.returnRandomNumberInRange(14,75);break;
    case character.race === "Halfling": character.age = utils.returnRandomNumberInRange(20,250);break;
    case character.race === "Human": character.age = utils.returnRandomNumberInRange(16,100);break;
    case character.race === "Tiefling": character.age = utils.returnRandomNumberInRange(16,120);break;
    default:character.age = "Fell though switch case [returnCharacterAge()]"

  };
  return character;
};

function applySubraceBonuses(char){

  character = char;

  switch (true) {
    case character.race === "Dragonborn":applyDragonbornRaceBonuses(character);break;
    case character.race === "Dwarf":applyDwarfRaceBonuses(character);break;
    case character.race === "Elf":applyElfRaceBonuses(character);break;
    case character.race === "Gnome":applyGnomeRaceBonuses(character);break
    case character.race === "Half Elf":applyHalfElfRaceBonuses(character);break;
    case character.race === "Half Orc":applyHalfOrcRaceBonuses(character);break;
    case character.race === "Halfling":applyHalflingRaceBonuses(character);break;
    case character.race === "Human":applyHumanRaceBonuses(character);break;
    case character.race === "Tiefling":applyTieflingRaceBonuses(character);break;
    default:"Fell though switch case [applySubraceBonuses()]"

  };
  return character;
};

// TODO: add subraces based on https://dnd5e.fandom.com/wiki/Character_Details
// TODO: surely this can be refactored?
function returnCharacterHeight(race) {

    let additionalHeightAndWeight = [];

    let heightAndWeight = [];

    switch (true) {
        case race === "Dragonborn":
            additionalHeightAndWeight = returnHeightAndWeight("2d8", "2d6");
            heightAndWeight[0] = additionalHeightAndWeight[0] + 5.6 + " ft";
            heightAndWeight[1] = additionalHeightAndWeight[1] + 175 + " lbs";
            break;
        case race === "Dwarf":
            additionalHeightAndWeight = returnHeightAndWeight("2d8", "2d6");
            heightAndWeight[0] = additionalHeightAndWeight[0] + 3.8 + " ft";
            heightAndWeight[1] = additionalHeightAndWeight[1] + 115 + " lbs";
            break;
        case race === "Elf":
            additionalHeightAndWeight = returnHeightAndWeight("2d10", "1d4");
            heightAndWeight[0] = additionalHeightAndWeight[0] + 4.6 + " ft";
            heightAndWeight[1] = additionalHeightAndWeight[1] + 90 + " lbs";
            break;
        case race === "Gnome":
            additionalHeightAndWeight = returnHeightAndWeight("2d4", "1d1");
            heightAndWeight[0] = additionalHeightAndWeight[0] + 2.11 + " ft";
            heightAndWeight[1] = additionalHeightAndWeight[1] + 35 + " lbs";
            break;
        case race === "Half Elf":
            additionalHeightAndWeight = returnHeightAndWeight("2d8", "2d4");
            heightAndWeight[0] = additionalHeightAndWeight[0] + 4.9 + " ft";
            heightAndWeight[1] = additionalHeightAndWeight[1] + 110 + " lbs";
            break;
        case race === "Half Orc":
            additionalHeightAndWeight = returnHeightAndWeight("2d10", "2d6");
            heightAndWeight[0] = additionalHeightAndWeight[0] + 4.10 + " ft";
            heightAndWeight[1] = additionalHeightAndWeight[1] + 140 + " lbs";
            break;
        case race === "Halfling":
            additionalHeightAndWeight = returnHeightAndWeight("2d4", "1d1");
            heightAndWeight[0] = additionalHeightAndWeight[0] + 2.7 + " ft";
            heightAndWeight[1] = additionalHeightAndWeight[1] + 35 + " lbs";
            break;
        case race === "Human":
            additionalHeightAndWeight = returnHeightAndWeight("2d10", "2d4");
            heightAndWeight[0] = additionalHeightAndWeight[0] + 4.8 + " ft";
            heightAndWeight[1] = additionalHeightAndWeight[1] + 110 + " lbs";
            break;
        case race === "Tiefling":
            additionalHeightAndWeight = returnHeightAndWeight("2d8", "2d4");
            heightAndWeight[0] = additionalHeightAndWeight[0] + 4.9 + " ft";
            heightAndWeight[1] = additionalHeightAndWeight[1] + 110 + " lbs";
            break;

        default:
            return "invalid race provided as function arguement [returnCharacterHeight()]"

    };
    return heightAndWeight;
};

function returnDragonbornFeatures(draconicAncestry){

  let draconicAncestryFeatures = [
    {colour:"Black",  damageType:"Acid",	   breathWeapon:  "5 ft by 30 ft line (Dex save)"},
    {colour:"Blue",	  damageType:"Lightning",breathWeapon:	"5 ft by 30 ft line (Dex save)"},
    {colour:"Brass",	damageType:"Fire",     breathWeapon:	"5 ft by 30 ft line (Dex save)"},
    {colour:"Bronze",	damageType:"Lightning",breathWeapon:	"5 ft by 30 ft line (Dex save)"},
    {colour:"Copper",	damageType:"Acid",     breathWeapon:	"5 ft by 30 ft line (Dex save)"},
    {colour:"Gold",	  damageType:"Fire",     breathWeapon:	"15 ft cone (Dex save)"},
    {colour:"Green",	damageType:"Poison",   breathWeapon:	"15 ft cone (Con save)"},
    {colour:"Red",	  damageType:"Fire",     breathWeapon:	"15 ft cone (Dex save)"},
    {colour:"Silver",	damageType:"Cold",     breathWeapon:	"15 ft cone (Con save)"},
    {colour:"White",	damageType:"Cold",     breathWeapon:	"15 ft cone (Con save)"}
  ];

  var ancestryDetails = draconicAncestryFeatures.filter(arrayObject => {
      return arrayObject.colour === draconicAncestry;
  });

  return ancestryDetails;

};

function applyDragonbornRaceBonuses() {

    character.abilityScores.str += 2;
    character.abilityScores.cha += 1;
    character.speed = 30;
    character.draconicAncestry = utils.returnRandomArrayItem(["Black", "Blue", "Brass", "Bronze", "Copper", "Gold", "Green", "Red", "Silver", "White"]);
    character.resistances = returnDragonbornFeatures(character.draconicAncestry)[0].damageType;
    character.breathWeapon = returnDragonbornFeatures(character.draconicAncestry)[0].breathWeapon;
    character.racialAbilities = racial_traits.dragonborn_racial;
    character.languages = ["Common", "Draconic"];
    character.sizeClass = "Medium";
    let heightWeight = returnCharacterHeight(character.race)
    character.height = heightWeight[0];
    character.weight = heightWeight[1];

};

function applyDwarfRaceBonuses() {

    character.abilityScores.con += 2;
    character.speed = 25;
    character.racialAbilities = racial_traits.dwarf_racial;
    character.languages = ["Common", "Dwarvish"];
    character.resistances = "Poison"
    character.sizeClass = "Medium";
    let heightWeight = returnCharacterHeight(character.race)
    character.height = heightWeight[0];
    character.weight = heightWeight[1];
};

function applyElfRaceBonuses() {

    character.abilityScores.dex += 2;
    character.speed = 30;
    character.racialAbilities = racial_traits.elf_racial;
    character.languages = ["Common", "Elven"];
    character.resistances = null;
    character.sizeClass = "Medium";
    let heightWeight = returnCharacterHeight(character.race)
    character.height = heightWeight[0];
    character.weight = heightWeight[1];

};

function applyGnomeRaceBonuses() {

    character.abilityScores.int += 2;
    character.speed = 25;
    character.racialAbilities = racial_traits.gnome_racial;
    character.languages = ["Common", "Gnomish"];
    character.resistances = null;
    character.sizeClass = "Small";
    let heightWeight = returnCharacterHeight(character.race)
    character.height = heightWeight[0];
    character.weight = heightWeight[1];

};

function applyHalfElfRaceBonuses() {

    character.abilityScores.cha += 2;
    character.speed = 30;
    character.racialAbilities = racial_traits.halfElf_racial;
    character.languages = ["Common", "Elven"]; // TODO: half elves can also speak one extra random language
    character.resistances = null;
    character.sizeClass = "Medium";
    let heightWeight = returnCharacterHeight(character.race)
    character.height = heightWeight[0];
    character.weight = heightWeight[1];
    // TODO: half elves have a ton of other stuff that is applied

};

function applyHalfOrcRaceBonuses() {

    character.abilityScores.str += 2;
    character.abilityScores.con += 1;
    character.speed = 30;
    character.racialAbilities = racial_traits.halfOrc_racial;
    character.languages = ["Common", "Orcish"];
    character.resistances = null;
    character.sizeClass = "Medium";
    let heightWeight = returnCharacterHeight(character.race)
    character.height = heightWeight[0];
    character.weight = heightWeight[1];

};

function applyHalflingRaceBonuses() {

    character.abilityScores.dex += 2;
    character.speed = 25;
    character.racialAbilities = racial_traits.halfElf_racial;
    character.languages = ["Common", "Halfling"];
    character.resistances = null;
    character.sizeClass = "Small";
    let heightWeight = returnCharacterHeight(character.race)
    character.height = heightWeight[0];
    character.weight = heightWeight[1];

}

function applyHumanRaceBonuses() {

    character.abilityScores.str += 1;
    character.abilityScores.con += 1;
    character.abilityScores.dex += 1;
    character.abilityScores.int += 1;
    character.abilityScores.wis += 1;
    character.abilityScores.cha += 1;
    character.speed = 30;
    character.racialAbilities = null; // TODO: Humans don't have racial traits but they do have vaiant rules.
    character.languages = ["Common", returnRandomLanguage()];
    character.resistances = null;
    character.sizeClass = "Medium";
    let heightWeight = returnCharacterHeight(character.race)
    character.height = heightWeight[0];
    character.weight = heightWeight[1];
    // TODO: Variant human
};

function applyTieflingRaceBonuses() {

    character.abilityScores.str += 1; // TODO: also need to add a randome +1 to cha or dex, perhaps decided based on class stat preference
    character.speed = 30;
    character.racialAbilities = racial_traits.tiefling_racial;
    character.languages = ["Common", "Infernal"];
    character.resistances = "Fire";
    character.sizeClass = "Medium";
    let heightWeight = returnCharacterHeight(character.race)
    character.height = heightWeight[0];
    character.weight = heightWeight[1];

};

function returnRandomLanguage() {
    return utils.returnRandomArrayItem(["Abyssal", "Aquan", "Auran", "Celestial", "Deep Speech", "Draconic", "Dwarvish", "Elvish",
        "Giant", "Gnomish", "Goblin", "Gnoll", "Halfling", "Ignan", "Infernal", "Orc", "Primordial",
        "Sylvan", "Terran", "Undercommon"
    ]);
};

//Simulates the rolling of 4D6, removing the lowest value die and returns the sum of the remainder
function roll4D6RemoveLowestAndSum() {

    var numbers = [];

    for (let i = 0; i < 4; i++) {
        numbers.push(utils.returnRandomNumberInRange(1, 6));
    };

    numbers.sort().shift();

    var numbers = numbers.reduce((a, b) => a + b, 0);

    return numbers;

};

//Returns 6 freshly rolled ability scores
function returnSixNumbers() {

    var abilityScores = [];

    for (let i = 0; i < 6; i++) {
        abilityScores.push(roll4D6RemoveLowestAndSum());
    };

    return abilityScores;

};

//Returns a random character class as a string // TODO: add remaining character classes
function returnRandomCharacterClass() {
    return utils.returnRandomArrayItem(classes.classList)
};


// TODO: pull from bigger list in new js file
const maleFirstNames = ["Chris", "Adam", "Wim", "Ali"];
const femaleFirstNames = ["Magda", "Kelly", "Holly", "Zifa"];
const surnames = ["Long", "Mistiaen", "Abildgaard", "Halil", "C.O.C.A.I.N.E"];



function returnFirstName(gender) {

    if (gender === "male") {
        return utils.returnRandomArrayItem(maleFirstNames);
    } else {
        return utils.returnRandomArrayItem(femaleFirstNames);
    };
};

function returnLastName() {

    return utils.returnRandomArrayItem(surnames);

};


//Returns a random gender
function returnRandomGender() {
    return utils.returnRandomArrayItem(["male", "female"]);
};

//Returns an array of ordered ability score prefrences based on the class supplied in the arguement
function returnAbilityScorePreference (characterClass) {

    switch (true) {

        case characterClass.name === "barbarian": return ["str", "con", "dex", "wis", "cha", "int"]; break;
        case characterClass.name === "bard":      return ["cha", "dex", "con", "wis", "str", "int"]; break;
        case characterClass.name === "monk":      return ["dex", "wis", "con", "str", "cha", "int"]; break;
        case characterClass.name === "cleric":    return ["wis", "str", "con", "dex", "cha", "int"]; break;
        case characterClass.name === "druid":     return ["wis", "dex", "con", "cha", "int", "str"]; break;
        case characterClass.name === "paladin":   return ["str", "cha", "con", "wis", "dex", "int"]; break;
        case characterClass.name === "ranger":    return ["dex", "con", "wis", "str", "cha", "int"]; break;
        case characterClass.name === "rogue":     return ["dex", "con", "wis", "cha", "int", "str"]; break;
        case characterClass.name === "sorcerer":  return ["cha", "con", "int", "wis", "dex", "str"]; break;
        case characterClass.name === "warlock":   return ["cha", "con", "dex", "wis", "int", "str"]; break;
        case characterClass.name === "wizard":    return ["int", "con", "dex", "wis", "cha", "str"]; break;
        case characterClass.name === "fighter" && characterClass.primaryAbility === "str": return ["str", "con", "dex", "wis", "cha", "int"]; break;
        case characterClass.name === "fighter" && characterClass.primaryAbility === "dex": return ["dex", "con", "str", "wis", "cha", "int"]; break;

        default: return "invalid character class supplied as argument [returnAbilityScorePreference()]";

    };

};


//calculates an ability score's modifier
function returnAbilityScoreModifier(stat){

  return Math.floor( ( stat - 10 ) / 2 );

}

//Returns an array of abilityscores reordered in prefrence on the class argument

function returnAbilityScores(characterClass) {

    let abilityScores = new Uint32Array(returnSixNumbers()).sort().reverse();
    let abilityScoreOrder = returnAbilityScorePreference(characterClass);

    let characterAbilityScores = {};

    characterAbilityScores.str = abilityScores[abilityScoreOrder.indexOf("str")];
    characterAbilityScores.strMod = returnAbilityScoreModifier(characterAbilityScores.str);

    characterAbilityScores.con = abilityScores[abilityScoreOrder.indexOf("con")];
    characterAbilityScores.conMod = returnAbilityScoreModifier(characterAbilityScores.con);

    characterAbilityScores.dex = abilityScores[abilityScoreOrder.indexOf("dex")];
    characterAbilityScores.dexMod = returnAbilityScoreModifier(characterAbilityScores.dex);

    characterAbilityScores.int = abilityScores[abilityScoreOrder.indexOf("int")];
    characterAbilityScores.intMod = returnAbilityScoreModifier(characterAbilityScores.int);

    characterAbilityScores.wis = abilityScores[abilityScoreOrder.indexOf("wis")];
    characterAbilityScores.wisMod = returnAbilityScoreModifier(characterAbilityScores.wis);

    characterAbilityScores.cha = abilityScores[abilityScoreOrder.indexOf("cha")];
    characterAbilityScores.chaMod = returnAbilityScoreModifier(characterAbilityScores.cha);

    return characterAbilityScores;

};


function returnRandomRace() {

    return utils.returnRandomArrayItem(["Dragonborn", "Dwarf", "Elf", "Gnome", "Half Elf", "Half Orc", "Halfling", "Human", "Tiefling"])

};



function calculateModifier(abilityScores) {
  for (var key in abilityScores) {

    console.log("score" + abilityScores[key] + "Modifier" + returnAbilityScoreModifier(abilityScores[key]));
}
}



//NewCharacter Construtor
function NewCharacter(){

  this.characterClass = returnRandomCharacterClass();
  this.level = 1;// TODO: add level scaling
  this.gender = returnRandomGender();
  this.firstName = returnFirstName(this.gender);
  this.lastName = returnLastName(this.gender);
  this.race = returnRandomRace();
  this.alignment = returnRandomAlignment();
  this.abilityScores = returnAbilityScores(this.characterClass);
  applySubraceBonuses(this);
  returnCharacterAge(this);

  return this


};

function test(char, stat, ammount) {

  char.abilityScores[stat] += ammount;
  char.abilityScores.strMod = returnAbilityScoreModifier(x.abilityScores.str)
  console.log("======/======"); //for testing
  console.log(x.abilityScores)
  console.log("======/======");
  return x.abilityScores

}

x = new NewCharacter();

console.log(JSON.stringify(x, undefined, 2));
