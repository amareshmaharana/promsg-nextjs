import { getServerSession, User } from "next-auth";
import mongoose from "mongoose";

import { authOptions } from "../auth/[...nextauth]/options";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/model/user.model";

export async function GET(request: Request) {
  await connectDB();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (!user || user.length === 0) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user[0].messages), { status: 200 });
  } catch (error) {
    console.error("Error at fetching user messages:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
