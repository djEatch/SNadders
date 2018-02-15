const roll = require('./sketch')
const floor = require('./libraries/p5')

test('checking roll >= 1', () => {
     expect(roll()).toBeGreaterThanOrEqual(1);
 });

 test('checking roll <= 6', () => {
    expect(roll()).toBeLessThanOrEqual(6);
});