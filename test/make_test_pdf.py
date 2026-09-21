#!/usr/bin/env python3
"""Build a tiny 2-page PDF with real selectable text, for testing redaction."""
import sys, zlib

def pdf(canary="SECRET-CANARY-12345", path="/tmp/blackline-test.pdf"):
    def stream(lines):
        body = "BT /F1 18 Tf " + " ".join(f"1 0 0 1 72 {y} Tm ({t}) Tj" for t, y in lines) + " ET"
        return body.encode()
    pages = [stream([(canary, 700), ("public line one", 660)]),
             stream([("page two text", 700)])]
    objs = []
    objs.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    objs.append(b"<< /Type /Pages /Kids [3 0 R 5 0 R] /Count 2 >>")
    objs.append(b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 7 0 R >> >> /Contents 4 0 R >>")
    objs.append(b"STREAM0")
    objs.append(b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 7 0 R >> >> /Contents 6 0 R >>")
    objs.append(b"STREAM1")
    objs.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")

    out = bytearray(b"%PDF-1.4\n")
    offsets = []
    for i, o in enumerate(objs, 1):
        offsets.append(len(out))
        if o.startswith(b"STREAM"):
            s = pages[int(o[6:])]
            o = b"<< /Length %d >>\nstream\n" % len(s) + s + b"\nendstream"
        out += b"%d 0 obj\n" % i + o + b"\nendobj\n"
    xref = len(out)
    out += b"xref\n0 %d\n0000000000 65535 f \n" % (len(objs) + 1)
    for off in offsets:
        out += b"%010d 00000 n \n" % off
    out += b"trailer\n<< /Size %d /Root 1 0 R >>\nstartxref\n%d\n%%%%EOF\n" % (len(objs) + 1, xref)
    open(path, "wb").write(out)
    return path

if __name__ == "__main__":
    p = pdf()
    data = open(p, "rb").read()
    assert b"SECRET-CANARY-12345" in data, "canary must be readable in the INPUT pdf"
    print("wrote", p, len(data), "bytes; canary present in plain text (as expected for an unredacted file)")
