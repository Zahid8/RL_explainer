"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./LearningLoopScene"), { ssr: false });

export function SceneMount() {
  return <Scene />;
}
