const { User } = require('./models');
const sequelize = require('./config/db');
const bcrypt = require('bcryptjs');

async function resetPassword() {
    try {
        await sequelize.authenticate();
        const email = 'n@gmail.com';
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log('User not found');
            process.exit(1);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('1234', salt);

        user.password = hashedPassword;
        await user.save();

        console.log(`Password for ${email} reset to '1234'`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

resetPassword();
