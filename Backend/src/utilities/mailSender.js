
import nodemailer from 'nodemailer'
const sendMail = async(body,email,title)=>
{

try {
        let transporter = nodemailer.createTransport(
            {
                service:"gmail",
                host:process.env.MAIL_HOST,
                secure:true,
                port:465,
                auth:
                {
                    user:process.env.MAIL_USER,
                    pass:process.env.MAIL_PASS,
                },
                tls:
                {
                    rejectUnauthorized:true
                }
            }
        )
    
        let info = await transporter.sendMail(
            {
                from:`Apni Dukan|Family shop `,
                to:`${email}`,
                subject:`${title}`,
                html:`${body}`
            }
          
        )
        console.log(info)
        return info;
} catch (error) {
    console.log(error.message);
}
}

export{sendMail}