import UserLayout from '@/layouts/user-layout';
import React, { useState } from 'react';
import { MapPin, Car, FileText, CreditCard, Plus, Minus } from 'lucide-react';


// Definisikan tipe props untuk halaman ini
interface HowItWorkPageProps {
    auth: {
        user: { name: string; email: string } | null;
    };
}

// Terima props 'auth'
export default function HowItWork({ auth }: HowItWorkPageProps) {
    const [expandedFaq, setExpandedFaq] = useState(null);

  const faqItems = [
    {
      id: 1,
      question: "Question",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, eget tempus orci facilisis id."
    },
    {
      id: 2,
      question: "Question",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna."
    }
  ];

  const toggleFaq = (id:any) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Cara Pemesanan</h1>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.
            Pellentesque sit amet sapien fringilla, mattis ligula consectetur.
          </p>
        </div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Tentukan Lokasi & Jadwal</h3>
            <p className="text-gray-600 leading-relaxed">
              Pilih lokasi, tanggal, dan waktu untuk pengambilan serta pengembalian mobil.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Car className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Pilih Mobil Impianmu</h3>
            <p className="text-gray-600 leading-relaxed">
              Jelajahi koleksi mobil premium kami yang tersedia sesuai jadwal pilihanmu.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Lengkapi Data</h3>
            <p className="text-gray-600 leading-relaxed">
              Isi formulir dengan data diri yang valid sesuai KTP/Paspor dan SIM yang berlaku.
            </p>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Selesaikan Pembayaran</h3>
            <p className="text-gray-600 leading-relaxed">
              Lakukan pembayaran yang aman untuk menyelesaikan pesananmu. E-voucher akan segera dikirim.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Yang Sering Ditanyakan</h2>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-gray-900">{item.question}</h3>
                  {expandedFaq === item.id ? (
                    <Minus className="w-6 h-6 text-gray-600 flex-shrink-0" />
                  ) : (
                    <Plus className="w-6 h-6 text-gray-600 flex-shrink-0" />
                  )}
                </button>

                {expandedFaq === item.id && (
                  <div className="px-8 pb-6">
                    <div className="border-t border-gray-100 pt-6">
                      <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

}

// ✅ INI BAGIAN KUNCINYA: Terapkan layout di sini
HowItWork.layout = (page: React.ReactElement<HowItWorkPageProps>) => (
    <UserLayout user={page.props.auth.user} children={page} />
);
