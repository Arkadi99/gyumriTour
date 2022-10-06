import nodemailer from "nodemailer"
import _ from "lodash";
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
        const html = fs.readFileSync(path.join(__dirname, "../view/emailRegister.ejs"), "utf-8");
        console.log(_.template(html)({email, activationCode}))
        let info = await transporter.sendMail({
            from: '"Way To Gyumri" <asatryan9911@mail.ru>', // sender address
            to: email, // list of receivers
            subject: "Way To Gyumri ✔", // Subject line
            html: _.template(html)({email, activationCode}),
        });
        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    static confirmChange = async (email, activationCode) => {
        const html = fs.readFileSync(path.join(__dirname, "../view/emailChangePassword.ejs"), "utf-8");
        let info = await transporter.sendMail({
            from: '"Way To Gyumri" <asatryan9911@mail.ru>', // sender address
            to: email, // list of receivers
            subject: "Way To Gyumri ✔", // Subject line
            html: _.template(html)({activationCode}),
        });
        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
}

export default ConfirmMail
