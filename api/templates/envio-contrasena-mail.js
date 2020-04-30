'use strict';

const nodemailer = require('nodemailer');
require('dotenv').config();

this.enviar_mail = (pnombre, pcorreo, pcontrasena) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPSSWD
        }
    });

    let mail_options = {
        from: 'id2020cr@gmail.com',
        to: pcorreo, //'mramirezj@ucenfotec.ac.cr',
        subject: `Nueva contraseña generada para ${pnombre}`,
        html: `
                <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#71323D" bgcolor="#EFE4D9">
                    <tr height="200px">
                        <td bgcolor="" width="600px">
                            <h1 style="color: #71323D; text-align:center">Ideas Digitales le Informa a: </h1>
                            <div align="center"><img src="../public/imgs/logo/logo.png" width="100" height="100"></div>
                            <p style="color: #71323D; text-align:center">
                            <span style="color: #71323D">${pnombre}</span>
                            que su contrasena nueva es esta: <span style="color: #71323D">${pcontrasena}</span>
                            </p>
                            <p <style="color: #71323D; text-align:center">
                            almacénela en un lugar seguro.
                            </p>
                        </td>
                    </tr>
                    <tr bgcolor="#fff">
                        <td style="text-align:center">
                            <p style="color: #71323D">¡Tenemos las soluciones informáticas para usted y su empresa!</p>
                        </td>
                    </tr>
                </table>
        
              `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Correo se envió con éxito: ' + info.response);
        }
    });

};

module.exports = this;
