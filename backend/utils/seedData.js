const { WellnessContent, User } = require('../models');
const sequelize = require('../config/db');

const wellnessData = [
    // Relaxation Music
    {
        title: "Weightless",
        description: "Ambient, Soft Instrumental, Scientific relaxation tones",
        type: "music",
        duration: "8:20",
        category: "Relaxation",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&h=300&fit=crop", // Misty Lake
        tags: JSON.stringify(["ambient", "instrumental", "scientific"])
    },
    {
        title: "Watermark - Enya",
        description: "Soft Vocals + ambient Sound",
        type: "music",
        duration: "8:00",
        category: "Relaxation",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&h=300&fit=crop", // Mountains
        tags: JSON.stringify(["vocals", "ambient", "enya"])
    },
    {
        title: "Strawberry Swing",
        description: "Chill pop, feel-good, light instrumental background",
        type: "music",
        duration: "10:00",
        category: "Relaxation",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        imageUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&h=300&fit=crop", // Autumn Forest
        tags: JSON.stringify(["chill", "pop", "feel-good"])
    },
    {
        title: "Electra - Air stream",
        description: "Chill-out, ambient electronic",
        type: "music",
        duration: "15:00",
        category: "Relaxation",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop", // Green Forest
        tags: JSON.stringify(["chill-out", "ambient", "electronic"])
    },
    {
        title: "Mellomaniac",
        description: "Chill-out, ambient beats",
        type: "music",
        duration: "11:00",
        category: "Relaxation",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop", // Waterfall/Landscape
        tags: JSON.stringify(["beats", "ambient", "chill-out"])
    },
    {
        title: "Clair de lune",
        description: "Classical piano",
        type: "music",
        duration: "5:00",
        category: "Relaxation",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        imageUrl: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0f45?w=500&h=300&fit=crop", // Night Sky
        tags: JSON.stringify(["classical", "piano", "calm"])
    },
    // Guided Meditation
    {
        title: "Morning Meditation",
        description: "Start your day with positive energy",
        type: "meditation",
        duration: "10:00",
        category: "Beginner",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        tags: JSON.stringify(["morning", "energy", "beginner"])
    },
    {
        title: "Body Scan Relaxation",
        description: "Release tension from head to toe",
        type: "meditation",
        duration: "8:00",
        category: "Intermediate",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        tags: JSON.stringify(["body scan", "relaxation", "tension"])
    },
    {
        title: "Stress Relief",
        description: "Quick relaxation for busy days",
        type: "meditation",
        duration: "10:00",
        category: "Advanced",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        tags: JSON.stringify(["stress", "quick", "advanced"])
    },
    {
        title: "Mindful Breathing",
        description: "Focus on your breath and be present",
        type: "meditation",
        duration: "11:00",
        category: "All Levels",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        tags: JSON.stringify(["breathing", "mindful", "presence"])
    },
    {
        title: "Healing Visualization",
        description: "Visualize healing & wellness",
        type: "meditation",
        duration: "14:00",
        category: "Basic",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        tags: JSON.stringify(["healing", "visualization", "wellness"])
    },
    {
        title: "Body Relaxation",
        description: "Classical piano",
        type: "meditation",
        duration: "14:00",
        category: "General",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
        tags: JSON.stringify(["relaxation", "piano", "calm"])
    }
];

const communityData = [
    {
        name: "Healing Community '25",
        description: "A space for those beginning their journey in 2025.",
        illnessType: "Cancer Support",
        memberCount: 156,
        isPrivate: false
    },
    {
        name: "Survivors Circle V1.0",
        description: "Connecting those who have overcome and are thriving.",
        illnessType: "Survivor",
        memberCount: 890,
        isPrivate: false
    },
    {
        name: "Hopeful Horizon",
        description: "Find peace and hope in shared stories.",
        illnessType: "Chronic Illness",
        memberCount: 423,
        isPrivate: false
    }
];

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced');

        await WellnessContent.bulkCreate(wellnessData);
        console.log(`${wellnessData.length} wellness items created`);

        const { Community } = require('../models');
        await Community.bulkCreate(communityData);
        console.log(`${communityData.length} community groups created`);

        // Create default user
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash('password123', 10);

        await User.create({
            name: "hh",
            email: "hh@example.com",
            password: hashedPassword,
            supportType: "Cancer Support",
            avatar: "",
            bio: "Here to heal and help.",
            illnessType: "Survivor"
        });
        console.log('Default user created: hh@example.com / password123');

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
