import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otpCode: string;
  validityMinutes?: number;
}

export const VerificationEmail = ({
  username,
  otpCode,
  validityMinutes = 5,
}: VerificationEmailProps) => {
  const previewText = `Your verification code is ${otpCode}`;

  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify Your Email</title>
      </Head>
      <Preview>{previewText}</Preview>

      <Body style={{ backgroundColor: "#f9fafb", margin: "0", padding: "0" }}>
        <Container
          style={{
            width: "100%",
            margin: "0 auto",
            padding: "24px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
          }}
        >
          {/* Header */}
          <Section style={{ textAlign: "center", marginBottom: "24px" }}>
            <Heading
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#111827",
              }}
            >
              Verify Your Email
            </Heading>
          </Section>

          {/* Greeting */}
          <Text
            style={{ fontSize: "16px", color: "#374151", marginBottom: "16px" }}
          >
            Hi {username},
          </Text>

          {/* OTP Message */}
          <Text
            style={{ fontSize: "16px", color: "#374151", marginBottom: "24px" }}
          >
            Use the following One-Time Password (OTP) to verify your email
            address. This code is valid for {validityMinutes} minutes.
          </Text>

          {/* OTP Display */}
          <Section style={{ textAlign: "center", marginBottom: "24px" }}>
            <Text
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                letterSpacing: "4px",
                color: "#111827",
                padding: "16px 0",
                border: "1px dashed #d1d5db",
                borderRadius: "6px",
                display: "inline-block",
              }}
            >
              {otpCode}
            </Text>
          </Section>

          {/* Instructions */}
          <Text
            style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}
          >
            Enter this code in the app or website to complete your verification.
            If you didn’t request this, please ignore this email.
          </Text>

          {/* Closing */}
          <Text
            style={{ fontSize: "16px", color: "#374151", marginBottom: "24px" }}
          >
            Thanks,
            <br />
            The Team
          </Text>

          {/* Footer */}
          <Text style={{ fontSize: "12px", color: "#9ca3af" }}>
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};
