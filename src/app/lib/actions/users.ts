"use server";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}
export async function createUser(data: Prisma.UserCreateInput) {
  return prisma.user.create({ data });
}
