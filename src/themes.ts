export const DEFAULT_STYLES = {
  "goldColor": "gold",
  "silverColor": "silver",
  // This is a brighter color. Classic flair uses #CC9966, SO (2023-04) uses #D1A684
  "bronzeColor": "#CF8F5C",

  "classic-flair": {
    textFontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif',
    textFontSize: "13px",
    textReputationFontWeight: "bold",
  },
};


export class Theme {
  readonly bgColor!: string;
  readonly borderMainColor!: string;
  readonly displayNameColor!: string;
  readonly reputationColor!: string;
  readonly badgeCountsColor!: string;

  setCanvasBordersStyle(_width: number, _height: number): string {
    return `
    stroke: ${this.borderMainColor};
    `;
  }

  drawMaybeExtraBorderLines(_width: number, _height: number): string {
    return "";
  }

  drawMaybeProfileImageBackground(_x: number, _y: number, _imgSquareSideSize: number): string {
    return "";
  }

  drawMaybeSiteLogoBackground(_logoSquareSideSize: number): string {
    return "";
  }
}


interface _ThemesMap {
  [key: string]: Theme;
}


export const THEMES: _ThemesMap = {
  "classic_flair_default": new class ClassicFlairDefault extends Theme {
    bgColor = "#EEEEEE";
    borderMainColor = "#CCCCCC";
    displayNameColor = "#0077CC";
    reputationColor = "#444444";
    badgeCountsColor = "#808185";
  }(),

  //classic_flair_clean
  "clean": new class Clean extends Theme {
    bgColor = "#FFFFFF";
    borderMainColor = "none";
    displayNameColor = "#0077CC";
    reputationColor = "#444444";
    badgeCountsColor = "#808185";

    setCanvasBordersStyle(_width: number, _height: number): string {
      //no need to draw any border, since the border is "none", or rather, the color is the same as the background's
      return "";
    }
  }(),

  //classic_flair_dark
  "dark": new class Dark extends Theme {
    bgColor = "#222222";
    borderMainColor = "#888888";
    borderRightAndBottomColor = "#444444";
    displayNameColor = "#CCCCCC";
    reputationColor = "#CCCCCC";
    badgeCountsColor = "#CCCCCC";

    setCanvasBordersStyle(this: Theme, width: number, height: number): string {
      return `
      stroke: ${this.borderMainColor};
      stroke-dasharray: ${width} ${height} ${0} ${width};
      `;
    }

    drawMaybeExtraBorderLines(this: Dark, width: number, height: number): string {
      return `
      <line x1="${width}" y1="0" x2="${width}" y2="${height}" stroke="${this.borderRightAndBottomColor}" />
      <line x1="0" y1="${height}" x2="${width}" y2="${height}" stroke="${this.borderRightAndBottomColor}" />
      `;
    }
  }(),

  //classic_flair_hotdog
  "hotdog": new class Hotdog extends Theme {
    bgColor = "#FF0100";
    borderMainColor = "#000000";
    displayNameColor = "#FFFF00";
    reputationColor = this.displayNameColor;
    badgeCountsColor = "#FFFFFF";

    setCanvasBordersStyle(this: Theme, width: number, height: number): string {
      return `
      stroke: ${this.borderMainColor};
      stroke-dasharray: 0 ${width} ${height + width} ${height};
      `;
    }

    drawMaybeProfileImageBackground(x: number, y: number, imgSquareSideSize: number): string {
      return `<rect x="${x - 1}" y="${y - 1}" width="${imgSquareSideSize + 2}" height="${
        imgSquareSideSize + 2
      }" fill="${this.displayNameColor}"/>`;
    }

    drawMaybeSiteLogoBackground(logoSquareSideSize: number): string {
      return `<rect x="1" y = "1" width = "${logoSquareSideSize-2}" height = "${logoSquareSideSize-2}" fill = "yellow" />`;
    }
  }(),
};
