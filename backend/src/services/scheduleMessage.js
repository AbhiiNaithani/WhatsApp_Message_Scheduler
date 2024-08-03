const schedule = require('node-schedule');
const context = require('../context');


// Function to be scheduled
function scheduleMessage(chatId,message) {
    const client = context.get('client');
    client.sendMessage(chatId, message);
    console.log('Message scheduled at ' + new Date());
}

// Object to store scheduled jobs
const jobs = {};

// Start a scheduled job
function startSchedule(data) {
    if (!jobs[data.scheduleId + data.receiverId]) {
        jobs[data.scheduleId + data.receiverId] = schedule.scheduleJob(data.scheduleAt, () => scheduleMessage(data.chatId, data.message));
        console.log(`Schedule for ${data.scheduleId + data.receiverId} started`);
    } else {
        console.log(`Schedule for ${data.scheduleId + data.receiverId} is already running`);
    }
}

// Stop a scheduled job
function stopSchedule(id) {
    if (jobs[id]) {
        jobs[id].cancel();
        delete jobs[id];
        console.log(`Schedule for ${id} stopped`);
    } else {
        console.log(`No schedule found for ${id}`);
    }
}

module.exports = {
    stopSchedule,
    startSchedule
}