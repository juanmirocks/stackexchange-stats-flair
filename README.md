## Modern Stack Exchange flair

Alternative to low-resolution [Stack Exchange flair](http://stackoverflow.com/users/flair/) images, with new, beautiful SVG badges. Example:

![Example defalut SO flair](https://stackoverflow.com/users/flair/1.png)

vs.

![Example new SO flair](https://stackexchange-stats-flair.juanmi.rocks/test_offline?user_id=1&antiCacheHack=2023-04-02)


## How to use

```markdown
![My flair](https://stackexchange-stats-flair.juanmi.rocks/test_offline?site=stackoverflow&user_id=YOUR_USER_ID)
```

Parameters:

* `site` (Optional; defaults to `stackoverflow`) a site's identifier in the Stack Exchange (SE) network; [see available sites](https://api.stackexchange.com/docs/sites).
* `user_id`: your user id in the network (visible for example in your profile's URL)
* `theme` (Optional) [see below](#designs-themes)


## Designs & Themes

<details>
<summary>See available</summary>

### Design: classic-flair

Default / `classic_flair_default`
-
![Default / `classic_flair_default`](https://stackexchange-stats-flair.juanmi.rocks/test_offline?user_id=1&theme=classic_flair_default&antiCacheHack=2023-04-02)


`clean`
-
![`clean`](https://stackexchange-stats-flair.juanmi.rocks/test_offline?user_id=1&theme=clean&antiCacheHack=2023-04-02)


`dark`
-
![`dark`](https://stackexchange-stats-flair.juanmi.rocks/test_offline?user_id=1&theme=dark&antiCacheHack=2023-04-02)


`hotdog`
-
![`hotdog`](https://stackexchange-stats-flair.juanmi.rocks/test_offline?user_id=1&theme=hotdog&antiCacheHack=2023-04-02)

</details>


## Copyright / License

Copyright 2023 Dr. Juan Miguel Cejuela

SPDX-License-Identifier: Apache-2.0

See files: [LICENSE](./LICENSE) & [NOTICE](./NOTICE).
