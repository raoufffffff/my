export async function getStore(subdomain) {
    try {
        // 👇 السر هنا: تفعيل التاج باسم المتجر
        const res = await fetch('https://true-fit-dz-api.vercel.app/user', {
            cache: "force-cache",
            next: {
                revalidate: false,
                tags: [`store-${subdomain}`], // مثال
            }
        });

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();

        // ملاحظة: الأفضل مستقبلاً جعل الـ API يجلب متجراً واحداً فقط بدلاً من البحث في المصفوفة
        const store = data.result.find((user) => user.repoName === subdomain);

        return store || null;
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}