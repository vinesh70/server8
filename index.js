const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/save", (req, res) => {
    let { name, phone, email, subject, comment } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "vineshryapak1234@gmail.com",
            pass: "ziuk ygku tmfe mybr" // Ensure this password is correct and is an app password
        },
        tls: {
            rejectUnauthorized: false // This allows self-signed certificates
        }
    });

    let mailOptions = {
        from: "vineshryapak1234@gmail.com",
        to: "internshipvit16@gmail.com",
        subject: "Enquiry from " + name,
        text: `Phone: ${phone}\nEmail: ${email}\nSubject: ${subject}\nComment: ${comment}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Error while sending mail: ", err);
            res.status(500).json({ error: "Failed to send email", details: err });
        } else {
            console.log("Email sent: ", info.response);
            res.status(200).json({ message: "Email sent successfully" });
        }
    });
});

app.listen(9000, () => {
    console.log("Server is listening @ 9000");
});
