const Contact=require("../models/contactModel");
const nodemailer = require("nodemailer");
require("dotenv").config();
const contactForm=async (req,res)=>{
    try{
const{
    name,address,phone,email,message,inquiryType

}=req.body;

if(!name||!email||!address||!phone||!inquiryType){
    return res.status(400).json({message:"please provide reqyuired field"});
}

const contact=new Contact({
    name,address,phone,email,message,inquiryType,
    createdAt:new Date(),
});

await contact.save();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    port:465,
    secure:true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
       },
  });

  const mailOptions = {
    from: `Sonatek Contact Form <${process.env.GMAIL_USER}>`,  // sender email
    to: process.env.GMAIL_USER,                             // admin email receiving form details
    replyTo: email,                                             // user email for reply
    subject: 'New Contact Form Submission',
     html: `
      <h2>New Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
      <p><strong>Message:</strong> ${message || 'No message provided.'}</p>
    `,
  };

  await transporter.sendMail(mailOptions);

  res.status(200).json({ message: "Contact form submitted successfully", contact });


    }
    catch (err) {
    console.error("Create product error", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { contactForm };