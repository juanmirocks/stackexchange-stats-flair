// import { IconReputation as soIconReputation } from "npm:@stackoverflow/stacks-icons/icons";
import { ReqParams } from "./dataTypes.ts";
import { fetchImageAsBase64DataURL } from "./fetch.ts";
import SE_ART from "./svg.ts";
import { DEFAULT_STYLES, THEMES } from "./themes.ts";


const LOCALE = "en";


function drawSiteLogoIfAvailable(params: ReqParams): string {
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


function drawBadge(badgeCount: number, color: string): string {
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

    const theme = THEMES[params.theme];

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
          font-family: ${DEFAULT_STYLES["classic-flair"].textFontFamily};
          font-size: ${DEFAULT_STYLES["classic-flair"].textFontSize};
        }

        text.reputation {
          font-weight: ${DEFAULT_STYLES["classic-flair"].textReputationFontWeight};
        }

        rect.canvas {
          ${theme.setCanvasBordersStyle(width, height)}
        }
      </style>

      <rect class="canvas"
        width="100%"
        height="100%"
        fill="${theme.bgColor}"
      />
      ${theme.drawMaybeExtraBorderLines(width, height)}

      ${/* the values (x,y,size) must be equal in both lines */""}
      ${theme.drawMaybeProfileImageBackground(4, 4, 50)}
      <image href="${profileImageBase64Url}" x="4" y="4" height="50" width="50" />

      <g>
        ${drawSiteLogoIfAvailable(params)}
        <text id="display_name" text-anchor="end" x="${width - 6}" y="18" fill="${theme.displayNameColor}">${user.display_name}</text>
      </g>

      <text class="reputation" text-anchor="end" x="${width - 6}" y="35" fill="${theme.reputationColor}">${formatNum(user.reputation)}</text>
      <text text-anchor="end" x="${width - 6}" y="52" fill="${theme.badgeCountsColor}">
        ${drawBadge(user.badge_counts.gold, DEFAULT_STYLES.goldColor)}
        ${drawBadge(user.badge_counts.silver, DEFAULT_STYLES.silverColor)}
        ${drawBadge(user.badge_counts.bronze, DEFAULT_STYLES.bronzeColor)}
      </text>
    </svg>`;
  });
}
