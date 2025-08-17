

"use client";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";

// Placeholder apiClient for demonstration
const apiClient = {
  async getVideos() {
    // Replace with actual API call
    return [];
  },
};

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    }
    fetchVideos();
  }, []);

  return (
    <main>
      <h1>Home Page</h1>
      {/* Render videos if available */}
      {videos.length > 0 ? (
        <ul>
          {videos.map((video, idx) => (
            <li key={idx}>{video.title || "Untitled Video"}</li>
          ))}
        </ul>
      ) : (
        <p>No videos found.</p>
      )}
    </main>
  );
}
