const nodemailer = require('nodemailer')

exports.acmeView = (req, res) => {
  return res.render('contact')
}
exports.acmeFormSend = async (req, res) => {
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details </h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Name: ${req.body.company}</li>
    <li>Name: ${req.body.email}</li>
    <li>Name: ${req.body.phone}</li>
    <li>Name: ${req.body.message}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.message}</p>
  `

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.RECEIVING_EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD // generated ethereal password
    }
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Nodemailer contact 👻" ${process.env.RECEIVING_EMAIL}`, // sender address
    to: process.env.EMAIL_SENDER, // list of receivers
    subject: 'Acme contact form request', // Subject line
    //text: 'Hello world?', // plain text body
    html: output // html body
  })

  console.log('Message sent: %s', info.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  console.log('Info This thing: ', info)

  return res.render('contact', { msg: 'Email has ben send' })
}
