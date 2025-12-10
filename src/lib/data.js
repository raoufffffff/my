
export const productData = {
    id: 101,
    title: "ساعة ذكية Ultra Pro Series 9 - تدعم اللغة العربية",
    price: 5900,
    oldPrice: 8500,
    sku: "SW-ULTRA-09",
    rating: 4.8,
    reviews: 124,
    description: `<span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-1 rounded">أصلي 100%</span>`,
    images: [
        "https://i.ibb.co/j9wF0SQG/blob.webp",
        "https://i.ibb.co/1fWVg9by/blob.webp"
    ]
};

export async function getProduct(slug) {
    // هنا يمكنك استدعاء API أو قاعدة بيانات
    return productData;
}
