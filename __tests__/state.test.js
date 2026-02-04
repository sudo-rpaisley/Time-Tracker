const state = require('../public/modules/state.js');

describe('state module basic', () => {
  test('exports expected accessors', () => {
    expect(state).toBeDefined();
    expect(typeof state.getCurrentWorld).toBe('function');
    expect(typeof state.getMonsterBookById || typeof state.getMonsterBookById).toBeDefined();
    expect(typeof state.updateWorldNotes).toBe('function');
    expect(typeof state.isAutoClockEnabled).toBe('function');
  });

  test('updateWorldNotes is callable', () => {
    expect(() => state.updateWorldNotes('foo')).not.toThrow();
  });
});
