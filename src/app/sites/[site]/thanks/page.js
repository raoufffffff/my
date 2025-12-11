export const revalidate = false;
export const dynamic = "force-static";

import { getStore } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

export default async function page({ params }) {
    // 1. انتظار البارامترات (Next.js 15)
    const { site } = await params;

    // 2. جلب بيانات المتجر (من الكاش - سريع جداً)
    const { store } = await getStore(site);

    // استخراج البيانات مع قيم افتراضية لتجنب الأخطاء
    const logo = store.logo || null;
    const storeName = store.username || "المتجر";

    // اللون الأساسي للمتجر (fallback للون الأخضر إذا لم يوجد)
    const primaryColor = store.theme === 'red' ? '#ef4444' : (store.main_color || '#10b981');
    const primaryColorLight = `${primaryColor}15`; // نسخة شفافة للخلفيات

    return (
        <div dir="rtl" className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">

            {/* بطاقة الشكر */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in-up">

                {/* 1. منطقة الهيدر والشعار */}
                <div className="bg-gray-50 p-8 flex flex-col items-center border-b border-gray-100">
                    {logo ? (
                        <div className="relative w-24 h-24 mb-4">
                            <Image
                                src={logo}
                                alt={storeName}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ) : (
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">{storeName}</h2>
                    )}
                </div>

                {/* 2. أيقونة النجاح المتحركة */}
                <div className="flex justify-center -mt-10 relative z-10">
                    <div className="bg-white p-2 rounded-full shadow-sm">
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center animate-bounce-slow"
                            style={{ backgroundColor: primaryColorLight }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke={primaryColor}
                                strokeWidth={3}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* 3. نص الشكر والتعليمات */}
                <div className="text-center px-8 py-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">شكراً لطلبك!</h1>
                    <p className="text-gray-500 text-sm mb-6">
                        تم استلام طلبك بنجاح رقم <span className="font-mono font-bold text-gray-700">#{(Math.random() * 10000).toFixed(0)}</span>
                    </p>

                    {/* 4. خطوات ما بعد الطلب (مهم جداً للجزائر) */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-right mb-8">
                        <h3 className="font-bold text-blue-800 text-sm mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            ماذا سيحدث الآن؟
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-gray-600">
                                <div className="bg-white p-1 rounded shadow-sm min-w-[24px] flex justify-center text-xs font-bold text-blue-600">1</div>
                                <span>سيقوم فريقنا بالاتصال بك هاتفياً لتأكيد الطلب والعنوان في أقرب وقت.</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-600">
                                <div className="bg-white p-1 rounded shadow-sm min-w-[24px] flex justify-center text-xs font-bold text-blue-600">2</div>
                                <span>بعد التأكيد، سيتم شحن المنتج إليك والدفع يكون عند الاستلام.</span>
                            </li>
                        </ul>
                    </div>

                    {/* 5. زر العودة */}
                    <Link
                        href={`/`}
                        className="block w-full text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition transform hover:-translate-y-1"
                        style={{ backgroundColor: primaryColor }}
                    >
                        العودة للتسوق
                    </Link>

                    {/* رابط الدعم */}
                    <div className="mt-6 text-xs text-gray-400">
                        تواجه مشكلة؟ <Link href="/contact" className="underline hover:text-gray-600">تواصل معنا</Link>
                    </div>
                </div>
            </div>

            {/* الفوتر الصغير */}
            <p className="mt-8 text-gray-400 text-sm">
                جميع الحقوق محفوظة © {storeName}
            </p>
        </div>
    );
}