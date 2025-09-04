"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { PlaylistCreateModal } from "../components/playlist-create-modal";
import { useState } from "react";
import { PlaylistsSection } from "../sections/playlists-section";

export const PlaylistView = () => {
  const [createModelOpen, setCreateModelOpen] = useState(false);
  return (
    <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-1.5 flex flex-col gap-y-6">
      <PlaylistCreateModal
        open={createModelOpen}
        onOpenChange={setCreateModelOpen}
      />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Playlist</h1>
          <p className="text-xm text-muted-foreground">
            Collections you have created
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => setCreateModelOpen(true)}
        >
          <PlusIcon />
        </Button>
      </div>
      <PlaylistsSection/>
    </div>
  );
};
