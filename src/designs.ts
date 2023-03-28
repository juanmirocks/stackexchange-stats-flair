// import { IconReputation as soIconReputation } from "npm:@stackoverflow/stacks-icons/icons";
import { ReqParams } from "./dataTypes.ts";
import SE_ART from "./svg.ts";
import { escapeXml } from "./utils.ts";

const LOCALE = "en";

/**
 * Format number writing the thousand comma separators.
 */
function formatNum(x: number): string {
  return x.toLocaleString(LOCALE);
}

function writeBadge(badgeCount: number, color: string): string {
  if (badgeCount > 0) {
    return `<tspan><tspan fill="${color}">●</tspan><tspan>${formatNum(badgeCount)}</tspan></tspan>`;
  }
  else {
    return "";
  }
}

//init basic implementation
export function flair(params: ReqParams, seUserPayload: any): string {
  const user = seUserPayload.items[0];

  const scale = 1;
  const width = 208 * scale;
  const height = 58 * scale;

  const bgColor = "rgb(234,234,234)";
  const borderColor = "rgb(194,194,194)";

  return `
  <svg
     xmlns="http://www.w3.org/2000/svg"
     width="${width}"
     height="${height}"
     viewBox="0 0 ${width} ${height}">

    <title>${user.display_name}'s ${params.site} stats</title>
    <desc>Total reputation: ${user.reputation}; learn more: ${user.link}</desc>

    <style>
      text {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif;
        font-size: 13px;
      }

      text.reputation {
        font-weight: bold;
      }
    </style>

    <rect
      width="100%"
      height="100%"
      fill="${bgColor}"
      stroke="${borderColor}"
    />

    <image href="${escapeXml(user.profile_image)}" x="4" y="4" height="50" width="50" />

    <g transform="translate(1, 1), scale(0.75)">${SE_ART.stackoverflow.LogoGlyph}</g>
    <text text-anchor="end" x="${width - 6}" y="18" fill="rgb(0,116,204)">${user.display_name}</text>
    <text class="reputation" text-anchor="end" x="${width - 6}" y="35" fill="rgb(22,22,22)">${formatNum(user.reputation)}</text>
    <text text-anchor="end" x="${width - 6}" y="52" fill="rgb(121,122,127)">
      ${writeBadge(user.badge_counts.gold, "gold")}
      ${writeBadge(user.badge_counts.silver, "silver")}
      ${writeBadge(user.badge_counts.bronze, "rgb(207,143,92)")}
    </text>
  </svg>`;
}
