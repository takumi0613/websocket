//components/socket.tsx
import React from "react";
import Chat from "./chat";

export default function Socket() {
  return (
    <div>
      <div className="flex gap-5 items-center justify-start">
        <h1 className="text-3xl">Socket</h1>
      </div>
      <Chat />
    </div>
  );
}
