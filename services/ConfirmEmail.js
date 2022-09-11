import nodemailer from "nodemailer"
import path from "path";
import fs from "fs"


let transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "asatryan9911@mail.ru", // generated ethereal user
        pass: "Rj9CkecM4Lk7Zhq3T1Jc" // generated ethereal password
    },
});

class ConfirmMail {
    static confirm = async (email, activationCode) => {
        const html = fs.readFileSync(path.join(__dirname, "./emailRegister.ejs"), "utf-8")
        let info = await transporter.sendMail({
            from: '"Way To Gyumri" <asatryan9911@mail.ru>', // sender address
            to: email, // list of receivers
            subject: "Way To Gyumri ✔", // Subject line
            html: `<a href=http://localhost:5050/users/confirmEmail?code=${activationCode}&email=${email}>Verification Email</a>`,
        });
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
}

export default ConfirmMail
