# Font licences — brand fonts

_Written September 28, 2026 (`ops/LEGITIMACY-CHECK.md` 9.10). Internal record._

## What the font files themselves say

Read with fontTools from every `.woff2` in `brand/fonts/` and `brand/fonts/static/`. The name table has **no nameID 13 (licence description)** in any of these files. The copyright notice (nameID 0) and the licence URL (nameID 14) are present and are copied here exactly:

| Font | Files | Copyright notice (nameID 0), exact | Licence URL (nameID 14), exact |
|---|---|---|---|
| Bricolage Grotesque | `bricolage-*.woff2`, `static/bricolage-grotesque-*.woff2` | Copyright 2022 The Bricolage Grotesque Project Authors (https://github.com/ateliertriay/bricolage) | https://scripts.sil.org/OFL |
| Nunito Sans | `nunito-*.woff2`, `static/nunito-sans-*.woff2` | Copyright 2016 The Nunito Sans Project Authors (https://github.com/Fonthausen/NunitoSans) | https://scripts.sil.org/OFL |
| Fredoka | `fredoka-*.woff2`, `static/fredoka-*.woff2` | Copyright 2016 The Fredoka Project Authors (https://github.com/hafontia/Fredoka-One) | http://scripts.sil.org/OFL |
| Caveat | `caveat-*.woff2`, `static/caveat-*.woff2` | Copyright 2014 The Caveat Project Authors (https://github.com/googlefonts/caveat) | http://scripts.sil.org/OFL |

## Licence: SIL Open Font License, Version 1.1 (verified from upstream)

The full licence text for each font was downloaded on September 28, 2026 from the Google Fonts repository (`https://raw.githubusercontent.com/google/fonts/main/ofl/<family>/OFL.txt`) and is saved unchanged next to the fonts:

| Font | Licence file | First line of that file (matches nameID 0 exactly) |
|---|---|---|
| Bricolage Grotesque | `OFL-bricolage-grotesque.txt` | Copyright 2022 The Bricolage Grotesque Project Authors (https://github.com/ateliertriay/bricolage) |
| Nunito Sans | `OFL-nunito-sans.txt` | Copyright 2016 The Nunito Sans Project Authors (https://github.com/Fonthausen/NunitoSans) |
| Fredoka | `OFL-fredoka.txt` | Copyright 2016 The Fredoka Project Authors (https://github.com/hafontia/Fredoka-One) |
| Caveat | `OFL-caveat.txt` | Copyright 2014 The Caveat Project Authors (https://github.com/googlefonts/caveat) |

Each file states: "This Font Software is licensed under the SIL Open Font License, Version 1.1." None of the four copyright lines declares a Reserved Font Name.

**What this means in practice (a summary, not legal advice; the licence files govern):** the fonts may be used in sold products, including embedding them in PDFs and printed books, and served on the website. The font files may not be sold on their own. If the font files are redistributed, the matching `OFL-*.txt` goes with them.
