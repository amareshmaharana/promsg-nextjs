import { connectDB } from "@/lib/db";
import { Msg, UserModel } from "@/model/user.model";

export async function POST(request: Request) {
  await connectDB();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // * if user found, accept the message
    if (!user.isAcceptingMsg) {
      return new Response("User is not accepting messages", { status: 403 });
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Msg);
    await user.save();

    return new Response("Message sent successfully", { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/send-message:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
