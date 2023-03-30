// import { IconReputation as soIconReputation } from "npm:@stackoverflow/stacks-icons/icons";
import { ReqParams } from "./dataTypes.ts";
import { fetchImageAsBase64DataURL } from "./fetch.ts";
import SE_ART from "./svg.ts";


const LOCALE = "en";


function writeSiteLogoIfAvailable(params: ReqParams): string {
  return (SE_ART[params.site])
    ? `<svg id="svgSeIconParent" x="60" y="38">${SE_ART[params.site].LogoGlyphXxs}</svg>`
    : "";
}


/**
 * Format number writing the thousand comma separators.
 */
function formatNum(x: number): string {
  return x.toLocaleString(LOCALE);
}


function writeBadge(badgeCount: number, color: string): string {
  return (badgeCount > 0)
    ? `<tspan><tspan fill="${color}">●</tspan><tspan>${formatNum(badgeCount)}</tspan></tspan>`
    : "";
}


//init basic implementation
export function drawClassicFlair(params: ReqParams, seUserPayload: any): Promise<string> {
  const user = seUserPayload.items[0];

  const profileImageBase64UrlPrm = fetchImageAsBase64DataURL(user.profile_image);

  return profileImageBase64UrlPrm.then(profileImageBase64Url => {
    const width = 208;
    const height = 58;

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

      <script>
        // <![CDATA[
        window.addEventListener("DOMContentLoaded", () => {
          var svgSeIconParent = document.getElementById("svgSeIconParent");
          if (!svgSeIconParent) {
            return;
          }

          var textDisplayName = document.getElementById("display_name");
          var textBBox = textDisplayName.getBBox();

          svgSeIconParent.setAttribute("x", textBBox.x - svgSeIconParent.getAttribute("width") - 22);
          svgSeIconParent.setAttribute("y", textBBox.y - 2);
        });
        // ]]>
      </script>

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

      <image href="${profileImageBase64Url}" x="4" y="4" height="50" width="50" />

      <g>
        ${writeSiteLogoIfAvailable(params)}
        <text id="display_name" text-anchor="end" x="${width - 6}" y="18" fill="rgb(0,116,204)">${user.display_name}</text>
      </g>

      <text class="reputation" text-anchor="end" x="${width - 6}" y="35" fill="rgb(22,22,22)">${formatNum(user.reputation)}</text>
      <text text-anchor="end" x="${width - 6}" y="52" fill="rgb(121,122,127)">
        ${writeBadge(user.badge_counts.gold, "gold")}
        ${writeBadge(user.badge_counts.silver, "silver")}
        ${writeBadge(user.badge_counts.bronze, "rgb(207,143,92)")}
      </text>
    </svg>`;
  });
}
