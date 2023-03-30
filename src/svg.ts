/**
 * Stack Exchange Art / Icons / Logos.
 *
 * Originals are MIT-licensed (Copyright Stack Exchange Inc.): https://github.com/StackExchange/Stacks/tree/develop/docs/assets/img
 */
const SE_ART: _Map = {
  stackoverflow: {
    // https://github.com/StackExchange/Stacks/blob/develop/docs/assets/img/icons/LogoGlyph.svg
    // LogoGlyph:
    //   `<svg aria-hidden="true" class="svg-icon iconLogoGlyph native" width="25" height="30" viewBox="0 0 25 30"><path d="M21 27v-8h3v11H0V19h3v8h18Z" fill="#BCBBBB"></path><path d="M17.1.2 15 1.8l7.9 10.6 2.1-1.6L17.1.2Zm3.7 14.7L10.6 6.4l1.7-2 10.2 8.5-1.7 2ZM7.2 12.3l12 5.6 1.1-2.4-12-5.6-1.1 2.4Zm-1.8 6.8 13.56 1.96.17-2.38-13.26-2.55-.47 2.97ZM19 25H5v-3h14v3Z" fill="#F48024"></path></svg>`,

    // https://github.com/StackExchange/Stacks/edit/develop/docs/assets/img/icons/LogoGlyphXxs.svg
    LogoGlyphXxs:
      `<svg aria-hidden="true" class="svg-icon iconLogoGlyphXxs mtn2" width="18" height="18" viewBox="0 0 18 18"><path d="M13 15v-3h1v4H3v-4h1v3h9Z" fill="#9EA3A9"></path><path d="m10.02 2.73.91-.67 4.01 5.5-.8.62-4.12-5.45Zm3.01 6.65-5.2-4.21.78-.85 5.14 4.27-.72.79ZM6.12 8.1l6.19 2.74.45-.94L6.69 7l-.57 1.1Zm5.9 4.27L5.35 11.1l.21-1.11 6.6 1.42-.14.96ZM5 14h7v-1H5v1Z" fill="#F27009"></path></svg>`,
  },
};

interface _Map {
  [key: string]: any;
}

export default SE_ART;
