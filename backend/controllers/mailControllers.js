import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'

// @desc sending order summary email to the customer
// @route POST /api/mail/orderplaced
// @access Private Route

/* 
  mailOptions:
    to: user.email
    subject: 'Akiiko order Summary for Id: order.id'
    text: req.body.content
    html: 
*/
const orderPlacedMail = asyncHandler(async (req, res) => {
  console.log(req.body)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'precisofashion@gmail.com',
      pass: 'preciso@123',
    },
  })

  const mailOptions = {
    from: 'precisofashion@gmail.com',
    to: req.body.shpppingAddress.email,
    replyTo: 'precisofashion@gmail.com',
    subject: 'Akiiko Order Summary for order:' + req.body._id,
    text: 'test',
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(500).send({
        status: 'FAIL',
        message: 'Internal Error, mail not sent' + err,
      })
    } else {
      res.status(200).json({ status: 'OK', msg: 'Email sent' })
    }
  })
})

export { orderPlacedMail }
