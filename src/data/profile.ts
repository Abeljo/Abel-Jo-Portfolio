import type { Profile } from '../types';

export const profileData: Profile = {
    ID: 1,
    full_name: 'Abel Yosef',
    title: 'Full Stack Developer & Graphics Designer',
    bio: 'Building exceptional digital experiences through code and design. Passionate about creating innovative solutions that blend functionality with aesthetics.',
    image_url: '/asset/me.jpg',
    social_links: JSON.stringify({
        github: 'https://github.com/Abeljo',
        linkedin: 'https://www.linkedin.com/in/abel-yosef-tadesse',
        email: 'abeljo86@gmail.com'
    })
};

