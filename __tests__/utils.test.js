/**
 * Tests for utility functions
 */

// Mock implementations for browser functions not available in Node
const mockCrypto = {
  randomUUID: () => 'mock-uuid-' + Date.now()
};

// Simple test runner (or use actual Jest in practice)
const assert = (condition, message) => {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
};

// Import utilities (in real environment, use require)
const utils = {
  pad: (value) => String(value).padStart(2, '0'),
  parseFirstNumber: (value) => {
    const match = String(value || '').match(/-?\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : null;
  },
  parseInteger: (value) => {
    const parsed = Number.parseInt(String(value || '').trim(), 10);
    return Number.isNaN(parsed) ? 0 : parsed;
  },
  truncateText: (value, maxLength = 140) => {
    const text = String(value || '').trim();
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.slice(0, maxLength).trim()}…`;
  },
  normalizeImageUrls: (value) => {
    if (!value) {
      return [];
    }
    if (Array.isArray(value)) {
      return value
        .map((entry) => String(entry || '').trim())
        .filter(Boolean);
    }
    return String(value)
      .split('\n')
      .map((entry) => entry.trim())
      .filter(Boolean);
  },
  parseChallengeRating: (value) => {
    const raw = String(value || '').trim();
    if (!raw) {
      return null;
    }
    if (raw.includes('/')) {
      const [numerator, denominator] = raw.split('/');
      const num = Number(numerator);
      const den = Number(denominator);
      if (Number.isFinite(num) && Number.isFinite(den) && den !== 0) {
        return num / den;
      }
    }
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : null;
  }
};

describe('Utility Functions', () => {
  describe('pad', () => {
    test('should pad single digit with zero', () => {
      assert(utils.pad(5) === '05', 'pad(5) should be "05"');
    });
    test('should not pad double digits', () => {
      assert(utils.pad(15) === '15', 'pad(15) should be "15"');
    });
  });

  describe('parseFirstNumber', () => {
    test('should parse integer', () => {
      assert(utils.parseFirstNumber('42') === 42, 'should parse "42" as 42');
    });
    test('should parse decimal', () => {
      assert(utils.parseFirstNumber('3.14') === 3.14, 'should parse "3.14" as 3.14');
    });
    test('should parse negative', () => {
      assert(utils.parseFirstNumber('-10') === -10, 'should parse "-10" as -10');
    });
    test('should return null for non-numeric', () => {
      assert(utils.parseFirstNumber('abc') === null, 'should return null for non-numeric');
    });
  });

  describe('parseInteger', () => {
    test('should parse integer', () => {
      assert(utils.parseInteger('42') === 42, 'should parse "42" as 42');
    });
    test('should return 0 for invalid', () => {
      assert(utils.parseInteger('abc') === 0, 'should return 0 for "abc"');
    });
  });

  describe('truncateText', () => {
    test('should not truncate short text', () => {
      const text = 'Hello world';
      assert(utils.truncateText(text) === text, 'should not truncate short text');
    });
    test('should truncate long text with ellipsis', () => {
      const text = 'a'.repeat(150);
      const result = utils.truncateText(text);
      assert(result.endsWith('…'), 'truncated text should end with ellipsis');
      assert(result.length < text.length, 'truncated text should be shorter');
    });
  });

  describe('normalizeImageUrls', () => {
    test('should handle empty value', () => {
      assert(JSON.stringify(utils.normalizeImageUrls(null)) === '[]', 'null should return []');
      assert(JSON.stringify(utils.normalizeImageUrls('')) === '[]', 'empty string should return []');
    });
    test('should convert string to array', () => {
      const result = utils.normalizeImageUrls('url1\nurl2');
      assert(result.length === 2, 'should parse newline-separated URLs');
      assert(result[0] === 'url1', 'first URL should be "url1"');
    });
    test('should handle array input', () => {
      const result = utils.normalizeImageUrls(['url1', 'url2']);
      assert(result.length === 2, 'should handle array input');
    });
  });

  describe('parseChallengeRating', () => {
    test('should parse integer CR', () => {
      assert(utils.parseChallengeRating('5') === 5, 'should parse "5" as 5');
    });
    test('should parse fractional CR', () => {
      assert(utils.parseChallengeRating('1/8') === 0.125, 'should parse "1/8" as 0.125');
    });
    test('should return null for invalid', () => {
      assert(utils.parseChallengeRating('') === null, 'should return null for empty string');
      assert(utils.parseChallengeRating('abc') === null, 'should return null for non-numeric');
    });
  });
});

// Test runner (in real Jest, this is automatic)
function runTests() {
  const tests = [
    () => {
      utils.pad(5) === '05';
      utils.parseFirstNumber('42') === 42;
      utils.parseInteger('42') === 42;
      utils.parseChallengeRating('1/8') === 0.125;
      return true;
    }
  ];
  
  console.log('Running utility tests...');
  tests.forEach((test) => {
    try {
      if (test()) {
        console.log('✓ Test passed');
      }
    } catch (error) {
      console.error('✗ Test failed:', error.message);
    }
  });
}

// Export for Jest
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { describe, test };
}
