export const revalidate = false;
export const dynamic = "force-static";
import ProductList from '@/components/ProductList'
import { getStore } from '@/lib/api';
import React from 'react'

const page = async ({ params }) => {
    const { site } = await params;
    const { store } = await getStore(site);
    if (!store) return notFound();
    return (
        <div className="min-h-screen">
            <ProductList mainColor={store.website.main_color} subdomain={site} id={store._id} />
        </div>
    )
}

export default page