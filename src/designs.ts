import { IconReputation as soIconReputation } from "npm:@stackoverflow/stacks-icons/icons";
import SE_ART from "./svg.ts";

//init basic implementation
export function flair(seUserPayload: any): string {
  const width = 208;
  const height = 58;

  return `
  <svg
     xmlns="http://www.w3.org/2000/svg"
     width="${width}"
     height="${height}"
     viewBox="0 0 ${width} ${height}">

    <rect width="100%" height="100%" fill="gray" />

    <rect
      fill="rgb(193,193,193)"
      width="100%"
      height="100%"
      stroke="rgb(233,233,233)"
    />

    <g transform="translate(1, 1), scale(0.75)">${SE_ART.stackoverflow.LogoGlyph}</g>
    <g transform="translate(5, 25)" fill="${"black"}">${soIconReputation}</g>
    <text x="25" y="40" fill="#9A9B9E">${seUserPayload.items[0].reputation}</text>
  </svg>`;
}
