# The redaction test

Claiming "the text is really gone" is worthless without a check, so here is the one this project ships with.

## What it does

1. `make_test_pdf.py` writes a two-page PDF containing the canary string
   `SECRET-CANARY-12345` as real, selectable text. It asserts the canary IS readable
   in the raw bytes of that input file — if it weren't, the test would pass for the
   wrong reason.
2. Serve the repo (`python3 -m http.server 8731`) and open it in a browser.
3. In the browser console, run `test/redact-test.js`. It loads the generated PDF
   through the real app code path, draws a redaction box over the canary, exports,
   and then asserts on the exported file:

   | assertion | why it matters |
   |---|---|
   | the canary appears nowhere in the output bytes | nothing to grep out of the file |
   | `getTextContent()` returns an empty string on every page | nothing to select or copy |
   | the pixels inside the box are exactly `rgb(0,0,0)` | the box was actually burned in |
   | text you did *not* cover still renders | the page wasn't just blanked |
   | Title / Author / Producer / Creator are empty | metadata was stripped |

## Last run

Run on 2026-09-22 against Chrome. Result:

```
pagesRendered: 2          outPages: 2
rawCanary in output:      false
extractedText:            ""
pixel inside box:         [0, 0, 0]        blackFractionInsideBox: 1.000
dark pixels on surviving text line: 900    (page is not blank)
producer/title/author:    "" / "" / ""
```
