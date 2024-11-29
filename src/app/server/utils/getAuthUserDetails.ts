import { auth } from "@/auth";
import { getUserByEmail } from "../services/user.service";

export async function getAuthenticatedUser() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  const user = await getUserByEmail(session.user.email);

  if (!user) {
    throw new Error("Not authenticated");
  }

  return user;
}
