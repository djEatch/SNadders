const roll = require('./sketch');

test('checking roll >= 1', () => {
     expect(roll()).toBeGreaterThanOrEqual(1);
 });

 test('checking roll <= 6', () => {
    expect(roll()).toBeLessThanOrEqual(6);
});