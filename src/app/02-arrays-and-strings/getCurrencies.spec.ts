import { getCurrencies } from './getCurrencies';

describe('--getCurrencies--', () => {
  it('should return the supported currency', () => {
    const result = getCurrencies();

    expect(result).toContain('USD');
    expect(result).toContain('AUD');
    expect(result).toContain('EUR');
  });
});
