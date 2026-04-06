import { getServerSession, User } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/options";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/model/user.model";

export async function POST(request: Request) {
  await connectDB();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = user._id;
  const { acceptMessage } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMsg: acceptMessage },
      { new: true },
    );

    if (!updatedUser) {
      return new Response("User not found", { status: 404 });
    }

    return new Response("Message acceptance status updated successfully", {
      status: 200,
    });
  } catch (error) {
    console.log(
      "===============================================================",
    );
    console.log(
      "ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR",
    );
    console.error("Error at accepting message:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  await connectDB();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = user._id;

  try {
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return new Response("User not found", { status: 404 });
    }

    return new Response("User found", { status: 200 });
  } catch (error) {
    console.error("Error at fetching user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
