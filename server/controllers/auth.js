const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');

require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup= async(req,res)=>{
    try {
        const { firstname, lastname, username, password, phoneNumber } = req.body;

        const userId = crypto.randomBytes(16).toString('hex');

        const serverClient = connect(api_key, api_secret, app_id);

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createUserToken(userId);

        res.status(200).json({ token, firstname, lastname, username, userId, hashedPassword, phoneNumber });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}
const login=(req,res)=>{
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

module.exports = { signup, login }