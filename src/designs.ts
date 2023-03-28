// import { IconReputation as soIconReputation } from "npm:@stackoverflow/stacks-icons/icons";
import SE_ART from "./svg.ts";
import { escapeXml } from "./utils.ts";

const LOCALE = "en";

/**
 * Format number writing the thousand comma separators.
 */
function formatNum(x: number): string {
  return x.toLocaleString(LOCALE);
}

//init basic implementation
export function flair(seUserPayload: any): string {
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

    <style>
      text {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif;
        font-size: 13px;
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
    <text text-anchor="end" x="${width - 6}" y="20" fill="#9A9B9E">${user.display_name}</text>
    <text text-anchor="end" x="${width - 6}" y="38" fill="rgb(22,22,22)">${formatNum(user.reputation)}</text>
    <text text-anchor="end" x="${width - 6}" y="55" fill="rgb(121,122,127)">
      <tspan fill="gold">●</tspan><tspan>${formatNum(user.badge_counts.gold)}</tspan>
      <tspan fill="silver">●</tspan><tspan>${formatNum(user.badge_counts.silver)}</tspan>
      <tspan fill="rgb(207,143,92)">●</tspan><tspan>${formatNum(user.badge_counts.bronze)}</tspan></text>
  </svg>`;
}
