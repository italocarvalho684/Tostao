// In-memory storage for test isolation
// Note: This Map is shared within a test file. For complete isolation between tests,
// you can call `storage.clearAll()` in beforeEach() if needed.
const mockStorage = new Map<string, string>();

// Mock MMKV class with in-memory storage
export class MMKV {
  getString = jest.fn((key: string) => mockStorage.get(key) ?? undefined);
  set = jest.fn((key: string, value: string) => {
    mockStorage.set(key, value);
  });
  delete = jest.fn((key: string) => {
    mockStorage.delete(key);
  });
  clearAll = jest.fn(() => {
    mockStorage.clear();
  });
}

// Mock createMMKV to return a new MMKV instance
export const createMMKV = jest.fn(() => new MMKV());

// Mock useMMKVString hook - returns [value, setter] tuple
// Uses in-memory storage to persist values across renders in tests
export const useMMKVString = jest.fn((key: string, _storage?: MMKV) => {
  const value = mockStorage.get(key) ?? undefined;
  const setValue = jest.fn((newValue: string | undefined) => {
    if (newValue === undefined) {
      mockStorage.delete(key);
    } else {
      mockStorage.set(key, newValue);
    }
  });
  return [value, setValue] as [string | undefined, (value: string | undefined) => void];
});
