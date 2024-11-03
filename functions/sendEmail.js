const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
    try {
        const requestBody = JSON.parse(event.body);
        const { name, messages, numbers, emails } = requestBody;

        // Configure the email transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'elbazhamzahb@gmail.com',
                pass: 'sktv qkhi yagb cnxg',  // Reminder: use environment variables for sensitive data.
            },
        });

        // Define the email message
        let message = {
            from: 'elbazhamzahb@gmail.com',
            to: 'elbazhamza77@gmail.com',
            subject: 'Email de Contact',
            html: `
                <!doctype html>
                <html lang="en">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta charset="UTF-8">
                    <title>Contact Email</title>
                    <style>
                        /* Add your styles here */
                        body { font-family: Helvetica, sans-serif; font-size: 16px; background-color: #f4f5f6; }
                        .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 24px; border-radius: 16px; }
                        .footer { text-align: center; color: #9a9ea6; font-size: 16px; }
                        .btn a { color: #ffffff; background-color: #0867ec; padding: 12px 24px; text-decoration: none; border-radius: 4px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <p>Salut,</p>
                        <p>Voici le Message de contact</p>
                        <p><strong>Nom:</strong> ${name}</p>
                        <p><strong>Numéro:</strong> ${numbers}</p>
                        <p><strong>Email:</strong> ${emails}</p>
                        <p><strong>Message:</strong> ${messages}</p>
                        <p><a href="mailto:${emails}" class="btn">Répondre par Email</a></p>
                    </div>
                    <div class="footer">
                        <p>Email de réservation</p>
                        <p><a href="https://marrakechtaxis.com/">www.marrakechtaxis.com</a></p>
                    </div>
                </body>
                </html>
            `,
        };

        // Send the email
        await transporter.sendMail(message);

        return {
            statusCode: 201,
            body: JSON.stringify({ msg: 'Email sent successfully' }),
        };
    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send email' }),
        };
    }
};
