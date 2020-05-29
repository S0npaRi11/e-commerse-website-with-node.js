if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth : {
            type: 'Oauth2',
            user: process.env.EMAIL_SEND,  // import from .env
            pass: process.env.EMAIL_PASS,  // import from .env
            clientId: process.env.EMAIL_SENDER_CLIENT_ID,  //import from .env
            clientSecret: process.env.EMAIL_SENDER_CLIENT_SECRET,  // import from .env
            refreshToken: process.env.EMAIL_SENDER_REFERSH_TOKEN,  // import from .env
            accessToken: process.env.EMAIL_SENDER_ACCESS_TOKEN  // import from .env
    }
})

module.exports = transporter;