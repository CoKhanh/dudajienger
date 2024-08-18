import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useEffect, useRef } from 'react';
import { randomID } from '../../helper';

// export function getUrlParams(
//   url = window.location.href
// ) {
//   let urlStr = url.split('?')[1];
//   return new URLSearchParams(urlStr);
// }

const VideoCall = () => {
  // const roomID = randomID(5);
  const roomID = "test-video";
  const videoCallContainerRef = useRef<HTMLDivElement>(null);
  const appID = process.env.NEXT_PUBLIC_ZEGO_APP_ID;
  const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;

  useEffect(() => {
    console.log("videoRef", videoCallContainerRef);
    // generate Kit Token
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(+appID!, serverSecret!, roomID, randomID(5), randomID(5));

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    
    // start the call
    zp.joinRoom({
      container: videoCallContainerRef.current,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol + '//' +
            window.location.host + window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
    
  }, [])

  return (
    <div
      ref={videoCallContainerRef}
      className="w-full h-screen"
    ></div>
  );
}

export default VideoCall;
