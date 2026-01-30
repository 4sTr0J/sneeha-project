const { WellnessContent } = require('../models');
const sequelize = require('../config/db');

const wellnessData = [
    // Relaxation Music
    {
        title: "Weightless",
        description: "Ambient, Soft Instrumental, Scientific relaxation tones",
        type: "music",
        duration: "8:20",
        category: "Relaxation",
        tags: JSON.stringify(["ambient", "instrumental", "scientific"])
    },
    {
        title: "Watermark - Enya",
        description: "Soft Vocals + ambient Sound",
        type: "music",
        duration: "8:00",
        category: "Relaxation",
        tags: JSON.stringify(["vocals", "ambient", "enya"])
    },
    {
        title: "Strawberry Swing",
        description: "Chill pop, feel-good, light instrumental background",
        type: "music",
        duration: "10:00",
        category: "Relaxation",
        tags: JSON.stringify(["chill", "pop", "feel-good"])
    },
    {
        title: "Electra - Air stream",
        description: "Chill-out, ambient electronic",
        type: "music",
        duration: "15:00",
        category: "Relaxation",
        tags: JSON.stringify(["chill-out", "ambient", "electronic"])
    },
    {
        title: "Mellomaniac",
        description: "Chill-out, ambient beats",
        type: "music",
        duration: "11:00",
        category: "Relaxation",
        tags: JSON.stringify(["beats", "ambient", "chill-out"])
    },
    {
        title: "Clair de lune",
        description: "Classical piano",
        type: "music",
        duration: "5:00",
        category: "Relaxation",
        tags: JSON.stringify(["classical", "piano", "calm"])
    },
    // Guided Meditation
    {
        title: "Morning Meditation",
        description: "Start your day with positive energy",
        type: "meditation",
        duration: "10:00",
        category: "Beginner",
        tags: JSON.stringify(["morning", "energy", "beginner"])
    },
    {
        title: "Body Scan Relaxation",
        description: "Release tension from head to toe",
        type: "meditation",
        duration: "8:00",
        category: "Intermediate",
        tags: JSON.stringify(["body scan", "relaxation", "tension"])
    },
    {
        title: "Stress Relief",
        description: "Quick relaxation for busy days",
        type: "meditation",
        duration: "10:00",
        category: "Advanced",
        tags: JSON.stringify(["stress", "quick", "advanced"])
    },
    {
        title: "Mindful Breathing",
        description: "Focus on your breath and be present",
        type: "meditation",
        duration: "11:00",
        category: "All Levels",
        tags: JSON.stringify(["breathing", "mindful", "presence"])
    },
    {
        title: "Healing Visualization",
        description: "Visualize healing & wellness",
        type: "meditation",
        duration: "14:00",
        category: "Basic",
        tags: JSON.stringify(["healing", "visualization", "wellness"])
    },
    {
        title: "Body Relaxation",
        description: "Classical piano",
        type: "meditation",
        duration: "14:00",
        category: "General",
        tags: JSON.stringify(["relaxation", "piano", "calm"])
    }
];

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced');

        await WellnessContent.bulkCreate(wellnessData);
        console.log(`${wellnessData.length} wellness items created`);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
