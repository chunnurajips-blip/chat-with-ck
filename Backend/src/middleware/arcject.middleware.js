import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjectProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Too many Request , try again after some time" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot access Denied" });
      } else {
        return res
          .status(403)
          .json({ message: "Access Denied, Due to Privacy Policy" });
      }
    }

    // check for spoofed Bots
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity.",
      });
    }

    next();
  } catch (error) {
    console.log("Arcject Protection Error", error);
    next();
  }
};
