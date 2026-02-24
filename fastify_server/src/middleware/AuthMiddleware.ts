import { FastifyReply, FastifyRequest } from "fastify";

/**
 * Simple token authorization middleware.
 *
 * - Expects `Authorization: Bearer <token>` header.
 * - Uses Fastify JWT (`req.jwtVerify`) to validate the token.
 * - On success, allows the handler to continue and leaves `req.user` populated.
 * - On failure, sends an appropriate error response and returns `false`.
 */
export async function validateRequest(
  req: FastifyRequest,
  res: FastifyReply
): Promise<boolean> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      await res.status(401).send({
        success: false,
        message: "No token provided",
      });
      return false;
    }

    const token = authHeader.split(" ")[1];

    try {
      // This will throw if the token is invalid or expired.
      // Fastify JWT also populates `req.user` with the decoded payload.
      await (req as any).jwtVerify({ token });
      return true;
    } catch (err) {
      await res.status(401).send({
        success: false,
        message: "Invalid or expired token",
        error: err,
      });
      return false;
    }
  } catch (error) {
    await res.status(500).send({
      success: false,
      message: "Internal server error during token validation",
      error,
    });
    return false;
  }
}