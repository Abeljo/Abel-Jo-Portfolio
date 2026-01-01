import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'am';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        home: 'Home',
        projects: 'Projects',
        achievements: 'Achievements',
        skills: 'Skills',
        contact: 'Contact',
        developer: 'Developer',
        portfolio: 'Portfolio',
        buildingExperiences: 'Building digital experiences.',
        selectedWork: 'Selected Work',
        projectsDescription: 'A collection of projects that showcase my passion for design and engineering.',
        technicalSkills: 'Technical Skills',
        skillsDescription: 'My technical expertise and the tools I use to build digital products.',
        achievementsTitle: 'Achievements',
        achievementsDescription: 'Recognition and milestones from my professional journey.',
        getInTouch: 'Get in Touch',
        workTogether: "Let's work together",
        viewWork: 'View my work',
        techStack: 'Tech stack',
        awardsAndCerts: 'Awards & Certifications',
    },
    am: {
        home: 'መነሻ',
        projects: 'ፕሮጀክቶች',
        achievements: 'ስኬቶች',
        skills: 'ክህሎቶች',
        contact: 'ያግኙን',
        developer: 'ገንቢ',
        portfolio: 'ፖርትፎሊዮ',
        buildingExperiences: 'ዲጂታል ልምዶችን እየገነባሁ ነው።',
        selectedWork: 'የተመረጡ ስራዎች',
        projectsDescription: 'ለዲዛይን እና ለምህንድስና ያለኝን ፍላጎት የሚያሳዩ ፕሮጀክቶች ስብስብ።',
        technicalSkills: 'ቴክኒካል ክህሎቶች',
        skillsDescription: 'ዲጂታል ምርቶችን ለመገንባት የምጠቀምባቸው ቴክኒካል እውቀት እና መሳሪያዎች።',
        achievementsTitle: 'ስኬቶች',
        achievementsDescription: 'ከሙያዬ ጉዞ የተገኙ እውቅናዎች እና ምዕራፎች።',
        getInTouch: 'ያግኙን',
        workTogether: 'አብረን እንስራ',
        viewWork: 'ስራዬን ይመልከቱ',
        techStack: 'ቴክኖሎጂ ስታክ',
        awardsAndCerts: 'ሽልማቶች እና የምስክር ወረቀቶች',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        const saved = localStorage.getItem('language') as Language;
        if (saved && (saved === 'en' || saved === 'am')) {
            setLanguageState(saved);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations.en] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};
