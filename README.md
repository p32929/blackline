# Blackline

Black out text in a PDF so it is actually gone, not just covered up. It runs entirely in your browser, so the file never leaves your computer.

**[Open Blackline →](https://p32929.github.io/blackline/)**

![Blackline redacting a PDF in the browser](screenshot.png)

## Why this exists

A black rectangle drawn in Preview, Acrobat or Word sits *on top of* the text. The words are still in the file — selectable, copyable, and readable by anyone who opens it in a text editor. That is how redacted court filings and government reports keep leaking.

Blackline rebuilds every page as a flat image with your boxes burned in, then writes a fresh PDF from those images. There is no text layer left to recover, because there is no text layer at all.

## Features

1. **Real redaction** — the covered characters are never written into the output file.
2. **Nothing is uploaded** — your PDF is opened by your own browser. Turn off your wi-fi and it still works.
3. **Metadata stripped** — title, author, subject, keywords, creator and producer come out empty. Images lose their EXIF and GPS block.
4. **Images too** — JPEG, PNG and WebP, as well as PDF. Scans work the same as digital documents.
5. **No account, no install, no extension** — one page, one file in, one file out.
6. **Installable and offline** — it is a PWA, so after the first visit it works with no connection at all.

## Quick start

1. Open <https://p32929.github.io/blackline/>
2. Drop a PDF (or an image) onto the page.
3. Drag across anything you want removed. A red-outlined black box appears — click the × to undo one.
4. Hit **Redact & download**.

That's it.

## Run it on your own machine

No build step, no dependencies to install — it is static files.

```bash
git clone https://github.com/p32929/blackline.git
cd blackline
python3 -m http.server 8080
# open http://localhost:8080
```

It must be served over http (not opened as a `file://` path), because the PDF renderer is an ES module.

## Is the redaction really irreversible?

Yes, and it is checked rather than claimed. `test/README.md` describes the test that ships with this repo: a PDF containing a known canary string is redacted, and the output is then asserted to have (a) no trace of the canary anywhere in the raw bytes, (b) an empty text layer, (c) a solid-black redacted region, and (d) empty metadata — while the text you did *not* cover still renders.

## Guides

Short, practical write-ups — each one ends with a test you can run on your own file.

1. [Why redacted PDFs leak: how a black box gives the text back](https://p32929.github.io/blackline/guides/failed-redactions.html)
2. [How to redact a PDF for free, without uploading it anywhere](https://p32929.github.io/blackline/guides/how-to-redact-a-pdf-free.html)
3. [How to remove PDF and image metadata before you send a file](https://p32929.github.io/blackline/guides/remove-pdf-metadata.html)
4. [Redaction checklist for GDPR, HIPAA and disclosure](https://p32929.github.io/blackline/guides/redaction-compliance-checklist.html)

## Pricing

The hosted tool is free for documents up to 3 pages, with no watermark and no signup. Longer documents need a licence key:

| | |
|---|---|
| **Pro — $39** | Unlimited pages, one person, lifetime, every device you own |
| **Team — $149** | Unlimited pages, up to 10 people in one organisation |
| **Agency — $499** | Unlimited seats, plus the right to self-host it on your own domain or offline intranet and use it on client work |
| **White-Label Source License — $1,999** | Full source, rebrand it under your own name, resell it as your own product |

[Get a licence →](https://p32929.gumroad.com/l/blackline) · one payment, no subscription. Paste the key into the box on the site and the limit is gone.

## Licence

The Blackline source in this repository is **not** open source — see [LICENSE](LICENSE). You may read it, run it locally and use the hosted tool; redistributing it or hosting it for others needs the Agency licence. The vendored libraries in `vendor/` keep their own licences (pdf.js — Apache-2.0, pdf-lib — MIT).

## Contributing

Contributions are very welcome, thank you! Before you start on a pull request, please open an issue and tell me what you would like to add or change. That way we can agree on it first, and your time is not wasted on something that might not fit. Thanks for helping make Blackline better.

## You might also like

<p><a href="https://openstore.pfay.workers.dev/more/p32929/_/0"><picture><source media="(prefers-color-scheme: dark)" srcset="https://openstore.pfay.workers.dev/more/p32929/_/0-dark.svg"><img src="https://openstore.pfay.workers.dev/more/p32929/_/0-light.svg" width="50%" align="top" alt="More apps by p32929 on OpenStore (1)"></picture></a><a href="https://openstore.pfay.workers.dev/more/p32929/_/1"><picture><source media="(prefers-color-scheme: dark)" srcset="https://openstore.pfay.workers.dev/more/p32929/_/1-dark.svg"><img src="https://openstore.pfay.workers.dev/more/p32929/_/1-light.svg" width="50%" align="top" alt="More apps by p32929 on OpenStore (2)"></picture></a><br><a href="https://openstore.pfay.workers.dev/more/p32929/_/2"><picture><source media="(prefers-color-scheme: dark)" srcset="https://openstore.pfay.workers.dev/more/p32929/_/2-dark.svg"><img src="https://openstore.pfay.workers.dev/more/p32929/_/2-light.svg" width="50%" align="top" alt="More apps by p32929 on OpenStore (3)"></picture></a><a href="https://openstore.pfay.workers.dev/more/p32929/_/3"><picture><source media="(prefers-color-scheme: dark)" srcset="https://openstore.pfay.workers.dev/more/p32929/_/3-dark.svg"><img src="https://openstore.pfay.workers.dev/more/p32929/_/3-light.svg" width="50%" align="top" alt="More apps by p32929 on OpenStore (4)"></picture></a></p>

<p><a href="https://p32929.github.io/share/?repo=blackline"><picture><source media="(prefers-color-scheme: dark)" srcset="https://p32929.github.io/readme/footer-share-dark.svg"><img src="https://p32929.github.io/readme/footer-share-light.svg" width="50%" align="top" alt="Share this project with your friends in one click"></picture></a><a href="https://p32929.github.io/support/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://p32929.github.io/readme/footer-support-dark.svg"><img src="https://p32929.github.io/readme/footer-support-light.svg" width="50%" align="top" alt="If you like my work and want to support me, feel free to support"></picture></a><br><a href="https://openstore.pfay.workers.dev/add"><picture><source media="(prefers-color-scheme: dark)" srcset="https://p32929.github.io/readme/footer-join-dark.svg"><img src="https://p32929.github.io/readme/footer-join-light.svg" width="100%" align="top" alt="Put your own apps on OpenStore: free, your listing lives in your own repo"></picture></a></p>
