export const colorVariables = {
  alpha: '#111827',
  beta: '#2563eb',
  gamma: '#1d4ed8',
  delta: '#9ca3af',
  epsilon: '#6b7280',
  zeta: '#6b7280',
  eta: '#d1d5db',
  theta: '#f9fafb',
  iota: '#e5e7eb',
  kappa: 'white',
  lambda: '#fef3c7',
  mu: '#fbbf24',
  nu: '#f59e0b',
  xi: '#e5e7eb',
} as const;

export type ColorVariables = typeof colorVariables;
export type ColorKey = keyof ColorVariables;

export const colorCategories = {
  'Text Colors': {
    alpha: 'Primary text color',
    delta: 'Placeholder text color',
    epsilon: 'Info text color',
    zeta: 'Page text color',
  },
  'Interactive Colors': {
    beta: 'Hover/link color',
    gamma: 'Active/hover state',
  },
  'Background Colors': {
    kappa: 'Primary background (white)',
    theta: 'Card background',
    lambda: 'Accent background',
  },
  'Border & Separator Colors': {
    iota: 'Primary border color',
    eta: 'Separator color',
    xi: 'Secondary border color',
  },
  'Favorite Colors': {
    mu: 'Favorite color 1',
    nu: 'Favorite color 2',
  },
} satisfies Record<string, Partial<Record<ColorKey, string>>>;

export type ColorSwatch = {
  varName: ColorKey;
  description: string;
  colorValue: ColorVariables[ColorKey];
  isWhite: boolean;
};

export type ColorSwatchGroup = {
  categoryName: string;
  swatches: ColorSwatch[];
};

export function buildColorSwatchGroups(): ColorSwatchGroup[] {
  return Object.entries(colorCategories).map(([categoryName, colors]) => {
    const swatches = (Object.entries(colors) as [ColorKey, string][]).map(
      ([varName, description]) => {
        const colorValue = colorVariables[varName];

        return {
          varName,
          description,
          colorValue,
          isWhite: colorValue.toLowerCase() === 'white',
        } satisfies ColorSwatch;
      }
    );

    return {
      categoryName,
      swatches,
    } satisfies ColorSwatchGroup;
  });
}
