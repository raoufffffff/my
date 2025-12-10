"use client"
import {
    ShoppingCart,
    Menu,
    X,
    Search
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react";

const Header = ({ store }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // تأثير عند التمرير لتغيير ستايل الهيدر
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <header
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-md py-5'
                }`}
        >
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Image
                            className='w-16 h-16'
                            src={store.logo}
                            alt={store.store_name}
                            width={100}
                            height={100}

                        />
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 leading-tight">{store.store_name}</h1>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">الرئيسية</Link>
                        <Link href="/products" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">المنتجات</Link>
                        <Link href="/about" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">عن المتجر</Link>
                        <Link href="/faq" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">الأسئلة الشائعة</Link>
                        <Link href="/contact" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">اتصل بنا</Link>
                    </nav>

                    {/* Actions */}

                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg py-4 px-4 flex flex-col gap-4">
                    <Link href="/" className="block py-2 text-gray-800 font-medium hover:text-indigo-600">الرئيسية</Link>
                    <Link href="/products" className="block py-2 text-gray-800 font-medium hover:text-indigo-600">المنتجات</Link>
                    <Link href="/about" className="block py-2 text-gray-800 font-medium hover:text-indigo-600">عن المتجر</Link>
                    <Link href="/faq" className="block py-2 text-gray-800 font-medium hover:text-indigo-600">الأسئلة الشائعة</Link>
                    <Link href="/contact" className="block py-2 text-indigo-600 font-bold">اتصل بنا</Link>
                </div>
            )}
        </header>
    )
}

export default Header