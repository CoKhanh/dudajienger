"use client"

import dynamic from "next/dynamic";

const VideoCall = dynamic(() => import("@/components/VideoCall"), {
  ssr: false,
});

const VideoCallPage = () => {
  return <VideoCall />
}

export default VideoCallPage;
