// import { IconReputation as soIconReputation } from "npm:@stackoverflow/stacks-icons/icons";
import SE_ART from "./svg.ts";
import { escapeXml } from "./utils.ts";

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

    <rect
      width="100%"
      height="100%"
      fill="${bgColor}"
      stroke="${borderColor}"
    />

    <image href="${escapeXml(user.profile_image)}" x="4" y="4" height="50" width="50" />

    <g transform="translate(1, 1), scale(0.75)">${SE_ART.stackoverflow.LogoGlyph}</g>
    <text x="25" y="40" fill="#9A9B9E">${user.reputation}</text>
  </svg>`;
}
