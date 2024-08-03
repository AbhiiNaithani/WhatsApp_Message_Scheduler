const express = require('express');
const { startSchedule, stopSchedule } = require('../services/scheduleMessage');
const { Schedule, User } = require('../db');


const router = express.Router();


router.get('/getUserDetails/:id', async(req,res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    

    res.json({
        userName: user?.userName,
        phoneNumber: user?.phoneNumber,
        chatId: user?.chatId,
        profilePic: user?.profilePic,
    });

})

router.get('/getContacts/:id', async(req,res) => {
    const id = req.params.id;

    const user = await User.findById(id);

    res.json({
        contacts: user?.contacts,
    });

});

router.get('/getAllScheduleMessages/:id', async(req,res) => {
    const id = req.params.id;

    const user = await User.findById(id);

    const allScheduleMessages = await Schedule.find({
        _id: {
            "$in" : user?.scheduleList
        }
    });

    res.json({
        allScheduleMessages,
    });

})

router.get('/getPendingMessages/:id', async(req,res) => {
    const id = req.params.id;

    const user = await User.findById(id);

    const allMessages = await Schedule.find({
        _id: {
            "$in": user?.scheduleList,
        }
    })
    const pendingMessages = allMessages.filter((message) => {
        return message.scheduleAt?.getTime() > new Date().getTime();
    });

    res.json({
        pendingMessages,
    });

});

router.get('/getCompletedMessages/:id', async(req,res) => {
    const id = req.params.id;

    const user = await User.findById(id);

    const allMessages = await Schedule.find({
        _id: {
            "$in": user?.scheduleList,
        }
    })
    const completedMessages = allMessages.filter((message) => {
        return message.scheduleAt?.getTime() < new Date().getTime();
    });

    res.json({
        completedMessages,
    });

});
router.post('/scheduleMessage', async(req, res) => {
    const {message, mediaFilePath, mediaUrl, to, from, scheduleAt} = req.body;

    const ScheduleMsz = await Schedule.create({
        message,
        mediaFilePath, 
        mediaUrl, 
        to, 
        from, 
        scheduleAt
    });

    await User.findOneAndUpdate({
        _id : from
    },{
        "$push": {
            scheduleList: ScheduleMsz._id,
        }
    })
    // make message body and schedule mesage
    for(let i=0;i<to.length;++i){
        const recepient = to[i];
        const data = {
            message : message,
            scheduleId : ScheduleMsz._id,
            receiverId : recepient.id,
            scheduleAt : scheduleAt,
            chatId : recepient.serialized
        }
        
        startSchedule(data);
    }

    res.json({
        message: 'Message Scheduled',
    });
});

router.delete('/stopScheduling/:id', async(req, res) => {
    const id = req.params.id;

    const schedule = await Schedule.findByIdAndDelete(id);
    
    for(let i=0;i<schedule.to.length;++i){
        const jobId = schedule._id + schedule.to[i].id;
        stopSchedule(jobId);
    }

    res.json({
        message: 'Message Scheduling stoped',
    });
});



module.exports = router;