const mongoose = require('mongoose');
const {MongoStore} = require('wwebjs-mongo');

// const db1 = mongoose.connect('mongodb+srv://abhinaithani2:mB36Z2xgZnoYHiMU@vampire.8dtzv2g.mongodb.net/whatsapp-message-scheduler');
const db1 = mongoose.createConnection('mongodb+srv://abhinaithani2:mB36Z2xgZnoYHiMU@vampire.8dtzv2g.mongodb.net/whatsapp-message-scheduler', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const userSchema = new mongoose.Schema({
    userName: String,
    phoneNumber: String,
    chatId: String,
    profilePic: String,
    contacts: [{
        name: String,
        number: String,
        serialized: String,
        isGroup: Boolean,
        // profilePic: String
    }],
    scheduleList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule'
    }]
});

const scheduleSchema = new mongoose.Schema({
    message: String,
    mediaFilePath: String,
    mediaUrl: String,
    to: [{
        name: String,
        serialized: String,
        id: String,
    }],
    from: String, 
    scheduleAt: Date,
})

const User = db1.model('User', userSchema);
const Schedule = db1.model('Schedule', scheduleSchema);
// const Store = new MongoStore({mongoose: db2});

module.exports = {
    User,
    Schedule,
}