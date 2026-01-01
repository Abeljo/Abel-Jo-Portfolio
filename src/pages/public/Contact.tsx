import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { profileData } from '../../data/profile';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        content: '',
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const { t } = useLanguage();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

            // Try EmailJS if fully configured, otherwise use mailto
            if (serviceId && templateId && publicKey) {
                try {
                    await emailjs.send(
                        serviceId,
                        templateId,
                        {
                            from_name: formData.name,
                            from_email: formData.email,
                            message: formData.content,
                            to_email: 'abeljo86@gmail.com',
                            reply_to: formData.email,
                        },
                        publicKey
                    );
                    setStatus('success');
                    setFormData({ name: '', email: '', content: '' });
                    setTimeout(() => setStatus('idle'), 3000);
                    return;
                } catch (emailjsError) {
                    console.warn('EmailJS failed, using mailto fallback:', emailjsError);
                    // Fall through to mailto
                }
            }

            // Use mailto as primary/fallback method
            const subject = encodeURIComponent(`Contact from ${formData.name}`);
            const body = encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.content}`
            );
            window.location.href = `mailto:abeljo86@gmail.com?subject=${subject}&body=${body}`;

            setStatus('success');
            setFormData({ name: '', email: '', content: '' });
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const socialLinks = profileData.social_links ? JSON.parse(profileData.social_links) : {};

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">{t('getInTouch')}</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Have a project in mind? Let's collaborate and create something amazing together.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Contact Info - 2 columns */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 space-y-6"
                >
                    {/* Contact Cards */}
                    <div className="bg-card border border-border rounded-3xl p-8 space-y-6">
                        <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                        <a href={`mailto:${socialLinks.email || 'abeljo86@gmail.com'}`} className="flex items-start gap-4 group cursor-pointer">
                            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">Email</h4>
                                <p className="text-muted-foreground">{socialLinks.email || 'abeljo86@gmail.com'}</p>
                            </div>
                        </a>

                        <div className="flex items-start gap-4 group cursor-pointer">
                            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">Location</h4>
                                <p className="text-muted-foreground">Addis Ababa, Ethiopia</p>
                            </div>
                        </div>

                        <a href={`tel:+251962333832`} className="flex items-start gap-4 group cursor-pointer">
                            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">Phone</h4>
                                <p className="text-muted-foreground">+251 962 333 832</p>
                            </div>
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className="bg-card border border-border rounded-3xl p-6 md:p-8">
                        <h3 className="text-xl font-bold mb-6">Follow Me</h3>
                        <div className="flex flex-wrap gap-3 md:gap-4">
                            {socialLinks.github && (
                                <motion.a
                                    href={socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 md:p-4 bg-secondary rounded-2xl hover:bg-emerald-500 hover:text-white transition-all duration-300"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Github size={20} className="md:w-6 md:h-6" />
                                </motion.a>
                            )}
                            {socialLinks.linkedin && (
                                <motion.a
                                    href={socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 md:p-4 bg-secondary rounded-2xl hover:bg-emerald-500 hover:text-white transition-all duration-300"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Linkedin size={20} className="md:w-6 md:h-6" />
                                </motion.a>
                            )}
                            {socialLinks.twitter && (
                                <motion.a
                                    href={socialLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 bg-secondary rounded-2xl hover:bg-emerald-500 hover:text-white transition-all duration-300"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Twitter size={24} />
                                </motion.a>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form - 3 columns */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-3"
                >
                    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-3xl p-8 space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-300"
                                placeholder="Your name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-300"
                                placeholder="your.email@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Message</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                rows={6}
                                className="w-full px-4 py-3 bg-secondary border border-border rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-300 resize-none"
                                placeholder="Tell me about your project..."
                                required
                            />
                        </div>
                        <motion.button
                            type="submit"
                            disabled={status === 'sending' || status === 'success'}
                            className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-medium transition-all duration-300 ${status === 'success'
                                ? 'bg-green-500 text-white'
                                : 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/50'
                                }`}
                            whileHover={{ scale: status === 'success' ? 1 : 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {status === 'sending' ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Sending...</span>
                                </>
                            ) : status === 'success' ? (
                                <span>✓ Message Sent!</span>
                            ) : (
                                <>
                                    <Send size={20} />
                                    <span>Send Message</span>
                                </>
                            )}
                        </motion.button>
                        {status === 'success' && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-green-500 text-center text-sm"
                            >
                                Thank you for your message! I'll get back to you soon.
                            </motion.p>
                        )}
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
