import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { profileData } from '../../data/profile';
import type { Profile } from '../../types';
import { ArrowUpRight, Github, Linkedin, Mail, Briefcase, Zap, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import TetrisLoader from '../../components/TetrisLoader';
import Projects from './Projects';
import Achievements from './Achievements';
import Skills from './Skills';
import Contact from './Contact';

import { useOutletContext } from 'react-router-dom';

const Home: React.FC = () => {
    const [profile] = useState<Profile>(profileData);
    const [showVerse, setShowVerse] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hideScrollIndicator, setHideScrollIndicator] = useState(false);
    const { t } = useLanguage();
    const longPressTimer = useRef<number | null>(null);
    const { setFooterVisible } = useOutletContext<{ setFooterVisible: (visible: boolean) => void }>();

    useEffect(() => {
        // Hide footer initially
        setFooterVisible(false);

        // Simulate loading time for Tetris animation
        const timer = setTimeout(() => {
            setLoading(false);
            setFooterVisible(true); // Show footer after loading
        }, 2000);

        return () => clearTimeout(timer);
    }, [setFooterVisible]);

    useEffect(() => {
        const handleScroll = () => {
            const scrolledToBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
            setHideScrollIndicator(scrolledToBottom);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handlePressStart = () => {
        longPressTimer.current = setTimeout(() => {
            setShowVerse(true);
        }, 800); // 800ms for long press
    };

    const handlePressEnd = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
        }
    };

    const handleMouseLeave = () => {
        handlePressEnd();
        setShowVerse(false);
    };

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1 // Keep stagger for general feel, but override with custom delays
            }
        }
    };

    const dropItem: Variants = {
        hidden: { y: -1000, opacity: 0 },
        show: (custom: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: custom * 0.2
            }
        })
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (loading) {
        return <TetrisLoader />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
            {/* Hero Section */}
            <section id="home" className="min-h-[calc(100vh-100px)] flex flex-col justify-center relative">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]"
                >
                    {/* 
                       Order requested: 
                       1. Achievements 
                       2. Get in Touch (Contact)
                       3. Skills
                       4. Projects
                       5. Profile Pic
                       6. Profile Description (Hero)
                    */}

                    {/* Hero Section - Spans 2x2 - Order 6 (Index 5) */}
                    <motion.div
                        variants={dropItem}
                        custom={5}
                        className="md:col-span-2 md:row-span-2 bg-card border border-border rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <h2 className="text-lg font-medium text-muted-foreground mb-2">{profile?.title || t('developer')}</h2>
                            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-4">
                                {profile?.full_name || t('portfolio')}
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-md">
                                {profile?.bio || t('buildingExperiences')}
                            </p>
                        </div>
                        <div className="mt-8">
                            <div className="flex gap-4 mb-4">
                                {(() => {
                                    const socialLinks = profile.social_links ? JSON.parse(profile.social_links) : {};
                                    return (
                                        <>
                                            {socialLinks.github && (
                                                <motion.a
                                                    href={socialLinks.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 bg-secondary rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300"
                                                    whileHover={{ scale: 1.1, y: -2 }}
                                                >
                                                    <Github size={20} />
                                                </motion.a>
                                            )}
                                            {socialLinks.linkedin && (
                                                <motion.a
                                                    href={socialLinks.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 bg-secondary rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300"
                                                    whileHover={{ scale: 1.1, y: -2 }}
                                                >
                                                    <Linkedin size={20} />
                                                </motion.a>
                                            )}
                                            <motion.a
                                                href="#contact"
                                                onClick={(e) => handleNavClick(e, 'contact')}
                                                className="p-3 bg-secondary rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300"
                                                whileHover={{ scale: 1.1, y: -2 }}
                                            >
                                                <Mail size={20} />
                                            </motion.a>
                                        </>
                                    );
                                })()}
                            </div>

                            {/* Rehoboth Text */}
                            <motion.div
                                className="relative cursor-pointer select-none inline-block"
                                onMouseDown={handlePressStart}
                                onMouseUp={handlePressEnd}
                                onMouseLeave={handleMouseLeave}
                                onTouchStart={handlePressStart}
                                onTouchEnd={handlePressEnd}
                                whileHover={{ scale: 1.05 }}
                            >
                                {/* <span className="text-sm font-display font-bold bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%] drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                                    Rehoboth
                                </span> */}

                                {/* Tooltip */}
                                {showVerse && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute bottom-full mb-2 left-0 whitespace-nowrap bg-card border border-border rounded-lg px-3 py-1.5 shadow-lg z-50"
                                    >
                                        <span className="text-xs font-medium text-muted-foreground">Genesis 26:22</span>
                                        <div className="absolute -bottom-1 left-4 w-2 h-2 bg-card border-r border-b border-border rotate-45" />
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
                    </motion.div>

                    {/* Profile Image - Spans 1x2 - Order 5 (Index 4) */}
                    <motion.div
                        variants={dropItem}
                        custom={4}
                        className="md:col-span-1 md:row-span-2 bg-card border border-border rounded-3xl overflow-hidden relative group"
                    >
                        {profile?.image_url ? (
                            <img src={profile.image_url} alt="Profile" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">No Image</div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <span className="text-sm font-medium">Based in Addis Ababa</span>
                        </div>
                    </motion.div>

                    {/* Projects Link - Spans 1x1 - Order 4 (Index 3) */}
                    <motion.div
                        variants={dropItem}
                        custom={3}
                        className="md:col-span-1 bg-emerald-500 text-white rounded-3xl p-6 flex flex-col justify-between group cursor-pointer relative overflow-hidden hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
                    >
                        <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="absolute inset-0 z-10" />
                        <div className="flex justify-between items-start relative z-0">
                            <Briefcase size={24} />
                            <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                        <div className="relative z-0">
                            <h3 className="text-2xl font-bold">{t('projects')}</h3>
                            <p className="text-white/80 text-sm">{t('viewWork')}</p>
                        </div>
                    </motion.div>

                    {/* Skills Link - Spans 1x1 - Order 3 (Index 2) */}
                    <motion.div
                        variants={dropItem}
                        custom={2}
                        className="md:col-span-1 bg-card border border-border rounded-3xl p-6 flex flex-col justify-between group cursor-pointer hover:border-emerald-500/50 transition-all duration-300 relative"
                    >
                        <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className="absolute inset-0 z-10" />
                        <div className="flex justify-between items-start text-muted-foreground group-hover:text-emerald-500 transition-colors relative z-0">
                            <Zap size={24} />
                            <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="relative z-0">
                            <h3 className="text-2xl font-bold">{t('skills')}</h3>
                            <p className="text-muted-foreground text-sm">{t('techStack')}</p>
                        </div>
                    </motion.div>

                    {/* Achievements Link - Spans 2x1 - Order 1 (Index 0) */}
                    <motion.div
                        variants={dropItem}
                        custom={0}
                        className="md:col-span-2 bg-card border border-border rounded-3xl p-6 flex items-center justify-between group cursor-pointer hover:border-emerald-500/50 transition-all duration-300 relative"
                    >
                        <a href="#achievements" onClick={(e) => handleNavClick(e, 'achievements')} className="absolute inset-0 z-10" />
                        <div className="flex items-center gap-4 relative z-0">
                            <div className="p-3 bg-secondary rounded-full text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                <Award size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{t('achievementsTitle')}</h3>
                                <p className="text-muted-foreground text-sm">{t('awardsAndCerts')}</p>
                            </div>
                        </div>
                        <ArrowUpRight className="text-muted-foreground group-hover:text-emerald-500 transition-colors relative z-0" />
                    </motion.div>

                    {/* Contact Link - Spans 2x1 - Order 2 (Index 1) */}
                    <motion.div
                        variants={dropItem}
                        custom={1}
                        className="md:col-span-2 bg-card border border-border rounded-3xl p-6 flex items-center justify-between group cursor-pointer hover:border-emerald-500/50 transition-all duration-300 relative"
                    >
                        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="absolute inset-0 z-10" />
                        <div className="flex items-center gap-4 relative z-0">
                            <div className="p-3 bg-secondary rounded-full text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{t('getInTouch')}</h3>
                                <p className="text-muted-foreground text-sm">{t('workTogether')}</p>
                            </div>
                        </div>
                        <ArrowUpRight className="text-muted-foreground group-hover:text-emerald-500 transition-colors relative z-0" />
                    </motion.div>

                </motion.div>

                {/* Scroll Down Indicator - Vertical Stack on Left */}
                <motion.div
                    className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-4 text-muted-foreground cursor-pointer"
                    onClick={(e) => handleNavClick(e as any, 'projects')}
                    animate={{ opacity: hideScrollIndicator ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ pointerEvents: hideScrollIndicator ? 'none' : 'auto' }}
                >
                    <div className="flex flex-col items-center gap-1 text-xs uppercase tracking-widest font-medium">
                        {'SCROLL'.split('').map((char, i) => <span key={`s-${i}`}>{char}</span>)}
                        <span className="h-4" />
                        {'DOWN'.split('').map((char, i) => <span key={`d-${i}`}>{char}</span>)}
                    </div>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <ArrowUpRight className="rotate-[135deg]" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Sections */}
            <section id="projects" className="py-12">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <Projects />
                </motion.div>
            </section>

            <section id="achievements" className="py-12">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <Achievements />
                </motion.div>
            </section>

            <section id="skills" className="py-12">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <Skills />
                </motion.div>
            </section>

            <section id="contact" className="py-12">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <Contact />
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
