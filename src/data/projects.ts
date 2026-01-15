import type { Project } from '../types';

export const projectsData: Project[] = [
    {
        ID: 4,
        title: 'EFF Transfer System',
        description: 'A full-stack system built for the Ethiopian Football Federation to manage player transfers, tracking, ID generation, and financial analytics.',
        image_url: '/asset/project/Eff%20Transfer%20System/main.png',
        images: [
            '/asset/project/Eff%20Transfer%20System/main.png',
            '/asset/project/Eff%20Transfer%20System/2.png',
            '/asset/project/Eff%20Transfer%20System/1.png',
            '/asset/project/Eff%20Transfer%20System/4.png',
            '/asset/project/Eff%20Transfer%20System/3.png',
            '/asset/project/Eff%20Transfer%20System/5.png'
        ],
        github_link: '',
        demo_link: '',
        tags: 'Next.js (full-stack), Tailwind CSS, PostgreSQL, Webhooks, Chappa (payment integration)',
        category: 'software'
    },
    {
        ID: 3,
        title: 'Addis Teqeray',
        description: 'A UX-focused Flutter mobile application for finding homes in Addis Ababa. Features local caching with SQLite for offline access, smooth navigation with GetX state management, and a user-friendly interface designed for seamless property searching and discovery.',
        image_url: '/asset/project/addis/Main.jpg',
        images: [
            '/asset/project/addis/Main.jpg',
            '/asset/project/addis/1.jpg',
            '/asset/project/addis/2.jpg',
            '/asset/project/addis/3.jpg',
            '/asset/project/addis/4.jpg',
            '/asset/project/addis/5.jpg',
            '/asset/project/addis/6.jpg',
            '/asset/project/addis/7.jpg'
        ],
        github_link: '',
        demo_link: '',
        tags: 'Go Fiber, Flutter, GetX, PostgreSQL, SQLite, UX Design',
        category: 'software'
    },
    {
        ID: 1,
        title: 'Lucky Bingo',
        description: 'A full-featured Telegram bot and mini app based online transactional bingo game. Features real-time gameplay with WebSocket connections, secure payment processing, and seamless Telegram integration for an engaging gaming experience.',
        image_url: '/asset/project/lucky/Main.png',
        images: [
            '/asset/project/lucky/Main.png',
            '/asset/project/lucky/1.png',
            '/asset/project/lucky/2.png',
            '/asset/project/lucky/3.png'
        ],
        github_link: '',
        demo_link: '',
        tags: 'Go Fiber, PostgreSQL, React, Telegram Bot API, WebSocket, REST API, Tailwind CSS',
        category: 'software'
    },
    {
        ID: 2,
        title: 'Ethiopian Football Federation Attendance System',
        description: 'A comprehensive attendance management system for the Ethiopian Football Federation general meetings. Built with robust backend architecture and modern frontend, ensuring reliable tracking and reporting of meeting attendance.',
        image_url: '/asset/project/attendance/Main.jpg',
        images: [
            '/asset/project/attendance/Main.jpg',
            '/asset/project/attendance/Secondary.jpg'
        ],
        github_link: '',
        demo_link: '',
        tags: 'Go Fiber, PostgreSQL, React, REST API, Tailwind CSS',
        category: 'software'
    }
];

