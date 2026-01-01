import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code, MapPin, Phone } from 'lucide-react';
import { profileData } from '../data/profile';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const socialLinks = profileData.social_links ? JSON.parse(profileData.social_links) : {};

    return (
        <footer className="bg-card border-t border-border pt-16 pb-8 relative overflow-hidden">
            {/* Shining Emerald Effect Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
                    {/* Brand Column - Spans 5 columns */}
                    <div className="md:col-span-5 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-50" />
                                <Code className="relative z-10 text-emerald-500" size={32} />
                            </div>
                            <span className="text-2xl font-display font-bold bg-gradient-to-r from-white via-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                                {profileData.full_name || 'Portfolio'}
                            </span>
                        </motion.div>
                        <p className="text-muted-foreground leading-relaxed">
                            {profileData.bio}
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.github && (
                                <motion.a
                                    href={socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-secondary rounded-lg hover:bg-emerald-500 hover:text-white transition-all duration-300"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Github size={20} />
                                </motion.a>
                            )}
                            {socialLinks.linkedin && (
                                <motion.a
                                    href={socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-secondary rounded-lg hover:bg-emerald-500 hover:text-white transition-all duration-300"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Linkedin size={20} />
                                </motion.a>
                            )}
                            <motion.a
                                href={`mailto:${socialLinks.email || 'abeljo86@gmail.com'}`}
                                className="p-2 bg-secondary rounded-lg hover:bg-emerald-500 hover:text-white transition-all duration-300"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Mail size={20} />
                            </motion.a>
                        </div>
                    </div>

                    {/* Spacer - Spans 1 column */}
                    <div className="hidden md:block md:col-span-1" />

                    {/* Navigation Column - Spans 3 columns */}
                    <div className="md:col-span-3">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-emerald-500 rounded-full" />
                            Navigation
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { label: 'Home', href: '#home' },
                                { label: 'Projects', href: '#projects' },
                                { label: 'Achievements', href: '#achievements' },
                                { label: 'Skills', href: '#skills' },
                                { label: 'Contact', href: '#contact' }
                            ].map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-muted-foreground hover:text-emerald-500 transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info Column - Spans 3 columns */}
                    <div className="md:col-span-3">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-emerald-500 rounded-full" />
                            Contact
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <Mail className="mt-1 text-emerald-500 shrink-0" size={18} />
                                <span className="break-all">{socialLinks.email || 'abeljo86@gmail.com'}</span>
                            </li>
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <MapPin className="mt-1 text-emerald-500 shrink-0" size={18} />
                                <span>Addis Ababa, Ethiopia</span>
                            </li>
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <Phone className="mt-1 text-emerald-500 shrink-0" size={18} />
                                <span>+251 962 333 832</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© {currentYear} {profileData.full_name}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
