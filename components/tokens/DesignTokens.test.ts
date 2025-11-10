import { describe, it, expect } from 'vitest';

import { buildColorSwatchGroups } from './DesignTokens.helpers';

const flattenSwatches = () =>
  buildColorSwatchGroups().flatMap(group => group.swatches.map(swatch => ({ group, swatch })));

describe('buildColorSwatchGroups', () => {
  it('groups colors by the expected categories', () => {
    // Arrange & Act
    const groups = buildColorSwatchGroups();

    // Assert
    expect(groups.map(group => group.categoryName)).toEqual(
      expect.arrayContaining([
        'Text Colors',
        'Interactive Colors',
        'Background Colors',
        'Border & Separator Colors',
        'Favorite Colors',
      ])
    );
  });

  it('includes swatches with variable names and values', () => {
    // Arrange & Act
    const swatches = flattenSwatches();

    // Assert
    const alpha = swatches.find(entry => entry.swatch.varName === 'alpha');
    const beta = swatches.find(entry => entry.swatch.varName === 'beta');
    expect(alpha?.swatch.colorValue).toBe('#111827');
    expect(beta?.swatch.colorValue).toBe('#2563eb');
  });

  it('preserves descriptions for each swatch', () => {
    // Arrange & Act
    const swatches = flattenSwatches();

    // Assert
    const alpha = swatches.find(entry => entry.swatch.varName === 'alpha');
    expect(alpha?.swatch.description).toBe('Primary text color');
  });

  it('marks white swatches so they can render borders', () => {
    // Arrange & Act
    const swatches = flattenSwatches();

    // Assert
    const kappa = swatches.find(entry => entry.swatch.varName === 'kappa');
    expect(kappa?.swatch.colorValue.toLowerCase()).toBe('white');
    expect(kappa?.swatch.isWhite).toBe(true);
  });

  it('returns non-empty swatches for every category', () => {
    // Arrange & Act
    const groups = buildColorSwatchGroups();

    // Assert
    groups.forEach(group => {
      expect(group.swatches.length).toBeGreaterThan(0);
    });
  });
});
