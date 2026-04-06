import { connectDB } from "@/lib/db";
import { UserModel } from "@/model/user.model";

import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { username, email, password } = await req.json();

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return new Response(
        JSON.stringify({ message: "Username already taken" }),
        { status: 400 },
      );
    }

    const existingUserVerifiedByEmail = await UserModel.findOne({
      email,
      isVerified: true,
    });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserVerifiedByEmail) {
      if (existingUserVerifiedByEmail.isVerified) {
        return new Response(
          JSON.stringify({ message: "User with this email already exists" }),
          { status: 400 },
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserVerifiedByEmail.password = hashedPassword;
        existingUserVerifiedByEmail.verifyCode = verifyCode;
        existingUserVerifiedByEmail.verifyCodeExpire = new Date(
          Date.now() + 3600000,
        ); // * 1 hour from now
        await existingUserVerifiedByEmail.save();
      }

      return new Response(JSON.stringify({ message: "Email already taken" }), {
        status: 400,
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        isVerified: false,
        verifyCode,
        verifyCodeExpire: expiryDate,
        isAcceptingMsg: false,
        messages: [],
      });
      await newUser.save();
    }

    // * Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode,
    );

    if (!emailResponse.success) {
      return new Response(
        JSON.stringify({ message: "Failed to send verification email" }),
        { status: 500 },
      );
    }

    return new Response(
      JSON.stringify({
        message: "User registered successfully & verify your email",
      }),
      { status: 201 },
    );
  } catch (error) {
    console.log("ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR");
    console.log("HURRY UP!! SIGN-UP ROOM HACKED!!");
    console.error("Error during entry of new user ::: ", error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
