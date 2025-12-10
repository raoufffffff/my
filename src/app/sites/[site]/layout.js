export const revalidate = false
export const dynamic = "force-static"
import Header from "@/components/Header";
import { getStore } from "@/lib/api"; // الدالة التي اتفقنا عليها سابقاً
import { notFound } from "next/navigation";

// 1. توليد الـ Metadata لكل المتجر مرة واحدة
export async function generateMetadata({ params }) {
    // 1. Get the params (await is required in newer Next.js versions)
    const { site } = await params;

    // 2. Fetch the store data (Next.js deduplicates this request automatically)
    const store = await getStore(site);

    // 3. Handle case where store doesn't exist
    if (!store) {
        return {
            title: "Store Not Found",
        };
    }

    return {
        title: store.website.store_name, // العنوان
        description: store.description || `Welcome to ${store.name}'s store`, // الوصف
        icons: {
            icon: store.website.logo,
        },
        openGraph: {
            title: store.website.store_name,
            description: store.description,
            images: [store.website.logo || ''],
        },
    };
}

// 2. تصميم الـ Layout المشترك (Header & Footer)
export default async function StoreLayout({ children, params }) {
    const { site } = await params;
    const store = await getStore(site);

    if (!store) return notFound();

    return (
        <section className={store.theme === 'dark' ? 'dark-theme' : 'light-theme'}>
            {/* هذا الهيدر سيظهر في كل صفحات المتجر */}
            <Header store={store.website} />

            {/* هنا يتم عرض محتوى الصفحات الداخلية (page.tsx, about/page.tsx) */}
            <main className="min-h-screen">
                {children}
            </main>

            {/* الفوتر المشترك */}
            <footer className="p-4 bg-gray-100 text-center mt-10">
                <p>جميع الحقوق محفوظة © {new Date().getFullYear()} {store.username}</p>
            </footer>
        </section>
    );
}