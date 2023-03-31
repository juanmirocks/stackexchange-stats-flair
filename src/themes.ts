export const DEFAULT_STYLES = {
  "goldColor": "gold",
  "silverColor": "silver",
  // This is a brighter color. Classic flair uses #CC9966, SO (2023-04) uses #D1A684
  "bronzeColor": "#CF8F5C",

  "classic-flair": {
    textFontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif',
    textFontSize: "13px",
    textReputationFontWeight: "bold",
  },
};

interface _ThemesMap {
  [key: string]: any;
}

export const THEMES: _ThemesMap = {
  "classic-flair-default": {
    bgColor: "#EEEEEE",
    borderColor: "#CCCCCC",
    displayNameColor: "#0077CC",
    reputationColor: "#444444",
    badgeCountsColor: "#808185",
  },

  //classic-flair-clean
  "clean": {
    bgColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    displayNameColor: "#0077CC",
    reputationColor: "#444444",
    badgeCountsColor: "#808185",
  },

  //classic-flair-dark
  "dark": {
    bgColor: "#222222",
    //wrong; it has 2 border colors
    borderColor: "#888888",
    displayNameColor: "#CCCCCC",
    reputationColor: "#CCCCCC",
    badgeCountsColor: "#CCCCCC",
  },

  //classic-flair-hotdog
  "hotdog": {
    bgColor: "#FF0100",
    //wrong; it has 2 border colors
    borderColor: "#000000",
    displayNameColor: "#FFFF00",
    reputationColor: "#FFFF00",
    badgeCountsColor: "#FFFFFF",
  },
};

