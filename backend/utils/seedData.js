const mongoose = require('mongoose');
const dotenv = require('dotenv');
const WellnessContent = require('../models/WellnessContent');
const Community = require('../models/Community');

dotenv.config();

const wellnessData = [
    {
        title: "Peaceful Morning Meditation",
        description: "Start your day with calm and clarity through guided breathing",
        type: "meditation",
        duration: "10 min",
        category: "morning",
        tags: ["breathing", "mindfulness", "morning"]
    },
    {
        title: "Healing Sleep Sounds",
        description: "Gentle nature sounds to help you rest and recover",
        type: "music",
        duration: "30 min",
        category: "sleep",
        tags: ["sleep", "nature", "relaxation"]
    },
    {
        title: "Strength Affirmations",
        description: "Positive affirmations for courage and resilience",
        type: "affirmation",
        duration: "5 min",
        category: "motivation",
        tags: ["affirmations", "strength", "positivity"]
    },
    {
        title: "Ocean Waves Relaxation",
        description: "Calming ocean sounds for deep relaxation",
        type: "music",
        duration: "45 min",
        category: "relaxation",
        tags: ["ocean", "nature", "calm"]
    },
    {
        title: "Body Scan Meditation",
        description: "Release tension and connect with your body",
        type: "meditation",
        duration: "15 min",
        category: "healing",
        tags: ["body scan", "healing", "awareness"]
    },
    {
        title: "Gentle Piano Melodies",
        description: "Soothing piano music for peaceful moments",
        type: "music",
        duration: "25 min",
        category: "relaxation",
        tags: ["piano", "instrumental", "peaceful"]
    },
    {
        title: "Breathing Exercise",
        description: "Simple breathing techniques to reduce anxiety",
        type: "breathing",
        duration: "8 min",
        category: "anxiety",
        tags: ["breathing", "anxiety", "calm"]
    },
    {
        title: "Forest Sounds",
        description: "Immerse yourself in the tranquility of nature",
        type: "music",
        duration: "60 min",
        category: "nature",
        tags: ["forest", "birds", "nature"]
    }
];

const communityData = [
    {
        name: "Cancer Warriors",
        description: "A supportive community for those battling cancer",
        illnessType: "Cancer Support",
        memberCount: 127,
        isPrivate: false
    },
    {
        name: "Chronic Pain Support",
        description: "Share experiences and coping strategies for chronic pain",
        illnessType: "Chronic Illness",
        memberCount: 89,
        isPrivate: false
    },
    {
        name: "Caregiver Circle",
        description: "Support for those caring for loved ones",
        illnessType: "Caregiver Support",
        memberCount: 64,
        isPrivate: false
    },
    {
        name: "Breast Cancer Survivors",
        description: "Connect with breast cancer survivors and thrivers",
        illnessType: "Cancer Support",
        memberCount: 156,
        isPrivate: false
    },
    {
        name: "Diabetes Management",
        description: "Tips and support for managing diabetes",
        illnessType: "Chronic Illness",
        memberCount: 98,
        isPrivate: false
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding');

        // Clear existing data
        await WellnessContent.deleteMany({});
        await Community.deleteMany({});
        console.log('Cleared existing data');

        // Insert wellness content
        const wellness = await WellnessContent.insertMany(wellnessData);
        console.log(`${wellness.length} wellness items created`);

        // Insert communities
        const communities = await Community.insertMany(communityData);
        console.log(`${communities.length} communities created`);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
