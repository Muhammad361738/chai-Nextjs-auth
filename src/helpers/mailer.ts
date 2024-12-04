    import nodemailer from "nodemailer"
    import bcryptjs from "bcryptjs"
import User from "@/modules/userModule"

    
    export const sendEmail = async ({email,emailType,userId}:any) =>{
        try {
            //Todd:  configure mail for usage 
            const hashedToken = await bcryptjs.hash(userId.toString(),10)

            if(emailType === "VERIFY"){
                await User.findByIdAndUpdate(userId,
                    {verifyToken:hashedToken , verifyTokenExpiry : Date.now() + 3600000})
                 }
            else if (emailType === "RESET"){
                await User.findByIdAndUpdate(userId,
                    {forgotPasswordToken :hashedToken , forgotPasswordTokenExpiry : Date.now() + 3600000})
            }
            const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for port 465, false for other ports
                auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
                },
            });
    
            
            const mailOption = {
                from: 'shahzainali5002@gmail.com', 
                to: "email", 
                subject: emailType === 'VERIFY' ? "verify your email ": "Reset your password", 
                text: "Hello world?", 
                html: "<b>Hello world?</b>", 

            }

        const mailResponse = await transporter.sendMail(mailOption)
                return mailResponse
        } catch(error:any) {
            throw new Error (error.message)
        }
    }