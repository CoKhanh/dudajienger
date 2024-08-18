import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useEffect, useRef } from 'react';
import { currentUser, randomID } from '../../helper';
import { useRouter } from 'next/router';

const VideoCall = () => {
  const { back, push, query } = useRouter();
  const { roomID = randomID(5) } = query;
  const videoCallContainerRef = useRef<HTMLDivElement>(null);
  const appID = process.env.NEXT_PUBLIC_ZEGO_APP_ID;
  const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;

  useEffect(() => {
    const user = currentUser();
    if (!user) {
      push("/");
    }

    // generate Kit Token
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(+appID!, serverSecret!, roomID as string, randomID(5), user as string);

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
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      showLeavingView: false,
      showPreJoinView: false,
      leaveRoomDialogConfig: {
        titleText: "End the call?",
        descriptionText: "Are you sure to end the call?"
      },
      onLeaveRoom: () => {
        back();
      }
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
