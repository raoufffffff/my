export async function getStore(subdomain) {
    try {
        // 👇 السر هنا: تفعيل التاج باسم المتجر
        const res = await fetch(`https://true-fit-dz-api.vercel.app/user/store/${subdomain}`, {
            cache: "force-cache",
            next: {
                revalidate: false,
                tags: [`store-${subdomain}`], // مثال
            }
        });

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();

        // ملاحظة: الأفضل مستقبلاً جعل الـ API يجلب متجراً واحداً فقط بدلاً من البحث في المصفوفة
        const store = data.result;
        const livPrice = data.livPrice
        return { store, livPrice };
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}


export async function getProduct(id, subdomain) {
    try {
        const res = await fetch(`https://true-fit-dz-api.vercel.app/item/${id}`, {
            cache: "force-cache",
            next: {
                revalidate: false,
                tags: [`store-${subdomain}`], // مثال
            }
        });

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();

        // ملاحظة: الأفضل مستقبلاً جعل الـ API يجلب متجراً واحداً فقط بدلاً من البحث في المصفوفة
        const product = data.result;
        return product;
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}
