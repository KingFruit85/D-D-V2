
const { calculateCharacterWeight } = require('../core')

test('dragonborn weight in range', () => {
    expect(calculateCharacterWeight('dragonborn')).toBeGreaterThanOrEqual(179);
    expect(calculateCharacterWeight('dragonborn')).toBeLessThanOrEqual(367);
});

test('dwarf weight in range', () => {
    expect(calculateCharacterWeight('dwarf')).toBeGreaterThanOrEqual(119);
    expect(calculateCharacterWeight('dwarf')).toBeLessThanOrEqual(211);
});

test('elf weight in range', () => {
    expect(calculateCharacterWeight('elf')).toBeGreaterThanOrEqual(92);
    expect(calculateCharacterWeight('elf')).toBeLessThanOrEqual(170);
});

test('gnome weight in range', () => {
    expect(calculateCharacterWeight('gnome')).toBeGreaterThanOrEqual(37);
    expect(calculateCharacterWeight('gnome')).toBeLessThanOrEqual(43);
});

test('half-elf weight in range', () => {
    expect(calculateCharacterWeight('half-elf')).toBeGreaterThanOrEqual(114);
    expect(calculateCharacterWeight('half-elf')).toBeLessThanOrEqual(238);
});

test('half-orc weight in range', () => {
    expect(calculateCharacterWeight('half-orc')).toBeGreaterThanOrEqual(144);
    expect(calculateCharacterWeight('half-orc')).toBeLessThanOrEqual(380);
});

test('human weight in range', () => {
    expect(calculateCharacterWeight('human')).toBeGreaterThanOrEqual(114);
    expect(calculateCharacterWeight('human')).toBeLessThanOrEqual(270);
});

test('halfling weight in range', () => {
    expect(calculateCharacterWeight('halfling')).toBeGreaterThanOrEqual(37);
    expect(calculateCharacterWeight('halfling')).toBeLessThanOrEqual(43);
});

test('tiefling weight in range', () => {
    expect(calculateCharacterWeight('tiefling')).toBeGreaterThanOrEqual(114);
    expect(calculateCharacterWeight('tiefling')).toBeLessThanOrEqual(238);
});
