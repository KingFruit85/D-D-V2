//Returns a random number between the two given arguements, returns error message if incorrect arguements given
function returnRandomNumberInRange(minValue, maxValue) {

    if (minValue > maxValue || minValue === undefined || maxValue === undefined) {

        return "Unexpected arguements, please provide minimum and maximum valuses in that order";

    } else {

        return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

    }

}

//returns a floating point value between the given arguements
function  returnRandomFloatInRange(minValue, maxValue) {
  return Math.random() * (maxValue - minValue) + minValue;
}


//Returns a random element of the array provided as the arguement
function returnRandomArrayItem(array){

    return array[returnRandomNumberInRange(0, array.length - 1)];

}

function returnRandomObjectPropertiesAndValues(collection, ammount){

  let spells = [];

  for(i = 0; i < ammount; i++){
    spells.push(Object.values(collection)[returnRandomNumberInRange(0, Object.values(collection).length)]);
  }

  return spells;

}

/**-------------------------------------------------------------------------------
 * @description Calculates the value by number of dice and dice sides.
 * Example: diceThrow(2,8) = 2d8 or diceThrow(10) = 1d6
 * @param {Number} diceQuantity - integer for the quantity of dice to throw
 * @param {Number} diceSides - integer for the number of sides 2, 4, 6, 8, 10, 12, 20, ...
 * @returns {Number} integer with the result of dice throw.  
*///------------------------------------------------------------------------------
function diceThrow (diceQuantity = 1, diceSides) {
  let result = 0;
  for (let i = 0; i < diceQuantity; i+=1) {
    result += Math.floor(Math.random() * parseInt(diceSides,10) ) + 1;
  }
  return result;
}
//--------------------------------------------------------------------------------

exports.diceThrow = diceThrow;
exports.returnRandomNumberInRange = returnRandomNumberInRange;
exports.returnRandomFloatInRange = returnRandomFloatInRange;
exports.returnRandomArrayItem = returnRandomArrayItem;
exports.returnRandomObjectPropertiesAndValues = returnRandomObjectPropertiesAndValues;
