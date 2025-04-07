import { CurrencyFormatPipe } from './currency-format.pipe';

describe('CurrencyFormatPipe', () => {
  let pipe: CurrencyFormatPipe;

  beforeEach(() => {
    pipe = new CurrencyFormatPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format positive numbers with default currency symbol', () => {
    expect(pipe.transform(5.99)).toBe('$5.99');
    expect(pipe.transform(10)).toBe('$10.00');
    expect(pipe.transform(1000.5)).toBe('$1000.50');
  });

  it('should format positive numbers with custom currency symbol', () => {
    expect(pipe.transform(5.99, '€')).toBe('€5.99');
    expect(pipe.transform(10, '£')).toBe('£10.00');
  });

  it('should format negative numbers', () => {
    expect(pipe.transform(-5.99)).toBe('$-5.99');
    expect(pipe.transform(-10)).toBe('$-10.00');
  });

  it('should handle zero', () => {
    expect(pipe.transform(0)).toBe('$0.00');
  });

  it('should handle NaN values', () => {
    expect(pipe.transform(NaN)).toBe('$0.00');
  });

  it('should handle undefined values', () => {
    expect(pipe.transform(undefined as any)).toBe('$0.00');
  });

  it('should handle null values', () => {
    expect(pipe.transform(null as any)).toBe('$0.00');
  });

  it('should handle very small numbers', () => {
    expect(pipe.transform(0.001)).toBe('$0.00');
    expect(pipe.transform(0.005)).toBe('$0.01');
  });

  it('should handle very large numbers', () => {
    expect(pipe.transform(1000000.99)).toBe('$1000000.99');
  });
}); 