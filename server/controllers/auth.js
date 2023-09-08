const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');

require('dotenv').config();

const signup=(req,res)=>{
    try {
        
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