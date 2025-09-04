// Lokasi: resources/js/layouts/user-layout.tsx

import FlashMessage from '@/components/FlashMassage';
import Navbar from '@/components/Navbar';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';

// Definisikan tipe untuk user dan props yang diterima layout
type User = {
    name: string;
    email: string;
};

type UserLayoutProps =  {
    flash?: {
        // Tanda '?' artinya flash boleh ada, boleh nggak
        message?: string;
        error?: string;
    };
    user: User | null; // User bisa login (ada data) atau tidak (null)
    children: React.ReactNode;
}

export default function UserLayout({ user, children }: UserLayoutProps) {
    const { props } = usePage<UserLayoutProps>();
     console.log('Flash props dari server:', props.flash);
    return (
        <div className="flex min-h-[100vh] flex-col bg-gray-100">
            <Head>
                <title>Prestige Auto Motor</title>
                <meta name="description" content="Premium Cars Rental in Bali." />
            </Head>
            <Navbar user={user} />

            {/* Konten Utama Halaman */}
            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <footer className="bg-normal py-12">
                <div className="mx-auto max-w-6xl">
                    <div className="grid grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div>
                            <img src="/images/global/logo.png" alt="" />
                            <p>Our vision is provide you riding a premium car in bali</p>
                        </div>

                        {/* About */}
                        <div>
                            <h6 className="text-lg">About</h6>
                            <div className="flex flex-col underline">
                                <a href="">Tentang Kami</a>
                                <a href="">Syarat & Ketentuan</a>
                                <a href="">Kebijakan Privasi</a>
                            </div>
                        </div>

                        {/* Community */}
                        <div>
                            <h6 className="text-lg">Comunity</h6>
                            <div className="flex flex-col underline">
                                <a href="">Cara Pemesanan</a>
                                <a href="">Testimoni Pelanggan</a>
                                <a href="">Blog</a>
                            </div>
                        </div>

                        {/* Social */}
                        <div>
                            <h6 className="text-lg">Socials</h6>
                            <div className="flex flex-col underline">
                                <a href="">Insagram</a>
                                <a href="">Youtube</a>
                                <a href="">Tiktok</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <FlashMessage message={props.flash?.message || null} type="success" />
            <FlashMessage message={props.flash?.error || null} type="error" />
        </div>
    );
}
