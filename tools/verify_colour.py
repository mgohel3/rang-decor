import sys, os, json, random
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np
from PIL import Image
import build_catalog as b

cat = json.load(open(os.path.join(b.SITE, "data", "catalog.json"), encoding="utf-8"))
srcdir = {"groove-earth": b.SRC["groove-earth"], "groove-forest": b.SRC["groove-forest"], "groove-pastel": b.SRC["groove-pastel"], "charco-charm": b.SRC["charco-charm"],
          "faded": b.SRC["faded"], "wallmate": b.SRC["wallmate"], "interlockit-boards": b.SRC["interlockit"], "interlockit-louvers": b.SRC["interlockit"], "maskara": b.SRC["maskara"], "bern": b.SRC["interlockit"]}
random.seed(7)
rows = []
for s in cat["series"]:
    if s["id"] not in srcdir or not s["items"]: continue
    items = [i for i in s["items"] if i.get("src_name") and i["thumb"].startswith("/images/catalog/")]
    for it in random.sample(items, min(4, len(items))):
        rows.append((s["id"], it, os.path.join(srcdir[s["id"]], it["src_name"])))
print("%-20s %-10s %-9s %6s %6s %6s | %s" % ("series", "code", "path", "pixDE", "p95", "avgDE", "mean RGB src -> out"))
worst_avg = 0
for sid, it, path in rows:
    im, how = b.load_srgb(path)
    c = b.crop12(im)
    for kind, width in (("view", 900),):
        w = min(width, c.size[0]); r = c.resize((w, w * 2), Image.LANCZOS)
        out = Image.open(os.path.join(b.SITE, "public", it[kind].lstrip("/").replace("/", os.sep))).convert("RGB")
        a, o = np.asarray(r), np.asarray(out)
        de = np.sqrt(((b.lab(a) - b.lab(o)) ** 2).sum(-1))
        small_a = np.asarray(r.resize((8, 16), Image.BOX)); small_o = np.asarray(out.resize((8, 16), Image.BOX))
        avgde = np.sqrt(((b.lab(small_a) - b.lab(small_o)) ** 2).sum(-1)).mean()
        worst_avg = max(worst_avg, avgde)
        print("%-20s %-10s %-9s %6.2f %6.2f %6.2f | %s -> %s" % (sid, it["code"][:10], how[:9], de.mean(), np.percentile(de, 95), avgde, a.reshape(-1, 3).mean(0).round(1).tolist(), o.reshape(-1, 3).mean(0).round(1).tolist()))
print("worst average-colour deltaE in sample: %.2f" % worst_avg)
