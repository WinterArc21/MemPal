export const DEFAULT_THEME = {
    bg: '#FFF9F0',      // Warm Cream
    text: '#2C3E50',    // Dark Slate
    primary: '#4ECDC4', // Retro Teal
    accent: '#E74C3C',  // Red
    border: '#E5D5C5',  // Warm Grey/Beige
    wood: '#DEB887',    // Wood Accent
    white: '#FFFFFF',
    surface: '#FFFAF5',
};

export const OBJECT_THEMES: Record<string, typeof DEFAULT_THEME> = {
    bookshelf: { ...DEFAULT_THEME, bg: '#FDF5E6', primary: '#8B4513', border: '#D2B48C', text: '#3E2723' }, // Old Lace / Saddle Brown
    bed: { ...DEFAULT_THEME, bg: '#FFF0F5', primary: '#E74C3C', border: '#FFB6C1', text: '#4A235A' }, // Lavender Blush / Red
    desk: { ...DEFAULT_THEME, bg: '#F0F8FF', primary: '#2980B9', border: '#ADD8E6', text: '#154360' }, // Alice Blue / Blue
    fridge: { ...DEFAULT_THEME, bg: '#E0F2F1', primary: '#1ABC9C', border: '#B2DFDB', text: '#004D40' }, // Teal / Green
};

export function getTheme(id: string | null) {
    if (!id) return DEFAULT_THEME;
    return OBJECT_THEMES[id] || DEFAULT_THEME;
}
