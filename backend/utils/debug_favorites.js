const { User, WellnessContent } = require('../models');
const sequelize = require('../config/db');

const debugFavorites = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Find default user
        const user = await User.findOne({ where: { email: 'hh@example.com' } });
        if (!user) {
            console.log('User not found!');
            return;
        }
        console.log('User found:', user.name, user.id);

        // Find a wellness content
        const content = await WellnessContent.findOne();
        if (!content) {
            console.log('No wellness content found!');
            return;
        }
        console.log('Content found:', content.title, content.id);

        // Check prototypes to see available methods
        console.log('User prototype methods:', Object.keys(User.prototype).filter(k => k.toLowerCase().includes('favor')));
        console.log('User instance methods:', Object.keys(user.__proto__).filter(k => k.toLowerCase().includes('favor')));

        // Try to add favorite
        console.log('Attempting addFavorite...');
        try {
            await user.addFavorite(content);
            console.log('addFavorite success!');
        } catch (e) {
            console.error('addFavorite failed:', e.message);
        }

        // Check if hasFavorite
        const hasFav = await user.hasFavorite(content);
        console.log('hasFavorite result:', hasFav);

        // Get favorites
        const favs = await user.getFavorites();
        console.log('getFavorites count:', favs.length);

    } catch (error) {
        console.error('Debug script error:', error);
    } finally {
        process.exit();
    }
};

debugFavorites();
