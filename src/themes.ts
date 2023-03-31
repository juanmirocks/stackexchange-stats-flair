export const DEFAULT_STYLES = {
  "goldColor": "gold",
  "silverColor": "silver",
  // This is a brighter color. Classic flair uses #CC9966, SO (2023-04) uses #D1A684
  "bronzeColor": "#CF8F5C",
  textFontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif',
  textFontSize: "13px",
  textReputationFontWeight: "bold",
};

export const THEMES: _ThemesMap = {
  "classic-flair-default": {
    bgColor: "#EBEBEB",
    borderColor: "#C5C5C5",
    displayNameColor: "#0077CC",
    reputationColor: "#3C3C3C",
    badgeCountsColor: "#75767A",
    textFontFamily: DEFAULT_STYLES.textFontFamily,
    textFontSize: DEFAULT_STYLES.textFontSize,
    textReputationFontWeight: DEFAULT_STYLES.textReputationFontWeight
  },
    reputationColor: "rgb(22,22,22)",
    badgeCountsColor: "rgb(121,122,127)",
    textFontFamily: DEFAULT_STYLES.textFontFamily,
    textFontSize: DEFAULT_STYLES.textFontSize,
    textReputationFontWeight: DEFAULT_STYLES.textReputationFontWeight
  },
};

interface _ThemesMap {
  [key: string]: any;
}
