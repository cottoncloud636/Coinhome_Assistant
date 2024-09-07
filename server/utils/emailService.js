import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, verificationLink) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // Use TLS (SSL should be disabled for Ethereal)
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_SENDER,  // Using the email stored in the environment variable
        to: email,
        subject: 'Email Verification',
        html: `<p>Please click this link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`,
    };

let info = await transporter.sendMail(mailOptions);
console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));  // Log preview URL for Ethereal
};
