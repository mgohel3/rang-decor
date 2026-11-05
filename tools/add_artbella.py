"""Adds the Art by One and Bella Ceilo swatch images (client folder "Data received from Karya Graphito Design Team") to data/catalog.json.
Same colour rules as build_catalog.py: sRGB sources are only cropped and resized (profile embedded again, never re-profiled);
a source with another profile is converted with it to sRGB. Every output is decoded and compared with the source crop in CIELAB."""
import io, json, os, re, sys
import numpy as np
from PIL import Image, ImageCms

SRC = r"F:\Client Data\2026\Kalpeshbhai - Karya Graphito\Rang Decor\Data received from Karya Graphito Design Team\TransferNow-Rang\Rang"
SITE = r"C:\Users\admin\Documents\ChatGPT\rangdecor-copy"
OUT = os.path.join(SITE, "public", "images", "catalog")
FOLDERS = {"art-by-one": "artb by one Product", "bella-ceilo": "Bella Ceilo_Product"}
norm = lambda s: re.sub(r"[^A-Z0-9]", "", str(s).upper())
slug = lambda s: re.sub(r"[^a-z0-9]+", "-", str(s).lower()).strip("-")
prof = lambda b: ImageCms.ImageCmsProfile(io.BytesIO(b))

def lab(arr):
    a = arr.astype(np.float64) / 255.0
    a = np.where(a <= 0.04045, a / 12.92, ((a + 0.055) / 1.055) ** 2.4)
    M = np.array([[0.4124564, 0.3575761, 0.1804375], [0.2126729, 0.7151522, 0.0721750], [0.0193339, 0.1191920, 0.9503041]])
    xyz = a @ M.T / np.array([0.95047, 1.0, 1.08883])
    f = np.where(xyz > 216 / 24389, np.cbrt(xyz), (24389 / 27 * xyz + 16) / 116)
    return np.stack([116 * f[..., 1] - 16, 500 * (f[..., 0] - f[..., 1]), 200 * (f[..., 1] - f[..., 2])], -1)

def load(path, srgb):
    im = Image.open(path); icc = im.info.get("icc_profile"); im.load()
    if im.mode != "RGB": im = im.convert("RGB")
    if icc and icc != srgb and "sRGB" not in ImageCms.getProfileDescription(prof(icc)):
        tf = ImageCms.buildTransform(prof(icc), prof(srgb), "RGB", "RGB", renderingIntent=ImageCms.Intent.RELATIVE_COLORIMETRIC, flags=ImageCms.Flags.BLACKPOINTCOMPENSATION)
        return ImageCms.applyTransform(im, tf), "converted from " + ImageCms.getProfileDescription(prof(icc)).strip()
    return im, "srgb" if icc else "untagged, assumed sRGB"

def crop12(im):
    w, h = im.size
    return im.crop((0, 0, w, int(w * 2))) if h >= 2 * w else im.crop(((w - h // 2) // 2, 0, (w - h // 2) // 2 + h // 2, h))

cat = json.load(open(os.path.join(SITE, "data", "catalog.json"), encoding="utf-8"))
srgb = None
for p in os.listdir(os.path.join(SITE, "public", "images", "catalog", "groove-earth")):
    srgb = Image.open(os.path.join(OUT, "groove-earth", p)).info.get("icc_profile"); break
assert srgb
worst = 0.0; log = []
for coll, folder in FOLDERS.items():
    files = {}
    for f in os.listdir(os.path.join(SRC, folder)):
        if f.lower().endswith((".jpg", ".jpeg", ".png")): files[norm(os.path.splitext(f)[0])] = f
    for s in [s for s in cat["series"] if s["collection"] == coll]:
        for it in list(s["pending"]):
            digits = re.sub(r"\D", "", it["code"])
            f = files.get(norm(it["code"])) or files.get(digits)
            if not f: continue
            im, how = load(os.path.join(SRC, folder, f), srgb)
            c = crop12(im); d = os.path.join(OUT, s["id"]); os.makedirs(d, exist_ok=True)
            res = {}
            for kind, width, q in (("thumb", 360, 90), ("view", 900, 90)):
                w = min(width, c.size[0]); r = c.resize((w, w * 2), Image.LANCZOS) if (w, w * 2) != c.size else c.copy()
                p = os.path.join(d, "%s-%s.webp" % (slug(it["code"]), kind)); r.save(p, "WEBP", quality=q, method=6, icc_profile=srgb)
                worst = max(worst, float(np.sqrt(((lab(np.asarray(r)) - lab(np.asarray(Image.open(p).convert("RGB")))) ** 2).sum(-1)).mean()))
                res[kind] = "/images/catalog/%s/%s-%s.webp" % (s["id"], slug(it["code"]), kind)
            s["pending"].remove(it); it.update(res); it["src_name"] = f; s["items"].append(it); log.append((s["id"], it["code"], how))
json.dump(cat, open(os.path.join(SITE, "data", "catalog.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
for s in cat["series"]:
    if s["collection"] in FOLDERS: print(s["id"], "images", len(s["items"]), "still without image", [p["code"] for p in s["pending"]])
print("worst mean deltaE vs source crop: %.2f" % worst, "| colour paths:", sorted(set(h for _, _, h in log)))
