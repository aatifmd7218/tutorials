// lib/backgroundTasks.js

import { PrismaClient } from "@prisma/client";
import cron from "node-cron";

const prisma = new PrismaClient();

const checkAndPublishBlogs = async () => {
  const now = new Date();
  console.log(`[${now.toISOString()}] Checking for blogs to publish...`);
  const blogsToPublish = await prisma.bloglivet.findMany({
    where: {
      published: "N",
      publishDate: {
        lte: now,
      },
    },
  });

  console.log(`[${now.toISOString()}] Found ${blogsToPublish.length} blogs to publish.`);


  for (const blog of blogsToPublish) {
    try {
      await prisma.bloglivet.update({
        where: { id: blog.id },
        data: { published: "Y" },
      });
      console.log(`Blog with ID ${blog.id} has been published.`);
    } catch (error) {
      console.error(`Failed to publish blog with ID ${blog.id}:`, error);
    }
  }
};

// Schedule the task to run every minute
export const startBackgroundTasks = () => {
    
  cron.schedule("* * * * *", () => {
    console.log(`[${new Date().toISOString()}] Cron job triggered.`);
    checkAndPublishBlogs();
  });
  console.log(`[${new Date().toISOString()}] Background tasks started.`);
};
