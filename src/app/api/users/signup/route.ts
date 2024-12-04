 import { Connection } from '@/dbConfig/dbconfig'
import User from '@/modules/userModule'
import { error, log } from 'console'
import { connection, NextRequest,NextResponse } from 'next/server'
import bcryptjs from "bcryptjs"
import { sendEmail } from '@/helpers/mailer'
connection()
 export async function POST(request:NextRequest) {
    try{
        const reqBody = request.json()
        const {username,email,password} = reqBody
        // validation
        console.log(reqBody)
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User Already exists "},{status: 400})
        }
        const salt =await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt)
       const newUser = new User({
            username,
            email,
            password :hashedPassword
        })
        const savedUser = await newUser.save()
        console.log(savedUser)
        //  send user verification mail
        await sendEmail({email,emailType:"VRIFY",userId:savedUser._id}) 


    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
    
 }