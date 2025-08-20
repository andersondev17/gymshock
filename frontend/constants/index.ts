
export const adminSideBarLinks = [
    {
        img: "/assets/icons/admin/home.svg",
        route: "/admin",
        text: "HOME",
    },
    {
        img: "/assets/icons/admin/users.svg",
        route: "/admin/users",
        text: "USERS",
    },
    {
        img: "/assets/icons/admin/equipment.png",
        route: "/admin/exercises",
        text: "EXERCISES",
    },

];
export const roles = [
        {
            id: 'user' as const,
            title: 'Enthusiast',
            description: 'Access exercises and track workouts',
            bgClass: 'from-blue-600/80 to-blue-500/80',
            hoverClass: 'hover:from-blue-500/90 hover:to-blue-400/90'
        },
        {
            id: 'trainer' as const,
            title: 'Trainer',
            description: 'Create programs and manage clients',
            bgClass: 'from-red-600/80 to-red-500/80',
            hoverClass: 'hover:from-red-500/90 hover:to-red-400/90'
        }
    ];
export const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'EXERCISES', href: '/exercises' },
    { label: 'PROGRAMS', href: '/programs' },
    { label: 'COMMUNITY', href: '/community' }
] as const;

export const activityData = [
    {
        id: 1,
        initials: "JS",
        name: "John Smith",
        action: "Added a new exercise",
        target: "Push-ups",
        time: "2m ago",
        color: "from-red-500 to-red-600"
    },
    {
        id: 2,
        initials: "MR",
        name: "Maria Rodriguez",
        action: "Just registered to the platform",
        target: "",
        time: "1h ago",
        color: "from-blue-500 to-blue-600"
    },
    {
        id: 3,
        initials: "KL",
        name: "Kevin Lee",
        action: "Updated exercise",
        target: "Deadlift",
        time: "3h ago",
        color: "from-green-500 to-green-600"
    },
    {
        id: 4,
        initials: "AP",
        name: "Anna Parker",
        action: "Left a comment on",
        target: "Squats",
        time: "Yesterday",
        color: "from-purple-500 to-purple-600"
    }
];

export const RecentActivity = [
    { id: 1, initials: 'JD', color: 'from-blue-600 to-blue-500', name: 'John Doe', action: 'Viewed', target: 'Deadlift' },
    { id: 2, initials: 'AS', color: 'from-green-600 to-green-500', name: 'Alice Smith', action: 'Completed', target: 'Squats' },
    { id: 3, initials: 'MB', color: 'from-purple-600 to-purple-500', name: 'Mike Brown', action: 'Started', target: 'Push-ups' },
];
/* main page 
 */
export const JOURNEY_PROPS = {
    title: "Get Started with Your Fitness Journey",
    subtitle: "Begin your transformation today",
    benefits: [
        { text: "Access to 1300+ exercises" },
        { text: "Personalized recommendations" },
        { text: "Save and share custom workout routines" },
        { text: "Join a community of fitness enthusiasts" }
    ],
    ctaPrimary: {
        text: "Try GymShock for Free",
        href: "/exercises"
    },
    ctaSecondary: {
        text: "Explore Exercises",
        href: "/exercises"
    }
};

/* get started  */

export const exercises = [
    { emoji: '🏋️', name: 'Bench Press', area: 'Chest', sets: '3 sets × 12 reps' },
    { emoji: '💪', name: 'Bicep Curls', area: 'Arms', sets: '3 sets × 12 reps' },
    { emoji: '🦵', name: 'Squats', area: 'Legs', sets: '3 sets × 12 reps' },
];

export const FIELD_NAMES = {
    username: "Usuario",
    email: "Email",
    password: "Contraseña",
    role: "Tipo de Usuario"
};

export const FIELD_TYPES = {
    username: "text",
    email: "email",
    password: "password"
};

export const FOOTER_CONFIG = {
    brand: {
        name: "GymShock",
        tagline: "Transform your body, transform your life.",
        logo: "/assets/images/Logo.png"
    },

    socials: [
        { name: "Instagram", href: "https://instagram.com/gymshock" },
        { name: "Twitter", href: "https://twitter.com/gymshock" },
        { name: "Facebook", href: "https://facebook.com/gymshock" },
        { name: "Youtube", href: "https://youtube.com/gymshock" }
    ],

    links: {
        quickLinks: [
            { text: "Exercises", href: "/exercises" },
            { text: "Programs", href: "/programs" }
        ],
        support: [
            { text: "Help", href: "/help" },
            { text: "Contact", href: "/contact" }
        ]
    },

    newsletter: {
        title: "Newsletter",
        description: "Subscribe for fitness tips",
        placeholder: "Email"
    }
};
export interface AppPreviewProps {
    children: React.ReactNode;
    onClick?: () => void
}

export const STATS_CONFIG = [
    { icon: 'Clock', label: 'Time', key: 'time', className: 'text-blue-500' },
    { icon: 'TrendingUp', label: 'Calories', key: 'calories', className: 'text-green-500' },
    { icon: '🔥', label: 'Streak', key: 'streak', className: 'text-orange-500', suffix: 'd' }
] as const;