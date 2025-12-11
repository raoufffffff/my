export const pageview = (id) => {
    window.ttq.load(id);
    window.ttq.page();
}

export const event = (name, options = {}) => {
    window.ttq.track(name, options);
}