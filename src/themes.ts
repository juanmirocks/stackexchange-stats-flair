export const DEFAULT_STYLES = {
  "goldColor": "gold",
  "silverColor": "silver",
  "bronzeColor": "rgb(207,143,92)",
  textFontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif',
  textFontSize: "13px",
  textReputationFontWeight: "bold",
};

export const THEMES: _ThemesMap = {
  "classic-flair-default": {
    bgColor: "rgb(234,234,234)",
    borderColor: "rgb(194,194,194)",
    displayNameColor: "rgb(0,116,204)",
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
