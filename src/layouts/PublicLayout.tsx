import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Briefcase, Award, Zap, Mail, Moon, Sun, Globe } from 'lucide-react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import ParticleBackground from '../components/ParticleBackground';

import Footer from '../components/Footer';

const LayoutContent: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();

    const [activeSection, setActiveSection] = useState('home');
    const [footerVisible, setFooterVisible] = useState(false);
    const [dockVisible, setDockVisible] = useState(true);

    const navLinks = [
        { path: '#home', id: 'home', label: t('home'), icon: <Home size={20} /> },
        { path: '#projects', id: 'projects', label: t('projects'), icon: <Briefcase size={20} /> },
        { path: '#achievements', id: 'achievements', label: t('achievements'), icon: <Award size={20} /> },
        { path: '#skills', id: 'skills', label: t('skills'), icon: <Zap size={20} /> },
        { path: '#contact', id: 'contact', label: t('contact'), icon: <Mail size={20} /> },
    ];

    useEffect(() => {
        const observerOptions = {
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        const observeElements = () => {
            navLinks.forEach((link) => {
                const element = document.getElementById(link.id);
                if (element) observer.observe(element);
            });
        };

        // Initial observation
        observeElements();

        // Use MutationObserver to detect when sections are added to the DOM (e.g., after loading)
        const mutationObserver = new MutationObserver(() => {
            observeElements();
        });

        const mainElement = document.querySelector('main');
        if (mainElement) {
            mutationObserver.observe(mainElement, { childList: true, subtree: true });
        }

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

    // Hide dock when footer is visible
    useEffect(() => {
        if (!footerVisible) {
            setDockVisible(true);
            return;
        }

        const checkOverlap = () => {
            const footer = document.querySelector('footer');
            const dock = document.querySelector('[data-dock]');

            if (!footer || !dock) return;

            const footerRect = footer.getBoundingClientRect();
            const dockRect = dock.getBoundingClientRect();

            // Check if dock overlaps with footer (with some padding)
            const overlap = dockRect.bottom > footerRect.top - 20;
            setDockVisible(!overlap);
        };

        // Check on scroll and resize
        window.addEventListener('scroll', checkOverlap);
        window.addEventListener('resize', checkOverlap);
        checkOverlap(); // Initial check

        return () => {
            window.removeEventListener('scroll', checkOverlap);
            window.removeEventListener('resize', checkOverlap);
        };
    }, [footerVisible]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    return (
        <div className="min-h-screen font-sans bg-background text-foreground transition-colors duration-300 selection:bg-emerald-500 selection:text-white flex flex-col">
            <ParticleBackground />

            {/* Floating Dock Navigation */}
            <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-fit px-4">
                <motion.div
                    data-dock
                    initial={{ y: 100, opacity: 0 }}
                    animate={{
                        y: dockVisible ? 0 : 100,
                        opacity: dockVisible ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="flex items-center gap-1 md:gap-2 p-1.5 md:p-2 rounded-2xl bg-background/80 backdrop-blur-xl border border-border shadow-2xl mx-auto overflow-x-auto md:overflow-x-visible no-scrollbar max-w-full"
                >
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.id;
                        return (
                            <a
                                key={link.path}
                                href={link.path}
                                onClick={(e) => handleNavClick(e, link.id)}
                                className="relative group shrink-0"
                            >
                                <motion.div
                                    className={`p-2 md:p-3 rounded-xl transition-all duration-300 ${isActive
                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
                                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                        }`}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {link.icon}
                                </motion.div>
                                <span className="hidden md:block absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border shadow-sm pointer-events-none">
                                    {link.label}
                                </span>
                            </a>
                        );
                    })}

                    <div className="w-px h-6 md:h-8 bg-border mx-1 shrink-0" />

                    <motion.button
                        onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
                        className="p-2 md:p-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300 relative group shrink-0"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Globe size={20} className="w-5 h-5 md:w-5 md:h-5" />
                        <span className="hidden md:block absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border shadow-sm pointer-events-none">
                            {language === 'en' ? 'አማርኛ' : 'English'}
                        </span>
                    </motion.button>

                    <motion.button
                        onClick={toggleTheme}
                        className="p-2 md:p-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300 shrink-0"
                        whileHover={{ scale: 1.1, rotate: 180, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {theme === 'dark' ? <Sun size={20} className="w-5 h-5 md:w-5 md:h-5" /> : <Moon size={20} className="w-5 h-5 md:w-5 md:h-5" />}
                    </motion.button>
                </motion.div>
            </div>

            <main className="relative z-10 flex-grow">
                <Outlet context={{ setFooterVisible }} />
            </main>

            {footerVisible && <Footer />}
        </div>
    );
};

const PublicLayout: React.FC = () => {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <LayoutContent />
            </LanguageProvider>
        </ThemeProvider>
    );
};

export default PublicLayout;
