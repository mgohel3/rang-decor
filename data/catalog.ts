// Product codes and swatch images, generated from the client's "ALL BRAND CODE LIST.xlsx" and image folders.
// Images are converted to sRGB with the source profile applied; thumb = tile, view = lightbox. Both are 1:2.
// When the CMS is ready, replace this loader with an API call; the pages only use these types.
import data from "./catalog.json";

export type CatItem = { code: string; name?: string | null; meta?: string | null; thumb: string; view: string };
export type CatPending = { code: string; name?: string | null; meta?: string | null };
export type CatSeries = { id: string; collection: string; name: string; note?: string | null; items: CatItem[]; pending: CatPending[] };

export const catalog = data.series as CatSeries[];
export const seriesFor = (collection: string) => catalog.filter(s => s.collection === collection);
