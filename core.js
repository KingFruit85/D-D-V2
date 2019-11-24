const classes = require('./classes.js');
const utils = require('./utils.js');
const racial_traits =require('./racial_traits.js');
const spells =require('./spells.js');
const names =require('./names.js');
const feats =require('./feats.js');
const fs = require('fs');

const validClassList = ["bard", "barbarian", "cleric", "fighter", "monk", "paladin",
                    "ranger", "rogue", "sorcerer", "warlock", "wizard"];

const validRaceList = ["dragonborn", "dwarf", "elf", "gnome", "half-elf", "half-orc",
                       "halfling", "human", "tiefling"];


// TODO: refactor, must be a cleaner way to do this
//Takes a string representing a dice roll, such as "2d4" and returns a value in inches
// function returnHeightAndWeight(height, weight) {

//   let rollAmountHeight = height.substring(0, height.indexOf('d'));
//   let diceTypeHeight   = height.substring(height.indexOf('d') +1);

//   let rollAmountWeight = weight.substring(0, weight.indexOf('d'));
//   let diceTypeWeight   = weight.substring(weight.indexOf('d') +1);

//   let sumOfRolls = null;
//   let heightWeight =[];

//   for (i = 1; i <= rollAmountHeight; i++){
//     sumOfRolls +=  utils.returnRandomNumberInRange(1,diceTypeHeight);
//   }

//   //conversion from feet to inches, had to do some ugly stuff to stop super long floats
//   heightPrep = parseFloat((sumOfRolls / 12).toFixed(1));
//   heightPrep = heightPrep.toString().substring(0,2);
//   heightPrep = parseFloat(heightPrep);
//   heightWeight.push(heightPrep);


//   sumOfRolls = null; //reset sumOfRolls

//   for (j = 1; j <= rollAmountWeight; j++){
//     sumOfRolls +=  utils.returnRandomNumberInRange(1,diceTypeWeight);
//   }

//   heightWeight.push(heightWeight[0] * sumOfRolls);

//   return heightWeight;

// }

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
}

//Takes the characters race property as an arguement and returns an age appropriate for that race
function returnCharacterAge(race){

  switch (true) {
    case race === "dragonborn": return utils.returnRandomNumberInRange(15,80);
    case race === "dwarf":      return utils.returnRandomNumberInRange(50,350);
    case race === "elf":        return utils.returnRandomNumberInRange(100,750);
    case race === "gnome":      return utils.returnRandomNumberInRange(40,450);
    case race === "half-elf":   return utils.returnRandomNumberInRange(20,180);
    case race === "half-orc":   return utils.returnRandomNumberInRange(14,75);
    case race === "halfling":   return utils.returnRandomNumberInRange(20,250);
    case race === "human":      return utils.returnRandomNumberInRange(16,100);
    case race === "tiefling":   return utils.returnRandomNumberInRange(16,120);
    default:return "Fell though switch case [returnCharacterAge()]";
  }

}

//Takes the character object as it's argument and applies the racial bonuses
function applySubraceBonuses(char){

  character = char;

  switch (true) {
    case character.race === "dragonborn":applyDragonbornRaceBonuses(character);break;
    case character.race === "dwarf":applyDwarfRaceBonuses(character);break;
    case character.race === "elf":applyElfRaceBonuses(character);break;
    case character.race === "gnome":applyGnomeRaceBonuses(character);break;
    case character.race === "half-elf":applyHalfElfRaceBonuses(character);break;
    case character.race === "half-orc":applyHalfOrcRaceBonuses(character);break;
    case character.race === "halfling":applyHalflingRaceBonuses(character);break;
    case character.race === "human":applyHumanRaceBonuses(character);break;
    case character.race === "tiefling":applyTieflingRaceBonuses(character);break;
    default: character.race = "Fell though switch case [applySubraceBonuses()]";

  }

  return character;

}

/**-------------------------------------------------------------------------------
 * @description Calculates character `height`. The calculation adds a 'base height' 
 * with a dice throw specific to each race. The base values are retrieve from:
 *  https://www.reddit.com/r/DnD/comments/abebq0/chart_with_heightweight_ranges_and_averages_for/ 
 * @param {String} race - the character race.
 * @returns {Number} the calculated height in ft.  
*///------------------------------------------------------------------------------
function calculateCharacterHeight(race) {
  let finalHeight = 0.0;
  switch (race) {
      case "dragonborn":
          finalHeight = 5.6 + parseFloat((utils.diceThrow(2,8)/ 12).toFixed(1));
      break;
      case "dwarf":
          finalHeight = 3.8 + parseFloat((utils.diceThrow(2,8)/ 12).toFixed(1));
      break;
      case "elf":
          finalHeight = 4.6 + parseFloat((utils.diceThrow(2,10)/ 12).toFixed(1));
      break;
      case "gnome":
          finalHeight = 2.11 + parseFloat((utils.diceThrow(2,4)/ 12).toFixed(1));
      break;
      case "half-elf":
          finalHeight = 4.9 + parseFloat((utils.diceThrow(2,8)/ 12).toFixed(1));
      break;
      case "half-orc":
          finalHeight = 4.10 + parseFloat((utils.diceThrow(2,10)/ 12).toFixed(1));
      break;
      case "halfling":
          finalHeight = 2.7 + parseFloat((utils.diceThrow(2,4)/ 12).toFixed(1));
      break;
      case "human":
          finalHeight = 4.8 + parseFloat((utils.diceThrow(2,10)/ 12).toFixed(1));
      break;
      case "tiefling":
          finalHeight = 4.9 + parseFloat((utils.diceThrow(2,8)/ 12).toFixed(1));
      break;
      default: return "invalid race provided as function arguement [returnCharacterHeight()]";
  }
  return finalHeight;
};

/**-------------------------------------------------------------------------------
 * @description Calculates character `weight`. The calculation adds a 'base height' 
 * with a dice throw specific to each race. The base values are retrieve from:
 *  https://www.reddit.com/r/DnD/comments/abebq0/chart_with_heightweight_ranges_and_averages_for/ 
 * @param {String} race - the character race.
 * @returns {Number} the calculated weight in lbs.  
*///------------------------------------------------------------------------------
function calculateCharacterWeight(race) {
  let finalWeight = 0.0;
  switch (race) {
      case "dragonborn":
        finalWeight = 175 + utils.diceThrow(2,6);
      break;
      case "dwarf":
        finalWeight = 115 + utils.diceThrow(2,6);
      break;
      case "elf":
        finalWeight = 90 + utils.diceThrow(2,4);
      break;
      case "gnome":
        finalWeight = 35 + utils.diceThrow(2,4);
      break;
      case "half-elf":
        finalWeight = 110 + utils.diceThrow(2,4);
      break;
      case "half-orc":
        finalWeight = 140 + utils.diceThrow(2,6);
      break;
      case "halfling":
        finalWeight = 35 + utils.diceThrow(2,4);
      break;
      case "human":
        finalWeight = 110 + utils.diceThrow(2,4);
      break;
      case "tiefling":
        finalWeight = 110 + utils.diceThrow(2,4);
      break;
      default: return "invalid race provided as function arguement [returnCharacterHeight()]";
  }
  return finalWeight;
}
//--------------------------------------------------------------

// TODO: add subraces based on https://dnd5e.fandom.com/wiki/Character_Details
// TODO: surely this can be refactored?
// function returnCharacterHeight(race) {

//     let additionalHeightAndWeight = [];

//     let heightAndWeight = [];

//     switch (true) {
//         case race === "dragonborn":
//             additionalHeightAndWeight = returnHeightAndWeight("2d8", "2d6");
//             heightAndWeight[0] = additionalHeightAndWeight[0] + 5.6 + " ft";
//             heightAndWeight[1] = additionalHeightAndWeight[1] + 175 + " lbs";
//             break;
//         case race === "dwarf":
//             additionalHeightAndWeight = returnHeightAndWeight("2d8", "2d6");
//             heightAndWeight[0] = additionalHeightAndWeight[0] + 3.8 + " ft";
//             heightAndWeight[1] = additionalHeightAndWeight[1] + 115 + " lbs";
//             break;
//         case race === "elf":
//             additionalHeightAndWeight = returnHeightAndWeight("2d10", "1d4");
//             heightAndWeight[0] = additionalHeightAndWeight[0] + 4.6 + " ft";
//             heightAndWeight[1] = additionalHeightAndWeight[1] + 90 + " lbs";
//             break;
//         case race === "gnome":
//             additionalHeightAndWeight = returnHeightAndWeight("2d4", "1d1");
//             heightAndWeight[0] = additionalHeightAndWeight[0] + 2.11 + " ft";
//             heightAndWeight[1] = additionalHeightAndWeight[1] + 35 + " lbs";
//             break;
//         case race === "half-elf":
//             additionalHeightAndWeight = returnHeightAndWeight("2d8", "2d4");
//             heightAndWeight[0] = additionalHeightAndWeight[0] + 4.9 + " ft";
//             heightAndWeight[1] = additionalHeightAndWeight[1] + 110 + " lbs";
//             break;
//         case race === "half-orc":
//             additionalHeightAndWeight = returnHeightAndWeight("2d10", "2d6");
//             heightAndWeight[0] = additionalHeightAndWeight[0] + 4.10 + " ft";
//             heightAndWeight[1] = additionalHeightAndWeight[1] + 140 + " lbs";
//             break;
//         case race === "halfling":
//             additionalHeightAndWeight = returnHeightAndWeight("2d4", "1d1");
//             heightAndWeight[0] = additionalHeightAndWeight[0] + 2.7 + " ft";
//             heightAndWeight[1] = additionalHeightAndWeight[1] + 35 + " lbs";
//             break;
//         case race === "human":
//             additionalHeightAndWeight = returnHeightAndWeight("2d10", "2d4");
//             heightAndWeight[0] = additionalHeightAndWeight[0] + 4.8 + " ft";
//             heightAndWeight[1] = additionalHeightAndWeight[1] + 110 + " lbs";
//             break;
//         case race === "tiefling":
//             additionalHeightAndWeight = returnHeightAndWeight("2d8", "2d4");
//             heightAndWeight[0] = additionalHeightAndWeight[0] + 4.9 + " ft";
//             heightAndWeight[1] = additionalHeightAndWeight[1] + 110 + " lbs";
//             break;

//         default: return "invalid race provided as function arguement [returnCharacterHeight()]";


//     }

//     return heightAndWeight;

// }

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

}

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
}

function applyDwarfRaceBonuses() {

    character.abilityScores.con += 2;
    character.speed = 25;
    character.racialAbilities = racial_traits.dwarf_racial;
    character.languages = ["Common", "Dwarvish"];
    character.resistances = "Poison";
    character.sizeClass = "Medium";
}

function applyElfRaceBonuses() {

    character.abilityScores.dex += 2;
    character.speed = 30;
    character.racialAbilities = racial_traits.elf_racial;
    character.languages = ["Common", "Elven"];
    character.resistances = null;
    character.sizeClass = "Medium";
}

function applyGnomeRaceBonuses() {

    character.abilityScores.int += 2;
    character.speed = 25;
    character.racialAbilities = racial_traits.gnome_racial;
    character.languages = ["Common", "Gnomish"];
    character.resistances = null;
    character.sizeClass = "Small";
}

function applyHalfElfRaceBonuses() {

    //Half-Elves get an extra +1 in two other ability scores of their choosing
    //the +1 cannot be used in CHA or in the same ability score twice
    let abilityScoreOptions = ["str", "con", "dex", "wis", "int"];
    var returnedScores = [];
    //Push one random value from abilityScoreOptions to returnedScores
    returnedScores.push(utils.returnRandomArrayItem(abilityScoreOptions));
    //then remove that ability score from abilityScoreOptions so we dont pick it twice
    abilityScoreOptions.splice(abilityScoreOptions.indexOf(returnedScores[0]),1);
    //Push the second score
    returnedScores.push(utils.returnRandomArrayItem(abilityScoreOptions));
    //Add the scores
    character.abilityScores.cha += 2;
    character.abilityScores[returnedScores[0]] += 1;
    character.abilityScores[returnedScores[1]] += 1;
    character.speed = 30;
    character.racialAbilities = racial_traits.halfElf_racial;
    character.languages = ["Common", "Elven", returnRandomLanguage()];
    character.resistances = null;
    character.sizeClass = "Medium";
  }

function applyHalfOrcRaceBonuses() {

    character.abilityScores.str += 2;
    character.abilityScores.con += 1;
    character.speed = 30;
    character.racialAbilities = racial_traits.halfOrc_racial;
    character.languages = ["Common", "Orcish"];
    character.resistances = null;
    character.sizeClass = "Medium";
}

function applyHalflingRaceBonuses() {


    character.abilityScores.dex += 2;

    character.speed = 25;
    character.racialAbilities = racial_traits.halfling_racial;
    character.languages = ["Common", "Halfling"];
    character.resistances = null;
    character.sizeClass = "Small";
}

function applyHumanRaceBonuses() {
    //Apply common human stats regardless of variant rules or not
    character.speed = 30;
    character.racialAbilities = null;
    character.languages = ["Common", returnRandomLanguage()];
    character.resistances = null;
    character.sizeClass = "Medium";


    //Roll for variant rules
    if(utils.returnRandomNumberInRange(0, 1) === 0){

      //Variant Human


      character.variant = true;
      //Increase two random ability scores
      let abilitiyScores = ["str", "con", "dex", "int", "wis", "cha"];
      var randomTwoAbilityScores = [];

      randomTwoAbilityScores.push(utils.returnRandomArrayItem(abilitiyScores));
      abilitiyScores.splice(abilitiyScores.indexOf(randomTwoAbilityScores[0]),1);
      randomTwoAbilityScores.push(utils.returnRandomArrayItem(abilitiyScores));

      character.abilityScores[randomTwoAbilityScores[0]]++;
      character.abilityScores[randomTwoAbilityScores[1]]++;


      //add a random feat
      var randomFeat = feats.returnRandomFeat();
      var charStatValue = this.character.abilityScores[randomFeat.statRequirement[0]];
      var featStatValue = randomFeat.statRequirement[1];

      //checks if character is eligable for the feat and selects a different one if not

      var featFound = false;

      while(featFound === false){

        if(randomFeat.statRequirement[0] != undefined){

            if(charStatValue < featStatValue){
              randomFeat = feats.returnRandomFeat();
            }else{
              featFound = true;
            }
        }else{
          featFound = true;
        }

    }

    character.feat = randomFeat;

    // if the feat has a stat increase, applys it
    if (character.feat.statIncrease != undefined){
      character.abilityScores[character.feat.statIncrease[0]] += character.feat.statIncrease[1];
    }

    //if the feat adds a proficient, apply it

    if (character.feat.proficiencyBonus != undefined){

      character.characterClass.armorProficiencies.push(randomFeat.proficiencyBonus[0]);
    }

    }else{
      //Standard Human
      character.variant = "false";
      character.abilityScores.str++;
      character.abilityScores.con++;
      character.abilityScores.dex++;
      character.abilityScores.int++;
      character.abilityScores.wis++;
      character.abilityScores.cha++;

    }
}

function applyTieflingRaceBonuses() {

    character.abilityScores.int += 1;
    character.abilityScores.cha += 2;
    character.speed = 30;
    character.racialAbilities = racial_traits.tiefling_racial;
    character.languages = ["Common", "Infernal"];
    character.resistances = "Fire";
    character.sizeClass = "Medium";
}

function returnRandomLanguage() {
    return utils.returnRandomArrayItem(["Abyssal",
                                        "Aquan",
                                        "Auran",
                                        "Celestial",
                                        "Deep Speech",
                                        "Draconic",
                                        "Dwarvish",
                                        "Elvish",
                                        "Giant",
                                        "Gnomish",
                                        "Goblin",
                                        "Gnoll",
                                        "Halfling",
                                        "Ignan",
                                        "Infernal",
                                        "Orc",
                                        "Primordial",
                                        "Sylvan",
                                        "Terran",
                                        "Undercommon"
                                      ]);
                                    }

//Simulates the rolling of 4D6, removing the lowest value die and returns the sum of the remainder
function roll4D6RemoveLowestAndSum() {

    var numbers = [];

    for (let i = 0; i < 4; i++) {
        numbers.push(utils.returnRandomNumberInRange(1, 6));
    }

    numbers.sort().shift();
    numbers = numbers.reduce((a, b) => a + b, 0);

    return numbers;

}

//Returns 6 freshly rolled ability scores
function returnSixNumbers() {

    var abilityScores = [];

    for (let i = 0; i < 6; i++) {
        abilityScores.push(roll4D6RemoveLowestAndSum());
    }

    return abilityScores;

}

//Returns a random character class as a string
function returnRandomCharacterClass(chartype) {

    if (chartype != undefined && validClassList.includes(chartype)){

      switch (true) {
        case chartype === "bard":return new classes.createBard();
        case chartype === "barbarian":return new classes.createBarbarian();
        case chartype === "monk":return new classes.createMonk();
        case chartype === "cleric":return new classes.createCleric();
        case chartype === "druid":return new classes.createDruid();
        case chartype === "fighter":return new classes.createFighter();
        case chartype === "paladin":return new classes.createPaladin();
        case chartype === "ranger":return new classes.createRanger();
        case chartype === "rogue":return new classes.createRogue();
        case chartype === "sorcerer":return new classes.createSorcerer();
        case chartype === "warlock":return new classes.createWarlock();
        case chartype === "wizard":return new classes.createWizard();
        default:return "ERROR:Fell though switchcase in core.js -> returnRandomCharacterClass()";

      }

    }else{
      return utils.returnRandomArrayItem(classes.classList);
    }

}

//Returns a random gender
function returnRandomGender(genderType) {
  if(typeof genderType === 'undefined'){
    return utils.returnRandomArrayItem(["male", "female"]);
  }else{
    return genderType;
  }
}

//Returns an array of ordered ability score prefrences based on the class supplied in the arguement
function returnAbilityScorePreference (characterClass) {

    switch (true) {

        case characterClass.name === "barbarian": return ["str", "con", "dex", "wis", "cha", "int"];
        case characterClass.name === "bard":      return ["cha", "dex", "con", "wis", "str", "int"];
        case characterClass.name === "monk":      return ["dex", "wis", "con", "str", "cha", "int"];
        case characterClass.name === "cleric":    return ["wis", "str", "con", "dex", "cha", "int"];
        case characterClass.name === "druid":     return ["wis", "dex", "con", "cha", "int", "str"];
        case characterClass.name === "paladin":   return ["str", "cha", "con", "wis", "dex", "int"];
        case characterClass.name === "ranger":    return ["dex", "con", "wis", "str", "cha", "int"];
        case characterClass.name === "rogue":     return ["dex", "con", "wis", "cha", "int", "str"];
        case characterClass.name === "sorcerer":  return ["cha", "con", "int", "wis", "dex", "str"];
        case characterClass.name === "warlock":   return ["cha", "con", "dex", "wis", "int", "str"];
        case characterClass.name === "wizard":    return ["int", "con", "dex", "wis", "cha", "str"];
        case characterClass.name === "fighter" && characterClass.primaryAbility === "str": return ["str", "con", "dex", "wis", "cha", "int"];
        case characterClass.name === "fighter" && characterClass.primaryAbility === "dex": return ["dex", "con", "str", "wis", "cha", "int"];

        default: return "invalid character class supplied as argument [returnAbilityScorePreference()]";

    }

}


//calculates an ability score's modifier
function returnAbilityScoreModifier(stat){

  return Math.floor( ( stat - 10 ) / 2 );

}

function recalculateAbilityScoreModifiers(abilityScores){

  abilityScores.strMod = Math.floor( ( abilityScores.str - 10 ) / 2 );
  abilityScores.dexMod = Math.floor( ( abilityScores.dex - 10 ) / 2 );
  abilityScores.conMod = Math.floor( ( abilityScores.con - 10 ) / 2 );
  abilityScores.intMod = Math.floor( ( abilityScores.int - 10 ) / 2 );
  abilityScores.wisMod = Math.floor( ( abilityScores.wis - 10 ) / 2 );
  abilityScores.chaMod = Math.floor( ( abilityScores.cha - 10 ) / 2 );

  return abilityScores;

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

}


function returnRandomRace(raceType) {

  if(raceType != "undefined" && validRaceList.includes(raceType)){
    return raceType;
  }else{
    return utils.returnRandomArrayItem(validRaceList);
  }
}

function calculateFirstLevelHitPoints(characterClassName, conModifier){

  switch (true) {
    case characterClassName === "bard":  return 8 + conModifier;
    case characterClassName === "barbarian": return 12 + conModifier;
    case characterClassName === "cleric":  return 8 + conModifier;
    case characterClassName === "fighter": return 10 + conModifier;
    case characterClassName === "monk":  return 8 + conModifier;
    case characterClassName === "paladin": return 10 + conModifier;
    case characterClassName === "ranger":  return 10 + conModifier;
    case characterClassName === "rogue": return 8 + conModifier;
    case characterClassName === "sorcerer":  return 6 + conModifier;
    case characterClassName === "warlock": return 8 + conModifier;
    case characterClassName === "wizard":  return 6 + conModifier;

    default:return "fell though switch case";

  }

}

function calculateSavingThrowScores(abilityScores, savingThrowProficiencies, proficiencyModifier){

  let savingThrows = {

    strength:    {modifier:abilityScores.strMod, proficient: savingThrowProficiencies.includes("str")},
    dexterity:   {modifier:abilityScores.dexMod, proficient: savingThrowProficiencies.includes("dex")},
    constitution:{modifier:abilityScores.conMod, proficient: savingThrowProficiencies.includes("con")},
    intelligence:{modifier:abilityScores.intMod, proficient: savingThrowProficiencies.includes("int")},
    wisdom:      {modifier:abilityScores.wisMod, proficient: savingThrowProficiencies.includes("wis")},
    charasma:    {modifier:abilityScores.chaMod, proficient: savingThrowProficiencies.includes("cha")}

  };

  if (savingThrows.strength.proficient     === true){savingThrows.strength.modifier     += proficiencyModifier;}
  if (savingThrows.dexterity.proficient    === true){savingThrows.dexterity.modifier    += proficiencyModifier;}
  if (savingThrows.constitution.proficient === true){savingThrows.constitution.modifier += proficiencyModifier;}
  if (savingThrows.intelligence.proficient === true){savingThrows.intelligence.modifier += proficiencyModifier;}
  if (savingThrows.wisdom.proficient       === true){savingThrows.wisdom.modifier       += proficiencyModifier;}
  if (savingThrows.charasma.proficient     === true){savingThrows.charasma.modifier     += proficiencyModifier;}

  return savingThrows;

}

function calculateSkillScores(abilityScores, skillProficiencies, proficiencyModifier){

  let skillScores = {

    athletics:     {modifier:abilityScores.strMod, proficient:skillProficiencies.includes("athletics")},
    acrobatics:    {modifier:abilityScores.dexMod, proficient:skillProficiencies.includes("acrobatics")},
    sleightOfHand: {modifier:abilityScores.dexMod, proficient:skillProficiencies.includes("sleight of hand")},
    arcana:        {modifier:abilityScores.intMod, proficient:skillProficiencies.includes("arcana")},
    stealth:       {modifier:abilityScores.dexMod, proficient:skillProficiencies.includes("stealth")},
    history:       {modifier:abilityScores.wisMod, proficient:skillProficiencies.includes("history")},
    nature:        {modifier:abilityScores.intMod, proficient:skillProficiencies.includes("nature")},
    religion:      {modifier:abilityScores.wisMod, proficient:skillProficiencies.includes("religion")},
    animalHandling:{modifier:abilityScores.wisMod, proficient:skillProficiencies.includes("animal handling")},
    insight:       {modifier:abilityScores.wisMod, proficient:skillProficiencies.includes("insight")},
    medicine:      {modifier:abilityScores.wisMod, proficient:skillProficiencies.includes("medicine")},
    perception:    {modifier:abilityScores.wisMod, proficient:skillProficiencies.includes("perception")},
    survival:      {modifier:abilityScores.wisMod, proficient:skillProficiencies.includes("survival")},
    deception:     {modifier:abilityScores.chaMod, proficient:skillProficiencies.includes("deception")},
    intimidation:  {modifier:abilityScores.chaMod, proficient:skillProficiencies.includes("intimidation")},
    performance:   {modifier:abilityScores.chaMod, proficient:skillProficiencies.includes("performance")},
    persuasion:    {modifier:abilityScores.chaMod, proficient:skillProficiencies.includes("persuasion")}

  };


  if (skillScores.athletics.proficient === true){skillScores.athletics.modifier += proficiencyModifier;}
  if (skillScores.acrobatics.proficient === true){skillScores.acrobatics.modifier += proficiencyModifier;}
  if (skillScores.sleightOfHand.proficient === true){skillScores.sleightOfHand.modifier += proficiencyModifier;}
  if (skillScores.arcana.proficient === true){skillScores.arcana.modifier += proficiencyModifier;}
  if (skillScores.stealth.proficient === true){skillScores.stealth.modifier += proficiencyModifier;}
  if (skillScores.history.proficient === true){skillScores.history.modifier += proficiencyModifier;}
  if (skillScores.nature.proficient === true){skillScores.nature.modifier += proficiencyModifier;}
  if (skillScores.religion.proficient === true){skillScores.religion.modifier += proficiencyModifier;}
  if (skillScores.animalHandling.proficient === true){skillScores.animalHandling.modifier += proficiencyModifier;}
  if (skillScores.insight.proficient === true){skillScores.insight.modifier += proficiencyModifier;}
  if (skillScores.medicine.proficient === true){skillScores.medicine.modifier += proficiencyModifier;}
  if (skillScores.perception.proficient === true){skillScores.perception.modifier += proficiencyModifier;}
  if (skillScores.survival.proficient === true){skillScores.survival.modifier += proficiencyModifier;}
  if (skillScores.deception.proficient === true){skillScores.deception.modifier += proficiencyModifier;}
  if (skillScores.intimidation.proficient === true){skillScores.intimidation.modifier += proficiencyModifier;}
  if (skillScores.performance.proficient === true){skillScores.performance.modifier += proficiencyModifier;}
  if (skillScores.persuasion.proficient === true){skillScores.persuasion.modifier += proficiencyModifier;}

  return skillScores;

}

/**------------------------------------------------------------------------------
 * Calculate `Armor Class`
 * Calculations from https://merricb.com/2014/09/13/armour-class-in-dungeons-dragons-5e/
 *///----------------------------------------------------------------------------
function calculateArmorClass(char) {
  let AC = NaN;
  if(char.characterClass.equipment.armor !== undefined) { //checks if there is an armor
    AC = parseInt(char.characterClass.equipment.armor.baseArmorClass,10);
  }
  if (!(isNaN(AC)) ) { //1. there is an armor  
    //1.1 Adds Dex depending of armor used.
    if (char.characterClass.equipment.armor.additionalModifier === 'DEX') {
      if (char.characterClass.equipment.armor.modifierLimit > char.abilityScores.dexMod) { //test the armor modifier limit
        AC += char.characterClass.equipment.armor.modifierLimit;  
      }
      else {
        AC += char.abilityScores.dexMod; //dexMod can be lower than armor modifier limit
      }
    }
  }
  else { //no armor
    AC = 10;
    const className = char.characterClass.name;
      // 2.1 check for unarmored sorcerer (add +3 to AC )
      if ((className === "sorcerer")) { //sorcerer and no armor adds +3
        AC += 3; // from https://roll20.net/compendium/dnd5e/Sorcerer#h-Sorcerer
      }
      if ((className === "barbarian")) { //barbarian and no armor adds conMod
        AC += char.abilityScores.conMod; 
      }
      if ((className === "monk")) { //monk and no armor adds wisMod
        AC += char.abilityScores.wisMod; 
      }
      AC += char.abilityScores.dexMod; //finally add dex
  }
  return AC;
}

//// TODO: refactor this beast
function calculateSpellslots(characterClass){

  let spellSlots = {
    cantrips:    {avalible:0, spells:[]},
    firstLevel:  {avalible:0, spells:[]},
    secondLevel: {avalible:0, spells:[]},
    thirdLevel:  {avalible:0, spells:[]},
    forthLevel:  {avalible:0, spells:[]},
    fifthLevel:  {avalible:0, spells:[]},
    sixthLevel:  {avalible:0, spells:[]},
    seventhLevel:{avalible:0, spells:[]},
    eighthLevel: {avalible:0, spells:[]},
    ninthLevel:  {avalible:0, spells:[]},
  };

  if (characterClass === "bard"){

    spellSlots.cantrips.avalible = 2;
    spellSlots.cantrips.spells.push(utils.returnRandomObjectPropertiesAndValues(spells.bardCantrips, spellSlots.cantrips.avalible));

    spellSlots.firstLevel.avalible = 2;
    spellSlots.firstLevel.spells.push(utils.returnRandomObjectPropertiesAndValues(spells.bardLevel1, spellSlots.firstLevel.avalible));

    spellSlots.totalSpellsKnown = 4;

  }

  else if (characterClass === "cleric") {

    spellSlots.cantrips.avalible = 3;
    spellSlots.cantrips.spells.push(utils.returnRandomObjectPropertiesAndValues(spells.clericCantrips, spellSlots.cantrips.avalible));

    spellSlots.firstLevel.avalible = 2;
    spellSlots.firstLevel.spells.push(utils.returnRandomObjectPropertiesAndValues(spells.clericLevel1, spellSlots.firstLevel.avalible));

  }

  else if (characterClass === "druid") {

    spellSlots.cantrips.avalible = 2;
    spellSlots.cantrips.spells.push(utils.returnRandomObjectPropertiesAndValues(spells.druidCantrips, spellSlots.cantrips.avalible));

    spellSlots.firstLevel.avalible = 2;
    spellSlots.firstLevel.spells.push(utils.returnRandomObjectPropertiesAndValues(spells.druidLevel1, spellSlots.firstLevel.avalible));

  }

  else if (characterClass === "paladin") {

    spellSlots.cantrips.avalible = 0;

    spellSlots.firstLevel.avalible = 0;

  }
  else if (characterClass === "ranger") {
    spellSlots.cantrips.avalible = 0;
    spellSlots.firstLevel.avalible = 0;
  }
  else if (characterClass === "sorcerer") {

    spellSlots.cantrips.avalible = 4;
    spellSlots.cantrips.spells.push(utils.returnRandomObjectPropertiesAndValues(spells.sorcererCantrips, spellSlots.cantrips.avalible));

    spellSlots.firstLevel.avalible = 2;
    spellSlots.firstLevel.spells.push(utils.returnRandomObjectPropertiesAndValues(spells.sorcererLevel1, spellSlots.firstLevel.avalible));

    spellSlots.totalSpellsKnown = 2;

  }
  else if (characterClass === "warlock") {

    spellSlots.cantrips.avalible = 2;
    spellSlots.cantrips.spells.push(utils.returnRandomObjectPropertiesAndValues(spells.warlockCantrips, spellSlots.cantrips.avalible));

    spellSlots.firstLevel.avalible = 1;
    spellSlots.firstLevel.spells.push(utils.returnRandomObjectPropertiesAndValues(spells.warlockLevel1, spellSlots.firstLevel.avalible));

    spellSlots.totalSpellsKnown = 2;

  }
  else if (characterClass === "wizard") {

    spellSlots.cantrips.avalible = 3;
    spellSlots.cantrips.spells.push(utils.returnRandomObjectPropertiesAndValues(spells.wizardCantrips, spellSlots.cantrips.avalible));

    spellSlots.firstLevel.avalible = 2;
    spellSlots.firstLevel.spells.push(utils.returnRandomObjectPropertiesAndValues(spells.wizardLevel1, spellSlots.firstLevel.avalible));

  }

  return spellSlots;

}

var chartype; //set by -c commandline arguement
var raceType; //set by the -r commandline arguement

//NewCharacter Construtor
function NewCharacter(){
  this.level = 1;// TODO: add level scaling
  this.proficiencyModifier = 2; //TODO: this should be derived from the charcter level
  this.characterClass = returnRandomCharacterClass(chartype);
  this.characterClassAbilities = classes.addClassFeatures(this.characterClass.name);
  this.race = returnRandomRace(raceType);
  this.gender = returnRandomGender(genderType);
  names.returnRandomName(this);

  this.alignment = returnRandomAlignment();

  this.abilityScores = returnAbilityScores(this.characterClass);
  returnCharacterAge(this);
  applySubraceBonuses(this);

  this.abilityScores = recalculateAbilityScoreModifiers(this.abilityScores);//Some racial traits increase ability scores so we have to recalculate

      //let heightWeight = returnCharacterHeight(character.race);
  this.height = String(calculateCharacterHeight(this.race)) + ' ft';
  this.weight = String(calculateCharacterWeight(this.race)) + ' lbs'; 

  this.hitPoints = calculateFirstLevelHitPoints(this.characterClass.name, this.abilityScores.conMod);
  this.savingThrowScores = calculateSavingThrowScores(this.abilityScores, this.characterClass.savingThrows, this.proficiencyModifier);
  this.skillScores = calculateSkillScores(this.abilityScores, this.characterClass.skillProficiencies, this.proficiencyModifier);
  this.spellSlots = calculateSpellslots(this.characterClass.name);
  this.characterClass.initiative = this.abilityScores.dexMod;

  this.armorClass = calculateArmorClass(this);

  return this;

}

var charQty = 1;
var raceType;
var genderType;

for (let j = 0; j < process.argv.length; j++) { //loops all arguments

    if (process.argv[j] === '-n' || process.argv[j] === '-N') { //check for the argument -n, if 'true' user wants several chars
        var isnum = /^\d+$/.test(process.argv[j + 1]); //checks if the next argument is a number
        if (isnum == true) {
            charQty = process.argv[j + 1];
        }
    }

    if (process.argv[j] === '-c' || process.argv[j] === '-C') { //check for the argument -c, if true user wants to force a specific class
        if (typeof process.argv[j + 1] != 'undefined' && validClassList.includes(process.argv[j + 1].toLowerCase())) { //checks to make sure arguement is valid class
            chartype = process.argv[j + 1].toLowerCase();
        } else {
            chartype = 'undefined';
            console.log("ERROR:Provided class arguement is not a valid class - class will be random");
        }
    }

    if (process.argv[j] === '-r' || process.argv[j] === '-R') { //check for the argument -r, if true user wants to force a specific race
        if (typeof process.argv[j + 1] != 'undefined' && validRaceList.includes(process.argv[j + 1].toLowerCase())) { //checks to make sure arguement is valid race
            raceType = process.argv[j + 1].toLowerCase();
        } else {
            console.log("ERROR: The provided race arguement isn't valid - race will be random"); //If argument isn't a string or a valid class
        }
    }

    if (process.argv[j] === '-g' || process.argv[j] === '-G') { //check for the argument -g, if true user wants to force a specific gender
        let genderProvided = process.argv[j + 1];
        if (typeof genderProvided != 'undefined' && (genderProvided.toLowerCase() === "male" || genderProvided.toLowerCase() === "female")) {
            genderType = process.argv[j + 1].toLowerCase();
        } else {
            genderType = 'undefined';
            console.log("ERROR: The provided gender arguement isn't valid - gender will be random"); //If argument isn't a string or a valid class
        }
    }
    // console.log(j + ' -> ' + (process.argv[j])); //used to print all arguments on screen for testing
}

//Logs out to the screen the count and type of character sheets the user has requested
console.log("***********************************************************************************");
console.log("**********************User has requested " + charQty + " level 1 " + chartype + "'s**********************");
console.log("***********************************************************************************");


for (var k = 0; k < charQty; k++) { //loop to create several characters in a row

  var x = new NewCharacter();
  console.log(x.firstName, x.lastName, "a", x.gender, x.race, x.characterClass.name, "has been saved to the exports folder");

  JsonExport = JSON.stringify(x, undefined, 2);

var dir = './Exports';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

  fs.writeFile("./exports/" + x.firstName + " " + x.lastName + "- " + x.race + " " + x.characterClass.name + ".JSON", JsonExport, function(err) {
      if(err) {
          return console.log(err);
      }

  });

}

exports.calculateCharacterWeight = calculateCharacterWeight;
exports.calculateCharacterHeight = calculateCharacterHeight;