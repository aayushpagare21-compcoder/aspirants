import { prisma } from "../utils/prisma";

export const getAllTopics = () => {
  return prisma.topics.findMany();
};
