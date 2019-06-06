const simpleWeapons = {


    club: {
        name: "Club",
        cost: "1sp",
        damage: "1d4 bludgeoning",
        weight: "2lb",
        properties: "Light"
    },
    dagger: {
        name: "Dagger",
        cost: "2gp",
        damage: "1d4 piercing",
        weight: "1lb",
        properties: "Finesse, light, thrown (range 20/60)"
    },
    greatclub: {
        name: "Greatclub",
        cost: "2sp",
        damage: "1d8 bludgeoning	",
        weight: "10 lb",
        properties: "Two-handed"
    },
    handaxe: {
        name: "Handaxe",
        cost: "5gp",
        damage: "1d6 slashing",
        weight: "2lb",
        properties: "Light, thrown (range 20/60)"
    },
    javelin: {
        name: "Javelin",
        cost: "5sp",
        damage: "1d6 piercing",
        weight: "2lb",
        properties: "Thrown (range 30/120)"
    },
    lightHammer: {
        name: "Light Hammer",
        cost: "2gp",
        damage: "1d4 bludgeoning",
        weight: "2lb",
        properties: "Light, thrown (range 20/60)"
    },
    mace: {
        name: "Mace",
        cost: "5gp",
        damage: "1d6 bludgeoning",
        weight: "4lb",
        properties: ""
    },
    quarterstaff: {
        name: "Quarterstaff",
        cost: "2sp",
        damage: "1d6 bludgeoning",
        weight: "4lb",
        properties: "Versatile (1d8)"
    },
    sickle: {
        name: "Sickle",
        cost: "1gp",
        damage: "1d4 slashing",
        weight: "2lb",
        properties: "Light"
    },
    spear: {
        name: "Spear",
        cost: "1gp",
        damage: "1d6 piercing",
        weight: "3lb",
        properties: "Thrown (range 20/60), versatile (1d8)"
    }

}


const simpleRangedWeapons = {


    lightCrossbow: {
        name: "Light Crossbow",
        cost: "25 gp",
        damage: "1d8 piercing",
        weight: "	5 lb",
        properties: "	Ammunition (range 80/320), loading, two-handed"
    },
    dart: {
        name: "Dart",
        cost: "5 cp",
        damage: "1d4 piercing",
        weight: "1/4 lb",
        properties: "Finesse, thrown (range 20/60)"
    },
    shortbow: {
        name: "Shortbow",
        cost: "25 gp",
        damage: "1d6 piercing",
        weight: "2 lb",
        properties: "Ammunition (range 80/320), two-handed"
    },
    sling: {
        name: "Sling",
        cost: "1 sp",
        damage: "1d4 bludgeoning",
        weight: "-",
        properties: "Ammunition (range 30/120)"
    }

}

const martialMeleeWeapons = {

    battleaxe: {
        name: "Battleaxe",
        cost: "10 gp",
        damage: "1d8 slashing",
        weight: "4 lb",
        properties: "Versatile (1d10)"
    },
    flail: {
        name: "Flail",
        cost: "10 gp",
        damage: "1d8 bludgeoning",
        weight: "2 lb",
        properties: "—"
    },
    glaive: {
        name: "Glaive",
        cost: "20 gp",
        damage: "1d10 slashing",
        weight: "6 lb",
        properties: "Heavy, reach, two-handed"
    },
    greataxe: {
        name: "Greataxe",
        cost: "30 gp",
        damage: "1d12 slashing",
        weight: "7 lb",
        properties: "Heavy, two-handed"
    },
    greatsword: {
        name: "Greatsword",
        cost: "50 gp",
        damage: "2d6 slashing",
        weight: "6 lb",
        properties: "Heavy, two-handed"
    },
    halberd: {
        name: "Halberd",
        cost: "20 gp",
        damage: "1d10 slashing",
        weight: "6 lb",
        properties: "Heavy, reach, two-handed"
    },
    lance: {
        name: "Lance",
        cost: "10 gp",
        damage: "1d12 piercing",
        weight: "6 lb",
        properties: "Reach, special"
    },
    longsword: {
        name: "Longsword",
        cost: "15 gp",
        damage: "1d8 slashing",
        weight: "3 lb",
        properties: "Versatile (1d10)"
    },
    maul: {
        name: "Maul",
        cost: "10 gp",
        damage: "2d6 bludgeoning",
        weight: "10 lb",
        properties: "Heavy, two-handed"
    },
    morningstar: {
        name: "Morningstar",
        cost: "15 gp",
        damage: "1d8 piercing",
        weight: "4 lb",
        properties: "-"
    },
    pike: {
        name: "Pike",
        cost: "5 gp",
        damage: "1d10 piercing",
        weight: "18 lb",
        properties: "Heavy, reach, two-handed"
    },
    rapier: {
        name: "Rapier",
        cost: "25 gp",
        damage: "1d8 piercing",
        weight: "2 lb",
        properties: "Finesse"
    },
    scimitar: {
        name: "Scimitar",
        cost: "25 gp",
        damage: "1d6 slashing",
        weight: "3 lb",
        properties: "Finesse, light"
    },
    shortsword: {
        name: "Shortsword",
        cost: "10 gp",
        damage: "1d6 piercing",
        weight: "2 lb",
        properties: "Finesse, light"
    },
    trident: {
        name: "Trident",
        cost: "5 gp",
        damage: "1d6 piercing",
        weight: "4 lb",
        properties: "Thrown (range 20/60), versatile (1d8)"
    },
    warPick: {
        name: "War Pick",
        cost: "5 gp",
        damage: "1d8 piercing",
        weight: "2 lb",
        properties: "—"
    },
    warhammer: {
        name: "Warhammer",
        cost: "15 gp",
        damage: "1d8 bludgeoning",
        weight: "2 lb",
        properties: "Versatile (1d10)"
    },
    whip: {
        name: "Whip",
        cost: "2 gp",
        damage: "1d4 slashing",
        weight: "3 lb",
        properties: "Finesse, reach"
    }

}

const martialRangedWeapons = {


    blowgun: {
        name: "Blowgun",
        cost: "10 gp",
        damage: "1 piercing",
        weight: "1 lb",
        properties: "Ammunition (range 25/100), loading"
    },
    handCrossbow: {
        name: "Hand Crossbow",
        cost: "75 gp",
        damage: "1d6 piercing",
        weight: "3 lb",
        properties: "Ammunition (range 30/120), light, loading"
    },
    heavyCrossbow: {
        name: "Heavy Crossbow",
        cost: "50 gp",
        damage: "1d10 piercing",
        weight: "18 lb",
        properties: "Ammunition (range 100/400), heavy, loading two-handed"
    },
    longbow: {
        name: "Longbow",
        cost: "50 gp",
        damage: "1d8 piercing	weight:2 lb",
        properties: "Ammunition (range 150/600), heavy, two-handed"
    },
    net: {
        name: "Net",
        cost: "1 gp",
        damage: "—",
        weight: "3 lb",
        properties: "Special, thrown (range 5/15)"
    }



}





exports.simpleWeapons = simpleWeapons;
exports.simpleRangedWeapons = simpleRangedWeapons;
exports.martialMeleeWeapons = martialMeleeWeapons;
exports.martialRangedWeapons = martialRangedWeapons;
