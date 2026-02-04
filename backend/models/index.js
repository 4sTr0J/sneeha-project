const User = require('./User');
const WellnessContent = require('./WellnessContent');
const Community = require('./Community');
const Message = require('./Message');
const Music = require('./Music');

// User <-> WellnessContent (Favorites) Many-to-Many
User.belongsToMany(WellnessContent, { through: 'UserFavorites', as: 'Favorites' });
WellnessContent.belongsToMany(User, { through: 'UserFavorites' });

// User <-> Community (Members) Many-to-Many
User.belongsToMany(Community, { through: 'CommunityMembers', as: 'groups' });
Community.belongsToMany(User, { through: 'CommunityMembers', as: 'members' });

// Message -> User (Sender/Receiver)
Message.belongsTo(User, { as: 'senderUser', foreignKey: 'sender' });
Message.belongsTo(User, { as: 'receiverUser', foreignKey: 'receiver' });

module.exports = {
    User,
    WellnessContent,
    Community,
    Message,
    Music
};
