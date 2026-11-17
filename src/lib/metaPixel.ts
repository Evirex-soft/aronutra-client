// Meta (Facebook) Pixel helpers. Tracking only — no UI.
// The pixel ID comes from NEXT_PUBLIC_META_PIXEL_ID; when it is not set, every call is a no-op.

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

type FbqParams = Record<string, unknown>;

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }
}

const canTrack = () => typeof window !== "undefined" && !!META_PIXEL_ID && typeof window.fbq === "function";

/** Standard event, e.g. ViewContent, AddToCart, Purchase. `eventId` enables deduplication with the Conversions API later. */
export function trackEvent(event: string, params: FbqParams = {}, eventId?: string) {
    if (!canTrack()) return;
    try {
        if (eventId) window.fbq!("track", event, params, { eventID: eventId });
        else window.fbq!("track", event, params);
    } catch {
        /* never let tracking break the shop */
    }
}

export function trackPageView() {
    if (!canTrack()) return;
    try {
        window.fbq!("track", "PageView");
    } catch {
        /* ignore */
    }
}

// ---- e-commerce payload helpers ----

type ItemLike = {
    _id?: string;
    sku?: string;
    name?: string;
    sellingPrice?: number;
    quantity?: number;
    selectedVariantId?: string;
};

export const contentId = (item: ItemLike) =>
    String(item.selectedVariantId ? `${item._id}_${item.selectedVariantId}` : item.sku || item._id || item.name || "");

export function itemsPayload(items: ItemLike[], value?: number) {
    const contents = items.map((i) => ({
        id: contentId(i),
        quantity: i.quantity || 1,
        item_price: Number(i.sellingPrice || 0),
    }));
    const computed = contents.reduce((sum, c) => sum + c.item_price * c.quantity, 0);
    return {
        content_ids: contents.map((c) => c.id),
        content_name: items.map((i) => i.name).filter(Boolean).join(", "),
        content_type: "product",
        contents,
        num_items: contents.reduce((n, c) => n + c.quantity, 0),
        value: Number((value ?? computed).toFixed(2)),
        currency: "INR",
    };
}
