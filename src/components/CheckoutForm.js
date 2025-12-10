'use client';

import { useState, useEffect, useRef } from 'react';
import { User, Phone, MapPin, ChevronDown, ShoppingCart, ArrowDown } from 'lucide-react';

const wilayas = ["01 - أدرار", "09 - البليدة", "16 - الجزائر", "19 - سطيف", "31 - وهران"];



export default function CheckoutForm({ price, title, livPrice }) {
    // State for Form
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        wilaya: '',
        baladyia: '',
        ride: 0,
        deliveryType: 'home'
    });

    console.log(livPrice.LivPrice[0]);


    // State for Sticky Button Visibility
    const [showStickyBtn, setShowStickyBtn] = useState(false);

    // Refs
    const formRef = useRef(null);
    const nameInputRef = useRef(null);

    const deliveryPrice = formData.deliveryType === 'home' ? 600 : 400;
    const total = price + deliveryPrice;

    // Scroll Listener Logic
    useEffect(() => {
        const handleScroll = () => {
            if (!formRef.current) return;

            const rect = formRef.current.getBoundingClientRect();
            // التحقق مما إذا كان الفورم ظاهراً في الشاشة
            const isFormVisible = (rect.top < window.innerHeight) && (rect.bottom >= 0);

            // إظهار الزر فقط إذا كان الفورم غير ظاهر ونحن قد تجاوزنا بداية الصفحة قليلاً (200px)
            setShowStickyBtn(!isFormVisible && window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Action: Scroll to form and Focus input
    const handleStickyClick = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
            // ننتظر قليلاً حتى ينتهي السكرول ثم نضع المؤشر في حقل الاسم
            setTimeout(() => {
                nameInputRef.current?.focus();
            }, 500);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name == "wilaya") {
            let selectedsatet = livPrice.LivPrice.find(e => e.code == value)
            setFormData(prev => ({ ...prev, [name]: value, ride: selectedsatet.stop_back }));
            return
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('تم استلام الطلب!');
    };

    return (
        <>
            {/* The Form Container */}
            <div ref={formRef} className="bg-white rounded-2xl shadow-xl border-2 border-indigo-50 p-6 sticky top-24">
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">إملأ الاستمارة للطلب</h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                        <div className="relative">
                            <User className="absolute top-3 right-3 text-gray-400" size={18} />
                            <input
                                ref={nameInputRef} // ربط الـ ref هنا للتركيز عليه
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="محمد بن عبد الله"
                                className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                        <div className="relative">
                            <Phone className="absolute top-3 right-3 text-gray-400" size={18} />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="05 XX XX XX XX"
                                dir="ltr"
                                className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-right transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Wilaya & Baladyia */}
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">الولاية</label>
                            <div className="relative">
                                <MapPin className="absolute top-3 right-3 text-gray-400" size={18} />
                                <select
                                    name="wilaya"
                                    value={formData.wilaya}
                                    onChange={handleInputChange}
                                    className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 appearance-none"
                                    required
                                >
                                    <option value="">اختر الولاية...</option>
                                    {livPrice.LivPrice.map((w, i) => <option key={i} value={w.code}>{w.ar_name}</option>)}
                                </select>
                                <ChevronDown className="absolute top-3 left-3 text-gray-400 pointer-events-none" size={16} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">البلدية</label>
                            <input
                                type="text"
                                name="baladyia"
                                value={formData.baladyia}
                                onChange={handleInputChange}
                                placeholder="اكتب اسم البلدية"
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    {/* ملخص السعر */}
                    <div className="border-t border-dashed border-gray-300 pt-4 mt-4">
                        <div className="flex justify-between items-center text-lg mt-2 bg-gray-100 p-2 rounded-lg">
                            <span className="font-bold text-gray-900">المجموع الكلي:</span>
                            <span className="font-extrabold text-indigo-700">{total} د.ج</span>
                        </div>
                        <div className="flex justify-between items-center text-lg mt-2 bg-gray-100 p-2 rounded-lg">
                            <span className="font-bold text-gray-900">المجموع الكلي:</span>
                            <span className="font-extrabold text-indigo-700">{formData.ride} د.ج</span>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg transform active:scale-95 transition-all">
                        تأكيد الطلب الآن
                    </button>
                </form>
            </div>

            {/* Sticky Buttons (Rendered conditionally based on state) */}

            {/* Mobile Sticky Button */}
            <div className={`fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden transition-transform duration-300 ${showStickyBtn ? 'translate-y-0' : 'translate-y-full'}`}>
                <button onClick={handleStickyClick} className="w-full bg-green-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg">
                    <span>أطلب {title}</span>
                    <ShoppingCart size={20} />
                </button>
            </div>

            {/* Desktop Floating Button */}
            <div className={`fixed bottom-8 left-8 z-40 hidden md:block transition-all duration-300 ${showStickyBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <button onClick={handleStickyClick} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform">
                    <span>أطلب الآن</span>
                    <ArrowDown size={20} />
                </button>
            </div>
        </>
    );
}