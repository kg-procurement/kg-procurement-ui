import { formatPrice } from '../common.ts';

describe('formatPrice', () => {
  it('should format price for IDR with quantity price > 1', () => {
    const result = formatPrice(50000, 5, 'IDR', 'Pcs');
    expect(result.trim().replace(/\s+/g, ' ')).toBe('Rp 50.000,00 / 5 Pcs');
  });

  it('should format price for IDR with quantity price = 1', () => {
    const result = formatPrice(50000, 1, 'IDR', 'kg');
    expect(result.trim().replace(/\s+/g, ' ')).toBe('Rp 50.000,00 / kg');
});

  it('should format price for USD with quantity price > 1', () => {
    const result = formatPrice(10, 2, 'USD', 'Pcs');
    expect(result).toBe('$10.00 / 2 Pcs');
  });

  it('should format price for USD with quantity price = 1', () => {
    const result = formatPrice(10, 1, 'USD', 'day');
    expect(result).toBe('$10.00 / day');
  });

  it('should handle invalid currency codes gracefully (e.g., EUR)', () => {
    const result = formatPrice(10, 1, 'EUR', 'kg');
    expect(result).toBe('€10.00 / kg');
  });
});
