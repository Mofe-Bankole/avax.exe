import app from "../../server";

export async function issueSessionToken(
  id: string,
  role: string,
  walletAddress: string,
): Promise<string> {
  if (!id||!role) {
    throw new Error("Missing Field");
  }
  const token = app.jwt.sign(
    {
      id,
      role: role,
      walletAddress: walletAddress,
    },
    { expiresIn: "30d" },
  );

  return token;
}
