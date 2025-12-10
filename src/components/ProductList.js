import {
    ShoppingCart,
    Search,
    ChevronLeft,
    Heart,
    Star
} from 'lucide-react';
// دالة لجلب المنتجات فقط
async function getProducts(subdomain, id) {
    // افترض أن لديك API لجلب المنتجات بناءً على اسم المتجر
    let res = await fetch(`https://true-fit-dz-api.vercel.app/item/my/${id}`, {
        cache: 'force-cache',
        next: { tags: [`store-${subdomain}`] } // ✅ ونفس التاج موجود هنا أيضاً!
    }
    );

    if (!res.ok) return [];
    res = res.json();

    return res
}

export default async function ProductList({ subdomain, id }) {
    const products = await getProducts(subdomain, id);


    console.log(products.result, "zbi");

    return (
        <section className=" " id="products">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">منتجاتنا</h2>
                    <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.result.map((product) => (
                        <article
                            key={product._id}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col"
                        >
                            {/* Product Image */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">

                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                />
                                {/* Quick Actions overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">

                                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:text-indigo-600 hover:scale-110 transition-all" aria-label="عرض التفاصيل">
                                        <Search size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="text-xs text-indigo-600 font-semibold mb-2">{product.category}</div>
                                <h3 className="font-bold text-gray-900 text-lg mb-2 leading-snug line-clamp-2 hover:text-indigo-600 transition-colors cursor-pointer">
                                    {product.name}
                                </h3>


                                <div className="mt-auto flex items-center justify-between">
                                    <div>
                                        <span className="block text-lg font-bold text-gray-900">{product.price}</span>
                                        {product.oldPrice && (
                                            <span className="text-sm text-gray-400 line-through">{product.oldPrice}</span>
                                        )}
                                    </div>
                                    <button className="bg-gray-900 text-white p-2.5 rounded-lg hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-200" aria-label="أضف للسلة">
                                        <ShoppingCart size={20} />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>

    );
}