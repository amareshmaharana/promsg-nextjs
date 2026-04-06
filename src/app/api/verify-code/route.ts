import { connectDB } from "@/lib/db";
import { UserModel } from "@/model/user.model";

export async function POST(request: Request) {
  await connectDB();

  try {
    const { username, code } = await request.json();

    const decodedUsername = decodeURIComponent(username);

    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpire) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return new Response(
        JSON.stringify({ message: "Verification successful" }),
        { status: 200 },
      );
    } else if (!isCodeNotExpired) {
      return new Response(
        JSON.stringify({ message: "Verification code has expired" }),
        { status: 400 },
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Invalid verification code" }),
        { status: 400 },
      );
    }
  } catch (error) {
    console.log(
      "===================================================================",
    );
    console.log("ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ");
    console.error("Error verifying code :::", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
