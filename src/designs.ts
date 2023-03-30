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


/**
 * Return an SVG image (as an async string) that resembles the original flair images from SE/SO: https://stackoverflow.com/users/flair/
 *
 * Known issues:
 * ## The site icon is currently only available for the site Stack Overflow (SO).
 *
 * ## The site icon is shown as in the original (left relative to the user's display name) only when the context allows JavaScript (JS).
 *
 * The current solution uses JS on the client side to dynamically calculate the displayed size of the display name (which is at first unknown) and,
 * accordingly, fix the x coordinate of the icon.
 * In particular, that doesn't work when embedding the SVG image within a markdown document.
 *
 * Nonetheless, in the absence of JS, the icon is displayed to the right and bottom of the user's profile image.
 * That's a good default as it's the same as the "Combined" flair original style SE.
 *
 * As of 2023-03-30, didn't manage to position the icon relative to the display name using either:
 * * SVG only
 * * SVG with a `<foreignObject>` and CSS flexbox
 * * Dynamic JavaScript but on the server side:
 *  * jsdom gave running problems and is anyway not available on Deno Deploy
 *  * deno-dom doesn't support SVG; see https://github.com/b-fuze/deno-dom/issues/81
 *  * LinkeDOM supports SVG only in a limited way, and in particular doesn't implement [SVGGraphicsElement.getBBox()](https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getBBox)
 *    see https://github.com/WebReflection/linkedom/blob/main/esm/svg/element.js
 *
 */
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
