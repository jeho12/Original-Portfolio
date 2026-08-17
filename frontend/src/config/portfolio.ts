export const portfolioConfig = {
  name: 'Jehoshaphat Ibenye',
  contact: {
    email: 'jehoibenye@gmail.com',
    phone: '0803 518 3825',
    phoneDial: '+2348035183825',
    location: 'Lagos, Nigeria',
    timezone: 'Africa/Lagos', // Developer's timezone for the live clock
    cvUrl: '/resume.pdf',
    profileImage: '/profile.jpg',
  },
  socials: {
    github: 'https://github.com/jeho12',
    linkedin: 'https://www.linkedin.com/in/ibenye-jehoshaphat-0a1616263/',
    twitter: '',
    whatsapp: 'https://wa.me/2348035183825',
    facebook: 'https://web.facebook.com/jeho.ibenye',
    instagram: 'https://www.instagram.com/jehoshaphat_ibenye',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  }
};
