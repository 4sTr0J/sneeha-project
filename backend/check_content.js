const { WellnessContent } = require('./models');
const sequelize = require('./config/db');

async function checkContent() {
    try {
        await sequelize.authenticate();
        const content = await WellnessContent.findAll();
        console.log('Wellness Content in database:');
        console.log(content.map(c => ({ id: c.id, title: c.title, type: c.type })));
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkContent();
