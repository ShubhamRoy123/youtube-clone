import axios from "axios";
import { db } from "@/db";
import { videos } from "@/db/schema";
import { serve } from "@upstash/workflow/nextjs";
import { and, eq } from "drizzle-orm";


interface InputType {
  userId: string;
  videoId?: string;
}

const DESCRIPTION_SYSTEM_PROMPT = `Your task is to summarize the transcript of a video. Please follow these guidelines:
- Be brief. Condense the content into a summary that captures the key points and main ideas without losing important details.
- Avoid jargon or overly complex language unless necessary for the context.
- Focus on the most critical information, ignoring filler, repetitive statements, or irrelevant tangents.
- ONLY return the summary, no other text, annotations, or comments.
- Aim for a summary that is 3-5 sentences long and no more than 200 characters.`;

export const { POST } = serve(async (context) => {
  const input = context.requestPayload as InputType;
  const { userId, videoId } = input;

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

  const transcript = await context.run("get-transcript", async () => {
    const trackUrl = `https://stream.mux.com/${video.muxPlaybackId}/text/${video.muxTrackId}.txt`;

    const response = await fetch(trackUrl);
    const text = response.text();

    if (!text) {
      throw new Error("Bad request");
    }

    return text;
  });

  const generatedDescription = await context.run(
    "generated-description",
    async () => {
      const url = "https://api.perplexity.ai/chat/completions";
      const headers = {
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      };

      const payload = {
        model: "sonar-pro",
        messages: [
          { role: "system", content: DESCRIPTION_SYSTEM_PROMPT },
          {
            role: "user",
            content: transcript,
          },
        ],
      };

      const response = await axios.post(url, payload, { headers });
      const data = response.data;

      // Print the AI's response
      return data.choices[0].message.content;
    }
  );

  await context.run("update-video", async () => {
    if (!generatedDescription) {
      throw new Error("Bad request");
    }

    await db
      .update(videos)
      .set({
        description:
          generatedDescription || "Updated description from background job",
      })
      .where(and(eq(videos.id, video.id), eq(videos.userId, video.userId)));
  });
});
