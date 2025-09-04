import { db } from "@/db";
import { videos } from "@/db/schema";
import { serve } from "@upstash/workflow/nextjs";
import { and, eq } from "drizzle-orm";
import Together from "together-ai";
import { UTApi } from "uploadthing/server";

interface InputType {
  userId: string;
  videoId?: string;
  prompt: string;
}

export const { POST } = serve(async (context) => {
  const input = context.requestPayload as InputType;
  const { userId, videoId, prompt } = input;

  const video = await context.run("get-video", async () => {
    const [existingVideo] = await db
      .select()
      .from(videos)
      .where(and(eq(videos.id, videoId!), eq(videos.userId, userId)));

    if (!existingVideo) {
      throw new Error("Not found");
    }

    return existingVideo;
  });

  const generatedTempThumbnailUrl = await context.run(
    "generated-thumbnail",
    async () => {
      const together = new Together({
        apiKey: process.env.TOGETHER_API_KEY,
      });

      const response = await together.images.create({
        prompt: prompt,
        model: "black-forest-labs/FLUX.1-schnell",
        steps: 4,
        width: 1792,
        height: 1024,
      });
      // @ts-expect-error: 'data' is not typed correctly by Together SDK response
      return response.data[0].url;
    }
  );

  if (!generatedTempThumbnailUrl) {
    throw new Error("Bad request");
  }

  const uploadedThumbnail = await context.run("upload-thumbnail", async () => {
    const utApi = new UTApi();
    const { data } = await utApi.uploadFilesFromUrl(generatedTempThumbnailUrl);

    if (!data) {
      throw new Error("Bad request");
    }

    return data;
  });

  await context.run("cleanup-thumbnail", async () => {
    if (video.thumbnailKey) {
      const utApi = new UTApi();
      await utApi.deleteFiles(video.thumbnailKey);

      await db
        .update(videos)
        .set({
          thumbnailKey: null,
          thumbnailUrl: null,
        })
        .where(and(eq(videos.id, videoId!), eq(videos.userId, userId)));
    }
  });

  await context.run("update-video", async () => {
    await db
      .update(videos)
      .set({
        thumbnailKey: uploadedThumbnail.key,
        thumbnailUrl: uploadedThumbnail.url,
      })
      .where(and(eq(videos.id, video.id), eq(videos.userId, video.userId)));
  });
});
