import { describe, it, expect } from 'vitest';

// Import the function to test
import { generateColorSwatches } from './DesignTokens.stories';

describe('generateColorSwatches', () => {
  it('generates HTML with color categories', () => {
    // Arrange & Act
    const html = generateColorSwatches();

    // Assert
    expect(html).toContain('<section');
    expect(html).toContain('Text Colors');
    expect(html).toContain('Interactive Colors');
    expect(html).toContain('Background Colors');
    expect(html).toContain('Border & Separator Colors');
    expect(html).toContain('Favorite Colors');
  });

  it('includes color swatches with variable names', () => {
    // Arrange & Act
    const html = generateColorSwatches();

    // Assert
    expect(html).toContain('$alpha');
    expect(html).toContain('$beta');
    expect(html).toContain('$kappa'); // which is white
    expect(html).toContain('#111827'); // alpha value
    expect(html).toContain('#2563eb'); // beta value
  });

  it('includes descriptions for colors', () => {
    // Arrange & Act
    const html = generateColorSwatches();

    // Assert
    expect(html).toContain('Primary text color');
    expect(html).toContain('Hover/link color');
    expect(html).toContain('Primary background (white)');
  });

  it('handles white color with border', () => {
    // Arrange & Act
    const html = generateColorSwatches();

    // Assert
    // Kappa is white, should have border
    expect(html).toMatch(/background-color:\s*white.*border:\s*1px solid #e5e7eb/);
  });

  it('returns valid HTML structure', () => {
    // Arrange & Act
    const html = generateColorSwatches();

    // Assert
    expect(html).toContain('<section');
    expect(html).toContain('</section>');
    expect(html).toContain('<div');
    expect(html).toContain('</div>');
    expect(html).toContain('<h2');
    expect(html).toContain('</h2>');
  });
});
