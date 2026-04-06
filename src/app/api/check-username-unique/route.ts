import { z } from "zod";

import { connectDB } from "@/lib/db";
import { UserModel } from "@/model/user.model";
import { usernameValidation } from "@/schemas/signupSchema";

const UsernameQuerSchema = z.object({
  username: usernameValidation,
});

export async function GET(req: Request) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const queryParam = { username: searchParams.get("username") };

    const result = UsernameQuerSchema.safeParse(queryParam);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];

      return new Response(
        JSON.stringify({
          error:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Invalid username format",
        }),
        { status: 400 },
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return new Response(
        JSON.stringify({ error: "Username is already taken" }),
        { status: 409 },
      );
    }

    return new Response(JSON.stringify({ message: "Username is available" }), {
      status: 200,
    });
  } catch (error) {
    console.log("ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR");
    console.error("Error checking username uniqueness :::", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
