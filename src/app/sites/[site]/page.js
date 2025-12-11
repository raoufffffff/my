export const revalidate = false;
export const dynamic = "force-static";
import ProductList from "@/components/ProductList";
import { getStore } from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { site } = await params;
    const { store } = await getStore(site);

    return {
        title: store ? store.website.store_name : "Shop",
        description: "Browse our categories",
    };
}

export default async function ShopPage({ params }) {
    const { site } = await params;
    const { store } = await getStore(site);
    if (!store) return notFound();
    const Categories = store.Categories.filter(e => e.show)
    return (
        <div className="min-h-screen">
            {Categories.length > 0 && (
                <section className=" bg-white" id="categories">
                    <div className="container mx-auto px-4 md:px-8">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">تصفح حسب الأقسام</h2>
                            <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full"></div>
                        </div>

                        {/* 👇 SCROLLABLE CONTAINER */}
                        {/* Changed grid to flex + overflow-x-auto */}
                        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory a scrollbar-hide">
                            {Categories.map((cat, i) => (
                                <div
                                    key={i}
                                    // 👇 Added min-w-[160px] to fix width and flex-shrink-0 so they don't squish
                                    className="group flex-shrink-0 min-w-[160px] md:min-w-[180px] snap-center flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 cursor-pointer text-center"
                                >
                                    {/* Image Container */}
                                    <div className="relative w-24 h-24 mb-4 rounded-full bg-gray-50 group-hover:bg-indigo-50 flex items-center justify-center overflow-hidden transition-colors duration-300">
                                        <Image
                                            alt={cat.name}
                                            src={cat.image}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Text Content */}
                                    <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                                        {cat.name}
                                    </h3>
                                    <p className="text-sm text-gray-400 font-medium">
                                        {cat.count} منتجات
                                    </p>
                                </div>
                            ))}

                        </div>
                    </div>
                </section>
            )}
            <ProductList mainColor={store.website.main_color} subdomain={site} id={store._id} />
        </div>
    );
}