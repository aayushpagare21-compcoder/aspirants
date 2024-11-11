import { prisma } from "../db/prisma";

export const getAllTopics = () => {
  return prisma.topics.findMany();
};
