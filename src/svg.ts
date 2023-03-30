/**
 * Stack Exchange Art / Icons / Logos.
 *
 * Originals are MIT-licensed (Copyright Stack Exchange Inc.): https://github.com/StackExchange/Stacks/tree/develop/docs/assets/img
 */
const SE_ART: _Map = {
  stackoverflow: {
    // https://github.com/StackExchange/Stacks/blob/develop/docs/assets/img/icons/LogoGlyph.svg
    LogoGlyph:
      `<svg aria-hidden="true" class="svg-icon iconLogoGlyph native" width="25" height="30" viewBox="0 0 25 30"><path d="M21 27v-8h3v11H0V19h3v8h18Z" fill="#BCBBBB"></path><path d="M17.1.2 15 1.8l7.9 10.6 2.1-1.6L17.1.2Zm3.7 14.7L10.6 6.4l1.7-2 10.2 8.5-1.7 2ZM7.2 12.3l12 5.6 1.1-2.4-12-5.6-1.1 2.4Zm-1.8 6.8 13.56 1.96.17-2.38-13.26-2.55-.47 2.97ZM19 25H5v-3h14v3Z" fill="#F48024"></path></svg>`,
  },
};

interface _Map {
  [key: string]: any;
}

export default SE_ART;
