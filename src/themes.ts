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
  "classic_flair_default": {
    bgColor: "#EEEEEE",
    borderMainColor: "#CCCCCC",
    displayNameColor: "#0077CC",
    reputationColor: "#444444",
    badgeCountsColor: "#808185",

    setCanvasBordersStyle: function (_width: number, _height: number): string {
      return `
      stroke: ${this.borderMainColor};
      `
    },

    drawMaybeExtraBorderLines: function (_width: number, _height: number): string {
      return "";
    }
  },

  //classic_flair_clean
  "clean": {
    bgColor: "#FFFFFF",
    // borderMainColor: "none",
    displayNameColor: "#0077CC",
    reputationColor: "#444444",
    badgeCountsColor: "#808185",

    setCanvasBordersStyle: function (_width: number, _height: number): string {
      //no need to draw any border, since the border is "none", or rather, the color is the same as the background's
      // return `
      // stroke: ${this.borderMainColor}
      // `
      return "";
    },

    drawMaybeExtraBorderLines: function (_width: number, _height: number): string {
      return "";
    }
  },

  //classic_flair_dark
  "dark": {
    bgColor: "#222222",
    //wrong; it has 2 border colors
    borderMainColor: "#888888",
    borderRightAndBottomColor: "#444444",
    displayNameColor: "#CCCCCC",
    reputationColor: "#CCCCCC",
    badgeCountsColor: "#CCCCCC",

    setCanvasBordersStyle: function (width: number, height: number): string {
      return `
      stroke: ${this.borderMainColor};
      stroke-dasharray: ${width} ${height} ${0} ${width};
      `
    },

    drawMaybeExtraBorderLines: function (width: number, height: number): string {
      return `
      <line x1="${width}" y1="0" x2="${width}" y2="${height}" stroke="${this.borderRightAndBottomColor}" />
      <line x1="0" y1="${height}" x2="${width}" y2="${height}" stroke="${this.borderRightAndBottomColor}" />
      `
    }
  },

  //classic_flair_hotdog
  "hotdog": {
    bgColor: "#FF0100",
    //wrong; it has 2 border colors
    borderMainColor: "#000000",
    displayNameColor: "#FFFF00",
    reputationColor: "#FFFF00",
    badgeCountsColor: "#FFFFFF",

    setCanvasBordersStyle: function (width: number, height: number): string {
      return `
      stroke: ${this.borderMainColor};
      stroke-dasharray: 0 ${width} ${height + width} ${height};
      `
    },

    drawMaybeExtraBorderLines: function (_width: number, _height: number): string {
      return "";
    }
  },
};

