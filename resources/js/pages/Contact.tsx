import UserLayout from '@/layouts/user-layout';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import React, { useState } from 'react';

interface ContactProps {
    auth: {
        user: { name: string; email: string } | null;
    };
}

export default function Contact({ auth }: ContactProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleInputChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission here
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section with City Background */}
            <section className="relative h-[70vh] overflow-hidden bg-gradient-to-b from-gray-700 via-gray-600 to-gray-500">
                {/* City Skyline Background */}
                <img
                    src="/images/home/rr.png"
                    className="absolute bottom-1/2 left-1/2 w-[100vw] -translate-x-1/2 translate-y-1/2 opacity-30"
                    alt=""
                />
                {/* Hero Content */}
                <div className="relative z-10 flex h-full items-center justify-center px-6">
                    <div className="mx-auto max-w-4xl text-center text-background">
                        <h1 className="mb-6 text-6xl font-bold">
                            <span className="text-primary">CONTACT</span> US
                        </h1>
                        <div className="mb-8 flex justify-center space-x-2">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-2 w-2 rounded-full bg-white/60"></div>
                            ))}
                        </div>
                        <p className="text-xl leading-relaxed text-background">
                            Need an expert? you are more than welcomed to leave your contact
                            <br />
                            info and we will be in touch shortly
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="bg-gray-100 py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-4xl font-bold text-gray-900">Contact Us</h2>
                        <p className="mx-auto max-w-2xl text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                        {/* Get In Touch */}
                        <div>
                            <h3 className="mb-6 text-3xl font-bold text-gray-900">Get In Touch</h3>
                            <p className="mb-8 leading-relaxed text-gray-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet accumsan eros, sit amet auctor nunc. Nullam ac
                                purus.
                            </p>

                            <div className="mb-8 space-y-6">
                                {/* Address */}
                                <div className="flex items-start space-x-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-500">
                                        <MapPin className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="mb-1 font-semibold text-gray-900">Address</h4>
                                        <p className="text-gray-600">London Eye, London, UK</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start space-x-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-500">
                                        <Phone className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="mb-1 font-semibold text-gray-900">Phone Number</h4>
                                        <p className="text-gray-600">+123-456-7890</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start space-x-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-500">
                                        <Mail className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="mb-1 font-semibold text-gray-900">E-Mail</h4>
                                        <p className="text-gray-600">mailto@subx.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div>
                                <h4 className="mb-4 font-semibold text-gray-900">Follow Us:</h4>
                                <div className="flex space-x-4">
                                    <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-orange-500 transition-colors hover:bg-orange-600">
                                        <Facebook className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-orange-500 transition-colors hover:bg-orange-600">
                                        <Twitter className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-orange-500 transition-colors hover:bg-orange-600">
                                        <Instagram className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-orange-500 transition-colors hover:bg-orange-600">
                                        <Linkedin className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="rounded-2xl bg-white p-8 shadow-lg">
                            <h3 className="mb-6 text-2xl font-bold text-gray-900">Send a Message</h3>

                            <div className="space-y-6">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="E-mail address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>

                                <div>
                                    <textarea
                                        name="message"
                                        placeholder="Message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={6}
                                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>

                                <div className="mb-6 text-sm text-gray-500">
                                    By submitting, you agree to the processing of your personal data by SubX as described in our Privacy Policy.
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="w-full rounded-lg bg-orange-500 px-8 py-4 font-semibold text-white transition-colors hover:bg-orange-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="mt-16">
                        <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-gray-300">
                            {/* Map Placeholder */}
                            <iframe
                            className='w-full h-full'
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.715547028943!2d107.43906167629366!3d-6.557547664107115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e691b8fb99d675d%3A0xb0fbb1d80c8e476d!2sPT.%20Pratama%20Solusi%20Teknologi!5e0!3m2!1sid!2sid!4v1754476928060!5m2!1sid!2sid"
                                loading="lazy"
                            ></iframe>

                            {/* Map Controls */}
                            <div className="absolute top-4 right-4 flex flex-col space-y-2">
                                <button className="flex h-10 w-10 items-center justify-center rounded bg-white text-gray-600 shadow-lg hover:bg-gray-50">
                                    +
                                </button>
                                <button className="flex h-10 w-10 items-center justify-center rounded bg-white text-gray-600 shadow-lg hover:bg-gray-50">
                                    -
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

Contact.layout = (page: React.ReactElement<ContactProps>) => <UserLayout user={page.props.auth.user} children={page} />;
