export interface Profile {
    ID: number;
    full_name: string;
    title: string;
    bio: string;
    image_url: string;
    social_links: string; // JSON string
}

export interface Project {
    ID: number;
    title: string;
    description: string;
    image_url: string; // Main cover image
    images?: string[]; // Additional swipable images
    github_link: string;
    demo_link: string;
    tags: string;
    category: 'software' | 'graphics';
}

export interface Achievement {
    ID: number;
    title: string;
    description: string;
    date: string;
}

export interface Skill {
    ID: number;
    name: string;
    level: number;
    category: 'software' | 'graphics';
    icon?: string;
    featured?: boolean;
}

export interface Message {
    ID: number;
    name: string;
    email: string;
    content: string;
    CreatedAt: string;
}
