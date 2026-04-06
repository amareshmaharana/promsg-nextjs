import { resend } from "@/lib/resend";
import { VerificationEmail } from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export const sendVerificationEmail = async (
  email: string,
  username: string,
  verifyCode: string,
): Promise<ApiResponse> => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Promsg | Verify your email address",
      react: VerificationEmail({ username, otpCode: verifyCode }),
    });

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (emailError) {
    console.log(
      "ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR",
    );
    console.log("EMAIL VERIFICATION AFFECTED!!");
    console.error("Email verification failed because ::: ", emailError);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
};
