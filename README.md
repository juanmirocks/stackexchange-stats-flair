![TypeScript](https://img.shields.io/badge/typescript-007ACC.svg?logo=typescript&logoColor=white)
![Deno](https://img.shields.io/badge/deno-000000?logo=deno&logoColor=white)
![SVG](https://img.shields.io/badge/SVG-FFB13B?logo=SVG&logoColor=white)


## Modern Stack Exchange flair

Alternative to low-resolution [Stack Exchange flair](http://stackoverflow.com/users/flair/) images, with new, beautiful SVG badges. Example:

![Example defalut SO flair](https://stackoverflow.com/users/flair/1.png)

vs.

![Example new SO flair](https://stackexchange-stats-flair.juanmi.rocks/test_offline?user_id=1&_cacheHack=2023-04-02)


## How to use

Insert the dynamic image in your markdown, as in:

```markdown
![My flair](https://stackexchange-stats-flair.juanmi.rocks/?site=stackoverflow&user_id=YOUR_USER_ID)
```

alternatively, in HTML:

```html
<!-- You might set specific dimensions with the `width`/`height` attributes; https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#height -->
<img alt="My flair" height="58vw" src="https://stackexchange-stats-flair.juanmi.rocks/?site=stackoverflow&user_id=YOUR_USER_ID" />
```


URL query parameters:

- `site` (Optional; defaults to `stackoverflow`) a site's identifier in the Stack Exchange (SE) network; [see list](./test/SE_sites.jsonc).
- `user_id`: your user id in the chosen network (visible for example in your profile's URL).
- `theme` (Optional) [see below](#designs--themes).


## Designs & Themes

<details>
<summary>See available</summary>

### Design: classic_flair

| Theme name                        | Result                                                                                                                       |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| default / `classic_flair_default` | ![](https://stackexchange-stats-flair.juanmi.rocks/test_offline?user_id=1&theme=classic_flair_default&_cacheHack=2023-04-02) |
| `clean`                           | ![](https://stackexchange-stats-flair.juanmi.rocks/test_offline?user_id=1&theme=clean&_cacheHack=2023-04-02)                 |
| `dark`                            | ![](https://stackexchange-stats-flair.juanmi.rocks/test_offline?user_id=1&theme=dark&_cacheHack=2023-04-02)                  |
| `hotdog`                          | ![](https://stackexchange-stats-flair.juanmi.rocks/test_offline?user_id=1&theme=hotdog&_cacheHack=2023-04-02)                |

</details>


## Copyright / License

Copyright 2023 Dr. Juan Miguel Cejuela

SPDX-License-Identifier: Apache-2.0

See files: [LICENSE](./LICENSE) & [NOTICE](./NOTICE).
