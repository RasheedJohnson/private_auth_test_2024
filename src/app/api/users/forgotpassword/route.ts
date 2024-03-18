import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/helpers/mailer";


connect();

export async function POST(request: NextRequest) {
  try {

    const reqBody = await request.json();
    const { email } = reqBody;
    console.log(`Seeking account with email: '${reqBody.email}'...`);

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Account not found");
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    } else {
      console.log(`Account with email: '${reqBody.email}' successfully found`);
      console.log("Sending token to email address...")
    }

    // IF user exists, send user email with link to create token
    // send reset email link
    await sendEmail({ email, emailType: "RESET", userId: user._id });

    // if user clicks link, and has token, user sent to page to reset password
    // user resets password, if passwords match, and user submits
      // user password hashed
      // user hashed password stored
      // user redirected to login page
  

    const response = NextResponse.json({
      message: "Success. User exists",
      success: true
    })
    return response;

  } catch (error:any) {
    return NextResponse.json({error: error.message}, {status: 500})
  }
}