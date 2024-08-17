export const currentUser = () => {
  return localStorage.getItem("user");
}

export const getMediaMsgType = (fileMime: string) => {
  if (fileMime.includes("image")) {
    return "image";
  } else if (fileMime.includes("video")) {
    return "video"
  } else {
    return "other"
  }
}
