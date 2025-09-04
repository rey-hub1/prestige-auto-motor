// resources/js/components/FlashMessage.tsx
import { Transition } from '@headlessui/react';
import React, { useState, useEffect } from 'react';

interface FlashMessageProps {
    message: string | null;
    type: 'success' | 'error';
}

export default function FlashMessage({ message, type }: FlashMessageProps) {
    const [show, setShow] = useState(false);

    // Efek ini akan berjalan setiap kali ada 'message' baru
    useEffect(() => {
        if (message) {
            setShow(true);
            // Sembunyikan notifikasi setelah 3 detik
            const timer = setTimeout(() => {
                setShow(false);
            }, 3000);

            // Bersihkan timer jika komponennya hilang
            return () => clearTimeout(timer);
        }
    }, [message]);

    // Tentukan warna berdasarkan tipe pesan
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

    return (
        <Transition
            show={show}
            enter="transition-transform duration-300 ease-out"
            enterFrom="translate-y-full opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition-transform duration-300 ease-in"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-full opacity-0"
        >
            <div className={`fixed bottom-5 right-5 p-4 rounded-lg text-white shadow-lg ${bgColor}`}>
                {message}
            </div>
        </Transition>
    );
}
