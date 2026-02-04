const api = require('../public/modules/api.js');

describe('API module basic', () => {
  test('exports saveState and saveStateDebounced', () => {
    expect(api).toBeDefined();
    expect(typeof api.saveState).toBe('function');
    expect(typeof api.saveStateDebounced).toBe('function');
  });

  test('loadState returns false when server unreachable', async () => {
    // If fetch is not available or server not running, should return false gracefully
    const result = await api.loadState();
    expect([false, null]).toContain(result);
  }, 10000);
});
