const { Client, RemoteAuth } = require('whatsapp-web.js');
// const qrcode = require('qrcode-terminal');
const { User } = require('../db');
const context = require('../context');



const startSession = async ({socket}) => {
    // Create a new client instance
    
    const client = new Client({
        puppeteer: {
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: true
        },
        // authStrategy: new RemoteAuth({
        //     clientId: id,
        //     store: store,
        //     backupSyncIntervalMs: 300000
        // })
    });

    // When the client is ready, run this code (only once)
    client.on('ready', async () => {
        
        context.set('client', client);
        const url = await client?.getProfilePicUrl(client.info.wid._serialized);
    
        const contacts = await client.getContacts();

        const compressedContacts = contacts.filter((contact) => {
            return contact.name != undefined;
        }).map(async (user) => {
            // const url = await client.getProfilePicUrl(user.id._serialized);
            const contactData = {
                name: user.name,
                number: user.number,
                serialized: user.id._serialized,
                isGroup: user.isGroup,
                // profilePic: url
            }
            // // console.log(contactData);
            return contactData;
        });
        const resolvedContacts = await Promise.all(compressedContacts);
        console.log('resolvedContacts: ', resolvedContacts.length);
        console.log('originalContacts: ', contacts.length);
        const userData = {
            userName: client.info.pushname,
            phoneNumber: client.info.wid.user,
            chatId: client.info.wid._serialized,
            contacts: resolvedContacts,
            profilePic: url,
        }
        const isExist = await User.findOne({
            phoneNumber: userData.phoneNumber,
            chatId: userData.chatId
        })
        let userId;
        if(!isExist){
            const user = await User.create(userData);
            userId = user._id;
        }
        else{
            const user = await User.findByIdAndUpdate(isExist._id, userData)
            userId = user._id;
        }

        socket.emit('ready', {
            userId: userId,
        })
        
        console.log('Client is ready!');
    });

    client.on('authenticated', async () => {
        console.log('Authenticated');
        socket.emit('authenticated', {
            authentication: 'done',
        })
    })
    // When the client received QR-Code
    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
        socket.emit('qr', {
            qr,
        })
    });

    // client.on('remote_session_saved',async () => {
    //     console.log('remote session saved');
        
    //     //store {name phnNo id} in user
    // })

    await client.initialize();

    // return client;
}



module.exports = {
    startSession,
}
