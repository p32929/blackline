// Paste into the browser console with the app open (served over http).
// Asserts that redacted text is unrecoverable from the exported PDF.
(async () => {
  const canary = 'SECRET-CANARY-12345';
  const bytes = await (await fetch('test/blackline-test.pdf')).arrayBuffer();
  console.assert(new TextDecoder('latin1').decode(new Uint8Array(bytes)).includes(canary),
    'input pdf must contain the canary as plain text');

  await window.__blackline.load(new File([bytes], 'case-notes.pdf', { type: 'application/pdf' }));
  window.__blackline.state.rects.push({ page: 0, x: 0.10, y: 0.085, w: 0.42, h: 0.045 });

  const out = new Uint8Array(await (await window.__blackline.exportPdf()).arrayBuffer());
  console.assert(!new TextDecoder('latin1').decode(out).includes(canary), 'canary must be gone from the bytes');

  const pdfjsLib = await import('./vendor/pdf.min.mjs');
  const doc = await pdfjsLib.getDocument({ data: out.slice(0) }).promise;
  let text = '';
  for (let i = 1; i <= doc.numPages; i++) text += (await (await doc.getPage(i)).getTextContent()).items.map(t => t.str).join('');
  console.assert(text === '', 'output must have no text layer at all, got: ' + text);

  const page = await doc.getPage(1), vp = page.getViewport({ scale: 1.5 });
  const c = document.createElement('canvas'); c.width = vp.width; c.height = vp.height;
  const ctx = c.getContext('2d');
  await page.render({ canvasContext: ctx, viewport: vp }).promise;
  const p = ctx.getImageData(Math.round(0.25 * c.width), Math.round(0.105 * c.height), 1, 1).data;
  console.assert(p[0] === 0 && p[1] === 0 && p[2] === 0, 'redacted area must be solid black');

  const band = ctx.getImageData(0, Math.round(0.155 * c.height), c.width, Math.round(0.03 * c.height)).data;
  let dark = 0; for (let i = 0; i < band.length; i += 4) if (band[i] < 100) dark++;
  console.assert(dark > 100, 'uncovered text must still be visible — page was blanked');

  const md = (await doc.getMetadata()).info;
  console.assert(!md.Producer && !md.Title && !md.Author, 'metadata must be stripped');
  console.log('all assertions passed');
})();
