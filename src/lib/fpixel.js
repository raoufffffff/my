export const FB_PIXEL_ID = null; // سيتم تمريره ديناميكياً

export const pageview = (id) => {
    window.fbq('init', id);
    window.fbq('track', 'PageView');
}

export const event = (name, options = {}) => {
    window.fbq('track', name, options);
}