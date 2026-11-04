"""Builds data/catalog.json and public/images/catalog/** from the client spreadsheet and images.

Colour handling (the client asked for no colour difference):
- sRGB sources: pixels are never re-profiled; they are only cropped and resized, and the output embeds the same sRGB profile.
- CMYK sources (Faded, Maskara, 5 Groove Pastel): converted with the file's own embedded profile (U.S. Sheetfed Coated v2)
  to sRGB, relative colorimetric with black point compensation (the Photoshop default).
- Every output is decoded again and compared with the in-memory source crop in CIELAB; the report lists the worst deltaE.
"""
import io, json, os, re, sys, glob
from concurrent.futures import ProcessPoolExecutor
import numpy as np
import openpyxl
from PIL import Image, ImageCms

Image.MAX_IMAGE_PIXELS = None
R = r"F:\Client Data\2026\Kalpeshbhai - Karya Graphito\Rang Decor\Data From Unnati"
HERE = os.path.dirname(os.path.abspath(__file__))
SITE = r"C:\Users\admin\Documents\ChatGPT\rangdecor-copy"
OUT = os.path.join(SITE, "public", "images", "catalog")
ZIPS = os.path.join(HERE, "client-zips")
IMG = os.path.join(R, "images received")

norm = lambda s: re.sub(r"[^A-Z0-9]", "", str(s).upper())
slug = lambda s: re.sub(r"[^a-z0-9]+", "-", str(s).lower()).strip("-")

# ---------- profiles ----------
def icc_of(path):
    return Image.open(path).info.get("icc_profile")
SRGB_BYTES = icc_of(os.path.join(IMG, "GROOVE", "earth", "RG 5005.jpg"))
CMYK_BYTES = icc_of(os.path.join(ZIPS, "maskara-zip", "maskara", "4000.jpg"))
assert SRGB_BYTES and CMYK_BYTES

def prof(b): return ImageCms.ImageCmsProfile(io.BytesIO(b))

# ---------- source folders ----------
SRC = {
    "groove-earth": os.path.join(IMG, "GROOVE", "earth"),
    "groove-forest": os.path.join(IMG, "GROOVE", "forest"),
    "groove-pastel": os.path.join(IMG, "GROOVE", "pastel"),
    "charco-charm": os.path.join(ZIPS, "charco-charm", "charco charm"),
    "faded": os.path.join(ZIPS, "faded", "faded"),
    "wallmate": os.path.join(ZIPS, "wallmate", "wallmate"),
    "interlockit": os.path.join(ZIPS, "interlockit", "interlockit"),
    "maskara": os.path.join(ZIPS, "maskara-zip", "maskara"),
}
def index(d):
    out = {}
    for f in os.listdir(d):
        base = f
        while True:
            b2, e = os.path.splitext(base)
            if e.lower() in (".jpg", ".jpeg", ".png"): base = b2
            else: break
        out[norm(base)] = os.path.join(d, f)
    return out
FILES = {k: index(v) for k, v in SRC.items()}

# ---------- spreadsheet ----------
wb = openpyxl.load_workbook(os.path.join(R, "ALL BRAND CODE LIST.xlsx"), data_only=True)
def sheet(name): return wb[[n for n in wb.sheetnames if n.strip() == name][0]]
CODE = re.compile(r"^(?:[A-Z]{1,3}[ -]?\d{1,6}(?: HG)?|\d{4,6})$", re.I)
def clean(c): return re.sub(r"\s+", " ", str(c).strip())

series = []   # each: dict(id, collection, name, note, items[], pending[])
def S(id, collection, name, note=None): s = dict(id=id, collection=collection, name=name, note=note, items=[], pending=[]); series.append(s); return s
def add(s, code, srcfile=None, name=None, meta=None):
    (s["items"] if srcfile else s["pending"]).append(dict(code=code, name=name, meta=meta, src=srcfile))

def simple(sheetname, sid, collection, name, key, prefix="", skip_first_rows=0, exclude=()):
    s = S(sid, collection, name)
    ws = sheet(sheetname); seen = set()
    for row in ws.iter_rows(values_only=True):
        for c in row[1:] if len(row) > 1 else row:
            if c is None: continue
            t = clean(c)
            if not CODE.match(t) or t in exclude: continue
            disp = (prefix + t) if prefix and not t.upper().startswith(prefix.strip().upper()) else t
            k = norm(disp)
            if k in seen: continue
            seen.add(k)
            f = FILES[key].get(k) or FILES[key].get(norm(t))
            add(s, disp, f)
    return s

# Groove: sheets hold bare numbers, files are "RG 5005"
simple("EARTH", "groove-earth", "groove-earth", "Groove Earth", "groove-earth", prefix="RG ")
simple("FOREST", "groove-forest", "groove-forest", "Groove Forest", "groove-forest", prefix="RG ")
simple("PASTEL", "groove-pastel", "groove-pastel", "Groove Pastel", "groove-pastel", prefix="RG ")
# pastel codes missing from the pastel folder fall back to the same code in the earth folder (flagged in the report)
for it in list(series[-1]["pending"]):
    k = norm(it["code"]); f = FILES["groove-earth"].get(k)
    if f:
        series[-1]["pending"].remove(it); it["src"] = f; it["meta"] = "image taken from Groove Earth (same code)"; series[-1]["items"].append(it)
simple("CHARCO CHARM", "charco-charm", "charco-charm", "Charco Charm", "charco-charm")
simple("FADED", "faded", "faded", "Faded", "faded")
# normalise Faded display codes to "RF 2000"
for it in series[-1]["items"] + series[-1]["pending"]: it["code"] = it["code"].replace("-", " ")

# Wallmate: vol-1 WM-31xx, vol-2 written WM 93137 but files are 3137
wm = S("wallmate", "wallmate", "Wallmate")
for row in sheet("WALLMATE").iter_rows(values_only=True):
    for idx, vol in ((1, "Vol 1"), (4, "Vol 2")):
        if len(row) > idx and row[idx] is not None:
            t = clean(row[idx])
            m = re.match(r"^WM[ -]*(\d{4,5})$", t, re.I)
            if not m: continue
            num = m.group(1)
            file_num = num[1:] if len(num) == 5 and num.startswith("9") else num
            f = FILES["wallmate"].get(norm(file_num))
            add(wm, "WM " + file_num, f, meta=vol + (" (sheet lists it as WM %s)" % num if file_num != num else ""))

# Interlockit boards (HDB) and louvers (HDL), trims as notes
il_b = S("interlockit-boards", "interlockit", "HDPC boards", "Trims: J, I, T, P, L, LED, LED skirting and H (silver). J, I, T and P are also available in black and gold.")
il_l = S("interlockit-louvers", "interlockit", "HDPC louvers")
for n in range(1, 16):
    add(il_b, "HDB %02d" % n, FILES["interlockit"].get(norm("HDB %02d" % n)))
    add(il_l, "HDL %02d" % n, FILES["interlockit"].get(norm("HDL %02d" % n)))

# Maskara (code + name), plus Faded 2 mm glossy (already under Faded) and Litia fluted
mk = S("maskara", "maskara", "Maskara")
ws = sheet("MASKARA"); lit = S("litia", "litia", "Litia fluted", "Acrylic fluted laminates in three profiles: ribble, frill and wavie. Sizes 8 x 2 ft or 8 x 4 ft.")
profile = None
for row in ws.iter_rows(values_only=True):
    row = list(row) + [None] * 16
    for ci in (0, 4):
        sn, code, nm = row[ci], row[ci + 1], row[ci + 2]
        if isinstance(sn, (int, float)) and code is not None and re.match(r"^\d{4}$", clean(code)):
            c = clean(code)
            add(mk, c, FILES["maskara"].get(norm(c)), name=clean(nm).title().replace("Bm ", "BM ") if nm else None)
    if isinstance(row[9], (int, float)) and row[10] and str(row[10]).strip().upper().startswith("RL"):
        if row[14]: profile = clean(row[14]).title()
        add(lit, clean(row[10]), None, name=clean(row[11]).title() if row[11] else None, meta="%s · %s ft" % (profile or "", str(row[13]).strip().lower().replace(" ", "").replace("x", " x ")))

# Bern Thermo: new RB codes (no images received) + HDL 01-04 which are Interlockit louvers
bern = S("bern", "bern", "Bern Thermo")
for row in sheet("BERN THERMO").iter_rows(values_only=True):
    c = row[1] if len(row) > 1 else None
    if c is None: continue
    t = clean(c)
    if re.match(r"^HDL \d+$", t): add(bern, t, FILES["interlockit"].get(norm(t)), meta="HDPC louver")
    elif re.match(r"^RB ?\d{4}( HG)?$", t, re.I): add(bern, t.upper() if " " in t else t[:2] + " " + t[2:], None)

# Art by One + Bella Ceilo: no images received
ab = S("art-by-one", "art-by-one", "Art by One")
for row in sheet("ART BY ONE").iter_rows(values_only=True):
    if len(row) > 1 and row[1] and re.match(r"^R[AO] ?\d{4}$", clean(row[1])): add(ab, clean(row[1]), None)
for vol, rng in (("Vol 1", (2, 14)), ("Vol 2", (15, 30))):
    pass
bc1 = S("bella-ceilo-1", "bella-ceilo", "Soffit Vol 1"); bc2 = S("bella-ceilo-2", "bella-ceilo", "Soffit Vol 2")
cur = bc1
for row in sheet("BELLA CEILO").iter_rows(values_only=True):
    row = list(row) + [None] * 8
    if row[0] and "VOL - 2" in str(row[0]).upper().replace("  ", " "): cur = bc2; continue
    if row[0] and "VOL-1" in str(row[0]).upper().replace(" ", ""): cur = bc1; continue
    if isinstance(row[0], (int, float)) and row[1] is not None:
        a, b = clean(row[1]), clean(row[2])
        code, name = (a, b) if re.match(r"^(BG - )?\d{5}$", a) else (b, a)
        trims = " / ".join(clean(x) for x in row[3:7] if x)
        note = clean(row[7]) if row[7] else None
        add(cur, code, None, name=name.title().replace("Bg - ", "BG "), meta=trims + ((" · " + note) if note else ""))

# ---------- conversion ----------
ASPECT = 2.0   # tile and lightbox are 1:2
def load_srgb(path):
    im = Image.open(path)
    icc = im.info.get("icc_profile")
    im.load()
    if im.mode == "CMYK":
        src = prof(icc or CMYK_BYTES)
        tf = ImageCms.buildTransform(src, prof(SRGB_BYTES), "CMYK", "RGB", renderingIntent=ImageCms.Intent.RELATIVE_COLORIMETRIC, flags=ImageCms.Flags.BLACKPOINTCOMPENSATION)
        return ImageCms.applyTransform(im, tf), "cmyk" + ("" if icc else " (no embedded profile, assumed U.S. Sheetfed Coated v2)")
    if im.mode != "RGB": im = im.convert("RGB")
    if icc and icc != SRGB_BYTES:
        try:
            desc = ImageCms.getProfileDescription(prof(icc)).strip()
        except Exception: desc = "?"
        if "sRGB" not in desc:
            tf = ImageCms.buildTransform(prof(icc), prof(SRGB_BYTES), "RGB", "RGB", renderingIntent=ImageCms.Intent.RELATIVE_COLORIMETRIC, flags=ImageCms.Flags.BLACKPOINTCOMPENSATION)
            return ImageCms.applyTransform(im, tf), "rgb " + desc
    return im, "srgb"

def crop12(im):
    w, h = im.size
    if h >= ASPECT * w: return im.crop((0, 0, w, int(w * ASPECT)))
    nw = int(h / ASPECT); x0 = (w - nw) // 2
    return im.crop((x0, 0, x0 + nw, h))

def lab(arr):
    a = arr.astype(np.float64) / 255.0
    a = np.where(a <= 0.04045, a / 12.92, ((a + 0.055) / 1.055) ** 2.4)
    M = np.array([[0.4124564, 0.3575761, 0.1804375], [0.2126729, 0.7151522, 0.0721750], [0.0193339, 0.1191920, 0.9503041]])
    xyz = a @ M.T / np.array([0.95047, 1.0, 1.08883])
    f = np.where(xyz > 216 / 24389, np.cbrt(xyz), (24389 / 27 * xyz + 16) / 116)
    return np.stack([116 * f[..., 1] - 16, 500 * (f[..., 0] - f[..., 1]), 200 * (f[..., 1] - f[..., 2])], -1)

def convert(job):
    src, sid, slg = job
    im, how = load_srgb(src)
    c = crop12(im)
    res = {}
    worst = 0.0
    d = os.path.join(OUT, sid); os.makedirs(d, exist_ok=True)
    for kind, width, q in (("thumb", 360, 90), ("view", 900, 90)):
        w = min(width, c.size[0]); h = w * 2
        r = c.resize((w, h), Image.LANCZOS) if (w, h) != c.size else c.copy()
        p = os.path.join(d, "%s-%s.webp" % (slg, kind))
        r.save(p, "WEBP", quality=q, method=6, icc_profile=SRGB_BYTES)
        back = np.asarray(Image.open(p).convert("RGB"))
        de = np.sqrt(((lab(np.asarray(r)) - lab(back)) ** 2).sum(-1))
        worst = max(worst, float(de.mean()))
        res[kind] = "/images/catalog/%s/%s-%s.webp" % (sid, slg, kind)
        res[kind + "_bytes"] = os.path.getsize(p)
    mean = np.asarray(c.resize((16, 32), Image.BOX)).reshape(-1, 3).mean(0)
    return dict(src=src, how=how, de=worst, mean=[round(float(x), 1) for x in mean], **res)

if __name__ == "__main__":
    jobs = []
    for s in series:
        for it in s["items"]:
            jobs.append((it["src"], s["id"], slug(it["code"])))
    done = {}
    with ProcessPoolExecutor(max_workers=3) as ex:
        for i, r in enumerate(ex.map(convert, jobs, chunksize=2)):
            done[(r["src"], jobs[i][1], jobs[i][2])] = r
            if i % 40 == 0: print("converted", i, "/", len(jobs), flush=True)
    report = []
    for s in series:
        for it in s["items"]:
            r = done[(it["src"], s["id"], slug(it["code"]))]
            it.update(thumb=r["thumb"], view=r["view"]); it["_how"] = r["how"]; it["_de"] = r["de"]; it["_bytes"] = r["thumb_bytes"] + r["view_bytes"]
            it["src_name"] = os.path.basename(it.pop("src"))
    # reuse existing images for brands the client did not resend (kept exactly as they are on the site today)
    legacy = json.load(open(os.path.join(SITE, "data", "visualizer.json"), encoding="utf-8"))
    for fam, sid, coll, nm in (("onit", "onit", "onit", "ONIT"),):
        s = S(sid, coll, nm)
        for sw in legacy["swatches"]:
            if sw["family"] == fam: s["items"].append(dict(code=sw["number"], name=None, meta=None, thumb=sw["image"], view=sw["image"], src_name="existing"))
    out = dict(series=[dict(id=s["id"], collection=s["collection"], name=s["name"], note=s["note"],
                            items=[{k: v for k, v in it.items() if not k.startswith("_")} for it in s["items"]],
                            pending=[{k: v for k, v in it.items() if k != "src"} for it in s["pending"]]) for s in series])
    json.dump(out, open(os.path.join(SITE, "data", "catalog.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    # report
    lines = []
    tot = 0; worst = 0; hows = {}
    for s in series:
        for it in s["items"]:
            if "_de" in it:
                tot += it["_bytes"]; worst = max(worst, it["_de"]); hows[it["_how"]] = hows.get(it["_how"], 0) + 1
        lines.append("%-20s images=%3d  pending(no image)=%3d" % (s["id"], len(s["items"]), len(s["pending"])))
    lines.append("total new image bytes: %.1f MB" % (tot / 1e6))
    lines.append("worst mean deltaE vs source crop: %.2f" % worst)
    lines.append("colour paths: %s" % hows)
    open(os.path.join(HERE, "build_report.txt"), "w", encoding="utf-8").write("\n".join(lines))
    print("\n".join(lines))
