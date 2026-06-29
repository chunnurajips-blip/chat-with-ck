import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "../emails/emailTemplate.js";
export const sendWelcomeEmail = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to chatify!",
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  console.log("Data:", data);
  console.log("Error:", error);

  if (error) {
    console.error("Error sending Welcome Email!", error);
    throw new Error("Failed to send Welcome email");
  }

  console.log("Wecome email sent succesfully", data);
};
