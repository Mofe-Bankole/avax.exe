import app from "../../server";

export async function issueSessionToken(
  id: string,
  role: string,
): Promise<string> {
  if (!id||!role) {
    throw new Error("Missing Field");
  }
  const token = app.jwt.sign(
    {
      id,
      role: role,
    },
    { expiresIn: "15d" },
  );

  return token;
}
